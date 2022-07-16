import { Context, createContext } from "react";
import { UserInfo } from "../../Interfaces/UserInfo";

export type ActionProps = {
  type: string;
  payload: any;
};

export type UserInfoContextType = {
  userInfo: UserInfo;
  makeLogin: (userInfo: UserInfo) => void;
  makeLogOut: () => void;
};

const UserInfoContext: Context<UserInfoContextType> =
  createContext<UserInfoContextType>({
    userInfo: {
      userId: "",
      token: "",
      phone:"",
      name:""
    },
    makeLogin: (userInfo: UserInfo) => { },
    makeLogOut: () => {},
  });

export default UserInfoContext;