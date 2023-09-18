import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./CoordinatesBR.css";
import { Text, Flex, Select } from "@mantine/core";
import EventMenu from "../../EventMenu/EventMenu";
import GreenIcon from "../../Images/leaf-green.png";
import ShadowIcon from "../../Images/leaf-shadow.png";

import {
  ApiContext,
  CheckBoxContext,
  FilterContext,
  FilterTextContext,
  SideBarContext,
  UserMadeContext,
} from "../MapLeaflet";
import MarkerCreation from "./MarkerCreation";

interface coordinatesBRInterface {
  icon: L.Icon;
}

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
  const [tempLat, setTempLat] = useState<L.LatLngExpression>([
    49.2606, -123.246,
  ]);
  const [userMade, setUserMade] = useState<eventInterface[]>([]);
  const checkBoxArray = useContext(CheckBoxContext);
  const sideBarContext = useContext(SideBarContext);
  const UserMade = useContext(UserMadeContext);
  const ApiMade = useContext(ApiContext);
  useEffect(() => {
    if (sideBarContext.view) {
      map.on("click", (e) => {
        setTempLat([e.latlng.lat, e.latlng.lng]);
      });
    }
  }, [sideBarContext.view]);

  useEffect(() => {
    map.panTo(tempLat);
    // map.flyTo(tempLat, 16);
  }, [tempLat]);

  // useEffect(() => {
  //   UserMade.setUserMade(userMade);
  // }, [userMade]);

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch(
        "https://pinnit-backend.onrender.com/events"
      );

      const currentProducts = await response.json();
      ApiMade.setUserMadeApi(currentProducts);
    }

    fetchEvents();
    fetchEvents();
  }, []);

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
    <MapContext.Provider value={{ userMade, setUserMade }}>
      <>
        <Marker
          position={[49.2606, -123.246]}
          icon={greenIcon}
          eventHandlers={{
            click(e) {
              map.panTo(e.target.getLatLng());
              map.flyTo(e.target.getLatLng(), 16);
            },
          }}
        >
          <Popup offset={L.point(0, -20)}>
            <Text className="map-main-pin">Welcome To Pinnit!</Text>
          </Popup>
        </Marker>

        {sideBarContext.view ? (
          <Marker position={tempLat as L.LatLngExpression} icon={icon}>
            <Popup offset={L.point(0, -15)}>
              <Flex direction={"column"} justify={"center"} align={"center"}>
                <EventMenu icon={icon} lat={tempLat} />
              </Flex>
            </Popup>
          </Marker>
        ) : (
          <div></div>
        )}

        {
          // userMade
          ApiMade.useMadeApi.map((event: any, index: number) => {
            // console.log(ApiMade.useMadeApi.length);
            return <MarkerCreation event={event} index={index} />;
          })
        }
      </>
    </MapContext.Provider>
  );
};

export default CoordinatesBR;

// <Marker
//   key={index}
//   position={event.lat}
//   icon={event.icon}
//   eventHandlers={{
//     click(e) {
//       map.panTo(e.target.getLatLng());
//       map.flyTo(e.target.getLatLng(), 16);
//     },
//   }}
// >
//   {" "}
//   <Popup offset={L.point(0, -20)}>
//     <Flex
//       direction={"column"}
//       justify={"center"}
//       align={"center"}
//     >
//       <Text className="coordinates-br-text">
//         {event.location}
//       </Text>
//       <Text className="coordinates-br-text">{event.desc}</Text>
//       <Text className="coordinates-br-text">{event.link}</Text>
//     </Flex>
//   </Popup>
// </Marker>
