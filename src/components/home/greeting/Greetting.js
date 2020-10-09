import React from "react";
import "./gretting.scss";

const getGreeting = () => {
  let hoursOftheDay = new Date().getHours();
  let suffice = "";
  if (hoursOftheDay < 12) suffice = "Morning";
  else if (hoursOftheDay >= 12 && hoursOftheDay <= 18) suffice = "Afternoon";
  else suffice = "Evening";
  return `Good ${suffice}`;
};

export const Greetting = ({ userInfo }) => {
  return (
    <div className="greetting-wrapper">
      <h1 className="greeting-text">
        {getGreeting()}, {userInfo.name}
      </h1>
    </div>
  );
};
