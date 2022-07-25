import React, { FC } from "react";
import { UserInfo } from "../../Interfaces/UserInfo";
import AddController from "../../Screens/Add/AddController";

type iProps = {
  userInfo: UserInfo
};

const add:FC<iProps> = () => {
  return <AddController  />;
};

export default add;
