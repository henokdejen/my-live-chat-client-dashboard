import React from "react";
import { connect } from "react-redux";
import { chatTransferRequested } from "../../../store/actions";
import Button from "../../controls/buttons/Button";
import Modal from "../../controls/modal/Modal";
import "./transferChatModal.scss";

const TransferChatModal = ({
  conversationId,
  agents,
  transferTo,
  handleClose,
}) => {
  let onlineAgents = agents.filter(({ isOnline }) => isOnline);

  let agentListView = null;

  if (onlineAgents.length) {
    agentListView = onlineAgents.map(({ id, name, isOnline }) => (
      <div
        className="agent-item"
        key={id}
        onClick={() => transferTo(conversationId, id)}
      >
        <img className="agent-image" />
        <div className="agent-name"> {name} </div>
        <div className={"agent-status " + (isOnline ? "" : "offline")}>
          {isOnline ? "Online" : "Offline"}{" "}
        </div>
      </div>
    ));
  } else {
    agentListView = <div>There are other online agents at this time</div>;
  }

  return (
    <Modal show={true}>
      <div className="transferChatWrapper">
        <div className="modal-title">Transfer Chat</div>
        <div className="modal-body">
          <p className="choose-agent">Choose An Agent</p>

          <div className="agents-list">{agentListView}</div>
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

const mapStateToProps = (state) => {
  let { agents } = state.basicState.projectInfo;
  let { userInfo } = state.basicState;
  agents = agents.filter((ag) => ag.id !== userInfo._id);
  return { agents };
};

const mapDispatchToProps = (dispatch) => ({
  transferTo: (conversationId, agentId) => {
    console.log("Ezih ga", chatTransferRequested(conversationId, agentId));
    dispatch(chatTransferRequested(conversationId, agentId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TransferChatModal);
