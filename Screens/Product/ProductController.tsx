import React, { FC, useMemo, useState, useEffect, useRef } from "react";
import useAPI, {
  useApiReturnType,
} from "../../Services/APIs/Common/useAPI";
import getProduct from "../../Services/APIs/Persons/Persons";
import ProductView from "./ProductView";
import { Product } from "../../Models/ProductDetail";
import { QueryResult } from "material-table";
import { useRouter } from "next/router";
import Header from "../../Components/Header/Header";
import { UserInfo } from "../../Interfaces/UserInfo";
import { useGeolocated } from "react-geolocated";
import { LocationProps } from "../Detail/DetailController";

type iProps = {
  infob: any;
};

const getUserToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("userInfoToken") as string | null;
  }
}

const ProductController: FC<iProps> = ({ infob }) => {
  const getProductAPI: useApiReturnType = useAPI(getProduct);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const router = useRouter();
  const userCoordinates = useRef<GeolocationCoordinates | null>(null);
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

  const userToken = useMemo(() => getUserToken(), []);

  useEffect(() => {
    setLoading(true);

    if (userToken && userToken !== "" && userToken !== null) {
      let userInfoLoaded: UserInfo = JSON.parse(userToken) as UserInfo;

      if (userInfoLoaded.token !== "" && userInfoLoaded.token !== undefined) {
        
      } else {
        router.push("/login");
      }
    }
    return(setLoading(true));
  }, []);

  const onChangePage = (product: Product) => {
    let position: LocationProps = {
      lat: String(userCoordinates.current!.latitude),
      lng: String(userCoordinates.current!.longitude),
    };

    router.push({
      pathname: "detail/" + product._id,
      query: position,
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
      
      resolve({
        data: infob.products,
        page: infob.page - 1,
        totalCount: infob.totalItems,
      });
      
      setData(data);
      setLoading(false);
    });
  };

  return (
    <>
      <Header />
      <ProductView
        loading={loading}
        onChangePage={onChangePage}
        getData={getData}
      />
    </>
  );
};

export default ProductController;
