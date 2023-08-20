import React, { createContext, useState } from "react";
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

const Map = () => {
  const [view, setView] = useState<boolean>(false);
  const [filter, setFilter] = useState(false);
  const [filterText, setFilterText] = useState("");

  const customIcon = new L.Icon({
    iconUrl: require("./Coordinates/Locationg.svg").default,
    iconSize: [40, 47],
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
    </>
  );
};

export default Map;
