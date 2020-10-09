import React from "react";
import { ClipLoader } from "react-spinners";
import Button from "../controls/buttons/Button";
import "./formSubmitBar.scss";

export const FormSubmitBar = ({
  buttonSize,
  positiveButtonName = "Save Changes",
  negativeButtonName = "Reset",
  isSubmitting = false,
  onCancel,
}) => {
  return (
    <div className="form-submit-bar">
      <Button variant="outlined" size={buttonSize} onClick={onCancel}>
        {negativeButtonName}
      </Button>
      <Button
        variant="primary"
        size={buttonSize}
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? <ClipLoader /> : positiveButtonName}
      </Button>
    </div>
  );
};
