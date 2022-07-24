import React, { FC } from "react";
import { UserInfo } from "../../src/Interfaces/UserInfo";
import ProductController from "../../src/Screens/Product/ProductController";
import Router from "./../../src/Routes/Routes";
import axios from "axios";
import { GetServerSideProps } from "next";
import {parseCookies} from 'nookies';

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
  const res = await fetch(process.env.REACT_APP_URL + `storeProducts`, {
    method: 'get', 
    headers: new Headers({
      'Authorization': `Bearer ${token}`
    }),
  }
);

const itens = await res.json();
  return {
    props: {
      infob: itens,
    },
  }
};
