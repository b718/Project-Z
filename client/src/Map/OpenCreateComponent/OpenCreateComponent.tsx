import { Center, Image } from "@mantine/core";
import L from "leaflet";
import React, { useContext, useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import MenuIcon from "../../Images/menu_icon.png";
import { MobileOpenContext, SideBarContext } from "../MapLeaflet";
import "./OpenCreateComponent.css";
const OpenCreateComponent = () => {
  const mobileOpen = useContext(MobileOpenContext);
  const [mouseIn, setMouseIn] = useState<boolean>(false);
  const sideBarView = useContext(SideBarContext);

  const map = useMap();
  useEffect(() => {
    // console.log(mouseIn);
    if (mouseIn) {
      L.DomEvent.disableClickPropagation(
        document.querySelector(
          ".mobile-open-map-component, .mobile-open-map-component-active"
        )!
      );
    } else {
      map.tap?.enable();
    }
  }, [mouseIn]);

  return (
    <div
      className={`mobile-open-map-component${
        !mobileOpen.mobileOpen ? "" : "-active"
      }`}
      onClick={() => {
        mobileOpen.setMobileOpen(!mobileOpen.mobileOpen);
        sideBarView.setView(false);
      }}
      onMouseEnter={() => {
        setMouseIn(true);
      }}
      onMouseLeave={() => {
        setMouseIn(false);
      }}
    >
      <Center>
        <Image src={MenuIcon} width={25} style={{ marginTop: "0.2rem" }} />
      </Center>
    </div>
  );
};

export default OpenCreateComponent;
