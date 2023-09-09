import { Flex, Text } from "@mantine/core";
import L, { PointExpression } from "leaflet";
import React, { useContext, useEffect, useRef } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { ApiContext, MarkerCreationContext } from "../MapLeaflet";

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
  reference_link: string;
  icon: {
    iconUrl: string;
    iconSize: number[];
  };
}

interface markerCreationInterface {
  event: eventInterfaceApi;
  index: number;
}
const MarkerCreation: React.FC<markerCreationInterface> = ({
  event,
  index,
}) => {
  const map = useMap();
  const markerRef = useRef<any>();
  const markerArray = useContext(MarkerCreationContext);
  const apiContext = useContext(ApiContext);

  let customIcon = new L.Icon({
    iconUrl: event.icon.iconUrl,
    iconSize: event.icon.iconSize as PointExpression,
  });

  let latlng = event.latlong as L.LatLngExpression;

  useEffect(() => {
    markerArray.setMarkerArray(() => [
      ...markerArray.markerArray,
      [latlng, markerRef],
    ]);
    console.log(markerArray.markerArray);
  }, [apiContext.useMadeApi]);

  return (
    <div>
      {" "}
      <Marker
        key={index}
        position={event.latlong as L.LatLngExpression}
        icon={customIcon}
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
          <Flex
            direction={"column"}
            justify={"center"}
            align={"center"}
            className="coordinates-br-flex"
          >
            <Text className="coordinates-br-title">{event.title}</Text>
            <Text className="coordinates-br-location">{event.location}</Text>
            <Text className="coordinates-br-text">{event.description}</Text>

            {event.reference_link.length > 0 ? (
              <a
                className="coordinates-br-a"
                target="_blank"
                href={`${event.reference_link}`}
                // Link
              >
                {event.reference_link}
              </a>
            ) : (
              <Text className="coordinates-br-a">No Link</Text>
            )}
          </Flex>
        </Popup>
      </Marker>
    </div>
  );
};

export default MarkerCreation;
