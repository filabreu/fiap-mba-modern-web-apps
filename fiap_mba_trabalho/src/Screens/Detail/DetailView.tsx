import { FC } from "react";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { ProductDetail } from "../../Models/ProductDetail";
import Checkbox from '@mui/material/Checkbox';
import GoogleMaps, {
  GoogleMapsMarkerInterface,
} from "../../Components/GoogleMaps/GoogleMaps";
import {MainGrid} from './DetailStyle'

interface iProps {
  productDetail: ProductDetail | null;
  onBackButton: Function;
  handleFavoriteChange: any;
  alignment: boolean;
  latitude: number;
  longitude: number;
}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const DetailView: FC<iProps> = ({
  
  productDetail,
  onBackButton,
  handleFavoriteChange,
  alignment,
  latitude,
  longitude,
}) => {
  let markers: GoogleMapsMarkerInterface[] = [];
  for (let index = 0; index < productDetail!.product.stores.length; index++) {
    const store = productDetail!.product.stores[index];
    markers.push({
      lat: store.latitude,
      lng: store.longitude,
      title: store.name,
      info: store.address,
    });  
  }
  
  markers.push({
    lat: latitude,
    lng: longitude,
    title: "Usuário",
    info:
      "Minha <b>Posição</b> <br><br> " +
      " <a href='https://developers.google.com/maps/documentation/javascript/infowindows' target='_blank'>Mais Informações</a>",
  });
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
        <Grid item xs={12}>
          <GoogleMaps
            markers={markers}
            draggable={true}
            zoom={16}
            initialCenter={{ lat: latitude, lng: longitude }}
          />
        </Grid>
      </MainGrid>
    </>
  );
};

export default DetailView;
