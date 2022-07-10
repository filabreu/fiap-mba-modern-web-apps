import { FC, useEffect, useRef } from "react";
import useAPI, { useApiReturnType } from "../../Services/APIs/Common/useAPI";
import { getAllPersons } from "../../Services/APIs/Persons/Persons";
import HomeView from "./HomeView";
import { useGeolocated } from "react-geolocated";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Person } from "../../Models/Person";
import { QueryResult } from "material-table";
import Header from "../../Components/Header/Header";

const HomeController: FC = () => {
  const getPersonsGetAPI: useApiReturnType = useAPI(getAllPersons);
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

  const onAddPage = () => {
    navigate("add/", {
      state: {
        lat: userCoordinates.current!.latitude,
        lng: userCoordinates.current!.longitude,
      },
    });
  };

  const getData = (query: any): Promise<QueryResult<{ [x: string]: {} }>> => {
    return new Promise((resolve, reject) => {
      console.log(query);

      let page = query.page + 1;
      let info = `page=${page}&perPage=${query.pageSize}`;
      if (query.orderBy !== undefined && query.orderBy !== "") {
        info += `&orderBy=${query.orderBy.field}`;
      }
      if (query.orderDirection !== undefined && query.orderDirection !== "") {
        info += `&orderDirection=${query.orderDirection}`;
      }
      if (query.search !== undefined && query.search !== "") {
        info += `&search=${query.search}`;
      }
      console.log(info);
      getPersonsGetAPI
        .requestPromise(info)
        .then((info: any) => {
          console.log(info);
          resolve({
            data: info.persons,
            page: info.page - 1,
            totalCount: info.totalItems,
          });
        })
        .catch((error: string) => {
          console.log(error);
        });
    });
  };

  return (
    <>
    <Header />
    <HomeView
      loading={getPersonsGetAPI.loading}
      onChangePage={onChangePage}
      getData={getData}
      onAddPage={onAddPage}
    />
    </>
  );
};

export default HomeController;