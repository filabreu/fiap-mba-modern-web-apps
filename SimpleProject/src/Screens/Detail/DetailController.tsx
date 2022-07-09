import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Person } from "../../Models/Person";
import DetailView from "./DetailView";

type ParamsProps = {
  infoID: string;
};
type LocationProps = {
  personStr: string;
  lat: number;
  lng: number;
};
const DetailController = () => {
  const { infoID } = useParams<ParamsProps>();
  const location = useLocation();
  let personInfo: Person | null = null;

  let infoLocation: LocationProps = location.state! as LocationProps;
  personInfo = JSON.parse(infoLocation!.personStr) as Person;

  console.log("infoID = " + infoID);

  let navigate = useNavigate();

  const onBackButton = () => {
    navigate(-1);
  };

  return (
    <DetailView
      person={personInfo}
      onBackButton={onBackButton}
      latitude={infoLocation!.lat}
      longitude={infoLocation!.lng}
    />
  );
};

export default DetailController;