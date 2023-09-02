import React, { useContext, useEffect } from "react";
import { useMap } from "react-leaflet";
import { SideBarMoveContext } from "../Map/Map";

const SideBarMover = () => {
  const map = useMap();
  const sideBarMoveContext = useContext(SideBarMoveContext);

  useEffect(() => {
    // console.log(sideBarMoveContext.sideBarMoveLocation);
    map.panTo(sideBarMoveContext.sideBarMoveLocation);
    map.flyTo(sideBarMoveContext.sideBarMoveLocation, 18);

    // sideBarMoveContext.setSideBarMoveLocation([0, 0]);
  }, [sideBarMoveContext.sideBarMoveLocation]);
  return <div></div>;
};

export default SideBarMover;
