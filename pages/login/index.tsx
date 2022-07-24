import React, { FC } from "react";
import { UserInfo } from "../../src/Interfaces/UserInfo";
import LoginController from "../../src/Screens/Login/LoginController";

type iProps = {
  userInfo: UserInfo
};

const login: FC<iProps> = () => {
  return <LoginController />;
};

export default login;
