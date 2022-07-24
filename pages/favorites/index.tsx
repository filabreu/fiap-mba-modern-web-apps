import React, { FC } from "react";
import { GetServerSideProps } from "next";
import { FavoriteProducts } from "../../src/Models/FavoriteProducts";
import {parseCookies} from 'nookies';
import FavoriteProductController from "../../src/Screens/Favorites/FavoriteProductController";

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
      
      process.env.REACT_APP_URL + `storeProducts/getFavProducts`
      , {
        method: 'get', 
        headers: new Headers({
          'Authorization': `Bearer ${token}`
      }),
      }  
    );
    const favoriteProducts = await res.json() as FavoriteProducts;
    console.log("Checking items");
    console.log(favoriteProducts);
  
    return {
      props: {
        favoriteProducts: favoriteProducts,
      },
    };
  }

