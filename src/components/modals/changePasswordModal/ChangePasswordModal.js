import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import * as Yup from "yup";
import * as API from "../../../API/base";
import Button from "../../controls/buttons/Button";
import InputWithLabel from "../../controls/inputWithLabel/InputWithLabel";
import Modal from "../../controls/modal/Modal";

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(8, "should be minimum of 8 length!")
    .max(50, "should not be more than 50 characters")
    .required("* Required"),
  password: Yup.string()
    .min(8, "should be minimum of 8 length!")
    .max(50, "should not be more than 50 characters")
    .required("* Required"),

  comfirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export const ChangePasswordModal = ({ handleClose }) => {
  const [submitError, setsubmitError] = useState("");

  const onSubmit = (values, { setSubmitting }) => {
    console.log("ahun", values);

    setsubmitError("");
    API.changePassword(values.oldPassword, values.password)
      .then((response) => {
        console.log(response);
        if (response.success) {
          console.log("Password chaged!");
          handleClose();
        } else {
          setsubmitError(response.message);
          setSubmitting(false);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        console.log("Finally hre");
      });
  };

  return (
    <Modal show={true}>
      <div className="modal-title">Change Password</div>
      <div className="modal-body">
        <Formik
          initialValues={{
            oldPassword: "",
            password: "",
            comfirmPassword: "",
          }}
          validationSchema={ChangePasswordSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, isSubmitting, setSubmitting }) => (
            <Form>
              <InputWithLabel>
                <label>Old Password </label>
                <Field
                  className="input-text"
                  type="password"
                  name="oldPassword"
                />
                {touched.oldPassword && errors.oldPassword && (
                  <div className="field-msg form-error-msg">
                    {errors.oldPassword}
                  </div>
                )}
              </InputWithLabel>

              <InputWithLabel>
                <label>New Password </label>
                <Field className="input-text" type="password" name="password" />
                {touched.password && errors.password && (
                  <div className="field-msg form-error-msg">
                    {errors.password}
                  </div>
                )}
              </InputWithLabel>

              <InputWithLabel>
                <label>Comfirm Password </label>
                <Field
                  className="input-text"
                  type="password"
                  name="comfirmPassword"
                />
                {touched.comfirmPassword && errors.comfirmPassword && (
                  <div className="field-msg form-error-msg">
                    {errors.comfirmPassword}
                  </div>
                )}
              </InputWithLabel>

              {submitError && (
                <div className="field-msg form-error-msg">{submitError}</div>
              )}

              <div className="modal-footer">
                <Button
                  variant="outlined"
                  size="l"
                  onClick={(e) => handleClose()}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="l"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <ClipLoader /> : "Save"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
