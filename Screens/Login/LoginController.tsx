import React, { useState, useContext } from "react";
import useAPI, { useApiReturnType } from "../../Services/APIs/Common/useAPI";
import auth from "../../Services/APIs/Auth/Auth";
import LoginView from "./LoginView";
import * as Yup from "yup";
import { FormikHelpers } from "formik";
import { AxiosError } from "axios";
import UserInfoContext, {
  UserInfoContextType,
} from "../../Store/UserInfo/UserInfoContext";
import { useRouter } from "next/router";

export type FormDataType = {
  email: string;
  password: string;
};

const LoginController = () => {
  const router = useRouter();
  const context = useContext<UserInfoContextType>(UserInfoContext);
  const authLoginAPI: useApiReturnType = useAPI(auth.login);
  const [connectMessage, setConnectMessage] = useState<string>("");
  const [connectCode, setConnectCode] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = (
    values: FormDataType,
    formikHelpers: FormikHelpers<FormDataType>
  ) => {
    let infoSend = {
      email: values.email,
      password: values.password,
    };

    setIsLoading(true);
    authLoginAPI
      .requestPromise(infoSend)
      .then((info: any) => {
        setIsLoading(false);

        context.makeLogin({
          userId: info.userId,
          token: info.token,
          phone: info.phone,
          name: info.name
        });

        router.push('/product');
      })
      .catch((error: AxiosError) => {
        setIsLoading(false);
        setConnectCode(-1);
        if (error.response?.status === 401) {
          setConnectMessage("Usuário e senha não encontrados");
        } else {
          setConnectMessage("O servidor retornou um erro= " + error.message);
        }
      });
  };

  const signInSchema = Yup.object().shape({
    email: Yup.string().email().required("O email é obrigatório"),
    password: Yup.string()
      .required("A senha é obrigatório")
      .min(4, "A senha está muito curta"),
  });

  return (
    <>
    <LoginView
      onSubmit={onSubmit}
      signInSchema={signInSchema}
      isLoading={isLoading}
      connectMessage={connectMessage}
      connectCode={connectCode}
    />
    </>
  );
};

export default LoginController;
