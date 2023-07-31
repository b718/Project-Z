import React, { useState } from "react";
import { useEffect } from "react";
import { MapContainer, useMap, TileLayer, Marker, Popup } from "react-leaflet";
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
    map.on("dblclick", (e) => {
      setLatArray((latArray) => [...latArray, [e.latlng.lat, e.latlng.lng]]);
    });
  }, [map]);

  useEffect(() => {
    console.log(latArray);
  }, [latArray]);

  return (
    <>
      {latArray.map((lat: any, index: number) => {
        if (index % 2 == 0) {
          return (
            <Marker
              position={lat}
              icon={icon}
              eventHandlers={{
                click(e) {
                  map.setView(e.target.getLatLng());
                },
              }}
            >
              {" "}
              <Popup offset={L.point(0, -20)}>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          );
        }
      })}
    </>
  );
};

export default Coordinates;
