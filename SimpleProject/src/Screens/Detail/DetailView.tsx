import { FC } from "react";
import { Button, Typography, Grid } from "@mui/material";
import { Person } from "../../Models/Person";
import GoogleMaps, {
  GoogleMapsMarkerInterface,
} from "../../Components/GoogleMaps/GoogleMaps";
import { MainGrid, MapStyle } from "./DetailStyle";

// @ts-nocheck

interface iProps {
  person: Person | null;
  onBackButton: Function;
  latitude: number;
  longitude: number;
}
const DetailView: FC<iProps> = ({
  person,
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
      <MainGrid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom variant="h2" color="primary.main">
            Detalhe do Colaborador
          </Typography>
          <p>
            <img src={person!.image} alt="Person" />
          </p>
          <p>
            <Typography gutterBottom variant="body1" color="primary.main">
              Nome: {person!.firstName} {person!.lastName}
            </Typography>
          </p>
          <p>
            <Typography gutterBottom variant="body1" color="primary.main">
              Nome: {person!.firstName} {person!.lastName}
            </Typography>
          </p>
          <p>
            <Typography gutterBottom variant="body1" color="primary.main">
              Telefone: {person!.phone}
            </Typography>
          </p>
          <p>
            <Typography gutterBottom variant="body1" color="primary.main">
              Endereço: {person!.address}
            </Typography>
          </p>
        </Grid>
        <Grid item xs={12} md={6}>
          <GoogleMaps
            markers={markers}
            draggable={false}
            zoom={16}
            style={MapStyle}
            initialCenter={{ lat: latitude, lng: longitude }}
          />
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