import {
  Button,
  Center,
  Flex,
  NumberInput,
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
import { DateInput, TimeInput } from "@mantine/dates";
import { DatePicker, TimeField, TimePicker } from "@mui/x-date-pickers";

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
  const thisYear = 2023;
  const [userMade, setUserMade] = useState<eventInterface[]>([]);
  const [nameState, setNameState] = useState<string>("");
  const [titleState, setTitleState] = useState<string>("");
  const [descState, setDescState] = useState<string>("");
  const [linkState, setLinkState] = useState<string>("");

  const [startTime, setStartTime] = useState<string | null | undefined>("");
  const [endTime, setEndTime] = useState<any>("");

  const [startDate, setStartDate] = useState<number | "" | null | undefined>();
  const [endDate, setEndDate] = useState<number | "" | null | undefined>();

  // const [startMonth, setStartMonth] = useState<number | "">();
  // const [endMonth, setEndMonth] = useState<number | "">();

  // const [startHour, setStartHour] = useState<number | "">();
  // const [endHour, setEndHour] = useState<number | "">();

  // const [startMinute, setStartMinute] = useState<number | "">();
  // const [endMinute, setEndMinute] = useState<number | "">();

  // const [startAmPm, setStartAmPm] = useState<string>("am");
  // const [endAmPm, setEndAmPm] = useState<string>("am");

  const [host, setHost] = useState<string>("");

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

    const convertToTwelve = (time: any) => {
      let minute = time.$M;
      console.log(minute);
      if (time.$M.toString().length == 1) {
        minute = `0${time.$M}`;
      }
      if (time.$H >= 12) {
        if (time.$H == 12) {
          return `${time.$H}:${minute} PM`;
        } else {
          return `${time.$H - 12}:${minute} PM`;
        }
      } else {
        if (time.$SH == 0) {
          return `12:${minute} AM`;
        } else {
          return `${time.$H}:${minute} AM`;
        }
      }
    };

    let newUseMade: eventInterface = {
      lat: lat as L.LatLngExpression,
      location: nameState,
      desc: descState,
      title: titleState,
      link: linkState,
      endTime: convertToTwelve(endTime),
      startTime: convertToTwelve(startTime),
      going: peopleGoing,
      total: peopleTotal,
      tags: tags,
      icon: customIcon,
    };
    console.log(newUseMade);

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
      startTime &&
      endTime &&
      typeOfEvent.length > 0 &&
      host.length > 0 &&
      page == 4
    );
  };

  useEffect(() => {
    console.log(startDate, startTime);
  }, [startDate, startTime]);

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

  // useEffect(() => {
  //   setTags([typeOfEvent]);
  // }, [typeOfEvent]);

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
            3: (
              <Flex
                direction={"column"}
                justify={"center"}
                align={"flex-start"}
                style={{ marginLeft: "1rem" }}
              >
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
              </Flex>
            ),
            1: (
              <Flex
                direction={"column"}
                justify={"center"}
                align={"flex-start"}
                style={{ marginLeft: "1rem" }}
              >
                <Text className="event-menu-text-for-inputs">Start Date</Text>
                <DatePicker
                  format="YYYY-MM-DD"
                  className="event-menu-date-picker-mui-start"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                />

                <Text className="event-menu-text-for-inputs">Start Time</Text>
                <TimePicker
                  className="event-menu-time-picker-mui-start"
                  value={startTime}
                  onChange={(newValue) => setStartTime(newValue)}
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
                  label="Event?"
                  className="event-menu-radio"
                  required={true}
                >
                  <Radio value="official" label="Official UBC Events" />
                  <Radio value="company" label="Career" />
                  <Radio value="faculty" label="Faculty Events" />
                  <Radio value="club" label="Clubs Events" />
                  <Radio value="frat" label="Social" />
                  <Radio value="other" label="Other" />
                </Radio.Group>
              </Flex>
            ),
            4: (
              <Flex
                direction={"column"}
                justify={"center"}
                align={"flex-start"}
                style={{ marginLeft: "1rem" }}
              >
                <TextInput
                  type="text"
                  label="Host"
                  className="eventmenu-input"
                  value={host}
                  required={true}
                  onChange={(e) => {
                    setHost(e.target.value);
                  }}
                ></TextInput>
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
            2: (
              <Flex
                direction={"column"}
                justify={"center"}
                align={"flex-start"}
                style={{ marginLeft: "1rem" }}
              >
                {" "}
                <Text className="event-menu-text-for-inputs">End Date</Text>
                <DatePicker
                  format="YYYY-MM-DD"
                  className="event-menu-date-picker-mui-start"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                />
                <Text className="event-menu-text-for-inputs">End Time</Text>
                <TimePicker
                  className="event-menu-time-picker-mui-start"
                  value={endTime}
                  onChange={(newValue) => setEndTime(newValue)}
                />
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
              disabled={page == 4}
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
