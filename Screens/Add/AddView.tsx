import { FC, ReactElement } from "react";
import {
  Grid,
  Typography,
  Stack,
  CircularProgress,
  Alert,
  AlertProps,
  AlertColor,
  Button,
} from "@mui/material";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import CustomTextField from "../../Components/CustomTextField/CustomTextField";
import InputMask from "react-input-mask";
import { If, Then } from "react-if";
import { FormDataType } from "./AddController";
import { AssertsShape, ObjectShape, TypeOfShape } from "yup/lib/object";
import { ObjectSchema } from "yup";
import { AnyObject } from "yup/lib/types";
import { MainGrid, CustomErrorMessage, CircularProgressDiv } from "./AddStyle";

type IProps = {
  onBackButton: Function;
  onSubmit: (
    values: FormDataType,
    formikHelpers: FormikHelpers<FormDataType>
  ) => void | Promise<any>;
  signInSchema: ObjectSchema<
    ObjectShape,
    AnyObject,
    TypeOfShape<ObjectShape>,
    AssertsShape<ObjectShape>
  >;
  isLoading: boolean;
  connectCode: number;
  connectMessage: string;
};

const DetailView: FC<IProps> = ({
  onBackButton,
  onSubmit,
  signInSchema,
  isLoading,
  connectCode,
  connectMessage,
}) => {
  // const infoJson = JSON.parse(info);

  let message: ReactElement<AlertProps> | null = null;
  if (connectMessage !== "") {
    let severity: AlertColor = "success";
    if (connectCode !== 1) {
      severity = "error";
    }
    message = (
      <Alert severity={severity} variant="filled">
        {connectMessage}
      </Alert>
    );
  }

  let initialDataForm: FormDataType = {
    name: "",
    phone: "",
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialDataForm}
      validationSchema={signInSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        const { values, setFieldValue, submitForm } = formik;

        return (
          <Form>
            <MainGrid container spacing={2}>
              <Grid item xs={12} md={6}>
                {message}
                <Typography gutterBottom variant="h2" color="secondary.main">
                  Cadastro Usuário
                </Typography>
                <div>
                  <CustomTextField
                    label="Nome"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue("name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <CustomErrorMessage
                    name="name"
                    component="span"
                  />
                </div>
                <div>
                <CustomTextField
                        label="Email"
                        defaultValue={values.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue("email", e.target.value)
                        }
                      />
                </div>
                <div>
                <div>
                      <CustomErrorMessage name="email" component="span" />
                    </div>
                </div>
                <div>
                  <InputMask
                    mask="(99) 99999-9999"
                    disabled={false}
                    value={values.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("phone", e.target.value);
                    }}
                  >
                    <CustomTextField label="Telefone" />
                  </InputMask>
                </div>
                <div>
                  <CustomErrorMessage
                    name="phone"
                    component="span"
                  />
                </div>
                <div>
                  <CustomTextField
                     label="Senha"
                     type="password"
                     defaultValue={values.password}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                       setFieldValue("password", e.target.value)
                     }
                  />
                </div>
                <div>
                <CustomErrorMessage name="password" component="span" />
                </div>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={5}
                >
                  <If condition={isLoading}>
                    <Then>
                      <CircularProgressDiv>
                        <CircularProgress />
                      </CircularProgressDiv>
                    </Then>
                  </If>
                  <If condition={!isLoading && connectCode !== 1}>
                    <Then>
                      <>
                        <Button
                          variant="secondary"
                          type="submit"
                          onClick={submitForm}
                        >
                          Adicionar
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => onBackButton()}
                        >
                          Voltar
                        </Button>
                      </>
                    </Then>
                  </If>
                </Stack>
              </Grid>
            </MainGrid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default DetailView;
