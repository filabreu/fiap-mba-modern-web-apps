import { FC } from "react";
import Router from "./../Routes/Routes";
import React from "react";
import { UserInfo } from "../Interfaces/UserInfo";

type iProps = {
  userInfo: UserInfo[];
};

const Home: FC<iProps> = ({ userInfo }) => {
  return (
    <>
      <React.StrictMode>
        <Router />
      </React.StrictMode>
    </>
  )};
export default Home;
