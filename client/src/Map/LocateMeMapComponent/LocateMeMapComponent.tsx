import React, { useContext, useEffect, useState } from "react";
import "./LocateMeMapComponent.css";
import { LocateMeContext } from "../Map";
import { Center, Image } from "@mantine/core";
import LocateButtonImage from "../../Images/locate_me_button_two.jpg";
import { useMap } from "react-leaflet";
import L from "leaflet";
const LocateMeMapComponent = () => {
  const locateView = useContext(LocateMeContext);
  const [mouseIn, setMouseIn] = useState<boolean>(false);
  const map = useMap();
  useEffect(() => {
    // console.log(mouseIn);
    if (mouseIn) {
      L.DomEvent.disableClickPropagation(
        document.querySelector(
          ".locate-me-map-component, .locate-me-map-component-active"
        )!
      );
    } else {
      map.tap?.enable();
    }
  }, [mouseIn]);
  return (
    <div
      className={`locate-me-map-component${
        !locateView.locateMe ? "" : "-active"
      }`}
      onClick={() => {
        locateView.setLocateMe(!locateView.locateMe);
      }}
      onMouseEnter={() => {
        setMouseIn(true);
      }}
      onMouseLeave={() => {
        setMouseIn(false);
      }}
    >
      <Center>
        <Image
          src={LocateButtonImage}
          width={28}
          style={{ marginTop: "0.1rem" }}
        />
      </Center>
    </div>
  );
};

export default LocateMeMapComponent;
