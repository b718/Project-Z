import React, { useContext, useEffect, useState } from "react";
import "./SideBarEvents.css";
import { MapContext } from "../../Map/Coordinates-BR/CoordinatesBR";
import { Button, Center, Flex, Image, Text } from "@mantine/core";
import {
  ApiContext,
  CheckBoxContext,
  LocateMeContext,
  LocateMePosContext,
  MoverContext,
  SideBarContext,
  SideBarMoveContext,
  UserMadeContext,
} from "../../Map/MapLeaflet";

const SideBarEvents = () => {
  const locateMePos = useContext(LocateMePosContext);
  const locateMe = useContext(LocateMeContext);
  const userMadeContext = useContext(UserMadeContext);
  const sideBarMoveContext = useContext(SideBarMoveContext);
  const sideBarView = useContext(SideBarContext);
  const checkBoxArray = useContext(CheckBoxContext);
  const moverContext = useContext(MoverContext);
  const apiContext = useContext(ApiContext);

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

  async function fetchEvents() {
    const response = await fetch("https://pinnit-backend.onrender.com/events");
    const currentProducts = await response.json();
    apiContext.setUserMadeApi(currentProducts);
  }

  return (
    <>
      <Text className="side-bar-events-main-title">Upcoming Events</Text>
      <Flex
        justify={"center"}
        align={"center"}
        gap={"md"}
        className="side-var-events-add-button-flex"
      >
        {/* {" "}
        <Button
          onClick={() => {
            sideBarView.setView(!sideBarView.view);
          }}
        ></Button>
        <Text className="side-bar-events-button-text" fz={"xs"}>
          Add: {sideBarView.view ? "On" : "Off"}
        </Text> */}
      </Flex>

      {/* <Flex
        justify={"center"}
        align={"center"}
        gap={"lg"}
        className="side-var-events-add-button-flex"
      >
        <Button
          onClick={() => {
            fetchEvents();
          }}
        ></Button>
        <Text className="side-bar-events-button-text" fz={"xs"}>
          Refresh
        </Text>
      </Flex> */}

      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        className="side-bar-events-main-flex-vertical"
      >
        {
          // userMadeContext.userMade
          apiContext.useMadeApi
            .filter((pin) => {
              return checkBoxArray.checkBox.includes(pin.tags[0]);
            })
            .map((pin, index) => {
              // const PinLatLng: Array<number> = pin.lat as Array<number>;
              // const PersonLatLng: Array<number> =
              //   locateMePos.locateMePos as Array<number>;

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
                    moverContext.setCurrentCount(moverContext.currentCount + 1);
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
                    {/* <Text className="side-bar-events-km-text side-bar-events-text-font">
                    event: {pin.tags}
                  </Text>
                  <Text className="side-bar-events-km-text side-bar-events-text-font">
                    {calculateKM(
                      PinLatLng[0],
                      PinLatLng[1],
                      PersonLatLng[0],
                      PersonLatLng[1]
                    )}
                    km away!
                  </Text> */}
                  </Flex>
                  <Flex
                    direction={"column"}
                    className="side-bar-events-event-details"
                  >
                    <Text className="side-bar-events-title">{pin.title} </Text>

                    <Text className="side-bar-events-time-to">
                      {convertTo12HourTime(pin.start_datetime)} to{" "}
                      {convertTo12HourTime(pin.end_datetime)}
                    </Text>
                    {/* <Text className="side-bar-events-time-to">
                    {pin.startDate} to {pin.endDate}
                  </Text> */}
                    <Text className="side-bar-events-location">
                      {pin.location}
                    </Text>
                    <Text className="side-bar-events-tags">{pin.host}</Text>
                  </Flex>
                </Flex>
              );
            })
        }
      </Flex>
    </>
  );
};

export default SideBarEvents;
