import React, { useContext, useEffect } from "react";
import { useMap } from "react-leaflet";
import {
  MarkerCreationContext,
  SideBarMoveContext,
} from "../../Map/MapLeaflet";
import { LatLng } from "leaflet";

interface markerArrayInterface {
  LatLng: L.LatLngExpression;
  MarkerRef: any;
}

const SideBarMover = () => {
  const map = useMap();
  const sideBarMoveContext = useContext(SideBarMoveContext);
  const markerArray = useContext(MarkerCreationContext);

  const mover = () => {
    markerArray.markerArray.forEach((marker: any) => {
      console.log(marker[0], sideBarMoveContext.sideBarMoveLocation);
      if (marker[0] == sideBarMoveContext.sideBarMoveLocation) {
        marker[1].current.openPopup(marker[0]);
      }
    });
    map.panTo(sideBarMoveContext.sideBarMoveLocation);
    map.flyTo(sideBarMoveContext.sideBarMoveLocation, 18);
  };
  useEffect(() => {
    //time it out and then go back 1 zoom level.
    // map.flyTo(sideBarMoveContext.sideBarMoveLocation, 18);
    // if (sideBarMoveContext.sideBarMoveLocation != [0, 0]) {
    mover();
    // }
    // let x = [0, 0] as L.LatLngExpression;

    // sideBarMoveContext.sideBarMoveLocation(x);
  }, [sideBarMoveContext.sideBarMoveLocation]);
  return <div></div>;
};

export default SideBarMover;
