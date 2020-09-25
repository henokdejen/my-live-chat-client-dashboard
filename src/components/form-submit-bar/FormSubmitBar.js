import React from "react";
import { ClipLoader } from "react-spinners";
import Button from "../controls/buttons/Button";
import "./formSubmitBar.scss";

export const FormSubmitBar = ({ buttonSize, isSubmitting, onCancel }) => {
  return (
    <div className="form-submit-bar">
      <Button variant="outlined" size={buttonSize} onClick={onCancel}>
        Reset
      </Button>
      <Button
        variant="primary"
        size={buttonSize}
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? <ClipLoader /> : "Save Changes"}
      </Button>
    </div>
  );
};
