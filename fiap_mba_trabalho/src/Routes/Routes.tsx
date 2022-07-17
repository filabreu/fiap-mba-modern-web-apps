import { FC, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import LoginController from "../Screens/Login/LoginController";
import UserInfoContext, {
  UserInfoContextType,
} from "../Store/UserInfo/UserInfoContext";
import { UserInfo } from "../Interfaces/UserInfo";

const RoutesFunction = () => {
  const router = useRouter();

  const { userInfo, makeLogin } = useContext<UserInfoContextType>(UserInfoContext);
  
  useEffect(() => {
    console.log("Batendo aqui de novo no router");

    let hasToken = false;
    if (userInfo.token === "" || userInfo.token === null) {
      let infoSaved = null;

      infoSaved = localStorage.getItem("userInfoToken") as string | null;

      if (infoSaved !== "" && infoSaved !== null) {
        console.log("infoSaved" + infoSaved);
        let userInfoLoaded: UserInfo = JSON.parse(infoSaved + "") as UserInfo;
        if (userInfoLoaded.token !== "" && userInfoLoaded.token !== undefined) {
          makeLogin({
            userId: userInfoLoaded.userId,
            token: userInfoLoaded.token,
            phone: userInfoLoaded.phone,
            name: userInfoLoaded.userId,
          });
          hasToken = true;
        }
      }
    } else {
      hasToken = true;
    }

    if (!hasToken) {
      router.push("/login");
    } else {
      router.push("/product");
    }
  }, []);

  return (<></>);
};

export default RoutesFunction;
