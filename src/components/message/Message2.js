import React, { useEffect } from "react";
import classNames from "classnames";

import "./message2.scss";
import { MessageStatus } from "../../constants";
import { BsTrash } from "react-icons/bs";

const isOnlyEmoji = (str) => {
  const ranges = [
    "\ud83c[\udf00-\udfff]", // U+1F300 to U+1F3FF
    "\ud83d[\udc00-\ude4f]", // U+1F400 to U+1F64F
    "\ud83d[\ude80-\udeff]", // U+1F680 to U+1F6FF
    " ", // Also allow spaces
  ].join("|");

  const removeEmoji = (str) => str.replace(new RegExp(ranges, "g"), "");

  const isOnlyEmojis = (str) => !removeEmoji(str).length;
  return isOnlyEmojis(str);
};

const Message2 = ({
  isMyMessage,
  initialMsgLoaded,
  message,
  reportMessageSeen,
  sender,
  deleteMessage,
}) => {
  useEffect(() => {
    if (
      reportMessageSeen &&
      initialMsgLoaded &&
      message.shouldReport &&
      !message.seen
    ) {
      reportMessageSeen(message.conversationID, message.id);
    }
  }, [message]);

  const messageClass = classNames("message-row", {
    "you-message": isMyMessage,
    "other-message": !isMyMessage,
    whisper: message.whisper,
    sneekPreview: message.isSneakPreview,
  });

  const msgContClass = classNames("message-content", {
    "not-sent-yet": isMyMessage && message.status === MessageStatus.PENDING,
    "emoji-msg": isOnlyEmoji(message.messageText),
  });

  const imageThumbnail = isMyMessage ? null : (
    <img src={message.imageUrl} alt={message.imageAlt} />
  );

  const senderName =
    message.sender && message.sender.name ? message.sender.name : sender.name;

  const messageActions = isMyMessage ? (
    <div className="message-actions">
      {message.status !== MessageStatus.PENDING && (
        <span
          className="button-icon"
          onClick={() => {
            deleteMessage(message.id);
          }}
        >
          <BsTrash />
        </span>
      )}
    </div>
  ) : null;

  return (
    <div className={messageClass}>
      <div className="message-inner-wrapper">
        {imageThumbnail}
        <div className={msgContClass}>
          {!isMyMessage && (
            <div className="sender-name">
              {senderName}{" "}
              {message.isSneakPreview && (
                <span className="typing-notification">typing...</span>
              )}
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: message.messageText }} />
          <div className="message-report-zone">
            {!message.isSneakPreview && (
              <div className="message-time">
                {message.status === MessageStatus.PENDING
                  ? "sending..."
                  : message.createdAt}
              </div>
            )}
          </div>
        </div>
        {messageActions}
      </div>
    </div>
  );
};

export default Message2;
