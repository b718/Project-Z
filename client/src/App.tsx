import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Pin from "./Pin/Pin";
import SpawnPin from "./Spawn-Pin/SpawnPin";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Pin
        location="IKB"
        people="4"
        details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse imperdiet varius nunc et facilisis. Nunc ultrices maximus sollicitudin. Vestibulum gravida molestie metus in sodales. Cras lobortis lacus id sollicitudin ullamcorper. Vivamus id dui et odio viverra eleifend. Nullam ut sem vel arcu gravida laoreet eget semper turpis. Nullam ultricies vestibulum viverra."
      />
      <SpawnPin />
    </div>
  );
}

export default App;
