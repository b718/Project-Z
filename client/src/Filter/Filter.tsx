import { TextInput } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import "./Filter.css";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { FilterContext, FilterTextContext } from "../Map/Map";

const Filter = () => {
  const [mouseIn, setMouseIn] = useState<boolean>(false);
  const map = useMap();
  const FilterText = useContext(FilterTextContext);
  const [text, setText] = useState("");
  const SideBarFilter = useContext(FilterContext);
  useEffect(() => {
    // console.log(mouseIn);
    if (mouseIn) {
      L.DomEvent.disableClickPropagation(
        document.querySelector(".filter-main-input")!
      );
    } else {
      map.tap?.enable();
    }
  }, [mouseIn]);

  useEffect(() => {
    if (!SideBarFilter.filter) {
      FilterText.setFilterText("");
      setText("");
    } else {
      FilterText.setFilterText(text);
    }
  }, [text, SideBarFilter.filter]);
  return (
    <>
      {SideBarFilter.filter ? (
        <div
          className="filter-main-input"
          onMouseEnter={() => {
            setMouseIn(true);
          }}
          onMouseLeave={() => {
            setMouseIn(false);
          }}
        >
          <TextInput
            label="Filter by?"
            value={text}
            onChange={(event) => setText(event.currentTarget.value)}
          ></TextInput>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Filter;
