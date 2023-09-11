import {
  Button,
  Center,
  Flex,
  Loader,
  Radio,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import L, { Point, icon } from "leaflet";
import React, { useContext, useEffect, useState } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import "./EventMenu.css";
import { ApiContext, IconTextContext, SideBarContext } from "../Map/MapLeaflet";
import { MapContext } from "../Map/Coordinates-BR/CoordinatesBR";
import otherMarker from "../Images/pin-other-new.png";
import careerMarker from "../Images/pin-career-new.png";
import facultyMarker from "../Images/pin-faculty-new.png";
import clubMarker from "../Images/pin-club-new.png";
import socialMarker from "../Images/pin-social-new.png";
import officialMarker from "../Images/pin-official-new.png";

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
  host: string;
  endTime: string;
  startTime: string;
  startDate: string;
  endDate: string;
  endDateAPI: string;
  startDateAPI: string;
  tags: string[];
  icon: L.Icon;
}

interface eventInterfaceApi {
  latlong: number[];
  title: string;
  description: string;
  location: string;
  start_datetime: string;
  end_datetime: string;
  timezone: string;
  tags: string[];
  host: string;
  reference_link: string;
  icon: {
    iconUrl: string;
    iconSize: number[];
  };
}

const EventMenu: React.FunctionComponent<eventMenuInterface> = ({
  icon,
  lat,
}) => {
  const map = useMap();
  const [userMade, setUserMade] = useState<eventInterface[]>([]);
  const [userApiMade, setUserApiMade] = useState<eventInterfaceApi[]>([]);

  const [locationState, setLocationState] = useState<string>("");
  const [titleState, setTitleState] = useState<string>("");
  const [descState, setDescState] = useState<string>("");
  const [linkState, setLinkState] = useState<string>("");

  const [startTime, setStartTime] = useState<string | null | undefined>("");
  const [endTime, setEndTime] = useState<string | null | undefined>("");

  const [startDate, setStartDate] = useState<number | "" | null | undefined>(
    ""
  );
  const [endDate, setEndDate] = useState<number | "" | null | undefined>("");

  const [host, setHost] = useState<string>("");

  const [mouseIn, setMouseIn] = useState<boolean>(false);
  const [typeOfEvent, setTypeOfEvent] = useState("other");
  const [tags, setTags] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState("start");

  // const [userIcon, setUsericon] = useState<L.Icon>();
  const currentView = useContext(SideBarContext);
  const coordinatesMap = useContext(MapContext);
  const ApiMade = useContext(ApiContext);

  let image = otherMarker;
  let customIcon = new L.Icon({
    iconUrl: image,
    iconSize: [25, 30],
  });

  const sentBlank = () => {
    setLocationState("");
    setDescState("");
    setLinkState("");
    setTitleState("");
    setStartTime("");
    setEndTime("");
    setStartDate("");
    setEndDate("");
    setPage(0);
    setTags([]);
    setHost("");
    setTypeOfEvent("");
  };

  const eventMenuSubmit = async (e: any) => {
    e.preventDefault();
    if (typeOfEvent === "official") {
      customIcon.options.iconUrl = officialMarker;
    } else if (typeOfEvent === "company") {
      customIcon.options.iconUrl = careerMarker;
    } else if (typeOfEvent === "faculty") {
      customIcon.options.iconUrl = facultyMarker;
    } else if (typeOfEvent === "club") {
      customIcon.options.iconUrl = clubMarker;
    } else if (typeOfEvent === "social") {
      customIcon.options.iconUrl = socialMarker;
    } else {
      customIcon.options.iconUrl = otherMarker;
    }

    const convertToTwelve = (time: any) => {
      let minute = time.$m;
      if (time.$m.toString().length == 1) {
        minute = `0${time.$m}`;
      }
      if (time.$H >= 12) {
        if (time.$H == 12) {
          return `${time.$H}:${minute}PM`;
        } else {
          if (time.$H == 22 || time.$H == 23) {
            return `${time.$H - 12}:${minute}AM`;
          } else {
            return `0${time.$H - 12}:${minute}PM`;
          }
        }
      } else {
        if (time.$H == 0) {
          return `12:${minute}AM`;
        } else {
          if (time.$H == 10 || time.$H == 11) {
            return `${time.$H}:${minute}AM`;
          } else {
            return `0${time.$H}:${minute}AM`;
          }
        }
      }
    };

    const convertToDateAPI = (date: any, time: any) => {
      //YYYY-MM-DDTHH:MM:SS
      let month = date.$M;
      if (date.$M.toString().length == 1) {
        month = `0${date.$M}`;
      }

      let day = date.$;
      if (date.$M.toString().length == 1) {
        day = `0${time.$M}`;
      }

      let minute = time.$M;
      if (time.$M.toString().length == 1) {
        minute = `0${time.$M}`;
      }

      let hour = time.$H;
      if (time.$H.toString().length == 1) {
        hour = `0${time.$H}`;
      }

      console.log(`${date.$y}-${month}-${day}T${hour}:${minute}:00`);
      return `${date.$y}-${month}-${day}T${hour}:${minute}:00`;
    };

    const convertToDate = (data: any) => {
      let dateString = data.$d.toString().substring(0, 15);
      // console.log(data.$d.toString().substring(0, 15));
      return dateString.substring(0, 3) + "," + dateString.substring(4, 10);
      //Mon Sep 04 2023
    };

    let newUseMade: eventInterface = {
      lat: lat as L.LatLngExpression,
      location: locationState,
      desc: descState,
      title: titleState,
      link: linkState,
      startTime: convertToTwelve(startTime),
      endTime: convertToTwelve(endTime),
      startDate: convertToDate(startDate),
      endDate: "convertToDate(endDate)",
      startDateAPI: convertToDateAPI(startDate, startTime),
      endDateAPI: "convertToDateAPI(endDate, endTime)",
      tags: [typeOfEvent],
      host: host,
      icon: customIcon,
    };

    const apiLat = lat as Array<number>;
    console.log(lat, apiLat);

    let apiObject = {
      title: titleState,
      description: descState,
      location: locationState,
      reference_link: linkState,
      latlong: [apiLat[0], apiLat[1]],
      tags: [typeOfEvent],
      start_datetime: convertToDateAPI(startDate, startTime),
      end_datetime: convertToDateAPI(startDate, endTime),
      timezone: "-07:00",
      host: host,
      icon: {
        iconUrl: customIcon.options.iconUrl,
        iconSize: [20, 25],
      },
    };
    setLoading("loading");
    const postMessage = await fetch(
      "https://pinnit-backend.onrender.com/events/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          title: titleState,
          description: descState,
          location: locationState,
          reference_link: linkState,
          latlong: [apiLat[0], apiLat[1]],
          tags: [typeOfEvent],
          start_datetime: convertToDateAPI(startDate, startTime),
          end_datetime: convertToDateAPI(startDate, endTime),
          timezone: "-07:00",
          host: host,
          icon: {
            iconUrl: customIcon.options.iconUrl,
            iconSize: [20, 25],
          },
        }),
      }
    ).then((response) => {
      setLoading("start");
      console.log(response.json());
    });

    // console.log(newUseMade);s

    // setUserMade((userMade) => [...userMade, newUseMade]);
    // coordinatesMap.setUserMade(() => [...coordinatesMap.userMade, newUseMade]);

    setUserApiMade((apiMade) => [...apiMade, apiObject]);
    ApiMade.setUserMadeApi(() => [...ApiMade.useMadeApi, apiObject]);
    sentBlank();
  };

  const createButtonChecker = () => {
    return (
      locationState.length > 0 &&
      descState.length > 0 &&
      titleState.length > 0 &&
      startTime &&
      // endTime &&
      startDate &&
      // endDate &&
      typeOfEvent.length > 0 &&
      host.length > 0 &&
      page == 3
    );
  };

  useEffect(() => {
    // console.log(mouseIn);
    if (mouseIn) {
      L.DomEvent.disableClickPropagation(
        document.querySelector(
          ".eventmenu-main-menu, .eventmenu-submit-button"
        )!
      );
    } else {
      map.tap?.enable();
    }
  }, [mouseIn]);

  // useEffect(() => {
  //   console.log("start time");
  //   console.log(startTime);
  //   console.log("end time");
  //   console.log(endTime);
  // }, [startTime, endTime]);

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
                  <Radio value="official" label="Official Event" />
                  <Radio value="company" label="Career Event" />
                  <Radio value="faculty" label="Faculty Event" />
                  <Radio value="club" label="Club Event" />
                  <Radio value="social" label="Social Event" />
                  <Radio value="other" label="Other Event" />
                </Radio.Group>
              </Flex>
            ),
            1: (
              <Flex
                direction={"column"}
                justify={"center"}
                align={"center"}
                style={{ marginLeft: "1rem" }}
              >
                <Text className="event-menu-text-for-inputs">
                  Start Date <span className="event-menu-red-ast">*</span>
                </Text>
                <DatePicker
                  slotProps={{
                    textField: {
                      error: false,
                    },
                  }}
                  format="YYYY-MM-DD"
                  className="event-menu-date-picker-mui-start"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                />

                <Text className="event-menu-text-for-inputs">
                  Start Time <span className="event-menu-red-ast">*</span>
                </Text>
                <TimePicker
                  slotProps={{
                    textField: {
                      error: false,
                    },
                  }}
                  className="event-menu-time-picker-mui-start"
                  value={startTime}
                  onChange={(newValue) => setStartTime(newValue)}
                />

                <Text className="event-menu-text-for-inputs">
                  End Time <span className="event-menu-red-ast">*</span>
                </Text>
                <TimePicker
                  slotProps={{
                    textField: {
                      error: false,
                    },
                  }}
                  className="event-menu-time-picker-mui-start"
                  value={endTime}
                  onChange={(newValue) => setEndTime(newValue)}
                />
              </Flex>
            ),
            // 2: (
            //   <Flex
            //     direction={"column"}
            //     justify={"center"}
            //     align={"flex-start"}
            //     style={{ marginLeft: "1rem" }}
            //   >
            //     {" "}
            //     <Text className="event-menu-text-for-inputs">End Date</Text>
            //     <DatePicker
            //       slotProps={{
            //         textField: {
            //           error: false,
            //         },
            //       }}
            //       format="YYYY-MM-DD"
            //       className="event-menu-date-picker-mui-start"
            //       value={endDate}
            //       onChange={(newValue) => setEndDate(newValue)}
            //     />
            //     <Text className="event-menu-text-for-inputs">End Time</Text>
            //     <TimePicker
            //       slotProps={{
            //         textField: {
            //           error: false,
            //         },
            //       }}
            //       className="event-menu-time-picker-mui-start"
            //       value={endTime}
            //       onChange={(newValue) => setEndTime(newValue)}
            //     />
            //   </Flex>
            // ),
            2: (
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
                  value={locationState}
                  required={true}
                  onChange={(e) => {
                    setLocationState(e.target.value);
                  }}
                ></TextInput>
                <Textarea
                  autosize
                  label="Activity Description"
                  className="eventmenu-input"
                  minRows={2}
                  maxRows={2}
                  value={descState}
                  required={true}
                  onChange={(e) => {
                    setDescState(e.target.value);
                  }}
                ></Textarea>
              </Flex>
            ),
            3: (
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
              disabled={page == 3}
              onClick={() => {
                setPage(page + 1);
              }}
            >
              NEXT
            </Button>
            <Button
              className="eventmenu-submit-button"
              disabled={!createButtonChecker() || loading == "loading"}
              type={"submit"}
              onClick={eventMenuSubmit}
            >
              CREATE
              {loading == "loading" ? (
                <Loader
                  color="gray"
                  size="0.6rem"
                  style={{ marginLeft: "0.6rem", marginTop: "0.1rem" }}
                />
              ) : (
                <div></div>
              )}
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
