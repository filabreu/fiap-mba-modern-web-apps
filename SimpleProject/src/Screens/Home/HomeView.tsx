import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Title, Box, AcUnitIconCustom, CustomBox } from "./HomeStyle";

interface IProps {
  info: number;
}

const HomeView: React.FC<IProps> = ({ info }) => {
  return (
    <Box>
      <Grid
        container
        spacing={0}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <AcUnitIconCustom />
        <Title gutterBottom variant="h1" color="primary.dark">
          Info {info}
        </Title>
        <Title gutterBottom variant="h1" color="secondary.dark">
          Info {info}
        </Title>
        <CustomBox color="#fff000"></CustomBox>
        <Button variant="primary"> Primary </Button>
        <Button color="secondary"> Secondary </Button>
        <Button color="success"> Success </Button>
      </Grid>
    </Box>
  );
};

export default HomeView;