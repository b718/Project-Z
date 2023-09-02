import React, { useContext, useEffect, useState } from "react";
import "./SideBar.css";
import { Button, Flex, MultiSelect, Text } from "@mantine/core";
import { FilterContext, LocateMeContext, SideBarContext } from "../Map/Map";
import { useMap } from "react-leaflet";
import L from "leaflet";
import GeoLocation from "../GeoLocation/GeoLocation";
import SideBarEvents from "../SideBarEvents/SideBarEvents";
import Clock from "react-live-clock";

const SideBar = () => {
  //   const map = useMap();
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

  const [mouseIn, setMouseIn] = useState<boolean>(false);
  const sideBarView = useContext(SideBarContext);
  const filterView = useContext(FilterContext);
  const locateView = useContext(LocateMeContext);

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
          <Flex direction={"column"} justify="center" align="center">
            <Clock
              format={"dddd, MMMM Mo"}
              ticking={true}
              className="side-bar-clock"
            />
            <Clock
              format={"YYYY, h:mm:ss A"}
              ticking={true}
              className="side-bar-clock"
            />
            {/* <div>
              <Button
                style={{ maxWidth: "6vw", marginTop: "1rem" }}
                onClick={() => {
                  sideBarView.setView(!sideBarView.view);
                }}
              ></Button>
              <Text style={{ maxWidth: "6vw", marginTop: "0.5rem" }} fz={"xs"}>
                Add: {sideBarView.view ? "On" : "Off"}
              </Text>
            </div> */}
            {/* <div>
              <Button
                style={{ maxWidth: "6vw", marginTop: "1rem" }}
                onClick={() => {
                  filterView.setFilter(!filterView.filter);
                }}
              ></Button>
              <Text style={{ maxWidth: "6vw", marginTop: "0.5rem" }} fz={"xs"}>
                Filter: {filterView.filter ? "On" : "Off"}
              </Text>
            </div> */}

            {/* <div>
              <Button
                style={{ maxWidth: "6vw", marginTop: "1rem" }}
                onClick={() => {
                  locateView.setLocateMe(!locateView.locateMe);
                }}
              ></Button>

              <Text style={{ maxWidth: "6vw", marginTop: "0.5rem" }} fz={"xs"}>
                Locate Me: {locateView.locateMe ? "On" : "Off"}
              </Text>
            </div> */}

            <SideBarEvents />
          </Flex>
        </div>
      </div>
    </>
  );
};

export default SideBar;
