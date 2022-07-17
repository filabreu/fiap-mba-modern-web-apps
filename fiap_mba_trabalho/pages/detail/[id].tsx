import React, { FC } from "react";
import { GetServerSideProps } from "next";
import DetailController from "../../src/Screens/Detail/DetailController";
import { ProductDetail } from "../../src/Models/ProductDetail";
import {parseCookies} from 'nookies';


type iProps = {
  productDetail: ProductDetail
};

const detail:FC<iProps> = ({ productDetail }) => {
  return <DetailController productDetail={productDetail}/>;
};
export default detail;

export const getServerSideProps: GetServerSideProps = async (context) => {

  console.log(context.req.cookies);
  console.log("Inicio SSR getServerSideProps");
  const { 'userInfoToken': token } = parseCookies(context)
  console.log(token);
  const res = await fetch(
    
    process.env.REACT_APP_URL + `storeProducts/product/${context.params!.id}`
    , {
      method: 'get', 
      headers: new Headers({
        'Authorization': `Bearer ${token}`
    }),
    }  
  );
  const productDetail = await res.json() as ProductDetail;
  console.log("Checking items");
  console.log(productDetail);

  return {
    props: {
      productDetail: productDetail,
    },
  };
}