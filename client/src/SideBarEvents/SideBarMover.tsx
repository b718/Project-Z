import React, { useContext, useEffect } from "react";
import { useMap } from "react-leaflet";
import { MarkerCreationContext, SideBarMoveContext } from "../Map/MapLeaflet";
import { LatLng } from "leaflet";

interface markerArrayInterface {
  LatLng: L.LatLngExpression;
  MarkerRef: any;
}

const SideBarMover = () => {
  const map = useMap();
  const sideBarMoveContext = useContext(SideBarMoveContext);
  const markerArray = useContext(MarkerCreationContext);

  useEffect(() => {
    markerArray.markerArray.forEach((marker: any) => {
      console.log(marker[0], sideBarMoveContext.sideBarMoveLocation);
      if (marker[0] == sideBarMoveContext.sideBarMoveLocation) {
        marker[1].current.openPopup(marker[0]);
      }
    });
    map.panTo(sideBarMoveContext.sideBarMoveLocation);
    map.flyTo(sideBarMoveContext.sideBarMoveLocation, 18);
    //time it out and then go back 1 zoom level.
    // map.flyTo(sideBarMoveContext.sideBarMoveLocation, 18);
  }, [sideBarMoveContext.sideBarMoveLocation]);
  return <div></div>;
};

export default SideBarMover;
