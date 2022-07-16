import { FC, ReactElement } from "react";
import { Typography, CircularProgress, Grid, GridProps } from "@mui/material";
import { AllPersons } from "../../Models/Person";
import CustomCards from "../../Components/Card/CustomCards";

interface IProps {
  person: AllPersons | null;
  loading: boolean;
  error: string;
}

const HomeView: FC<IProps> = ({ person, loading, error }) => {
  let arrayCards: ReactElement<GridProps>[] = [];
  if (person) {
    person.persons.forEach((element) => {
      arrayCards.push(
        <Grid item xs={12} md={6} lg={3} key={element._id}>
          <CustomCards person={element} />
        </Grid>
      );
    });
  }

  let info = null;
  if (loading) {
    info = (
      <div>
        <CircularProgress />
      </div>
    );
  } else if (error !== "") {
    info = (
      <div>
        <Typography gutterBottom variant="h5" component="div">
          {error}
        </Typography>
      </div>
    );
  } else {
    info = (
      <Grid container spacing={5}>
        {arrayCards}
      </Grid>
    );
  }

  return <>{info}</>;
};

export default HomeView;