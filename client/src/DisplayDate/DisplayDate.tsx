import React from "react";
import Clock from "react-live-clock";
import "./DisplayDate.css";
const DisplayDate = () => {
  return (
    <>
      {" "}
      <div className="display-date-main-div">
        <Clock format={"dddd, MMMM Mo, YYYY, h:mm:ss A"} ticking={true} />
      </div>
    </>
  );
};

export default DisplayDate;
