import L from "leaflet";
import React, { useContext, useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import PersonIcon from "../Images/person.png";
import { LocateMeContext, LocateMePosContext } from "../Map/Map";

const GeoLocation = () => {
  const [position, setPosition] = useState<L.LatLngExpression>([0, 0]);
  const locateMe = useContext(LocateMeContext);
  const locateMePos = useContext(LocateMePosContext);
  const map = useMap();
  const visitorIcon = new L.Icon({
    iconUrl: PersonIcon,
    iconSize: [50, 50],
  });

  useEffect(() => {
    if (locateMe.locateMe) {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        locateMePos.setLocateMePos([e.latlng.lat, e.latlng.lng]);
        map.flyTo(e.latlng, map.getZoom());
      });
    }
  }, [locateMe.locateMe]);

  return position === null ? null : (
    <Marker position={position} icon={visitorIcon}>
      <Popup offset={L.point(0, -10)}>You Are Here!</Popup>
    </Marker>
  );
};

export default GeoLocation;
