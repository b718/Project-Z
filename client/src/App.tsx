import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Pin from "./Pin/Pin";
import SpawnPin from "./Spawn-Pin/SpawnPin";
import Map from "./Map/MapLeaflet";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <Map />
      </div>
    </LocalizationProvider>
  );
}

export default App;
