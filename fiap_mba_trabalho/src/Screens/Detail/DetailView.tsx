import { FC } from "react";
import { Button, Typography, Grid } from "@mui/material";
import { ProductDetail } from "../../Models/ProductDetail";
import Checkbox from '@mui/material/Checkbox';

import { MainGrid } from "./DetailStyle";

interface iProps {
  productDetail: ProductDetail | null;
  onBackButton: Function;
  handleFavoriteChange: any;
  alignment: boolean;
}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const DetailView: FC<iProps> = ({
  
  productDetail,
  onBackButton,
  handleFavoriteChange,
  alignment,
}) => {
  return (
    <>
      <MainGrid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom variant="h2" color="primary.main">
            Detalhe do Produto
          </Typography>
          <p>
            <Typography gutterBottom variant="body1" color="primary.main">
              Nome: {productDetail!.product.name}
            </Typography>
          </p>
          <p>
            <Typography gutterBottom variant="body1" color="primary.main">
              Preço: {productDetail!.product.price}
            </Typography>
          </p>
          <p>
            <Typography gutterBottom variant="body1" color="primary.main">
              Favorito: {alignment ? "Sim" : "Não"}
            </Typography>
          </p>
          <p> 
          <Checkbox onChange={handleFavoriteChange}
          {...label}
           defaultChecked={productDetail!.product.favorite} />
          </p>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="contained" onClick={() => onBackButton()}>
            Voltar
          </Button>
        </Grid>
      </MainGrid>
    </>
  );
};

export default DetailView;
