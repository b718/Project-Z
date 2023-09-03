import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Pin from "./Pin/Pin";
import SpawnPin from "./Spawn-Pin/SpawnPin";
import Map from "./Map/MapLeaflet";

function App() {
  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;
