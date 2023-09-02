import React, { useContext, useEffect, useState } from "react";
import "./FilterMapComponent.css";
import { FilterContext } from "../Map";
import L from "leaflet";
import { useMap } from "react-leaflet";

const FilterMapComponent = () => {
  const filterView = useContext(FilterContext);
  const [mouseIn, setMouseIn] = useState<boolean>(false);
  const map = useMap();
  useEffect(() => {
    // console.log(mouseIn);
    if (mouseIn) {
      L.DomEvent.disableClickPropagation(
        document.querySelector(".filter-map-component")!
      );
    } else {
      map.tap?.enable();
    }
  }, [mouseIn]);
  return (
    <div
      className="filter-map-component"
      onClick={() => {
        filterView.setFilter(!filterView.filter);
      }}
      onMouseEnter={() => {
        setMouseIn(true);
      }}
      onMouseLeave={() => {
        setMouseIn(false);
      }}
    >
      F
    </div>
  );
};

export default FilterMapComponent;
