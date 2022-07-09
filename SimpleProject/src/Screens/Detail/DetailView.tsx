import { FC } from "react";
import { ButtonMaxSize, MainGrid, TitlePage } from './DetailStyle'

import { Grid } from "@mui/material";
import GoogleMaps, {
  GoogleMapsMarkerInterface,
} from "../../Components/GoogleMaps/GoogleMaps";


interface iProps {
  infoID: string | undefined;
  onBackButton: Function;
  latitude: number;
  longitude: number;
}
const DetailView: FC<iProps> = ({
  infoID,
  onBackButton,
  latitude,
  longitude,
}) => {
  let markers: GoogleMapsMarkerInterface[] = [];
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
      <MainGrid spacing={2}>
        <Grid item xs={12}>
          <TitlePage
            gutterBottom
            variant="h3"
            color="primary.main"
          >
            Detail = {infoID}
          </TitlePage>
        </Grid>
        <Grid item xs={12}>
          <ButtonMaxSize variant="primary" onClick={() => onBackButton()}>
            Voltar
          </ButtonMaxSize>
        </Grid>
        <Grid item xs={12}>
          <GoogleMaps
            markers={markers}
            draggable={false}
            zoom={16}
            initialCenter={{ lat: latitude, lng: longitude }}
          />
        </Grid>
      </MainGrid>
    </>
  );
};

export default DetailView;