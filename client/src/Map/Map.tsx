import React from "react";
import "./Map.css";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMapEvents,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import Coordinates from "./Coordinates/Coordinates";
import { MarkerCluster, icon } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LegendBL from "./Legend-BL/LegendBL";
import CoordinatesBR from "./Coordinates-BR/CoordinatesBR";
import EventMenu from "../EventMenu/EventMenu";

const Map = () => {
  const customIcon = new L.Icon({
    iconUrl: require("./Coordinates/Locationg.svg").default,
    iconSize: new L.Point(40, 47),
  });

  // const createClusterCustomIcon = function (cluster: MarkerCluster) {
  //   return L.divIcon({
  //     html: `<span>${cluster.getChildCount()}</span>`,
  //     className: "custom-marker-cluster",
  //     iconSize: L.point(33, 33, true),
  //   });
  // };

  const createClusterCustomIcon = function (cluster: MarkerCluster) {
    return L.divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: L.point(33, 33, true),
    });
  };
  return (
    <>
      <div className="map-flex-center">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
          className="map-main-container"
        >
          <TileLayer
            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]} icon={customIcon}>
            <Popup offset={L.point(0, -20)}>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>

          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon}
          >
            <Coordinates icon={customIcon} />
          </MarkerClusterGroup>
          <LegendBL />
          <CoordinatesBR icon={customIcon} />
          <EventMenu icon={customIcon} />
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
