import React, { useState } from "react";
import "./SpawnPin.css";
import Pin from "../Pin/Pin";
import { Text } from "@mantine/core";

interface spawnXandY {
  pageX: number;
  pageY: number;
}
const SpawnPin = () => {
  const [boxes, setBoxes] = useState<spawnXandY[]>([]);
  const [mode, setMode] = useState<boolean>(false);

  const handleClick = (spawnXandY: spawnXandY) => {
    // on every click push a new coordinate to the boxes array
    let newObject: spawnXandY = {
      pageX: spawnXandY.pageX,
      pageY: spawnXandY.pageY,
    };
    if (!mode) {
      setBoxes([...boxes]);
    } else {
      setBoxes([...boxes, newObject]);
    }
  };
  return (
    <>
      {" "}
      <button onClick={() => setMode(!mode)} style={{ marginTop: "5rem" }}>
        {mode ? "true" : "false"}
      </button>
      <Text>Map Sample</Text>
      <div onClick={handleClick} className="spawn-pin-map-sample">
        {boxes!.map((box) => (
          // map coordinates to left and top
          <div className="box" style={{ left: box.pageX, top: box.pageY }}>
            <Pin
              location="IKB"
              peopleGoing="4"
              peopleTotal="10"
              details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse imperdiet varius nunc et facilisis. Nunc ultrices maximus sollicitudin. Vestibulum gravida molestie metus in sodales. Cras lobortis lacus id sollicitudin ullamcorper. Vivamus id dui et odio viverra eleifend. Nullam ut sem vel arcu gravida laoreet eget semper turpis. Nullam ultricies vestibulum viverra."
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default SpawnPin;
