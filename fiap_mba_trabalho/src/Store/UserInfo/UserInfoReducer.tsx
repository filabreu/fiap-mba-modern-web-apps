import { UserInfo } from "../../Interfaces/UserInfo";
import { ActionProps } from "./UserInfoContext";

const userInfoReducer = (state: UserInfo, action: ActionProps) => {
  console.log("validando userInfo")
  console.log(action);
  switch (action.type) {
    case "CHANGE_USER_NAME":
      const userName = action.payload;
      return {
        ...state,
        userName,
      };

    case "MAKE_LOGIN":
      const userInfo: UserInfo = action.payload as UserInfo;

      console.log("set login make login")

      localStorage.setItem("userInfoToken", JSON.stringify(userInfo));
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