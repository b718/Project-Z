import { Checkbox, MultiSelect, TextInput } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import "./Filter.css";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { CheckBoxContext, FilterContext, FilterTextContext } from "../Map/Map";

const Filter = () => {
  const [mouseIn, setMouseIn] = useState<boolean>(false);
  const map = useMap();
  const FilterText = useContext(FilterTextContext);
  const [text, setText] = useState("");
  const SideBarFilter = useContext(FilterContext);
  const [value, setValue] = useState<string[]>([]);
  const checkBoxSet = useContext(CheckBoxContext);

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
      setValue([
        "official",
        "company",
        "faculty",
        "club",
        "ams",
        "frat",
        "other",
      ]);
    } else {
      FilterText.setFilterText(text);
      setValue([
        "official",
        "company",
        "faculty",
        "club",
        "ams",
        "frat",
        "other",
      ]);
    }
  }, [text, SideBarFilter.filter]);

  useEffect(() => {
    checkBoxSet.setCheckBox(value);
  }, [value]);
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
          {/* <TextInput
            label="Filter by?"
            value={text}
            onChange={(event) => setText(event.currentTarget.value)}
          ></TextInput> */}

          <Checkbox.Group
            value={value}
            onChange={setValue}
            className="filter-check-boxes"
            label="Event Type"
          >
            <Checkbox value="official" label="UBC AMS" />
            <Checkbox value="company" label="Career" />
            <Checkbox value="faculty" label="Faculty" />
            <Checkbox value="club" label="Clubs" />
            {/* <Checkbox value="ams" label="Social" /> */}
            <Checkbox value="frat" label="Social" />
            <Checkbox value="other" label="Other" />
          </Checkbox.Group>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Filter;
