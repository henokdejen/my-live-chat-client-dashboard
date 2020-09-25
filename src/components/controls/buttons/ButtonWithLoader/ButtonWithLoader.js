import React from "react";
import { ClipLoader } from "react-spinners";
import Button from "../Button";

export const ButtonWithLoader = (props) => {
  return (
    <Button {...props}>
      {props.isLoading ? <ClipLoader /> : props.children}
    </Button>
  );
};
