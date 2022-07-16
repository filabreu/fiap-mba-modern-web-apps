import React, { FC } from "react";
import { GetServerSideProps } from "next";
import { UserInfo } from "../../src/Interfaces/UserInfo";
import LoginController from "../../src/Screens/Login/LoginController";
import HomeController from "../../src/Screens/Home/HomeController";

const products: FC = () => {
  return <HomeController  />;
};
export default products;