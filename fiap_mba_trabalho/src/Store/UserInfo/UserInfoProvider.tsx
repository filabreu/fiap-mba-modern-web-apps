import { useReducer } from "react";
import { UserInfo } from "../../Interfaces/UserInfo";
import UserInfoContext, { ActionProps } from "./UserInfoContext";
import UserInfoReducer from "./UserInfoReducer";

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

  const userInfoValue = {
    userInfo: state,
    makeLogin: (userInfo: UserInfo) => {
      console.log("Fazendo login")
      
      dispatch({
        type: "MAKE_LOGIN",
        payload: userInfo,
      });
    },
    makeLogOut: () => {
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