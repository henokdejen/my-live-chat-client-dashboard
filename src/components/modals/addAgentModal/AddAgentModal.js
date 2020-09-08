import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import * as API from "../../../API/base";
import Button from "../../controls/buttons/Button";
import InputWithLabel from "../../controls/inputWithLabel/InputWithLabel";
import Modal from "../../controls/modal/Modal";
import "./addAgentModal.scss";
import * as Yup from "yup";

const MINIMUM_PASSWORD_LENGTH = 8;

const generatePassword = (length) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  console.log("fasdfsadfkljadslfj", result);
  return result;
};

// const AddAgentSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("* Required")
//     .test("name", "Name should contain first name and last name", (name) => {
//       return name && name.trim().split(" ").length === 2;
//     }),

//   email: Yup.string().email("Invalid email").required("* Required"),
// ,
// });

const AddAgentSchema = (withPasswordField) => {
  let passField = withPasswordField
    ? {
        password: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("* Required"),
      }
    : {};

  return Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("* Required")
      .test("name", "Name should contain first name and last name", (name) => {
        return name && name.trim().split(" ").length === 2;
      }),

    email: Yup.string().email("Invalid email").required("* Required"),
    ...passField,
  });
};

const validateEmail = (value) => {
  let valid = true;
  if (!value) {
    valid = false;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    valid = false;
  }
  return valid;
};

export const AddAgentModal = ({ projectID, addAgent, handleClose }) => {
  const [passwordNeeded, setpasswordNeeded] = useState(false);
  const [checkingEmail, setcheckingEmail] = useState(false);

  const [accountExists, setaccountExists] = useState(false);
  const [exisitingAgentId, setexisitingAgentId] = useState("");

  const checkIfAgentExists = (email, setSubmitting) => {
    console.log("Siked", validateEmail(email));
    if (validateEmail(email)) {
      setcheckingEmail(true);
      setTimeout(() => {
        API.checkAgentExists(email)
          .then((data) => {
            if (data.success) {
              if (data.data.exists) {
                console.log("It exists");
                setpasswordNeeded(false);
                setaccountExists(true);
                setexisitingAgentId(data.data.agentID);
              } else {
                setpasswordNeeded(true);
                setaccountExists(false);
                setexisitingAgentId("");
                console.log("good to go");
              }
            }
          })
          .catch((err) => {})
          .then(() => {
            setcheckingEmail(false);
          });
      }, 600);
    }
  };

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("ahun", values);
    setTimeout(() => {
      let agent = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: "admin",
      };

      if (accountExists && exisitingAgentId) {
        agent.agentID = exisitingAgentId;
      }

      API.addAgent(projectID, agent)
        .then((response) => {
          console.log(response);
          let { data } = response;
          if (data.success) {
            addAgent(data.data);
            handleClose();
          } else {
            alert(data.message);
            handleClose();
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          console.log("Finally hre");
        });
    }, 600);
  };

  return (
    <Modal show={true}>
      <div className="modal-title">Add Agent</div>
      <div className="modal-body">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={AddAgentSchema(passwordNeeded)}
          onSubmit={onSubmit}
        >
          {({ errors, touched, handleChange, isSubmitting, setFieldError }) => (
            <Form>
              <InputWithLabel>
                <label>Name </label>
                <Field className="input-text" type="text" name="name" />
                {touched.name && errors.name && (
                  <div className="field-msg form-error-msg">{errors.name}</div>
                )}
              </InputWithLabel>

              <InputWithLabel>
                <label>Email </label>
                <Field
                  className="input-text"
                  type="email"
                  name="email"
                  onChange={(e) => {
                    handleChange(e);
                    checkIfAgentExists(e.target.value);
                  }}
                />
                {touched.email && errors.email ? (
                  <div className="field-msg form-error-msg">{errors.email}</div>
                ) : checkingEmail ? (
                  <div className="field-msg">Checking email...</div>
                ) : accountExists ? (
                  <div className="field-msg">
                    An account with this email exists. An invitation will be
                    sent
                  </div>
                ) : null}
              </InputWithLabel>

              {passwordNeeded && (
                <InputWithLabel>
                  <label>Password </label>
                  <Field className="input-text" type="text" name="password" />
                  {touched.password && errors.password && (
                    <div className="field-msg form-error-msg">
                      {errors.password}
                    </div>
                  )}
                </InputWithLabel>
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
                  disabled={checkingEmail || isSubmitting}
                >
                  {isSubmitting || checkingEmail ? <ClipLoader /> : "Add Agent"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};