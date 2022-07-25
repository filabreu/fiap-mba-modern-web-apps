import React, { FC } from "react";
import { UserInfo } from "../../Interfaces/UserInfo";
import ProductController from "../../Screens/Product/ProductController";
import Router from "./../../Routes/Routes";
import axios from "axios";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

type iProps = {
  infob: any;
};

const product: FC<iProps> = ({ infob }) => {
  return (
    <>
      <Router />
      <ProductController infob={infob} />;
    </>
  );
};
export default product;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { 'userInfoToken': token } = parseCookies(context)
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/storeProducts`, {
    method: 'get', 
    headers: new Headers({ 'Authorization': `Bearer ${token}` }),
  }
);

const itens = await res.json();
  return {
    props: {
      infob: itens,
    },
  }
};
