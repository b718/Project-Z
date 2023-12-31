import React, { useContext, useEffect } from "react";
import { Popup, useMap } from "react-leaflet";
import {
  ApiContext,
  CheckBoxContext,
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
    console.log(markerArray);
    markerArray.markerArray.forEach((marker: any) => {
      let latlngexpression = sideBarMoveContext.sideBarMoveLocation;
      let array = latlngexpression as Array<number>;
      let popUp = marker[1].current;
      // console.log(marker[1]);
      if (marker[0][0] === array[0] && marker[0][1] === array[1]) {
        console.log(marker[1]);
        try {
          popUp.openOn(map);
          map.panTo(sideBarMoveContext.sideBarMoveLocation);
          map.flyTo(sideBarMoveContext.sideBarMoveLocation, 18);
        } catch (error) {
          console.log("click refresh");
        }
      }
    });
  };

  //asdas
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
