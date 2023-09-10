import React, { useContext, useEffect } from "react";
import { useMap } from "react-leaflet";
import {
  ApiContext,
  MarkerCreationContext,
  MoverContext,
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
  const moverCount = useContext(MoverContext);

  const mover = () => {
    // console.log("array");
    // console.log(markerArray.markerArray);
    // console.log(sideBarMoveContext.sideBarMoveLocation);
    markerArray.markerArray.forEach((marker: any) => {
      // console.log(marker[0], sideBarMoveContext.sideBarMoveLocation);
      // console.log(marker[1]);
      let latlngexpression = sideBarMoveContext.sideBarMoveLocation;
      let array = latlngexpression as Array<number>;
      if (marker[0][0] == array[0] && marker[0][1] == array[1]) {
        // console.log(marker[1]);
        // console.log("inside");
        // console.log(marker[0]);
        let lng = marker[0] as L.LatLng;
        marker[1].current.openPopup(lng);
        map.panTo(sideBarMoveContext.sideBarMoveLocation);
        map.flyTo(sideBarMoveContext.sideBarMoveLocation, 18);
      }
    });
  };
  useEffect(() => {
    //time it out and then go back 1 zoom level.
    // map.flyTo(sideBarMoveContext.sideBarMoveLocation, 18);
    // if (sideBarMoveContext.sideBarMoveLocation != [0, 0]) {
    mover();
    // }
    // let x = [0, 0] as L.LatLngExpression;

    // sideBarMoveContext.sideBarMoveLocation(x);
  }, [sideBarMoveContext.sideBarMoveLocation, moverCount.currentCount]);
  return <div></div>;
};

export default SideBarMover;
