import React, { createContext, useContext, useEffect, useState } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./CoordinatesBR.css";
import { Text, Flex, Select } from "@mantine/core";
import EventMenu from "../../EventMenu/EventMenu";
import { FilterContext, FilterTextContext, SideBarContext } from "../Map";
interface coordinatesBRInterface {
  icon: L.Icon;
}
interface eventInterface {
  lat: L.LatLngExpression;
  location: string;
  desc: string;
  going: number;
  total: number;
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
  const sideBarContext = useContext(SideBarContext);
  const FilterText = useContext(FilterTextContext);
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
                <Text>Temporary Marker.</Text>
                <Text>@</Text>
                <Text> {JSON.stringify(tempLat)}</Text>
                <EventMenu icon={icon} lat={tempLat} />
              </Flex>
            </Popup>
          </Marker>
        ) : (
          <div></div>
        )}

        {userMade
          .filter((event: any) => {
            return (
              event.location.toLowerCase().includes(FilterText.filterText) ||
              event.desc.toLowerCase().includes(FilterText.filterText)
            );
          })
          .map((event: any, index: number) => {
            return (
              <Marker
                position={event.lat}
                icon={icon}
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
