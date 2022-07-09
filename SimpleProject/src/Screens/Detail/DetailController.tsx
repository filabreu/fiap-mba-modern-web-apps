import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import DetailView from "./DetailView";

type ParamsProps = {
  infoID: string;
};
type LocationProps = {
  lat: number;
  lng: number;
};
const DetailController = () => {
  const { infoID } = useParams<ParamsProps>();
  const location = useLocation();

  let infoLocation: LocationProps;
  if (location.state) {
    infoLocation = location.state as LocationProps;
  }

  let navigate = useNavigate();

  const onBackButton = () => {
    navigate(-1);
  };

  return (
    <DetailView
      infoID={infoID}
      onBackButton={onBackButton}
      latitude={infoLocation!.lat}
      longitude={infoLocation!.lng}
    />
  );
};

export default DetailController;