import { FC, useContext } from "react";
import HomeController from "../Screens/Home/HomeController";
import { Routes, Route } from "react-router-dom";
import LoginController from "../Screens/Login/LoginController";
import UserInfoContext, {
  UserInfoContextType,
} from "../Store/UserInfo/UserInfoContext";
import { UserInfo } from "../Models/UserInfo";

const RoutesFunction: FC = () => {
  const { userInfo, makeLogin} = useContext<UserInfoContextType>(UserInfoContext);

  let hasToken = false;
  if (userInfo.token === "" || userInfo.token === null) {
    console.log("token" + userInfo.token)
        let infoSaved = localStorage.getItem("userInfoToken") as string | null;

    if (infoSaved !== "" && infoSaved !== null) {
      console.log("infoSaved" + infoSaved)
      let userInfoLoaded: UserInfo = JSON.parse(infoSaved+"") as UserInfo;
      if (userInfoLoaded.token !== "" && userInfoLoaded.token !== undefined) {
        makeLogin({
          userId: userInfoLoaded.userId,
          email: userInfoLoaded.email,
          token: userInfoLoaded.token,
        });
        hasToken = true;
      }
      
    }
  } else {
    hasToken = true;
  }


  if (hasToken) {
    return (
      <Routes>
        <Route path="/" element={<HomeController />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<LoginController />} />
      </Routes>
    );
  }
};

export default RoutesFunction;