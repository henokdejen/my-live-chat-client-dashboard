import React from "react";
import "./ddMenuItem.scss";

export const DDMenuItem = (props) => {
  return (
    <li className="dd-menu-item" {...props}>
      {props.children}
    </li>
  );
};
