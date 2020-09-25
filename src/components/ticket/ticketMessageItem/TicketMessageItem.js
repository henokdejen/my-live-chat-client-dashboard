import React from "react";
import { MessageStatus } from "../../../constants";
import classNames from "classnames";

import "./ticketMessageItem.scss";

export const TicketMessageItem = ({ sender, message }) => {
  const timeCN = classNames("time", {
    "time-pending": message.status === MessageStatus.PENDING,
    "time-error": message.status === MessageStatus.FAILURE,
  });

  const wrapperCN = classNames("ticket-msg-item", {
    "ticket-msg-item-pending": message.status === MessageStatus.PENDING,
    "ticket-msg-item-error": message.status === MessageStatus.FAILURE,
  });

  return (
    <div className={wrapperCN}>
      <div className="msg-header">
        <div className="sender">
          <img className="sender-image" />
          <div className="sender-name"> {sender.name} </div>
          <div className="sender-email"> {sender.email}</div>
        </div>

        <div className={timeCN}>
          {message.status === MessageStatus.PENDING
            ? "sending..."
            : message.status === MessageStatus.FAILURE
            ? "Not Assigned to this ticket!"
            : message.createdAt}
        </div>
      </div>
      <div className="msg-content">{message.text}</div>
    </div>
  );
};
