import React, { FC } from "react";
import { UserInfo } from "../../Interfaces/UserInfo";
import LoginController from "../../Screens/Login/LoginController";

type iProps = {
  userInfo: UserInfo
};

const login: FC<iProps> = () => {
  return <LoginController />;
};

export default login;
