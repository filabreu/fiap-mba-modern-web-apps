import React, { FC } from "react";
import { FavoriteProducts } from "../../Models/FavoriteProducts";
import FavoriteProductView from "./FavoriteProductView";
import { useRouter } from "next/router";
import Header from "../../Components/Header/Header";
import { Product } from "../../Models/ProductDetail";

type ParamsProps = {
  infoID: string;
};
type iProps = {
  favoriteProducts: FavoriteProducts;
};

const FavoriteProductController: FC<iProps> = ({ favoriteProducts }) => {
  const router = useRouter();
  const onBackButton = () => {
    router.back();
  };
  const onChangePage = (product: Product) => {
    router.push("detail/" + product._id);
  };

  return (
    <>
      <Header />
      <FavoriteProductView
        favoriteProducts={favoriteProducts}
        onBackButton={onBackButton}
        onChangePage={onChangePage}
      />
    </>
  );
};

export default FavoriteProductController;
