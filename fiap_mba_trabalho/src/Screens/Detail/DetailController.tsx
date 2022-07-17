import React, { FC, useState, useEffect } from "react";
import { ProductDetail } from "../../Models/ProductDetail";
import DetailView from "./DetailView";
import { useRouter } from "next/router";

type ParamsProps = {
  infoID: string;
};

type iProps = {
  productDetail: ProductDetail
};

const DetailController: FC<iProps> = ({productDetail})=> {
  const [alignment, setAlignment] = useState<string>("favorite");  
  const router = useRouter();

  function onBackButton() {
    router.back();
  }
   
   const handleFavoriteChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    console.log("Clicou aqui" + newAlignment);
    setAlignment(newAlignment);
    router.push('/')
  };
  
  return (
    <DetailView
      productDetail={productDetail}
      onBackButton={onBackButton}
      handleFavoriteChange={handleFavoriteChange}
      alignment={alignment}
    />
  );
};

export default DetailController;