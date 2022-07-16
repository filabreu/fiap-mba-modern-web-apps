import styled from "styled-components";
import {
  Grid
} from "@mui/material";
import { ErrorMessage } from "formik";
import Colors from "../../Utils/Common/Colors";

// export const BoxLogin = styled.div`
//   text-align: center;
//   margin-top: 30px;
// `;
export const GridLogin = styled(Grid)`
  && {
    border: ${Colors.SecondaryDark} 1px solid;
    padding: 40px !important;
    margin-top: 150px !important;
    border-radius: 50px;
  }
`;

export const CustomErrorMessage = styled(ErrorMessage)`
  && {
    font-size: 0.8vw;
    color: ${Colors.Error};
  }
`;

export const DivButtons = styled.div`
  margin-top: 25px;
`;

export const DivTextInput = styled.div`
  text-align: center;
`;