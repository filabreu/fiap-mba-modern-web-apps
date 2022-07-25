import { FC } from "react";
import { Map, GoogleApiWrapper, GoogleAPI, IMapProps } from "google-maps-react";

export interface GoogleMapsMarkerInterface {
  lat: number;
  lng: number;
  title: string;
  info: string;
  draggable?: boolean;
  onDragEnd?: (latitude: number | undefined, longitude: number | undefined) => any;
}
export interface GoogleMapsInterface {
  markers: GoogleMapsMarkerInterface[];
  draggable: boolean;
  zoom: number;
  initialCenter: {
    lat: number;
    lng: number;
  };
  style?: any;
  containerStyle?: any;
  google: GoogleAPI;
}

const GoogleMaps: FC<GoogleMapsInterface> = ({ markers, draggable, zoom, initialCenter, style, containerStyle}) => {
  let currentMarkers:google.maps.Marker[] = []

  const onMapLoad = (mapProps?: IMapProps, map?: google.maps.Map) => {
    if (!map) return;

    const infoWindow = new google.maps.InfoWindow({
      content: "",
    });

    currentMarkers.forEach((marker: google.maps.Marker) => {
      marker.setMap(null)
    })
    currentMarkers = []

    markers.forEach((marker: GoogleMapsMarkerInterface) => {      
      let gmMarker = new google.maps.Marker({
        position: { lat: marker.lat, lng: marker.lng },        
        title: marker.title,
        map,
        draggable: marker.draggable 
      });

      gmMarker.addListener("click", () => {

        infoWindow.setContent(marker.info)
        infoWindow.open({
          anchor: gmMarker,
          map,
          shouldFocus: true,
        });
      });

      gmMarker.addListener("dragend", (e: google.maps.MapMouseEvent) => {
        if (marker.onDragEnd) {
          marker.onDragEnd!(e.latLng?.lat(), e.latLng?.lng());
        }
      });

      currentMarkers.push(gmMarker);
    });
  };


  return (
    <Map
      style={style}
      containerStyle={containerStyle}
      draggable={draggable}
      zoom={zoom}
      onReady={onMapLoad}
      initialCenter={initialCenter}
      google={google}
    />
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY + "",
})(GoogleMaps);
