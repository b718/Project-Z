import React, { useState } from "react";
import { useEffect } from "react";
import { MapContainer, useMap, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

interface coordinateInterface {
  icon: L.Icon;
}
const Coordinates: React.FunctionComponent<coordinateInterface> = ({
  icon,
}) => {
  const map = useMap();
  const [lat, setLat] = useState<L.LatLngExpression>([0, 0]);
  const [latArray, setLatArray] = useState<L.LatLngExpression[]>([]);

  useEffect(() => {
    if (!map) return;
    const info = L.DomUtil.create("div", "legend");

    map.on("click", (e) => {
      info.textContent = JSON.stringify(e.latlng);
      setLat([e.latlng.lat, e.latlng.lng]);
      console.log(JSON.stringify(e.latlng));
      let tempArray;
      if (latArray) {
        console.log("hit here");

        tempArray = (latArray: L.LatLngExpression[]) => [
          ...latArray,
          [e.latlng.lat, e.latlng.lng],
        ];
      } else {
        tempArray = [[e.latlng.lat, e.latlng.lng]];
      }

      setLatArray(tempArray as L.LatLngExpression[]);
    });

    // map.addControl(new positon());
  }, [map]);

  useEffect(() => {
    console.log(latArray);
  }, [latArray]);

  return (
    <>
      {latArray.map((lat: any) => {
        return <Marker position={lat} icon={icon}></Marker>;
      })}
    </>
  );
};

export default Coordinates;
