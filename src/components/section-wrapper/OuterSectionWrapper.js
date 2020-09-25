import React from "react";
import "./outerSectionWrapper.scss";

export const OuterSectionWrapper = (props) => {
  return (
    <div className={"outer-section-wrapper " + props.cn} {...props}>
      {props.children}
    </div>
  );
};
