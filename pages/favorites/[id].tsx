import React, { FC } from "react";
import { GetServerSideProps } from "next";
import { FavoriteProducts } from "../../Models/FavoriteProducts";
import {parseCookies} from 'nookies';
import FavoriteProductController from "../../Screens/Favorites/FavoriteProductController";

type iProps = {
    favoriteProducts: FavoriteProducts
}

const detail:FC<iProps> = ({ favoriteProducts }) => {
    return <FavoriteProductController favoriteProducts={favoriteProducts}/>;
  };
  export default detail;

  export const getServerSideProps: GetServerSideProps = async (context) => {

    const { 'userInfoToken': token } = parseCookies(context)
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `/storeProducts/manageFavorite`, {
        body: JSON.stringify({ productID: context.params!._id }),
        method: 'get',
        headers: new Headers({ 'Authorization': `Bearer ${token}` }),
      }
    );
    const favoriteProducts = await res.json() as FavoriteProducts;

    return {
      props: {
        favoriteProducts: favoriteProducts,
      },
    };
  }
