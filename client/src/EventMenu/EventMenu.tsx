import {
  Button,
  Center,
  Flex,
  Radio,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import L, { Point, icon } from "leaflet";
import React, { useContext, useEffect, useState } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import "./EventMenu.css";
import { IconTextContext, SideBarContext } from "../Map/MapLeaflet";
import { MapContext } from "../Map/Coordinates-BR/CoordinatesBR";
import blueMarker from "../Images/blue_marker.png";
import amsMarker from "../Images/pin-ams.png";
import clubMarker from "../Images/pin-club.png";
import companyMarker from "../Images/pin-company.png";
import facultyMarker from "../Images/pin-faculty.png";
import fratMarker from "../Images/pin-frat.png";
import officialMarker from "../Images/pin-official.png";
import { TimeInput } from "@mantine/dates";

interface eventMenuInterface {
  icon: L.Icon;
  lat: L.LatLngExpression;
}

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
const EventMenu: React.FunctionComponent<eventMenuInterface> = ({
  icon,
  lat,
}) => {
  const map = useMap();
  const [userMade, setUserMade] = useState<eventInterface[]>([]);
  const [nameState, setNameState] = useState<string>("");
  const [titleState, setTitleState] = useState<string>("");
  const [descState, setDescState] = useState<string>("");
  const [linkState, setLinkState] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [peopleGoing, setPeopleGoing] = useState<number>(0);
  const [peopleTotal, setPeopleTotal] = useState<number>(0);
  const [mouseIn, setMouseIn] = useState<boolean>(false);
  const [typeOfEvent, setTypeOfEvent] = useState("other");
  const [tags, setTags] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
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
      title: titleState,
      link: linkState,
      endTime: endTime,
      startTime: startTime,
      going: peopleGoing,
      total: peopleTotal,
      tags: tags,
      icon: customIcon,
    };
    // console.log(newUseMade);
    setUserMade((userMade) => [...userMade, newUseMade]);
    coordinatesMap.setUserMade(() => [...coordinatesMap.userMade, newUseMade]);
    setNameState("");
    setDescState("");
    setLinkState("");
    setTitleState("");
    setStartTime("");
    setEndTime("");
    setPage(0);
    setTags([]);
    setTypeOfEvent("");
  };

  const createButtonChecker = () => {
    return (
      nameState.length > 0 &&
      descState.length > 0 &&
      titleState.length > 0 &&
      startTime.length > 0 &&
      endTime.length > 0 &&
      typeOfEvent.length > 0 &&
      page == 2
    );
  };

  useEffect(() => {
    console.log(endTime, startTime);
  }, [endTime, startTime]);

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
      <form
        className={`eventmenu-main-menu${currentView.view ? "" : "-off"}`}
        onMouseEnter={() => {
          setMouseIn(true);
        }}
        onMouseLeave={() => {
          setMouseIn(false);
        }}
        onSubmit={eventMenuSubmit}
      >
        {
          {
            2: (
              <Flex
                direction={"column"}
                justify={"center"}
                align={"flex-start"}
                style={{ marginLeft: "1rem" }}
              >
                <TextInput
                  type="text"
                  label="Location/Building"
                  className="eventmenu-input"
                  value={nameState}
                  required={true}
                  onChange={(e) => {
                    setNameState(e.target.value);
                  }}
                ></TextInput>
                <TextInput
                  type="text"
                  label="Activity Title"
                  className="eventmenu-input"
                  value={titleState}
                  required={true}
                  onChange={(e) => {
                    setTitleState(e.target.value);
                  }}
                ></TextInput>
                <Textarea
                  autosize
                  minRows={2}
                  label="Activity Description"
                  className="eventmenu-input"
                  value={descState}
                  required={true}
                  onChange={(e) => {
                    setDescState(e.target.value);
                  }}
                ></Textarea>
                <TextInput
                  type="text"
                  label="Referece Link/Page"
                  className="eventmenu-input"
                  value={linkState}
                  onChange={(e) => {
                    setLinkState(e.target.value);
                  }}
                ></TextInput>
              </Flex>
            ),
            1: (
              <Flex
                direction={"column"}
                justify={"center"}
                align={"flex-start"}
                style={{ marginLeft: "1rem" }}
              >
                <Text className="event-menu-time-title">
                  Note Times Are 24 Hour Format.
                </Text>
                <TimeInput
                  label="Start Time"
                  value={startTime}
                  required={true}
                  className="event-menu-time"
                  onChange={(startTime) => {
                    setStartTime(startTime.target.value);
                  }}
                />
                <TimeInput
                  label="End Time"
                  className="event-menu-time"
                  value={endTime}
                  required={true}
                  onChange={(endTime) => {
                    setEndTime(endTime.target.value);
                  }}
                />
              </Flex>
            ),

            0: (
              <Flex
                direction={"column"}
                justify={"center"}
                align={"flex-start"}
                style={{ marginLeft: "1rem" }}
              >
                {" "}
                <Radio.Group
                  value={typeOfEvent}
                  onChange={setTypeOfEvent}
                  label="Type Of Event?"
                  className="event-menu-radio"
                  required={true}
                >
                  <Radio value="official" label="Official UBC Events" />
                  <Radio
                    value="company"
                    label="Company Info Sessions/Research"
                  />
                  <Radio value="faculty" label="Faculty Events/Imagine Day" />
                  <Radio value="club" label="Clubs Events" />
                  {/* <Radio value="ams" label="AMS Events/Parties" /> */}
                  <Radio value="frat" label="Social" />
                  <Radio value="other" label="Other" />
                </Radio.Group>
              </Flex>
            ),
          }[page]
        }

        {/* </Flex> */}
        <Center>
          <Flex gap={"sm"}>
            <Button
              className="eventmenu-submit-button"
              disabled={page == 0}
              onClick={() => {
                setPage(page - 1);
              }}
            >
              PREV
            </Button>
            <Button
              className="eventmenu-submit-button"
              disabled={page == 2}
              onClick={() => {
                setPage(page + 1);
              }}
            >
              NEXT
            </Button>
            <Button
              className="eventmenu-submit-button"
              disabled={!createButtonChecker()}
              type={"submit"}
              onClick={eventMenuSubmit}
            >
              CREATE
            </Button>
          </Flex>
        </Center>
      </form>
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

// 2: (
//   <Flex
//     direction={"column"}
//     justify={"center"}
//     align={"flex-start"}
//     style={{ marginLeft: "1rem" }}
//   >
//     {" "}
//     <TextInput
//       type="number"
//       label="How many people are going?"
//       className="eventmenu-input"
//       value={peopleGoing}
//       required={true}
//       onChange={(e) => {
//         setPeopleGoing(e.target.valueAsNumber);
//       }}
//     ></TextInput>
//     <TextInput
//       label="What's the capacity?"
//       type="number"
//       className="eventmenu-input"
//       value={peopleTotal}
//       required={true}
//       onChange={(e) => {
//         setPeopleTotal(e.target.valueAsNumber);
//       }}
//     ></TextInput>
//   </Flex>
