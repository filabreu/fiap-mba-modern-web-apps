import React, { FC, useState, useEffect } from "react";
import AddView from "./AddView";
import * as Yup from "yup";
import "yup-phone";
import useAPI from "../../../pages/Services/APIs/Common/useAPI";
import addUser from "../../../pages/Services/APIs/Persons/Persons";
import { FormikHelpers } from "formik";
import { AssertsShape, ObjectShape, TypeOfShape } from "yup/lib/object";
import { ObjectSchema } from "yup";
import { AnyObject } from "yup/lib/types";
import { useRouter } from "next/router";
import Header from "../../Components/Header/Header";
import axios from "axios";

export type FormDataType = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

const AddController = () => {
  const router = useRouter();
  const addUserApi = useAPI(addUser);

  const [connectMessage, setConnectMessage] = useState("");
  const [connectCode, setConnectCode] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onBackButton = () => {
    router.back;
  };

  const onSubmit = (
    values: FormDataType,
    formikHelpers: FormikHelpers<FormDataType>
  ) => {
    // navigate(-1);
    console.log(values);

    let info = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      password: values.password,
    };

    axios
    .put('https://fiap-reactjs-presencial.herokuapp.com/storeProducts/signup/',info)
    .then(response => {
      console.log(response);
    });

    setIsLoading(true);

    // addUserApi
    //   .requestPromise(info)
    //   .then((info: any) => {
    //     console.log("AEA", info);
    //     setIsLoading(false);
    //     setConnectCode(1);
    //     setConnectMessage("Colaborador adicionada com sucesso");
    //     setTimeout(() => {
    //       router.back;
    //     }, 3000);
    //   })
    //   .catch((error: any) => {
    //     setIsLoading(false);
    //     setConnectCode(-1);
    //     setConnectMessage("O servidor retornou um erro= " + error.response);
    //   });
  };

  const personSchema: ObjectSchema<
    ObjectShape,
    AnyObject,
    TypeOfShape<ObjectShape>,
    AssertsShape<ObjectShape>
  > = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório"),
    phone: Yup.string()
      .phone("BR", true, "O telefone está inválido")
      .required("Telefone é obrigatório"),
    email: Yup.string().email().required("O email é obrigatório"),
    password: Yup.string()
      .required("A senha é obrigatório")
      .min(4, "A senha está muito curta"),
  });

  return (
    <>
      <AddView
        onBackButton={onBackButton}
        onSubmit={onSubmit}
        signInSchema={personSchema}
        isLoading={isLoading}
        connectMessage={connectMessage}
        connectCode={connectCode}
      />
    </>
  );
};

export default AddController;
