import { FC } from "react";
import Grid from "@mui/material/Grid";
import { Title, TableHeaderStyle, TableRowStyle, TableSearchFieldStyle } from "./HomeStyle";
import MaterialTable, { Query, QueryResult } from "material-table";
import { Button } from "@mui/material";

type IProps = {
  loading: boolean;
  onChangePage: Function;
  getData: (
    query: Query<{ [x: string]: {} }>
  ) => Promise<QueryResult<{ [x: string]: {} }>>;
  onAddPage: () => void;
};

const HomeView: FC<IProps> = ({ loading, onChangePage, getData, onAddPage }) => {
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
      <Grid item xs={12}>
        <Button variant="primary" onClick={() => onAddPage()}>
          Adicionar Colaborador
        </Button>
      </Grid>
      <Grid item lg={12}>
        <MaterialTable
          columns={columns}
          data={getData}
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