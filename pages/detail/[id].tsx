import React, { FC } from "react";
import { GetServerSideProps } from "next";
import DetailController from "../../Screens/Detail/DetailController";
import { ProductDetail } from "../../Models/ProductDetail";
import { parseCookies } from "nookies";

type iProps = {
  productDetail: ProductDetail;
};

const detail: FC<iProps> = ({ productDetail }) => {
  return <DetailController productDetail={productDetail} />;
};

export default detail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { 'userInfoToken': token } = parseCookies(context);

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/storeProducts/product/${context.params!.id}`, {
      method: 'get',
      headers: new Headers({ 'Authorization': `Bearer ${token}` }),
    }
  );
  const productDetail = await res.json() as ProductDetail;

  return {
    props: {
      productDetail,
    },
  };
}
