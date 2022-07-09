import { FC } from "react";

import Grid from "@mui/material/Grid";
import { AllPersons, Person } from "../../Models/Person";
import MaterialTable from "material-table";
import { Title, TableHeaderStyle, TableRowStyle, TableSearchFieldStyle } from "./HomeStyle";

interface IProps {
  loading: boolean;
  person: AllPersons | null;
  onChangePage: Function;
}

const HomeView: FC<IProps> = ({ loading, person, onChangePage }) => {
  let data: Person[] = [];
  if (person) {
    data = person.persons;
  }

  const columns = [
    { title: "SobreNome", field: "lastName" },
    { title: "Nome", field: "firstName" },
    { title: "Telefone", field: "phone" },
  ];

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      justifyContent="left"
      alignItems="left"
    >
      <Grid item xs={12}>
        <Title gutterBottom variant="h1" color="primary.dark">
          Lista de Colaboradores
        </Title>
      </Grid>
      <Grid item lg={12}>
        <MaterialTable
          columns={columns}
          data={data}
          isLoading={loading}
          actions={[
            {
              icon: "visibility",
              tooltip: "See Detail",
              onClick: (event, rowData) => {
                onChangePage(rowData);
              },
            },
          ]}
          options={{
            showTitle: false,
            search: true,
            actionsColumnIndex: -1,
            headerStyle: TableHeaderStyle,
            rowStyle: TableRowStyle,
            searchFieldStyle: TableSearchFieldStyle,
          }}
        />
      </Grid>
    </Grid>
  );
};
export default HomeView;