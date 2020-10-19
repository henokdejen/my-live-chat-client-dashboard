import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import InputWithLabel from "../../controls/inputWithLabel/InputWithLabel";
import Modal from "../../controls/modal/Modal";
import { FormSubmitBar } from "../../form-submit-bar/FormSubmitBar";
import * as Yup from "yup";
import * as API from "../../../API/base";

import "./sendChatTrans.scss";
import { CONVERSATION_TYPES } from "../../../constants";

const sendChatTransSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("* Required"),
});

export const SendChatTranscriptModal = ({
  conversationId,
  type,
  handleClose,
}) => {
  const [submitError, setsubmitError] = useState("");

  alert(conversationId);

  const onSubmit = (values, { setSubmitting }) => {
    setsubmitError("");
    const convType =
      type === CONVERSATION_TYPES.ARCHIVE_CONVERSATION ? "archived" : "active";
    console.log("sssss", conversationId, type, [values.email]);
    API.sendConvTranscript(conversationId, convType, [values.email])
      .then((response) => {
        let { data } = response;
        if (data.success) {
          // addAgentToStore(data.data);
          console.log("dem", data.data);
          handleClose();
        } else {
          alert("error sending the transcript");
          handleClose();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {});
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
