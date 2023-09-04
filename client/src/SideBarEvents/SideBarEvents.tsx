import React, { useContext, useEffect, useState } from "react";
import "./SideBarEvents.css";
import { MapContext } from "../Map/Coordinates-BR/CoordinatesBR";
import { Button, Center, Flex, Image, Text } from "@mantine/core";
import L, { Point, icon } from "leaflet";
import {
  LocateMeContext,
  LocateMePosContext,
  SideBarContext,
  SideBarMoveContext,
  UserMadeContext,
} from "../Map/MapLeaflet";

const SideBarEvents = () => {
  const locateMePos = useContext(LocateMePosContext);
  const locateMe = useContext(LocateMeContext);
  const userMadeContext = useContext(UserMadeContext);
  const sideBarMoveContext = useContext(SideBarMoveContext);
  const sideBarView = useContext(SideBarContext);

  const calculateKM = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    // console.log(lat1, lon1, lat2, lon2);
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));
    let r = 6371;

    return (c * r).toFixed(2);
  };

  //   useEffect(() => {
  //     console.log("test");
  //     console.log(locateMePos.locateMePos);
  //     console.log(userMadeContext.userMade);
  //   }, [userMadeContext, locateMePos]);

  return (
    <>
      <Text className="side-bar-events-main-title">Upcoming Events</Text>
      <Flex
        justify={"center"}
        align={"center"}
        gap={"md"}
        className="side-var-events-add-button-flex"
      >
        {" "}
        <Button
          onClick={() => {
            sideBarView.setView(!sideBarView.view);
          }}
        ></Button>
        <Text className="side-bar-events-button-text" fz={"xs"}>
          Add: {sideBarView.view ? "On" : "Off"}
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        className="side-bar-events-main-flex-vertical"
      >
        {userMadeContext.userMade.map((pin) => {
          const PinLatLng: Array<number> = pin.lat as Array<number>;
          const PersonLatLng: Array<number> =
            locateMePos.locateMePos as Array<number>;
          return (
            <Flex
              direction={"row"}
              className="side-bar-events-main-flex"
              gap={"md"}
              onClick={() => {
                sideBarMoveContext.setSideBarMoveLocation(pin.lat);
              }}
            >
              <Flex
                direction={"column"}
                className="side-bar-events-pin-color"
                align={"center"}
                justify={"center"}
              >
                <Center>
                  <Image src={pin.icon.options.iconUrl} width={30} />
                </Center>
                <Text className="side-bar-events-km-text side-bar-events-text-font">
                  {calculateKM(
                    PinLatLng[0],
                    PinLatLng[1],
                    PersonLatLng[0],
                    PersonLatLng[1]
                  )}
                  km away!
                </Text>
              </Flex>
              <Flex
                direction={"column"}
                className="side-bar-events-event-details side-bar-events-text-font"
              >
                <Text className="side-bar-events-title side-bar-events-text-font">
                  {pin.title}{" "}
                </Text>

                <Text className="side-bar-events-time-to">
                  {pin.startTime} to {pin.endTime}
                </Text>
                <Text className="side-bar-events-location side-bar-events-text-font">
                  Location: {pin.location}
                </Text>
                <Text className="side-bar-events-tags side-bar-events-text-font">
                  Link: {pin.link}
                </Text>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </>
  );
};

export default SideBarEvents;
