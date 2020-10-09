import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import InputWithLabel from "../../controls/inputWithLabel/InputWithLabel";
import Modal from "../../controls/modal/Modal";
import { FormSubmitBar } from "../../form-submit-bar/FormSubmitBar";
import * as Yup from "yup";

import "./sendChatTrans.scss";

const sendChatTransSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("* Required"),
});

export const SendChatTranscriptModal = ({ handleClose }) => {
  const [submitError, setsubmitError] = useState("");

  const onSubmit = (values, { setSubmitting }) => {
    setsubmitError("");
    alert("yami yami");
    // addNewConversation({ name: values.roomName, members: values.members });
  };
  return (
    <Modal show={true}>
      <div className="modal-title">Send Chat Transcript</div>
      <div className="modal-body send-chat-trans-modal">
        <div className="chat-trans-msg">
          Send an email with a chat transcript to a selected email address.
        </div>

        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={sendChatTransSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <InputWithLabel>
                <label>Email Address </label>
                <Field className="input-text" type="text" name="email" />
                {touched.email && errors.email && (
                  <div className="field-msg form-error-msg">{errors.email}</div>
                )}
              </InputWithLabel>

              {submitError && (
                <div className="field-msg form-error-msg">{submitError}</div>
              )}

              <FormSubmitBar
                buttonSize="l"
                positiveButtonName="Send"
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
