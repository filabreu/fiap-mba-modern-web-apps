import { UserInfo } from "../../Models/UserInfo";
import { ActionProps } from "./UserInfoContext";

const userInfoReducer = (state: UserInfo, action: ActionProps) => {
  console.log(action);
  switch (action.type) {
    case "CHANGE_USER_NAME":
      const userName = action.payload;
      return {
        ...state,
        userName,
      };

    case "CHANGE_EMAIL":
      const email = action.payload;
      return {
        ...state,
        email,
      };

    case "MAKE_LOGIN":
      const userInfo: UserInfo = action.payload as UserInfo;

      localStorage.setItem("userInfoToken", JSON.stringify(userInfo));
      return {
        ...state,
        userId: userInfo.userId,
        email: userInfo.email,
        token: userInfo.token,
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