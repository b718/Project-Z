import React, { FunctionComponent, useState } from "react";
import "./Pin.css";
import { Flex, Text } from "@mantine/core";
interface pinData {
  location: string;
  details: string;
  peopleGoing: string;
  peopleTotal: string;
}
const Pin: FunctionComponent<pinData> = ({
  location,
  details,
  peopleGoing,
  peopleTotal,
}) => {
  const [click, setClick] = useState<Boolean>(false);
  const [hover, setHover] = useState(false);

  return (
    <>
      <div className={`pin-main-div${click ? "-active" : ""}`}>
        {" "}
        <Flex direction="column" align="center" justify="center">
          <div className={`pin-details-div${click ? "-active" : ""}`}>
            {" "}
            <Flex align="flex-start" className="pin-location-header">
              <Text>{location}</Text>
            </Flex>
            <Text className="pin-details-div-details-text">{details}</Text>
            <Flex className="pin-people-flex" align="center" justify="center">
              <Text>{peopleGoing}</Text>
              <Text>/</Text>
              <Text>{peopleTotal} people are going!</Text>
            </Flex>
          </div>

          {/* {click ? (
            ""
          ) : (
            <div
              className="pin-hover-div"
              style={{ opacity: `${hover ? "0.8" : "0"}`, zIndex: "2" }}
            >
              <Text>
                {location} - {peopleGoing}/{peopleTotal} people are going!
              </Text>
            </div>
          )} */}
          <div
            className="pin-hover-div"
            style={{ opacity: `${hover ? "0.8" : "0"}`, zIndex: "2" }}
          >
            <Text style={{ fontStyle: "italic" }}>
              {location} - {peopleGoing}/{peopleTotal} people are going!
            </Text>
          </div>
          <div
            className={`pin-clicker-div${click ? "-active" : ""}`}
            onClick={() => setClick(!click)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <span className="material-symbols-outlined">location_on</span>
          </div>
        </Flex>
      </div>
    </>
  );
};

export default Pin;
