import React, { FC } from "react";
import { FavoriteProducts } from "../../Models/FavoriteProducts";
import FavoriteProductView from "./FavoriteProductView";
import { useRouter } from "next/router";

type ParamsProps = {
  infoID: string;
};
type iProps = {
    favoriteProducts: FavoriteProducts
};
const FavoriteProductController: FC<iProps> = ({favoriteProducts})=> {
  
  const router = useRouter();
  const onBackButton = () => {
    router.back();
  };

  return (
    <FavoriteProductView
    favoriteProducts={favoriteProducts}
      onBackButton={onBackButton}
    />
  );
};

export default FavoriteProductController;