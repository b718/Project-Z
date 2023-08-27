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
import Test from "../GeoLocation/GeoLocation";
import GeoLocation from "../GeoLocation/GeoLocation";
import DisplayDate from "../DisplayDate/DisplayDate";

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

interface locateMeInterface {
  locateMe: Boolean;
  setLocateMe: Function;
}

export const LocateMeContext = createContext<locateMeInterface>({
  locateMe: false,
  setLocateMe: () => {},
});

interface locateMePosInterface {
  locateMePos: L.LatLngExpression;
  setLocateMePos: Function;
}

export const LocateMePosContext = createContext<locateMePosInterface>({
  locateMePos: [0, 0],
  setLocateMePos: () => {},
});

interface eventInterface {
  lat: L.LatLngExpression;
  location: string;
  desc: string;
  title: string;
  link: string;
  endTime: string;
  startTime: string;
  going: number;
  total: number;
  tags: string[];
  icon: L.Icon;
}
interface userMadeContextInterface {
  userMade: eventInterface[];
  setUserMade: Function;
}

export const UserMadeContext = createContext<userMadeContextInterface>({
  userMade: [],
  setUserMade: () => {},
});

interface checkBoxContextInterface {
  checkBox: string[];
  setCheckBox: Function;
}

export const CheckBoxContext = createContext<checkBoxContextInterface>({
  checkBox: [],
  setCheckBox: () => {},
});

const Map = () => {
  const [view, setView] = useState<boolean>(false);
  const [filter, setFilter] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [iconText, setIconText] = useState("");
  const [locateMe, setLocateMe] = useState(false);
  const [locateMePos, setLocateMePos] = useState<L.LatLngExpression>([0, 0]);
  const [userMade, setUserMade] = useState<eventInterface[]>([]);
  const [checkBox, setCheckBox] = useState<string[]>([
    "official",
    "company",
    "faculty",
    "club",
    "ams",
    "frat",
  ]);

  let image = blueMarker;

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
      <CheckBoxContext.Provider value={{ checkBox, setCheckBox }}>
        <UserMadeContext.Provider value={{ userMade, setUserMade }}>
          <LocateMePosContext.Provider value={{ locateMePos, setLocateMePos }}>
            <LocateMeContext.Provider value={{ locateMe, setLocateMe }}>
              <IconTextContext.Provider value={{ iconText, setIconText }}>
                <FilterTextContext.Provider
                  value={{ filterText, setFilterText }}
                >
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
                          <DisplayDate />
                          <TileLayer
                            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          <Marker
                            position={[49.2606, -123.246]}
                            icon={greenIcon}
                          >
                            <Popup offset={L.point(0, -20)}>
                              <Text className="map-main-pin">
                                Welcome To Pinnit!
                              </Text>
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
                          <GeoLocation />
                        </MapContainer>
                      </div>
                    </SideBarContext.Provider>
                  </FilterContext.Provider>
                </FilterTextContext.Provider>
              </IconTextContext.Provider>
            </LocateMeContext.Provider>
          </LocateMePosContext.Provider>
        </UserMadeContext.Provider>
      </CheckBoxContext.Provider>
    </>
  );
};

export default Map;
