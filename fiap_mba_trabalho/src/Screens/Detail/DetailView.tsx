import { FC } from "react";
import { Button, Typography, Grid } from "@mui/material";
import { ProductDetail } from "../../Models/ProductDetail";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { MainGrid, MapStyle } from "./DetailStyle";

interface iProps {
  productDetail: ProductDetail | null;
  onBackButton: Function;
  handleFavoriteChange: any;
  alignment: string;
}

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
              Favorito: {productDetail!.product.favorite ? "Sim" : "Não"}
            </Typography>
          </p>
          <p> 
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleFavoriteChange}
            >
              <ToggleButton value="favorite">Favorito</ToggleButton>
            </ToggleButtonGroup>
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
