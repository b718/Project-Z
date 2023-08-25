import React, { createContext, useContext, useEffect, useState } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./CoordinatesBR.css";
import { Text, Flex, Select } from "@mantine/core";
import EventMenu from "../../EventMenu/EventMenu";
import {
  CheckBoxContext,
  FilterContext,
  FilterTextContext,
  SideBarContext,
  UserMadeContext,
} from "../Map";
interface coordinatesBRInterface {
  icon: L.Icon;
}
interface eventInterface {
  lat: L.LatLngExpression;
  location: string;
  desc: string;
  going: number;
  total: number;
  tags: string[];
  icon: L.Icon;
}

interface mapContextInterface {
  userMade: eventInterface[];
  setUserMade: Function;
}
export const MapContext = createContext<mapContextInterface>({
  userMade: [],
  setUserMade: () => {},
});

const CoordinatesBR: React.FunctionComponent<coordinatesBRInterface> = ({
  icon,
}) => {
  const map = useMap();
  const [tempLat, setTempLat] = useState<L.LatLngExpression>([0, 0]);
  const [userMade, setUserMade] = useState<eventInterface[]>([]);
  const checkBoxArray = useContext(CheckBoxContext);

  const sideBarContext = useContext(SideBarContext);
  const FilterText = useContext(FilterTextContext);
  const UserMade = useContext(UserMadeContext);
  useEffect(() => {
    map.on("click", function (e) {
      const markerPlace = document.querySelector(
        ".coordinatesbr-text-location"
      );
      markerPlace!.textContent =
        "Lat: " +
        e.latlng.lat.toFixed(3) +
        ", Lang: " +
        e.latlng.lng.toFixed(3);
    });
  }, []);

  useEffect(() => {
    if (sideBarContext.view) {
      map.on("click", (e) => {
        setTempLat([e.latlng.lat, e.latlng.lng]);
      });
    } else {
      map.on("click", (e) => {
        setTempLat([181, 91]);
      });
    }
  }, [map, sideBarContext.view]);

  useEffect(() => {
    UserMade.setUserMade(userMade);
  }, [userMade]);

  // useEffect(() => {
  //   console.log(userMade);
  // }, [userMade]);

  return (
    <MapContext.Provider value={{ userMade, setUserMade }}>
      <>
        <div className="coordinatesbr-text-location">Click on Map!</div>

        {sideBarContext.view ? (
          <Marker
            position={tempLat as L.LatLngExpression}
            icon={icon}
            eventHandlers={{
              click(e) {
                map.setView(e.target.getLatLng());
              },
            }}
          >
            <Popup offset={L.point(0, -20)}>
              <Flex direction={"column"} justify={"center"} align={"center"}>
                {/* <Text>Temporary Marker.</Text>
                <Text>@</Text>
                <Text> {JSON.stringify(tempLat)}</Text> */}
                <EventMenu icon={icon} lat={tempLat} />
              </Flex>
            </Popup>
          </Marker>
        ) : (
          <div></div>
        )}

        {userMade
          .filter((event: any) => {
            // console.log(event.icon);
            return (
              // event.location.toLowerCase().includes(FilterText.filterText) ||
              // event.desc.toLowerCase().includes(FilterText.filterText) ||
              // event.tags.includes(FilterText.filterText) ||
              checkBoxArray.checkBox.includes(event.tags[0])
            );
          })
          .map((event: any, index: number) => {
            // console.log(event.icon);
            return (
              <Marker
                position={event.lat}
                icon={event.icon}
                eventHandlers={{
                  click(e) {
                    map.setView(e.target.getLatLng());
                  },
                }}
              >
                {" "}
                <Popup offset={L.point(0, -20)}>
                  <Flex
                    direction={"column"}
                    justify={"center"}
                    align={"center"}
                  >
                    <Text>{event.location}</Text>
                    <Text>{event.desc}</Text>
                    <Text>
                      {event.going} / {event.total} are going.
                    </Text>
                    <Text>Tags: {event.tags}</Text>
                  </Flex>
                </Popup>
              </Marker>
            );
          })}
      </>
    </MapContext.Provider>
  );
};

export default CoordinatesBR;
