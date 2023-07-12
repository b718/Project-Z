import React, { FunctionComponent, useState } from "react";
import "./Pin.css";
import { Flex, Text } from "@mantine/core";
interface pinData {
  location: string;
  details: string;
  people: string;
}
const Pin: FunctionComponent<pinData> = ({ location, details, people }) => {
  const [click, setClick] = useState<Boolean>(false);
  return (
    <>
      <div className={`pin-main-div${click ? "-active" : ""}`}>
        {" "}
        <Flex direction="column" align="center" justify="center">
          <div className={`pin-details-div${click ? "-active" : ""}`}>
            <Flex direction="column" align="center" justify="center">
              <Text>{location}</Text>
              <Text className="pin-details-div-details-text">{details}</Text>
              <Text>{people}</Text>
            </Flex>
          </div>

          <div
            className={`pin-clicker-div${click ? "-active" : ""}`}
            onClick={() => setClick(!click)}
          >
            <span className="material-symbols-outlined">location_on</span>
          </div>
        </Flex>
      </div>
    </>
  );
};

export default Pin;
