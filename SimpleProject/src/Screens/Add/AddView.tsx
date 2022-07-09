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
import GoogleMaps, {
  GoogleMapsMarkerInterface,
} from "../../Components/GoogleMaps/GoogleMaps";
import { FormDataType } from "./AddController";
import { AssertsShape, ObjectShape, TypeOfShape } from "yup/lib/object";
import { ObjectSchema } from "yup";
import { AnyObject } from "yup/lib/types";
import { MainGrid, CustomErrorMessage, CircularProgressDiv } from "./AddStyle";

type IProps = {
  onBackButton: Function;
  latitude: number;
  longitude: number;
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
  latitude,
  longitude,
  onSubmit,
  signInSchema,
  isLoading,
  connectCode,
  connectMessage,
}) => {
  console.log(latitude + ", " + longitude);
  // const infoJson = JSON.parse(info);

  let message: ReactElement<AlertProps> | null = null;
  console.log(connectMessage);
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
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    latitude: latitude,
    longitude: longitude,
  };

  return (
    <Formik
      initialValues={initialDataForm}
      validationSchema={signInSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        const { values, setFieldValue, submitForm } = formik;

        let markers: GoogleMapsMarkerInterface[] = [];
        console.log(values.latitude + " - " + values.longitude);

        markers.push({
          lat: values.latitude,
          lng: values.longitude,
          title: "My Position",
          info: "",
          draggable: true,
          onDragEnd: (
            latitude: number | undefined,
            longitude: number | undefined
          ) => {
            setFieldValue("latitude", latitude);
            setFieldValue("longitude", longitude);
          },
        });

        console.log(markers);

        return (
          <Form>
            <MainGrid container spacing={2}>
              <Grid item xs={12} md={6}>
                {message}
                <Typography gutterBottom variant="h2" color="secondary.main">
                  Adicionar novo Colaborador
                </Typography>
                <div>
                  <CustomTextField
                    label="Nome"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue("firstName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <CustomErrorMessage
                    name="firstName"
                    component="span"
                  />
                </div>
                <div>
                  <CustomTextField
                    label="Sobrenome"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue("lastName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <CustomErrorMessage
                    name="lastName"
                    component="span"
                  />
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
                    label="Endereco"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue("address", e.target.value)
                    }
                  />
                </div>
                <div>
                  <CustomErrorMessage
                    name="address"
                    component="span"
                  />
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
              <Grid item xs={6} md={6}>
                <GoogleMaps
                  markers={markers}
                  draggable={true}
                  zoom={16}
                  containerStyle={{
                    width: "48%",
                  }}
                  initialCenter={{ lat: latitude, lng: longitude }}
                />
              </Grid>
            </MainGrid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default DetailView;