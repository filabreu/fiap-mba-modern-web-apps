import { FC, useEffect, useRef, useState } from "react";
import useAPI from "../../Services/APIs/Common/useAPI";
import persons from "../../Services/APIs/Persons/Persons";
import HomeView from "./HomeView";
import { useGeolocated } from "react-geolocated";
import { NavigateFunction, useNavigate } from "react-router-dom";

const HomeController: FC = () => {
  const [count, setCount] = useState<number>(0);
  const getPersonsGetAPI = useAPI(persons.getPersons);
  const getPersonsPostAPI = useAPI(persons.getPersonsPost);
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
    const timer = setInterval(() => {
      //functional update
      setCount((count) => count + 1);
    }, 3000);

    getPersonsGetAPI.request(1);
    getPersonsPostAPI.request({
      title: "L",
    });

    return () => {
      clearInterval(timer);
    };
  }, []);

  const onChangePage = (infoID: number) => {
    navigate("Detail/" + infoID, {
      state: {
        lat: userCoordinates.current!.latitude,
        lng: userCoordinates.current!.longitude,
      },
    });
  };

  return (
    <HomeView
      info={count}
      person={getPersonsGetAPI.data}
      onChangePage={onChangePage}
    />
  );
};

export default HomeController;