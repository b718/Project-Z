import React, { createContext, useEffect, useState } from "react";
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
import { Flex, Text } from "@mantine/core";
import SideBar from "../SideBar/SideBar";
import GreenIcon from "../Images/leaf-green.png";
import ShadowIcon from "../Images/leaf-shadow.png";
import Filter from "../Filter/Filter";
import blueMarker from "../Images/blue_marker.png";
import amsMarker from "../Images/pin-ams.png";
import clubMarker from "../Images/pin-club.png";
import companyMarker from "../Images/pin-company.png";
import facultyMarker from "../Images/pin-faculty.png";
import fratMarker from "../Images/pin-frat.png";
import officialMarker from "../Images/pin-official.png";

interface SideBarContext {
  view: boolean;
  setView: Function;
}

export const SideBarContext = createContext<SideBarContext>({
  view: false,
  setView: () => {},
});

interface filterContextInterface {
  filter: Boolean;
  setFilter: Function;
}

export const FilterContext = createContext<filterContextInterface>({
  filter: false,
  setFilter: () => {},
});

interface filterTextInterface {
  filterText: String;
  setFilterText: Function;
}

export const FilterTextContext = createContext<filterTextInterface>({
  filterText: "",
  setFilterText: () => {},
});

interface iconTextInterface {
  iconText: String;
  setIconText: Function;
}

export const IconTextContext = createContext<iconTextInterface>({
  iconText: "",
  setIconText: () => {},
});

const Map = () => {
  const [view, setView] = useState<boolean>(false);
  const [filter, setFilter] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [iconText, setIconText] = useState("");
  let image = blueMarker;

  useEffect(() => {
    if (iconText === "official") {
      image = officialMarker;
    } else if (iconText === "company") {
      image = companyMarker;
    } else if (iconText === "faculty") {
      image = facultyMarker;
    } else if (iconText === "club") {
      image = clubMarker;
    } else if (iconText === "ams") {
      image = amsMarker;
    } else if (iconText === "frat") {
      image = fratMarker;
    } else {
      image = blueMarker;
    }
  }, [iconText]);

  const customIcon = new L.Icon({
    iconUrl: image,
    iconSize: [20, 30],
  });

  const createClusterCustomIcon = function (cluster: MarkerCluster) {
    return L.divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: L.point(33, 33, true),
    });
  };

  var greenIcon = L.icon({
    iconUrl: GreenIcon,
    shadowUrl: ShadowIcon,
    iconSize: [38, 95], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });
  return (
    <>
      <IconTextContext.Provider value={{ iconText, setIconText }}>
        <FilterTextContext.Provider value={{ filterText, setFilterText }}>
          <FilterContext.Provider value={{ filter, setFilter }}>
            <SideBarContext.Provider value={{ view, setView }}>
              <SideBar />

              <div className="map-flex-center">
                <MapContainer
                  center={[49.2606, -123.246]}
                  zoom={16}
                  scrollWheelZoom={true}
                  className="map-main-container"
                >
                  <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[49.2606, -123.246]} icon={greenIcon}>
                    <Popup offset={L.point(0, -20)}>
                      <Text className="map-main-pin">Welcome To Pinnit!</Text>
                    </Popup>
                  </Marker>

                  <MarkerClusterGroup
                    chunkedLoading
                    iconCreateFunction={createClusterCustomIcon}
                  >
                    {/* <Coordinates icon={customIcon} /> */}
                    <CoordinatesBR icon={customIcon} />
                  </MarkerClusterGroup>

                  {/* <EventMenu icon={customIcon} /> */}
                  <LegendBL />
                  <Filter />
                </MapContainer>
              </div>
            </SideBarContext.Provider>
          </FilterContext.Provider>
        </FilterTextContext.Provider>
      </IconTextContext.Provider>
    </>
  );
};

export default Map;
