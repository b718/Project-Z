import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Pin from "./Pin/Pin";
import SpawnPin from "./Spawn-Pin/SpawnPin";
import Map from "./Map/Map";

function App() {
  return (
    <div className="App">
      {/* <Pin
        location="IKB"
        peopleGoing="4"
        peopleTotal="10"
        details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse imperdiet varius nunc et facilisis. Nunc ultrices maximus sollicitudin. Vestibulum gravida molestie metus in sodales. Cras lobortis lacus id sollicitudin ullamcorper. Vivamus id dui et odio viverra eleifend. Nullam ut sem vel arcu gravida laoreet eget semper turpis. Nullam ultricies vestibulum viverra."
      /> */}
      {/* <SpawnPin /> */}
      <Map />
    </div>
  );
}

export default App;
