import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L, { Control } from "leaflet";
import "./LegendBL.css";

const LegendBL = () => {
  return (
    <div className="legendbl-div-for-click">
      When Add is On, Single Click to spawn a marker.
    </div>
  );
};

export default LegendBL;
