import { UserInfo } from "../../Interfaces/UserInfo";
import { ActionProps } from "./UserInfoContext";
import {setCookie} from 'nookies';


const userInfoReducer = (state: UserInfo, action: ActionProps) => {
  switch (action.type) {
    case "CHANGE_USER_NAME":
      const userName = action.payload;
      return {
        ...state,
        userName,
      };

    case "MAKE_LOGIN":
      const userInfo: UserInfo = action.payload as UserInfo;

      localStorage.setItem("userInfoToken", JSON.stringify(userInfo));

      setCookie(undefined, 'userInfoToken', userInfo.token as string, {
        maxAge: 60*60*1, //1 hour
      })

      return {
        ...state,
        userId: userInfo.userId,
        name: userInfo.name,
        token: userInfo.token,
        phone: userInfo.phone
      };

    case "MAKE_LOGOUT":
        localStorage.setItem("userInfoToken", "");
        
      return {
        ...state,
        token: "",
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default userInfoReducer;
