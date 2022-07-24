import * as React from "react";
import { DataGrid, GridColDef, GridApi, GridCellValue } from "@mui/x-data-grid";
import { FavoriteProducts } from "../../Models/FavoriteProducts";
import { FC } from "react";
import Button from "@mui/material/Button";
import Link from "@material-ui/core/Link";

interface iProps {
  favoriteProducts: FavoriteProducts | null;
}

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 130, hide: true },
  { field: "name", headerName: "Nome", width: 130 },
  { field: "price", headerName: "Preço", width: 130 },
  {
    field: "action",
    headerName: "Detalhes",
    sortable: false,
    renderCell: (params) => {
      const api: GridApi = params.api;
      const thisRow: Record<string, GridCellValue> = {};

      api
        .getAllColumns()
        .filter((c) => c.field == "_id" && !!c)
        .forEach(
          (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
        );

      return (
        <Link href={"/detail/" + thisRow._id}>
          <Button variant="contained" color="secondary">Ir</Button>
        </Link>
      );
    },
  },
];

const FavoriteProductView: FC<iProps> = ({
  favoriteProducts,
}) => {
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={favoriteProducts!.products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default FavoriteProductView;
