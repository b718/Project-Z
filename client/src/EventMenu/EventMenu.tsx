import { Flex, Text } from "@mantine/core";
import { icon } from "leaflet";
import React, { useEffect, useState } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import "./EventMenu.css";

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

  return (
    <>
      <div className="eventmenu-main-menu">
        <Flex direction={"column"} justify={"center"} align={"flex-start"}>
          <Text>What is the Lat & Lng?</Text>
          <Text>What is the name of the place?</Text>
          <Text>What is happening here?</Text>
          <Text>How many people are going?</Text>
          <Text>What's the capacity?</Text>
          <button className="eventmenu-submit-button">CREATE</button>
        </Flex>
      </div>
    </>
  );
};

export default EventMenu;
