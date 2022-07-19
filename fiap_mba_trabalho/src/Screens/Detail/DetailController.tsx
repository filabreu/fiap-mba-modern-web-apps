import React, { FC, useState, useEffect, useRef } from "react";
import { ProductDetail } from "../../Models/ProductDetail";
import DetailView from "./DetailView";
import { useRouter } from "next/router";
import axios from "axios";
import { UserInfo } from "../../Interfaces/UserInfo";
import Header from "../../Components/Header/Header";
import { useGeolocated } from "react-geolocated";

type iProps = {
  productDetail: ProductDetail
};

const DetailController: FC<iProps> = ({productDetail})=> {
  const [alignment, setAlignment] = useState<boolean>(false);  
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
    
      
      // {
      //   state:{
      //     lat: userCoordinates.current!.latitude
      //     lng: userCoordinates.current!.longitude
      //   }
      // }
  const router = useRouter();
  let infoSaved = null;
  let config: any;
  useEffect(() => {
    infoSaved = localStorage.getItem("userInfoToken") as String | null;
    setAlignment((productDetail.product.favorite));
    if (infoSaved !== "" && infoSaved !== null) {
      let userInfoLoaded: UserInfo = JSON.parse(infoSaved + "") as UserInfo;
      if (userInfoLoaded.token !== "" && userInfoLoaded.token !== undefined) {
        config = {
          headers: {
            Authorization: `Bearer ${userInfoLoaded.token}`,
          },
        };
      } else {
        router.push("/login");
      }
    }
  }, []);
  function onBackButton() {
    router.back();
  }
   
   const handleFavoriteChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: boolean,
  ) => {
      console.log("É " + newAlignment);  
      setAlignment(newAlignment);
      axios
    .post('https://fiap-reactjs-presencial.herokuapp.com/storeProducts/manageFavorite/',{"productID":productDetail.product._id}, config)
    .then(response => {
      console.log(response);
    });
  };
  
  return (
    <>
    <Header />
    <DetailView
      productDetail={productDetail}
      onBackButton={onBackButton}
      handleFavoriteChange={handleFavoriteChange}
      alignment={alignment}
    />
    </>
  );
};

export default DetailController;