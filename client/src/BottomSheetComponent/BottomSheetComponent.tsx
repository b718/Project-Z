import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import {
  ApiContext,
  CheckBoxContext,
  MoverContext,
  SideBarMoveContext,
} from "../Map/MapLeaflet";
import { Center, Flex, Image, Text } from "@mantine/core";
import "./BottomSheetComponent.css";
import L from "leaflet";
import Sheet, { SheetRef } from "react-modal-sheet";

// import BottomSheet from "@gorhom/bottom-sheet";

const BottomSheetComponent = () => {
  const apiContext = useContext(ApiContext);
  const checkBoxArray = useContext(CheckBoxContext);
  const sideBarMoveContext = useContext(SideBarMoveContext);
  const moverContext = useContext(MoverContext);
  const map = useMap();
  const [mouseIn, setMouseIn] = useState<boolean>(false);
  const [isOpen, setOpen] = useState(true);
  const ref = useRef<SheetRef>();

  const querySelectorString =
    ".bottom-sheet-component-tags, .bottom-sheet-component-location, .bottom-sheet-component-time-to, .bottom-sheet-component-events-main-flex-vertical, .bottom-sheet-component, .bottom-sheet-component-events-main-flex, .bottom-sheet-component-events-pin-color, .bottom-sheet-component-event-details, .bottom-sheet-component-title";
  useEffect(() => {
    if (mouseIn) {
      map.scrollWheelZoom.disable();
      L.DomEvent.disableClickPropagation(
        document.querySelector(querySelectorString)!
      );
    } else {
      map.scrollWheelZoom.enable();
      map.tap?.enable();
    }
  }, [mouseIn]);

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

  return (
    <div>
      <div
      // className="bottom-sheet-component"
      // onMouseEnter={() => {
      //   setMouseIn(true);
      // }}
      // onMouseLeave={() => {
      //   setMouseIn(false);
      // }}
      >
        {/* <Flex
          direction={"column"}
          justify={"center"}
          align={"center"}
          className="bottom-sheet-component-events-main-flex-vertical"
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
                  className="bottom-sheet-component-events-main-flex"
                  gap={"md"}
                  onClick={() => {
                    sideBarMoveContext.setSideBarMoveLocation(latlng);
                    moverContext.setCurrentCount(moverContext.currentCount + 1);
                  }}
                >
                  <Flex
                    direction={"column"}
                    className="bottom-sheet-component-events-pin-color"
                    align={"center"}
                    justify={"center"}
                  >
                    <Center>
                      <Image src={pin.icon.iconUrl} width={30} />
                    </Center>
                  </Flex>
                  <Flex
                    direction={"column"}
                    className="bottom-sheet-component-event-details"
                  >
                    <Text className="bottom-sheet-component-title">
                      {pin.title}{" "}
                    </Text>
                    <Text className="bottom-sheet-component-time-to">
                      {convertTo12HourTime(pin.start_datetime)} to{" "}
                      {convertTo12HourTime(pin.end_datetime)}
                    </Text>

                    <Text className="bottom-sheet-component-location">
                      {pin.location}
                    </Text>
                    <Text className="bottom-sheet-component-tags">
                      {pin.host}
                    </Text>
                  </Flex>
                </Flex>
              );
            })}
        </Flex> */}
        <Sheet
          isOpen={isOpen}
          onClose={() => {}}
          drag={true}
          snapPoints={[600, 400, 100, 1]}
          initialSnap={2}
        >
          <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content style={{ paddingBottom: ref.current?.y }}>
              <Sheet.Scroller>
                <Flex
                  direction={"column"}
                  justify={"center"}
                  align={"center"}
                  className="bottom-sheet-component-events-main-flex-vertical"
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
                          className="bottom-sheet-component-events-main-flex"
                          gap={"md"}
                          onClick={() => {
                            sideBarMoveContext.setSideBarMoveLocation(latlng);
                            moverContext.setCurrentCount(
                              moverContext.currentCount + 1
                            );
                          }}
                        >
                          <Flex
                            direction={"column"}
                            className="bottom-sheet-component-events-pin-color"
                            align={"center"}
                            justify={"center"}
                          >
                            <Center>
                              <Image src={pin.icon.iconUrl} width={30} />
                            </Center>
                          </Flex>
                          <Flex
                            direction={"column"}
                            className="bottom-sheet-component-event-details"
                          >
                            <Text className="bottom-sheet-component-title">
                              {pin.title}{" "}
                            </Text>
                            <Text className="bottom-sheet-component-time-to">
                              {convertTo12HourTime(pin.start_datetime)} to{" "}
                              {convertTo12HourTime(pin.end_datetime)}
                            </Text>

                            <Text className="bottom-sheet-component-location">
                              {pin.location}
                            </Text>
                            <Text className="bottom-sheet-component-tags">
                              {pin.host}
                            </Text>
                          </Flex>
                        </Flex>
                      );
                    })}
                </Flex>
              </Sheet.Scroller>
            </Sheet.Content>
          </Sheet.Container>
        </Sheet>
      </div>
    </div>
  );
};

export default BottomSheetComponent;
