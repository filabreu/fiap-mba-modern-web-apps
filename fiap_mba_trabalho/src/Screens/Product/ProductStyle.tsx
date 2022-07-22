import styled from 'styled-components'
import Typography from "@mui/material/Typography";
import Colors from "../../Utils/Common/Colors";

export const Main = styled.div`
  margin-top: 180px;
`;

export const Title = styled(Typography)`
  && {
    text-align: center;
    margin-top: 100px;
    margin-bottom: 20px;
  }`;

export const CustomLink = styled.div`
  text-decoration: underline;
  cursor: pointer;
  color: ${Colors.PrimaryMedium};
  margin-bottom: 10px;
`

export const TableHeaderStyle = {
  backgroundColor: "#eee",
  color: "#0000FF",
};

export const TableRowStyle = {
  color: "#0080FF",
};

export const TableSearchFieldStyle = {
  color: "#0080FF",
  borderBottom: "2px solid #eee",
};