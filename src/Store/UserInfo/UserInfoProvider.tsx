import { useReducer } from "react";
import { UserInfo } from "../../Interfaces/UserInfo";
import UserInfoContext from "./UserInfoContext";
import UserInfoReducer from "./UserInfoReducer";
import { useRouter } from "next/router";

type Props = {
  children: JSX.Element;
};

export const UserInfoContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(UserInfoReducer, {
    userId: "",
      token:"",
      phone:"",
      name:""
  });
  const router = useRouter();
  const userInfoValue = {
    userInfo: state,
    makeLogin: (userInfo: UserInfo) => {
      dispatch({
        type: "MAKE_LOGIN",
        payload: userInfo,
      });
    },
    makeLogOut: () => {
      router.push("/login");
      dispatch({
        type: "MAKE_LOGOUT",
        payload: null,
      });
    },
  };

  return (
    <UserInfoContext.Provider value={userInfoValue}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoContextProvider;
