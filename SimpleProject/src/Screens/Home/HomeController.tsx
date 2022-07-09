import { FC, useEffect, useRef } from "react";
import useAPI from "../../Services/APIs/Common/useAPI";
import persons from "../../Services/APIs/Persons/Persons";
import HomeView from "./HomeView";
import { useGeolocated } from "react-geolocated";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Person } from "../../Models/Person";

const HomeController: FC = () => {
  const getPersonsGetAPI = useAPI(persons.getPersons);
  const userCoordinates = useRef<GeolocationCoordinates | null>(null);
  const navigate: NavigateFunction = useNavigate();

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  if (isGeolocationAvailable && isGeolocationEnabled && coords) {
    console.log(coords.latitude + " - " + coords.longitude);
    userCoordinates.current = coords;
  }

  useEffect(() => {
    getPersonsGetAPI.request(1);
  }, []);

  const onChangePage = (person: Person) => {
    navigate("Detail/" + person._id, {
      state: {
        lat: userCoordinates.current!.latitude,
        lng: userCoordinates.current!.longitude,
        personStr: JSON.stringify(person),
      },
    });
  };

  return (
    <HomeView
      person={getPersonsGetAPI.data}
      loading={getPersonsGetAPI.loading}
      onChangePage={onChangePage}
    />
  );

};

export default HomeController;