import { Context, createContext } from "react";
import { UserInfo } from "../../Models/UserInfo";

export type ActionProps = {
  type: string;
  payload: any;
};

export type UserInfoContextType = {
  userInfo: UserInfo;
  changeEmail: (email: string) => void;
  makeLogin: (userInfo: UserInfo) => void;
  makeLogOut: () => void;
};

const UserInfoContext: Context<UserInfoContextType> =
  createContext<UserInfoContextType>({
    userInfo: {
      userId: "",
      email: "",
      token: "",
    },
    changeEmail: (email: string) => {},
    makeLogin: (userInfo: UserInfo) => {},
    makeLogOut: () => {},
  });

export default UserInfoContext;