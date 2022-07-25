import React, { FC, useState } from "react";
import { ProductDetail } from "../../Models/ProductDetail";
import DetailView from "./DetailView";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../../Components/Header/Header";

type iProps = {
  productDetail: ProductDetail;
};

export type LocationProps = {
  lat: string;
  lng: string;
};

const DetailController: FC<iProps> = ({ productDetail }) => {
  const router = useRouter();
  const [alignment, setAlignment] = useState<boolean>(false);
  const info: LocationProps = router.query as LocationProps;

  let config: any;

  function onBackButton() {
    router.back();
  }

  const handleFavoriteChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: boolean
  ) => {
    setAlignment(newAlignment);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/storeProducts/manageFavorite/`,
        { productID: productDetail.product._id },
        config
      )
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <>
      <Header />
      <DetailView
        productDetail={productDetail}
        onBackButton={onBackButton}
        handleFavoriteChange={handleFavoriteChange}
        alignment={alignment}
        latitude={Number(info.lat!)}
        longitude={Number(info.lng!)}
      />
    </>
  );
};

export default DetailController;
