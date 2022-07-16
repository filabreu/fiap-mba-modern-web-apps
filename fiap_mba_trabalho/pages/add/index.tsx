import React, { FC } from "react";
import { UserInfo } from "../../src/Interfaces/UserInfo";
import AddController from "../../src/Screens/Add/AddController";


type iProps = {
  userInfo: UserInfo
};

const add:FC<iProps> = () => {
  return <AddController  />;
};
export default add;