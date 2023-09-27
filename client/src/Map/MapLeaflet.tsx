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
import Filter from "../Filter/Filter";
import otherMarker from "../Images/pin-other-new.png";
import Test from "../GeoLocation/GeoLocation";
import GeoLocation from "../GeoLocation/GeoLocation";
import DisplayDate from "../DisplayDate/DisplayDate";
import SideBarMover from "../SideBar/SideBarEvents/SideBarMover";
import LocateMeMapComponent from "./LocateMeMapComponent/LocateMeMapComponent";
import FilterMapComponent from "./FilterMapComponent/FilterMapComponent";
import OpenCreateComponent from "./OpenCreateComponent/OpenCreateComponent";
import useWindowDimensions from "../Components/useWindowsDimensions";
import MobileCreateMenu from "../MobileCreateMenu/MobileCreateMenu";
import BottomSheetComponent from "../BottomSheetComponent/BottomSheetComponent";

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
  host: string;
  endTime: string;
  startTime: string;
  startDate: string;
  endDate: string;
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

interface sideBarMoveInterface {
  sideBarMoveLocation: L.LatLngExpression;
  setSideBarMoveLocation: Function;
}

export const SideBarMoveContext = createContext<sideBarMoveInterface>({
  sideBarMoveLocation: [0, 0],
  setSideBarMoveLocation: () => {},
});

interface markerArrayInterface {
  LatLng: L.LatLngExpression;
  MarkerRef: any;
}

interface markerCreationInterface {
  markerArray: markerArrayInterface[];
  setMarkerArray: Function;
}

export const MarkerCreationContext = createContext<markerCreationInterface>({
  markerArray: [],
  setMarkerArray: () => {},
});

interface moverInterface {
  currentCount: number;
  setCurrentCount: Function;
}

export const MoverContext = createContext<moverInterface>({
  currentCount: 0,
  setCurrentCount: () => {},
});

interface eventInterfaceApi {
  latlong: number[];
  title: string;
  description: string;
  location: string;
  start_datetime: string;
  end_datetime: string;
  timezone: string;
  tags: string[];
  host: string;
  icon: {
    iconUrl: string;
    iconSize: number[];
  };
}

interface apiContextInterface {
  useMadeApi: eventInterfaceApi[];
  setUserMadeApi: Function;
}

export const ApiContext = createContext<apiContextInterface>({
  useMadeApi: [],
  setUserMadeApi: () => {},
});

interface mobileOpenEventMenu {
  mobileOpen: Boolean;
  setMobileOpen: Function;
}

export const MobileOpenContext = createContext<mobileOpenEventMenu>({
  mobileOpen: false,
  setMobileOpen: () => {},
});

const MapLeaflet = () => {
  const [view, setView] = useState<boolean>(false);
  const [filter, setFilter] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [locateMe, setLocateMe] = useState(false);
  const [locateMePos, setLocateMePos] = useState<L.LatLngExpression>([0, 0]);
  const [sideBarMoveLocation, setSideBarMoveLocation] =
    useState<L.LatLngExpression>([49.2606, -123.246]);
  const [userMade, setUserMade] = useState<eventInterface[]>([]);
  const [checkBox, setCheckBox] = useState<string[]>([
    "official",
    "company",
    "faculty",
    "club",
    "other",
    "social",
  ]);
  const [useMadeApi, setUserMadeApi] = useState<eventInterfaceApi[]>([]);
  const [markerArray, setMarkerArray] = useState<markerArrayInterface[]>([]);
  const [currentCount, setCurrentCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { width, height } = useWindowDimensions();
  let image = otherMarker;
  const customIcon = new L.Icon({
    iconUrl: image,
    iconSize: [25, 30],
  });

  const createClusterCustomIcon = function (cluster: MarkerCluster) {
    return L.divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: L.point(33, 33, true),
    });
  };

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch(
        "https://pinnit-backend.onrender.com/events"
      );

      const currentProducts = await response.json();
      // setMarkerArray([]);
      setUserMadeApi(currentProducts);
    }

    fetchEvents();
    fetchEvents();
  }, []);

  return (
    <>
      <MobileOpenContext.Provider value={{ mobileOpen, setMobileOpen }}>
        <ApiContext.Provider value={{ useMadeApi, setUserMadeApi }}>
          <MoverContext.Provider value={{ currentCount, setCurrentCount }}>
            <MarkerCreationContext.Provider
              value={{ markerArray, setMarkerArray }}
            >
              <SideBarMoveContext.Provider
                value={{ sideBarMoveLocation, setSideBarMoveLocation }}
              >
                <CheckBoxContext.Provider value={{ checkBox, setCheckBox }}>
                  <UserMadeContext.Provider value={{ userMade, setUserMade }}>
                    <LocateMePosContext.Provider
                      value={{ locateMePos, setLocateMePos }}
                    >
                      <LocateMeContext.Provider
                        value={{ locateMe, setLocateMe }}
                      >
                        <FilterTextContext.Provider
                          value={{ filterText, setFilterText }}
                        >
                          <FilterContext.Provider value={{ filter, setFilter }}>
                            <SideBarContext.Provider value={{ view, setView }}>
                              {width > 700 ? <SideBar /> : <div></div>}

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

                                  <MarkerClusterGroup
                                    chunkedLoading
                                    iconCreateFunction={createClusterCustomIcon}
                                    removeOutsideVisibleBounds={false}
                                  >
                                    {/* <Coordinates icon={customIcon} /> */}
                                    <CoordinatesBR icon={customIcon} />
                                  </MarkerClusterGroup>

                                  {/* <EventMenu icon={customIcon} /> */}
                                  <div className="map-components-div">
                                    <SideBarMover />
                                    <LegendBL />
                                    <Filter />
                                    <MobileCreateMenu />
                                    <GeoLocation />
                                    <LocateMeMapComponent />
                                    <FilterMapComponent />
                                    {width > 700 ? (
                                      <div></div>
                                    ) : (
                                      <OpenCreateComponent />
                                    )}
                                  </div>

                                  {width > 700 ? (
                                    <div style={{ display: "none" }}></div>
                                  ) : useMadeApi.length > 0 ? (
                                    <BottomSheetComponent />
                                  ) : (
                                    <div style={{ display: "none" }}></div>
                                  )}
                                </MapContainer>
                              </div>
                            </SideBarContext.Provider>
                          </FilterContext.Provider>
                        </FilterTextContext.Provider>
                      </LocateMeContext.Provider>
                    </LocateMePosContext.Provider>
                  </UserMadeContext.Provider>
                </CheckBoxContext.Provider>
              </SideBarMoveContext.Provider>
            </MarkerCreationContext.Provider>
          </MoverContext.Provider>
        </ApiContext.Provider>
      </MobileOpenContext.Provider>
    </>
  );
};

export default MapLeaflet;
