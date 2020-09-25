import React, { useEffect, useRef } from "react";
import { TicketMessageItem } from "../ticketMessageItem/TicketMessageItem";
import "./ticketMessagesList.scss";

export const TicketMessagesList = ({
  visitor,
  currentAgent,
  ticketMessages,
}) => {
  console.log("CCCCCCCCCCCCC", ticketMessages.length);
  let wrapperRef = useRef(null);

  useEffect(() => {
    console.log("Again");
    wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight;
  });

  return (
    <div className="ticket-msgs-lst" ref={wrapperRef}>
      {ticketMessages.map((message, i) => (
        <TicketMessageItem
          key={i}
          message={message}
          sender={message.sender.visitor ? visitor : currentAgent}
        />
      ))}
    </div>
  );
};
