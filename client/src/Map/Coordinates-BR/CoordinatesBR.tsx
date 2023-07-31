import React, { useEffect, useState } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import "./CoordinatesBR.css";
import { Text, Flex } from "@mantine/core";
interface coordinatesBRInterface {
  icon: L.Icon;
}

const CoordinatesBR: React.FunctionComponent<coordinatesBRInterface> = ({
  icon,
}) => {
  const map = useMap();
  const [tempLat, setTempLat] = useState<L.LatLngExpression>([0, 0]);

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
    map.on("click", (e) => {
      setTempLat([e.latlng.lat, e.latlng.lng]);
    });
  }, [map]);

  return (
    <>
      <Marker
        position={tempLat as L.LatLngExpression}
        icon={icon}
        eventHandlers={{
          click(e) {
            map.setView(e.target.getLatLng());
          },
        }}
      >
        <Popup>
          <Flex direction={"column"} justify={"center"} align={"center"}>
            <Text>Temporary Marker.</Text>
            <Text>@</Text>
            <Text> {JSON.stringify(tempLat)}</Text>
          </Flex>
        </Popup>
      </Marker>
      <div className="coordinatesbr-text-location">Click on Map!</div>
    </>
  );
};

export default CoordinatesBR;
