import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { claimTicketAssignee } from "../../../API/base";
import { MessageStatus } from "../../../constants";
import Button from "../../controls/buttons/Button";
import { ButtonWithLoader } from "../../controls/buttons/ButtonWithLoader/ButtonWithLoader";
import "./ticketInputControls.scss";

export const TicketInputControls = ({
  amIAssigned,
  isItOpen,
  onSubmit,
  selectedTicket,
  ticketClaimed,
}) => {
  const [inputMsg, setinputMsg] = useState("lela");
  const inputDiv = useRef(null);

  console.log("Enedalew", amIAssigned, selectedTicket);

  const onSendMsg = (e) => {
    console.log("Eminafek", inputMsg, { text: inputMsg });
    onSubmit({ text: inputMsg });

    inputDiv.current.innerHTML = "";
  };

  const claimTicket = () => {
    claimTicketAssignee(selectedTicket._id)
      .then((data) => {
        if (data.success) ticketClaimed();
        else console.log("Claim Failed");
      })
      .catch((err) => {
        console.log("Claim Failed");
      });
  };

  return (
    <div className="ticket-input-controls">
      {amIAssigned ? (
        <>
          <div
            contentEditable
            className="ticket-msg-input"
            placeholder="type message"
            role="textbox"
            ref={inputDiv}
            data-placeholder="type your message"
            onKeyUp={(e) => setinputMsg(e.target.innerText)}
          ></div>
          <div className="main-contorls">
            <Button variant="primary" size="sm" onClick={onSendMsg}>
              Send
            </Button>
          </div>
        </>
      ) : isItOpen ? (
        <div className="ticket-claim-wrapper">
          <p className="claim-msg">You are not assigned to this ticket.</p>
          <ButtonWithLoader
            isLoading={false}
            variant="primary"
            size="sm"
            onClick={claimTicket}
          >
            Assign yourself
          </ButtonWithLoader>
        </div>
      ) : (
        <div>Not Avaialbel - An other agent is already assigned</div>
      )}
    </div>
  );
};
