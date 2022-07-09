import { FC } from 'react'
import styled from 'styled-components'
import Typography from "@mui/material/Typography";
import Colors from "../../Utils/Common/Colors";

export const Main = styled.div`
  margin-top: 180px;
`;

export const Title = styled(Typography)`
&& {
  text-align: center;
  line-height: 60px
}`;


export const CustomLink = styled.div`
  text-decoration: underline;
  cursor: pointer;
  color: ${Colors.PrimaryMedium};
  margin-bottom: 10px;
`;