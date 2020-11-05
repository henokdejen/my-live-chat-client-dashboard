import React, { useRef, useState } from "react";

import FormButton from "../controls/buttons/FormButton";
import AttachmentIcon from "../controls/icons/attachment-icon/AttachmentIcon";

import "./ChatForm.scss";
import { CONVERSATION_TYPES, MessageStatus } from "../../constants";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import { BsPaperclip } from "react-icons/bs";
import { FaRegSmileWink } from "react-icons/fa";
import { createMessageFromInput } from "../../store/sagas/helper";
import Button from "../controls/buttons/Button";
import { MultiLineInput } from "../controls/multiline-input/MultiLineInput";

const isMessageEmpty = (textMessage) => {
  return adjustTextMessage(textMessage).length === 0;
};

const adjustTextMessage = (textMessage) => {
  return textMessage.trim();
};

const ChatForm = ({
  selectedConversation,
  onMessageSubmitted,
  onJoinRequested,
  removeNewMessageMarker,
  type,
}) => {
  const [textMessage, setTextMessage] = useState("");
  const [whisper, setwhisper] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const inputDiv = useRef(null);

  const inputPlaceHolder = whisper
    ? "Whisper message are available for only agents"
    : "Type your message. Shift + Enter to add a new line";

  const disableButton = isMessageEmpty(textMessage);
  let formContents = null;

  let handleFormSubmit = null;

  let conversationId = null;

  const addEmoji = (e) => {
    let emoji = e.native;
    setTextMessage(textMessage + emoji);
  };

  const togglePickerView = (e) => {
    setShowPicker(!showPicker);
  };

  const handleJoinFormSubmit = (e) => {
    e.preventDefault();
    onJoinRequested(selectedConversation.browserID, selectedConversation.id);
  };

  const handleMsgInputFormSubmit = (e) => {
    e.preventDefault();
    removeNewMessageMarker(selectedConversation.id);
    if (!isMessageEmpty(textMessage)) {
      setShowPicker(false);
      onMessageSubmitted(
        conversationId,
        createMessageFromInput(textMessage, whisper, type)
      );
      setTextMessage("");
      inputDiv.current.innerHTML = "";
    }
  };

  const getJoinForm = () => (
    <form id="join-form" onSubmit={handleJoinFormSubmit}>
      <div className="join-msg"> You are not assigned to this conversation</div>
      <Button variant="primary" size="sm">
        Join Conversation
      </Button>
    </form>
  );

  const offlineMessage = () => (
    <div className="visitor-offline">
      The visitor is currently offline. You can't write to this conversation at
      this time
    </div>
  );

  const getMsgInputForm = () => (
    <form id="msg-input-form" onSubmit={handleMsgInputFormSubmit}>
      {showPicker && (
        <Picker
          style={{ position: "absolute", bottom: "85px", right: "25px" }}
          onSelect={addEmoji}
          showPreview={false}
        />
      )}

      <div className={whisper ? "actual-input whisper" : "actual-input"}>
        <MultiLineInput
          value={textMessage}
          innerRef={inputDiv}
          placeholder={inputPlaceHolder}
          className="chat-input"
          onSubmit={handleMsgInputFormSubmit}
          onChange={(val) => setTextMessage(val)}
          onFocus={(e) => removeNewMessageMarker(selectedConversation.id)}
        />
      </div>

      <div className="input-controls">
        <div className="input-controls-left">
          {type === CONVERSATION_TYPES.TEAM_CONVERSATION && (
            <>
              <span
                className={`msg-type ${whisper ? "" : "active"}`}
                onClick={(e) => setwhisper(false)}
              >
                Message
              </span>
              <span
                className={`msg-type ${whisper ? "active" : ""}`}
                onClick={(e) => setwhisper(true)}
              >
                Whisper
              </span>
            </>
          )}
        </div>

        <div className="input-controls-right">
          <BsPaperclip className="input-icons" />
          <FaRegSmileWink
            id="emoji-picker-toggler"
            className="input-icons toggle-emoji-picker"
            onClick={togglePickerView}
          />
          <Button
            disabled={disableButton}
            variant="primary"
            size="sm"
            type="submit"
          >
            Send
          </Button>
        </div>
      </div>
    </form>
  );

  if (selectedConversation) {
    conversationId = selectedConversation.id;
    if (type === CONVERSATION_TYPES.PRIVATE_CONVERSATION) {
      formContents = getMsgInputForm();
    } else if (type === CONVERSATION_TYPES.TEAM_CONVERSATION) {
      formContents = selectedConversation.isOnline
        ? selectedConversation.joined
          ? getMsgInputForm()
          : getJoinForm()
        : offlineMessage();
    }
  }

  console.log("kidus lalibela", selectedConversation)

  return (
    <div id="chat-form" onSubmit={handleFormSubmit}>
      {formContents}
    </div>
  );
};

export default ChatForm;
