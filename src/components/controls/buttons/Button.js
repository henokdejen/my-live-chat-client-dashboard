import React from "react";

import "./Button.scss";

const Button = (props) => {
  const cn = `button ${props.variant} ${props.size}`;
  return (
    <>
      <button className={cn} {...props}>
        {props.children}
      </button>
    </>
  );
};

export default Button;
