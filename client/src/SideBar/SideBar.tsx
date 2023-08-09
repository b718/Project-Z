import React, { useContext, useEffect, useState } from "react";
import "./SideBar.css";
import { Button } from "@mantine/core";
import { SideBarContext } from "../Map/Map";
import { useMap } from "react-leaflet";
import L from "leaflet";
const SideBar = () => {
  //   const map = useMap();
  const [mouseIn, setMouseIn] = useState<boolean>(false);
  const sideBarView = useContext(SideBarContext);
  //   useEffect(() => {
  //     console.log(mouseIn);
  //     if (mouseIn) {
  //       L.DomEvent.disableClickPropagation(
  //         document.querySelector(".eventmenu-main-menu")!
  //       );
  //     } else {
  //       map.tap?.enable();
  //     }
  //   }, [mouseIn]);
  return (
    <>
      <div
        className="side-bar-left"
        onMouseEnter={() => {
          setMouseIn(true);
        }}
        onMouseLeave={() => {
          setMouseIn(false);
        }}
      >
        <div className="side-bar-left-inner">
          <Button
            style={{ maxWidth: "3vw", marginTop: "1rem" }}
            onClick={() => {
              sideBarView.setView(!sideBarView.view);
            }}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
