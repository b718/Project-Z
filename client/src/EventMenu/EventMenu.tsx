import {
  Button,
  Center,
  Flex,
  Radio,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import L, { Point, icon } from "leaflet";
import React, { useContext, useEffect, useState } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import "./EventMenu.css";
import { IconTextContext, SideBarContext } from "../Map/Map";
import { MapContext } from "../Map/Coordinates-BR/CoordinatesBR";
import blueMarker from "../Images/blue_marker.png";
import amsMarker from "../Images/pin-ams.png";
import clubMarker from "../Images/pin-club.png";
import companyMarker from "../Images/pin-company.png";
import facultyMarker from "../Images/pin-faculty.png";
import fratMarker from "../Images/pin-frat.png";
import officialMarker from "../Images/pin-official.png";

interface eventMenuInterface {
  icon: L.Icon;
  lat: L.LatLngExpression;
}

interface eventInterface {
  lat: L.LatLngExpression;
  location: string;
  desc: string;
  going: number;
  total: number;
  tags: string[];
  icon: L.Icon;
}
const EventMenu: React.FunctionComponent<eventMenuInterface> = ({
  icon,
  lat,
}) => {
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
  const [typeOfEvent, setTypeOfEvent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  // const [userIcon, setUsericon] = useState<L.Icon>();
  const currentView = useContext(SideBarContext);
  const coordinatesMap = useContext(MapContext);
  const iconContext = useContext(IconTextContext);

  let image = blueMarker;
  let customIcon = new L.Icon({
    iconUrl: image,
    iconSize: [20, 30],
  });

  const eventMenuSubmit = (e: any) => {
    e.preventDefault();

    if (typeOfEvent === "official") {
      customIcon.options.iconUrl = officialMarker;
    } else if (typeOfEvent === "company") {
      customIcon.options.iconUrl = companyMarker;
    } else if (typeOfEvent === "faculty") {
      customIcon.options.iconUrl = facultyMarker;
    } else if (typeOfEvent === "club") {
      customIcon.options.iconUrl = clubMarker;
    } else if (typeOfEvent === "ams") {
      customIcon.options.iconUrl = amsMarker;
    } else if (typeOfEvent === "frat") {
      customIcon.options.iconUrl = fratMarker;
    } else {
      customIcon.options.iconUrl = blueMarker;
    }

    let newUseMade: eventInterface = {
      lat: lat as L.LatLngExpression,
      location: nameState,
      desc: descState,
      going: peopleGoing,
      total: peopleTotal,
      tags: tags,
      icon: customIcon,
    };
    // console.log(newUseMade);
    setUserMade((userMade) => [...userMade, newUseMade]);
    coordinatesMap.setUserMade(() => [...coordinatesMap.userMade, newUseMade]);
    setLatState(0);
    setLngState(0);
    setLatLngState([0, 0]);
    setNameState("");
    setDescState("");
    setPeopleGoing(0);
    setPeopleTotal(0);
    setTags([]);
    setTypeOfEvent("");
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

  useEffect(() => {
    setTags([typeOfEvent]);
  }, [typeOfEvent]);

  return (
    <>
      <div
        className={`eventmenu-main-menu${currentView.view ? "" : "-off"}`}
        onMouseEnter={() => {
          setMouseIn(true);
        }}
        onMouseLeave={() => {
          setMouseIn(false);
        }}
      >
        <Flex
          direction={"column"}
          justify={"center"}
          align={"flex-start"}
          style={{ marginLeft: "1rem" }}
        >
          <TextInput
            type="text"
            label="What is the name of the place?"
            className="eventmenu-input"
            value={nameState}
            onChange={(e) => {
              setNameState(e.target.value);
            }}
          ></TextInput>
          <TextInput
            type="text"
            label="What is happening here?"
            className="eventmenu-input"
            value={descState}
            onChange={(e) => {
              setDescState(e.target.value);
            }}
          ></TextInput>
          <TextInput
            type="number"
            label="How many people are going?"
            className="eventmenu-input"
            value={peopleGoing}
            onChange={(e) => {
              setPeopleGoing(e.target.valueAsNumber);
            }}
          ></TextInput>
          <TextInput
            label="What's the capacity?"
            type="number"
            className="eventmenu-input"
            value={peopleTotal}
            onChange={(e) => {
              setPeopleTotal(e.target.valueAsNumber);
            }}
          ></TextInput>

          <Radio.Group
            value={typeOfEvent}
            onChange={setTypeOfEvent}
            label="Type Of Event?"
            className="event-menu-radio"
          >
            <Radio value="official" label="Official UBC Events" />
            <Radio value="company" label="Company Info Sessions/Research" />
            <Radio value="faculty" label="Faculty Events/Imagine Day" />
            <Radio value="club" label="Clubs Events" />
            <Radio value="ams" label="AMS Events/Parties" />
            <Radio value="frat" label="Fraternity/Sorority Parties" />
          </Radio.Group>
        </Flex>
        {/* </Flex> */}
        <Center>
          <Button className="eventmenu-submit-button" onClick={eventMenuSubmit}>
            CREATE
          </Button>
        </Center>
      </div>
    </>
  );
};

export default EventMenu;

{
  /* <Flex direction={"row"} justify={"center"} align={"flex-start"}> */
}
{
  /* <Flex direction={"column"} justify={"center"} align={"flex-start"}>
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
          </Flex> */
}
{
  /* <Select
            label="Type Of Event?"
            // placeholder="Pick one"
            allowDeselect
            className="eventmenu-input"
            transitionProps={{
              transition: "pop-top-left",
              duration: 80,
              timingFunction: "ease",
            }}
            data={[
              { value: "official", label: "Official UBC Events" },
              { value: "company", label: "Company Info Sessions/Research" },
              { value: "faculty", label: "Faculty Events/Imagine Day" },
              { value: "club", label: "Clubs Events" },
              { value: "ams", label: "AMS Events/Parties" },
              { value: "frat", label: "Fraternity/Sorority Parties" },
            ]}
          /> */
}

{
  /* <Flex
            direction={"column"}
            justify={"center"}
            align={"center"}
            gap={"sm"}
            style={{ marginTop: "0.5rem" }}
          >
            <button className="event-menu-button-option">
              Official UBC Events
            </button>
            <button className="event-menu-button-option">
              Company Info Sessions/Research
            </button>
            <button className="event-menu-button-option">
              Faculty Events/Imagine Day
            </button>
            <button className="event-menu-button-option">Clubs Events</button>
            <button className="event-menu-button-option">
              AMS Events/Parties
            </button>
            <button className="event-menu-button-option">
              Fraternity/Sorority Parties
            </button>
          </Flex> */
}

{
  /* {userMade.map((event: any, index: number) => {
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
      })} */
}
