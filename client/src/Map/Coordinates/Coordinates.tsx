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
  const [latArray, setLatArray] = useState<L.LatLngExpression[]>([]);

  useEffect(() => {
    if (!map) return;
    const info = L.DomUtil.create("div", "legend");

    map.on("click", (e) => {
      let tempArray;

      if (latArray) {
        console.log("hit here");
        tempArray = (latArray: L.LatLngExpression[]) => [
          ...latArray,
          [e.latlng.lat, e.latlng.lng],
        ];
      } else {
        console.log("1st time");
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
