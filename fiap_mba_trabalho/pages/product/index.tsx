import React, { FC } from "react";
import { UserInfo } from "../../src/Interfaces/UserInfo";
import ProductController from "../../src/Screens/Product/ProductController";
import Router from "./../../src/Routes/Routes";


type iProps = {
  userInfo: UserInfo
};

const product:FC<iProps> = ({userInfo}) => {
  return (
  <>
  <Router />
  <ProductController  userInfo={userInfo}/>;
  </>
  )
};
export default product;