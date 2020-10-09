import React, { useState } from "react";
import "./addConversationModal.scss";
import { FormSubmitBar } from "../../form-submit-bar/FormSubmitBar";
import Modal from "../../controls/modal/Modal";
import { Field, Form, Formik } from "formik";
import InputWithLabel from "../../controls/inputWithLabel/InputWithLabel";
import * as Yup from "yup";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { connect } from "react-redux";
import { createNewConversation } from "../../../store/actions";

const animatedComponents = makeAnimated();

const addChatRoomSchema = Yup.object().shape({
  roomName: Yup.string()
    .min(3, "should be minimum of 3 length!")
    .max(20, "should not be more than 20 characters")
    .required("* Required"),
  members: Yup.array()
    .required("* Required")
    .min(1, "should there be minimum of one agent"),
});
const AddConversationModal = ({
  agentOptions,
  handleClose,
  addNewConversation,
}) => {
  const [submitError, setsubmitError] = useState("");

  const onSubmit = (values, { setSubmitting }) => {
    setsubmitError("");
    addNewConversation({ name: values.roomName, members: values.members });
  };

  return (
    <Modal show={true}>
      <div className="modal-title">Add Private Chat Room</div>
      <div className="modal-body">
        <Formik
          initialValues={{
            roomName: "",
            members: [],
          }}
          validationSchema={addChatRoomSchema}
          onSubmit={onSubmit}
        >
          {({
            errors,
            touched,
            values,
            isSubmitting,
            setSubmitting,
            setValues,
          }) => (
            <Form>
              <InputWithLabel>
                <label>Room Name </label>
                <Field className="input-text" type="text" name="roomName" />
                {touched.roomName && errors.roomName && (
                  <div className="field-msg form-error-msg">
                    {errors.roomName}
                  </div>
                )}
              </InputWithLabel>

              <InputWithLabel>
                <label>Room Members</label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={agentOptions}
                  placeholder="Add agents to the chat room"
                  onChange={(e) => {
                    let ss = Array.isArray(e) ? e.map((x) => x.value) : [];
                    console.log("ante", values);
                    values.members = ss;
                    setValues(values);
                  }}
                />
                {touched.members && errors.members && (
                  <div className="field-msg form-error-msg">
                    {errors.members}
                  </div>
                )}
              </InputWithLabel>

              {submitError && (
                <div className="field-msg form-error-msg">{submitError}</div>
              )}

              <FormSubmitBar
                buttonSize="l"
                positiveButtonName="Create Room"
                negativeButtonName="Cancel"
                isSubmitting={isSubmitting}
                onCancel={handleClose}
              />
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addNewConversation: (roomDetail) => {
    dispatch(createNewConversation(roomDetail));
  },
});

export default connect(null, mapDispatchToProps)(AddConversationModal);
