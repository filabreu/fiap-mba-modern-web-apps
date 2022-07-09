import "./Home.css";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

interface IProps {
  info: number;
}

const HomeView: React.FC<IProps> = ({ info }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      justifyContent="center"
      alignItems="center"
      className="container"
    >
      <Typography gutterBottom variant="h1" color="primary.dark">
        Info {info}
      </Typography>
      <Typography gutterBottom variant="h1" color="secondary.dark">
        Info {info}
      </Typography>
      <Button color="primary"> Primary </Button>
      <Button color="secondary"> Secondary </Button>
      <Button color="success"> Success </Button>
    </Grid>
  );
};

export default HomeView;