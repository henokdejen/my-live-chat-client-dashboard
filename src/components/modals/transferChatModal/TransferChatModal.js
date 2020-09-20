import React from "react";
import Button from "../../controls/buttons/Button";
import Modal from "../../controls/modal/Modal";
import "./transferChatModal.scss";

export const TransferChatModal = ({ agents, onAgentSelected, handleClose }) => {
  return (
    <Modal show={true}>
      <div className="transferChatWrapper">
        <div className="modal-title">Transfer Chat</div>
        <div className="modal-body">
          <p className="choose-agent">Choose An Agent</p>

          <div className="agents-list">
            {agents.map((agent) => {
              let { id, name, email } = agent;

              return (
                <div className="agent-item">
                  <img className="agent-image" />
                  <div className="agent-name"> {name} </div>
                  <div className="agent-email"> {email} </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="modal-footer">
          <Button variant="outlined" size="sm" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
