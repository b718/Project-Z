import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L, { Control } from "leaflet";
import "./LegendBL.css";

const LegendBL = () => {
  const map = useMap();

  useEffect(() => {
    const legend = new Control({ position: "bottomleft" });

    legend.onAdd = function () {
      let divArray = [];
      let legendDivBottomLeft = L.DomUtil.create(
        "div",
        "legendbl-div-for-click"
      );
      const doubleClickText = "Single Click To Reveal Lng and Lat.";
      const singleClickTest = "Double Click To Spawn a Marker.";
      let textArray = [singleClickTest, doubleClickText];

      for (let i = 0; i < textArray.length; i++) {
        divArray.push("<b>" + textArray[i] + "</b> ");
      }
      legendDivBottomLeft.innerHTML = divArray[0] + divArray[1];
      return legendDivBottomLeft;
    };

    legend.addTo(map);
  }, []);

  return null;
};

export default LegendBL;
