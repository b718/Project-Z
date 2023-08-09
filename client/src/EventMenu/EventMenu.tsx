import { Button, Flex, Text } from "@mantine/core";
import L, { Point, icon } from "leaflet";
import React, { useContext, useEffect, useState } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import "./EventMenu.css";
import { SideBarContext } from "../Map/Map";

interface eventMenuInterface {
  icon: L.Icon;
}

interface eventInterface {
  lat: L.LatLngExpression;
  location: string;
  desc: string;
  going: number;
  total: number;
}
const EventMenu: React.FunctionComponent<eventMenuInterface> = ({ icon }) => {
  const map = useMap();
  const [userMade, setUserMade] = useState<eventInterface[]>([]);
  const [latLngState, setLatLngState] = useState<L.LatLngExpression>([0, 0]);
  const [latState, setLatState] = useState<number>(0);
  const [lngState, setLngState] = useState<number>(0);
  const [nameState, setNameState] = useState<string>("");
  const [descState, setDescState] = useState<string>("");
  const [peopleGoing, setPeopleGoing] = useState<number>(0);
  const [peopleTotal, setPeopleTotal] = useState<number>(0);
  const [mouseIn, setMouseIn] = useState<boolean>(false);
  const currentView = useContext(SideBarContext);
  const eventMenuSubmit = (e: any) => {
    e.preventDefault();
    let userLatlng = [latState, lngState];
    let newUseMade: eventInterface = {
      lat: userLatlng as L.LatLngExpression,
      location: nameState,
      desc: descState,
      going: peopleGoing,
      total: peopleTotal,
    };
    setUserMade((userMade) => [...userMade, newUseMade]);
    setLatState(0);
    setLngState(0);
    setLatLngState([0, 0]);
    setNameState("");
    setDescState("");
    setPeopleGoing(0);
    setPeopleTotal(0);
  };

  useEffect(() => {
    console.log(mouseIn);
    if (mouseIn) {
      L.DomEvent.disableClickPropagation(
        document.querySelector(".eventmenu-main-menu")!
      );
    } else {
      map.tap?.enable();
    }
  }, [mouseIn]);

  return (
    <>
      <form
        className={`eventmenu-main-menu${currentView.view ? "" : "-off"}`}
        onMouseEnter={() => {
          setMouseIn(true);
        }}
        onMouseLeave={() => {
          setMouseIn(false);
        }}
      >
        <Flex direction={"row"} justify={"center"} align={"flex-start"}>
          <Flex direction={"column"} justify={"center"} align={"flex-start"}>
            {" "}
            <label>What is the Lat & Lng? </label>
            <label style={{ marginTop: "1.5rem" }}>
              What is the name of the place?{" "}
            </label>
            <label style={{ marginTop: "0.3rem" }}>
              What is happening here?{" "}
            </label>
            <label style={{ marginTop: "0.3rem" }}>
              How many people are going?{" "}
            </label>
            <label style={{ marginTop: "0.2rem" }}>What's the capacity? </label>
          </Flex>
          <Flex
            direction={"column"}
            justify={"center"}
            align={"flex-start"}
            style={{ marginLeft: "1rem" }}
          >
            <input
              type="number"
              className="eventmenu-input"
              value={latState}
              pattern="^-?\d+$"
              onChange={(e) => {
                setLatState(e.target.valueAsNumber);
              }}
            ></input>
            <input
              type="number"
              className="eventmenu-input"
              pattern="^-?\d+$"
              value={lngState}
              onChange={(e) => {
                setLngState(e.target.valueAsNumber);
              }}
            ></input>
            <input
              type="text"
              className="eventmenu-input"
              value={nameState}
              onChange={(e) => {
                setNameState(e.target.value);
              }}
            ></input>
            <input
              type="text"
              className="eventmenu-input"
              value={descState}
              onChange={(e) => {
                setDescState(e.target.value);
              }}
            ></input>
            <input
              type="number"
              className="eventmenu-input"
              value={peopleGoing}
              onChange={(e) => {
                setPeopleGoing(e.target.valueAsNumber);
              }}
            ></input>
            <input
              type="number"
              className="eventmenu-input"
              value={peopleTotal}
              onChange={(e) => {
                setPeopleTotal(e.target.valueAsNumber);
              }}
            ></input>
          </Flex>
        </Flex>
        <Button className="eventmenu-submit-button" onClick={eventMenuSubmit}>
          CREATE
        </Button>
      </form>

      {userMade.map((event: any, index: number) => {
        if (index % 2 == 0) {
          return (
            <Marker
              position={event.lat}
              icon={icon}
              eventHandlers={{
                click(e) {
                  map.setView(e.target.getLatLng());
                },
              }}
            >
              {" "}
              <Popup offset={L.point(0, -20)}>
                <Flex direction={"column"} justify={"center"} align={"center"}>
                  <Text>{event.location}</Text>
                  <Text>{event.desc}</Text>
                  <Text>
                    {event.going} / {event.total} are going.
                  </Text>
                </Flex>
              </Popup>
            </Marker>
          );
        }
      })}
    </>
  );
};

export default EventMenu;
