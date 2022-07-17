import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { FavoriteProducts } from '../../Models/FavoriteProducts';
import { FC } from 'react';
import Switch from '@mui/material/Switch';

interface iProps {
    favoriteProducts: FavoriteProducts | null;
    onBackButton: Function;
  }

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Nome', width: 130 },
  { field: 'price', headerName: 'Preço', width: 130 },
  { field: 'favorite', headerName: 'Favorito', width: 130 },
];



const FavoriteProductView: FC<iProps> = ({ favoriteProducts, onBackButton }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={favoriteProducts!.products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}

export default FavoriteProductView;
