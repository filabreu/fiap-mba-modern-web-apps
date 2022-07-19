import { FC } from "react";
import { GetStaticProps } from "next";
import { MenuInfo } from "../src/Interfaces/MenuInfo";
import UserInfoContextProvider from "./../src/Store/UserInfo/UserInfoProvider";
import Router from "./../src/Routes/Routes";
import LoginController from "../src/Screens/Login/LoginController";
import React from "react";
import MuiThemes from "../src/Utils/Common/MuiThemes";
import { UserInfo } from "../src/Interfaces/UserInfo";
import axios from "axios";


type iProps = {
  userInfo: UserInfo[];
};


const Home: FC<iProps> = ({ userInfo }) => {
  return (
    <>
   <React.StrictMode>
          <Router />
    ,
  </React.StrictMode>
</>
  )};
export default Home;


