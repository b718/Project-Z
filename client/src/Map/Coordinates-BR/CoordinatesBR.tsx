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
  const [tempLat, setTempLat] = useState<L.LatLngExpression>([0, 0]);
  const [userMade, setUserMade] = useState<eventInterface[]>([]);

  const checkBoxArray = useContext(CheckBoxContext);
  const sideBarContext = useContext(SideBarContext);
  const FilterText = useContext(FilterTextContext);
  const UserMade = useContext(UserMadeContext);

  useEffect(() => {
    if (sideBarContext.view) {
      map.on("click", (e) => {
        setTempLat([e.latlng.lat, e.latlng.lng]);
      });
    }
    // else {
    //   map.on("click", (e) => {
    //     setTempLat([181, 91]);
    //   });
    // }
  }, [map, sideBarContext.view]);

  useEffect(() => {
    //https://pinnit-backend.onrender.com/events
    // [
    //   {
    //     "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //     "title": "string",
    //     "description": "string",
    //     "reference_link": "string",
    //     "host": "string",
    //     "latitude": 0,
    //     "longitude": 0,
    //     "tags": [
    //       "string"
    //     ],
    //     "start_datetime": "2023-09-04T11:36:39.454Z",
    //     "end_datetime": "2023-09-04T11:36:39.454Z"
    //   }
    // ]
    async function fetchEvents() {
      const response = await fetch(
        "https://pinnit-backend.onrender.com/events"
      );
      const currentProducts = await response.json();
      UserMade.setUserMade(currentProducts);
    }
    fetchEvents();
  }, []);
  useEffect(() => {
    UserMade.setUserMade(userMade);
  }, [userMade]);

  useEffect(() => {
    map.panTo(tempLat);
    map.flyTo(tempLat, 16);
  }, [tempLat]);

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
        {/* <div className="coordinatesbr-text-location">Click on Map!</div> */}

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

        {userMade
          .filter((event: any) => {
            return checkBoxArray.checkBox.includes(event.tags[0]);
          })
          .map((event: any, index: number) => {
            console.log(event);
            return <MarkerCreation event={event} index={index} />;
          })}
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
