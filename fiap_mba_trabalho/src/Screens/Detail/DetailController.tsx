import React, { FC, useState, useEffect, useRef } from "react";
import { ProductDetail } from "../../Models/ProductDetail";
import DetailView from "./DetailView";
import { useRouter } from "next/router";
import axios from "axios";
import { UserInfo } from "../../Interfaces/UserInfo";
import Header from "../../Components/Header/Header";
import { useGeolocated } from "react-geolocated";

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
  
  let infoSaved = null;
  let config: any;
  useEffect(() => {

    infoSaved = localStorage.getItem("userInfoToken") as String | null;
    setAlignment(productDetail.product.favorite);
    
    if (infoSaved !== "" && infoSaved !== null) {
      let userInfoLoaded: UserInfo = JSON.parse(infoSaved + "") as UserInfo;
      if (userInfoLoaded.token !== "" && userInfoLoaded.token !== undefined) {
        config = {
          headers: {
            Authorization: `Bearer ${userInfoLoaded.token}`,
            'Content-Type': 'application/json',
          },
        };
      } else {
        router.push("/login");
      }
    }
  },[]);

  function onBackButton() {
    router.back();
  }
  
  const handleFavoriteChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: boolean
  ) => {
    console.log("É " + newAlignment);
    setAlignment(newAlignment);
    axios
      .post(
        "https://fiap-reactjs-presencial.herokuapp.com/storeProducts/manageFavorite/",
        { productID: productDetail.product._id },
        config
      )
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <>
    {console.log("dentro do return" + info.lat + " - " + info.lng)}
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