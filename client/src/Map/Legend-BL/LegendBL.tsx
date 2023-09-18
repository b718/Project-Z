import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L, { Control } from "leaflet";
import "./LegendBL.css";
import igLogo from "../../Images/ig_logo.png";
import { Flex, Image, Text } from "@mantine/core";

const LegendBL = () => {
  return (
    <div className="legendbl-div-for-click">
      <Flex justify={"center"} align={"center"}>
        <a href="https://www.instagram.com/pinnitubc/" target="_blank">
          <Image src={igLogo} width={"20px"}></Image>
        </a>
        <Text className="legend-bl-text-ig" style={{ marginLeft: "0.3rem" }}>
          Follow Us @pinnitubc!
        </Text>
      </Flex>
    </div>
  );
};

export default LegendBL;
