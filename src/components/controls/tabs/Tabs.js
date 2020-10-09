import React from "react";
import { useState } from "react";
import "./tabs.scss";

export const Tabs = ({ tabsName, onActiveChange }) => {
  const [activeIndex, setactiveIndex] = useState(0);
  return (
    <div className="tabs-wrapper">
      {tabsName.map((tab, i) => (
        <div
          className={"tab-item tab" + (activeIndex === i ? " tab-active" : "")}
          onClick={(e) => {
            setactiveIndex(i);
            onActiveChange(i);
          }}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};
