import React, { FC } from "react";
import { FavoriteProducts } from "../../Models/FavoriteProducts";
import FavoriteProductView from "./FavoriteProductView";
import Header from "../../Components/Header/Header";

type iProps = {
  favoriteProducts: FavoriteProducts;
};

const FavoriteProductController: FC<iProps> = ({ favoriteProducts }) => {
  return (
    <>
      <Header />
      <FavoriteProductView
        favoriteProducts={favoriteProducts}
      />
    </>
  );
};

export default FavoriteProductController;
