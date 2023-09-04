import { Flex, Text } from "@mantine/core";
import L from "leaflet";
import React, { useContext, useEffect, useRef } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { MarkerCreationContext } from "../MapLeaflet";

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

interface markerCreationInterface {
  event: eventInterface;
  index: number;
}
const MarkerCreation: React.FC<markerCreationInterface> = ({
  event,
  index,
}) => {
  const map = useMap();
  const markerRef = useRef<any>();
  const markerArray = useContext(MarkerCreationContext);

  useEffect(() => {
    markerArray.setMarkerArray(() => {
      return [...markerArray.markerArray, [event.lat, markerRef]];
    });
  }, [markerRef]);

  return (
    <div>
      {" "}
      <Marker
        key={index}
        position={event.lat}
        icon={event.icon}
        ref={markerRef}
        eventHandlers={{
          click(e) {
            map.panTo(e.target.getLatLng());
            map.flyTo(e.target.getLatLng(), 16);
          },
        }}
      >
        {" "}
        <Popup offset={L.point(0, -20)}>
          <Flex direction={"column"} justify={"center"} align={"center"}>
            <Text className="coordinates-br-text">{event.location}</Text>
            <Text className="coordinates-br-text">{event.desc}</Text>
            <Text className="coordinates-br-text">{event.link}</Text>
          </Flex>
        </Popup>
      </Marker>
    </div>
  );
};

export default MarkerCreation;
