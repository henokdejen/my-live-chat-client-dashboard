import React, { useState } from "react";
import { connect } from "react-redux";
import MessageList from "../message/MessageList";
import ChatTitle from "../../../components/chat-title/ChatTitle";
import ChatForm from "../../../components/chat-form/ChatForm";
import NoConversations from "../../../components/conversation/no-conversations/NoConversations";
import { VisitorDetail } from "../../visitor/visitor-detail/VisitorDetail";
import {
  sendMessage,
  joinConversationRequested,
  removeUnSeenMarker,
  leaveConversationRequested,
  sendChatTransRequested,
  openModalRequested,
  closeConvRequested,
} from "../../../store/actions";
import "./chatBody.scss";
import { CONVERSATION_TYPES } from "../../../constants";
import {
  BsArrowLeftRight,
  BsBoxArrowUpLeft,
  BsBoxArrowUpRight,
  BsSlashCircle,
} from "react-icons/bs";

const ChatBody = ({
  selectedConversation,
  onMessageSubmitted,
  onJoinRequested,
  leaveConversation,
  agents,
  transferChat,
  removeMessagesMarker,
  sendChatTransc,
  closeConversation,
  type,
}) => {
  let conversationContent = (
    <>
      <NoConversations></NoConversations>
    </>
  );

  if (selectedConversation) {
    conversationContent = (
      <>
        <MessageList selectedConversation={selectedConversation} type={type} />
      </>
    );
  }

  let menus = [];
  if (type === CONVERSATION_TYPES.PRIVATE_CONVERSATION) {
    menus = [
      {
        icon: BsArrowLeftRight,
        lable: "Transfer to",
        click: (e) => {
          transferChat(selectedConversation.id);
        },
      },
      {
        icon: BsBoxArrowUpLeft,
        lable: "Leave",
        click: () => {
          leaveConversation(selectedConversation.id);
        },
      },
    ];
  } else if (type === CONVERSATION_TYPES.TEAM_CONVERSATION) {
    menus = [
      {
        icon: BsBoxArrowUpRight,
        lable: "Send Transcript",
        click: () => {
          sendChatTransc(selectedConversation.id);
        },
      },
      { icon: BsSlashCircle, lable: "Ban this visitor", click: () => {} },
    ];

    if (selectedConversation && selectedConversation.joined) {
      menus = menus.concat([
        {
          icon: BsArrowLeftRight,
          lable: "Transfer to",
          click: (e) => {
            transferChat(selectedConversation.id);
          },
        },
        {
          icon: BsBoxArrowUpLeft,
          lable: "Leave",
          click: () => {
            leaveConversation(selectedConversation.id);
          },
        },
      ]);

      if (true) {
        // the owner
        menus.push({
          icon: BsBoxArrowUpLeft,
          lable: "Close",
          click: () => {
            closeConversation(selectedConversation.id);
          },
        });
      }

      console.log("kif", menus);
    }
  } else {
    //archive
    menus = [
      {
        icon: BsBoxArrowUpRight,
        lable: "Send Transcript",
        click: () => {
          sendChatTransc(selectedConversation.id);
        },
      },
      ,
    ];
  }

  return (
    <>
      {/* {showChatTransferModal &&
        type === CONVERSATION_TYPES.TEAM_CONVERSATION && (
          <TransferChatModal
            agents={agents}
            onAgentSelected={transferChat}
            handleClose={(e) => setshowChatTransferModal(false)}
          />
        )} */}

      <div className="chat-body">
        <ChatTitle selectedConversation={selectedConversation} menus={menus} />

        <div className="conversationContent">{conversationContent}</div>
        {(type === CONVERSATION_TYPES.PRIVATE_CONVERSATION ||
          type === CONVERSATION_TYPES.TEAM_CONVERSATION) &&
          selectedConversation && (
            <ChatForm
              selectedConversation={selectedConversation}
              onMessageSubmitted={onMessageSubmitted}
              onJoinRequested={onJoinRequested}
              removeNewMessageMarker={removeMessagesMarker}
              type={type}
            />
          )}
      </div>

      <div className="client-information-wrapper">
        <VisitorDetail />
      </div>
    </>
  );
};

const mapStateToProps = (state, { match: { params }, type }) => {
  let convStore = [];

  if (
    type === CONVERSATION_TYPES.TEAM_CONVERSATION ||
    type === CONVERSATION_TYPES.PRIVATE_CONVERSATION
  ) {
    convStore = state.conversationState.conversations;
  } else if (type === CONVERSATION_TYPES.ARCHIVE_CONVERSATION) {
    convStore = state.conversationState.archives;
  }

  // alert(params.conversationId);

  let selectedConversation = convStore.find(
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

  transferChat: (conversationId) => {
    dispatch(openModalRequested("TRANSFER_CHAT", { conversationId }));
  },

  leaveConversation: (conversationId) => {
    dispatch(leaveConversationRequested(conversationId));
  },

  sendChatTransc: (conversationId) => {
    dispatch(openModalRequested("SEND_CHAT_TRANSCRIPT", { conversationId }));
  },

  closeConversation: (conversationId) => {
    dispatch(closeConvRequested(conversationId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
