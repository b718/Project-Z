import React, { useContext, useEffect, useState } from "react";
import {
  ApiContext,
  CheckBoxContext,
  MobileOpenContext,
  MoverContext,
  SideBarContext,
  SideBarMoveContext,
} from "../Map/MapLeaflet";
import { Button, Center, Flex, Image, Text } from "@mantine/core";
import "./MobileCreateMenu.css";
import { useMap } from "react-leaflet";
import L from "leaflet";
const MobileCreateMenu = () => {
  const mobileOpen = useContext(MobileOpenContext);
  const sideBarView = useContext(SideBarContext);
  const [mouseIn, setMouseIn] = useState<boolean>(false);
  const apiContext = useContext(ApiContext);
  const checkBoxArray = useContext(CheckBoxContext);
  const sideBarMoveContext = useContext(SideBarMoveContext);
  const moverContext = useContext(MoverContext);
  const map = useMap();

  function convertTo12HourTime(dateTimeString: string): string {
    if (dateTimeString == "1999-09-01T22:08:00") {
      return "N/A";
    }

    const date = new Date(dateTimeString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    // Create options for formatting
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    // Format the date to 12-hour time
    const formattedTime = date.toLocaleTimeString([], options);

    return formattedTime;
  }

  useEffect(() => {
    console.log(mouseIn);
    if (mouseIn) {
      map.scrollWheelZoom.disable();

      L.DomEvent.disableClickPropagation(
        document.querySelector(
          ".mobile-create-menu, .mobile-create-menu-events-button-text, .side-bar-events-main-flex-vertical, .side-bar-events-main-flex, .side-bar-events-pin-color, .side-bar-events-event-details, .side-bar-events-title, .side-bar-events-time-to, .side-bar-events-location, .side-bar-events-tags"
        )!
      );
    } else {
      map.scrollWheelZoom.enable();
      map.tap?.enable();
    }
  }, [mouseIn]);

  return (
    <div>
      {mobileOpen.mobileOpen ? (
        <div
          className="mobile-create-menu"
          onMouseEnter={() => {
            setMouseIn(true);
          }}
          onMouseLeave={() => {
            setMouseIn(false);
          }}
        >
          <Flex justify={"center"} align={"center"} gap={"md"}>
            {" "}
            <Button
              onClick={() => {
                sideBarView.setView(!sideBarView.view);
              }}
            ></Button>
            <Text className="mobile-create-menu-events-button-text" fz={"xs"}>
              Add: {sideBarView.view ? "On" : "Off"}
            </Text>
          </Flex>

          <Flex
            direction={"column"}
            justify={"center"}
            align={"center"}
            className="side-bar-events-main-flex-vertical"
          >
            {apiContext.useMadeApi
              .filter((pin) => {
                return checkBoxArray.checkBox.includes(pin.tags[0]);
              })
              .map((pin, index) => {
                const latlng = pin.latlong as L.LatLngExpression;
                return (
                  <Flex
                    key={index}
                    direction={"row"}
                    className="side-bar-events-main-flex"
                    gap={"md"}
                    onClick={() => {
                      // console.log("latong" + pin.latlong);
                      sideBarMoveContext.setSideBarMoveLocation(latlng);
                      moverContext.setCurrentCount(
                        moverContext.currentCount + 1
                      );
                    }}
                  >
                    <Flex
                      direction={"column"}
                      className="side-bar-events-pin-color"
                      align={"center"}
                      justify={"center"}
                    >
                      <Center>
                        <Image src={pin.icon.iconUrl} width={30} />
                      </Center>
                    </Flex>
                    <Flex
                      direction={"column"}
                      className="side-bar-events-event-details"
                    >
                      <Text className="side-bar-events-title">
                        {pin.title}{" "}
                      </Text>

                      <Text className="side-bar-events-time-to">
                        {convertTo12HourTime(pin.start_datetime)} to{" "}
                        {convertTo12HourTime(pin.end_datetime)}
                      </Text>

                      <Text className="side-bar-events-location">
                        {pin.location}
                      </Text>
                      <Text className="side-bar-events-tags">{pin.host}</Text>
                    </Flex>
                  </Flex>
                );
              })}
          </Flex>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MobileCreateMenu;
