import React, { useState } from "react";
import { connect } from "react-redux";
import MessageList from "../../message/MessageList";
import ChatTitle from "../../../components/chat-title/ChatTitle";
import ChatForm from "../../../components/chat-form/ChatForm";
import NoConversations from "../../../components/conversation/no-conversations/NoConversations";
import { VisitorDetail } from "../../VisitorDetail/VisitorDetail";
import {
  sendMessage,
  joinConversationRequested,
  removeUnSeenMarker,
} from "../../../store/actions";
import { TransferChatModal } from "../../../components/modals/transferChatModal/TransferChatModal";

const ChatBody = ({
  selectedConversation,
  onMessageSubmitted,
  onJoinRequested,
  agents,
  transferChatTo,
  removeMessagesMarker,
}) => {
  const [showChatTransferModal, setshowChatTransferModal] = useState(false);

  let conversationContent = (
    <>
      <NoConversations></NoConversations>
    </>
  );

  if (selectedConversation) {
    conversationContent = (
      <>
        <MessageList selectedConversation={selectedConversation} />
      </>
    );
  }

  return (
    <>
      {showChatTransferModal && (
        <TransferChatModal
          agents={agents}
          onAgentSelected={transferChatTo}
          handleClose={(e) => setshowChatTransferModal(false)}
        />
      )}

      <div className="chat-body">
        <ChatTitle
          selectedConversation={selectedConversation}
          openTransferChat={(e) => setshowChatTransferModal(true)}
        />

        <div className="conversationContent">{conversationContent}</div>
        {selectedConversation && selectedConversation.isOnline && (
          <ChatForm
            selectedConversation={selectedConversation}
            onMessageSubmitted={onMessageSubmitted}
            onJoinRequested={onJoinRequested}
            removeNewMessageMarker={removeMessagesMarker}
          />
        )}
      </div>

      <div className="client-information-wrapper">
        <VisitorDetail />
      </div>
    </>
  );
};

const mapStateToProps = (state, { match: { params } }) => {
  let selectedConversation = state.conversationState.conversations.find(
    (conversation) => conversation.id === params.conversationId
  );

  let { agents } = state.basicState.projectInfo;

  return { selectedConversation, agents };
};

const mapDispatchToProps = (dispatch) => ({
  onMessageSubmitted: (conversationId, message) => {
    dispatch(sendMessage(conversationId, message));
  },
  onJoinRequested: (browserID, conversationID) => {
    dispatch(joinConversationRequested(browserID, conversationID));
  },

  removeMessagesMarker: (conversationID) => {
    dispatch(removeUnSeenMarker(conversationID));
  },

  transferChatTo: (agent) => {
    console.log("Feyel case");
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
