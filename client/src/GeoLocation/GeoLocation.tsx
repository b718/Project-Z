import L from "leaflet";
import React, { useContext, useEffect, useState } from "react";
import { Circle, Marker, Popup, useMap } from "react-leaflet";
import PersonIcon from "../Images/person.png";
import BlueDotPerson from "../Images/blue_dot_person.png";
import { LocateMeContext, LocateMePosContext } from "../Map/MapLeaflet";
import "./GeoLocation.css";

const GeoLocation = () => {
  const [position, setPosition] = useState<L.LatLngExpression>([0, 0]);
  const locateMe = useContext(LocateMeContext);
  const locateMePos = useContext(LocateMePosContext);
  const map = useMap();
  const visitorIcon = new L.Icon({
    iconUrl: BlueDotPerson,
    iconSize: [25, 25],
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
    <div>
      <Circle
        center={position}
        weight={2}
        color={"#5bb9e7"}
        fillColor={"#5bb9e7"}
        fillOpacity={0.1}
        radius={250}
        className="geo-location-marker"
      >
        <Marker position={position} icon={visitorIcon}>
          <Popup offset={L.point(0, -10)} className="geo-location-here-text">
            You Are Here!
          </Popup>
        </Marker>
      </Circle>
    </div>
  );
};

export default GeoLocation;
