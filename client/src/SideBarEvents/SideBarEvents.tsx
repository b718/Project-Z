import React, { useContext, useEffect, useState } from "react";
import "./SideBarEvents.css";
import { MapContext } from "../Map/Coordinates-BR/CoordinatesBR";
import { Center, Flex, Image, Text } from "@mantine/core";
import L, { Point, icon } from "leaflet";
import {
  LocateMeContext,
  LocateMePosContext,
  UserMadeContext,
} from "../Map/Map";

interface eventInterface {
  lat: L.LatLngExpression;
  location: string;
  desc: string;
  title: string;
  link: string;
  endTime: string;
  startTime: string;
  going: number;
  total: number;
  tags: string[];
  icon: L.Icon;
}

const SideBarEvents = () => {
  const locateMePos = useContext(LocateMePosContext);
  const locateMe = useContext(LocateMeContext);
  const userMadeContext = useContext(UserMadeContext);

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

    return Math.trunc(c * r);
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
        direction={"column"}
        justify={"center"}
        align={"center"}
        className="side-bar-events-main-flex-vertical"
      >
        {userMadeContext.userMade.map((pin) => {
          const PinLatLng: Array<number> = pin.lat as Array<number>;
          const PersonLatLng: Array<number> =
            locateMePos.locateMePos as Array<number>;
          //   console.log(PinLatLng, PersonLatLng);

          return (
            <Flex
              direction={"row"}
              className="side-bar-events-main-flex"
              gap={"md"}
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
                <Text className="side-bar-events-km-text">
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
                className="side-bar-events-event-details"
              >
                <Text className="side-bar-events-title">
                  {pin.title} @ {pin.startTime}{" "}
                </Text>
                <Text className="side-bar-events-desc">{pin.desc}</Text>
                <Text className="side-bar-events-tags">Link: {pin.link}</Text>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </>
  );
};

export default SideBarEvents;
