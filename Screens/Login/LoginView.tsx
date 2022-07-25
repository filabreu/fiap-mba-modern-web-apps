import { FC, ReactElement } from "react";
import {
  Grid,
  Typography,
  Stack,
  CircularProgress,
  Alert,
  AlertProps,
  Button,
} from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import CustomTextField from "../../Components/CustomTextField/CustomTextField";
import { If, Then } from "react-if";
import { AssertsShape, ObjectShape, TypeOfShape } from "yup/lib/object";
import { ObjectSchema } from "yup";
import { AnyObject } from "yup/lib/types";
import {
  GridLogin,
  CustomErrorMessage,
  DivButtons,
  DivTextInput,
} from "./LoginStyle";

import { FormDataType } from "./LoginController";

type IProps = {
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

const LoginView: FC<IProps> = ({
  onSubmit,
  signInSchema,
  isLoading,
  connectCode,
  connectMessage,
}) => {
  let message: ReactElement<AlertProps> | undefined;

  if (connectMessage !== "") {
    message = (
      <Alert severity="error" variant="filled">
        {" "}
        {connectMessage}{" "}
      </Alert>
    );
  }

  let initialDataForm: FormDataType = {
    email: "",
    password: "",
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item md={12}>
        <Formik
          initialValues={initialDataForm}
          validationSchema={signInSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            const { values, setFieldValue, submitForm } = formik;
            return (
              <Form>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <GridLogin item xs={12} md={6}>
                    {message}
                    <Typography gutterBottom variant="h3" color="primary.main">
                      Login
                    </Typography>
                    <DivTextInput>
                      <CustomTextField
                        label="Email"
                        defaultValue={values.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue("email", e.target.value)
                        }
                      />
                    </DivTextInput>
                    <div>
                      <CustomErrorMessage name="email" component="span" />
                    </div>
                    <DivTextInput>
                      <CustomTextField
                        label="Senha"
                        type="password"
                        defaultValue={values.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue("password", e.target.value)
                        }
                      />
                    </DivTextInput>
                    <div>
                      <CustomErrorMessage name="password" component="span" />
                    </div>

                    <DivButtons>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={5}
                      >
                        <If condition={isLoading}>
                          <Then>
                            <CircularProgress />
                          </Then>
                        </If>
                        <If condition={!isLoading && connectCode !== 1}>
                          <Then>
                            <>
                              <Button
                               
                                type="submit"
                                onClick={submitForm}
                              >
                                Logar
                              </Button>
                            </>
                          </Then>
                        </If>
                      </Stack>
                    </DivButtons>
                  </GridLogin>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default LoginView;
