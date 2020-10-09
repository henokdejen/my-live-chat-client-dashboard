import React, { useEffect, useRef, useState } from "react";
import { connect, useSelector } from "react-redux";

import {
  messagesRequested,
  reportMessageSeenRequested,
  markAllMessageSeenRequested,
  removeUnSeenMarker,
  chatShellType,
  removeMessageRequested,
} from "../../../store/actions";
import Message from "../../../components/message/Message";
import "./MessageList.scss";
import { NotificationMessage } from "../../../components/notification-message-item/NotificationMessage";
import { NewMessageMarker } from "../../../components/new-message-marker/NewMessageMarker";
import Message2 from "../../../components/message/Message2";
import { CONVERSATION_TYPES } from "../../../constants";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const MessageList = ({
  selectedConversation,
  getMessagesForConversation,
  loadMessages,
  reportMessageSeen,
  markAllMessagesSeen,
  removeMessagesMarker,
  type,
  deleteMessage,
}) => {
  const messageDetails = getMessagesForConversation(selectedConversation.id);

  const messages = messageDetails ? messageDetails.messages : null;
  const initialMsgLoaded = messageDetails
    ? messageDetails.initiallyLoaded
    : false;
  let messageItems = null;

  let wrapperRef;

  const prevAmount = usePrevious(selectedConversation.id);
  const isOngoingChat =
    type === CONVERSATION_TYPES.PRIVATE_CONVERSATION ||
    type === CONVERSATION_TYPES.TEAM_CONVERSATION;

  useEffect(() => {
    if (!messageDetails || !initialMsgLoaded) {
      loadMessages(type, selectedConversation.id, null);
    } else {
      wrapperRef.scrollTop = wrapperRef.scrollHeight;
      if (isOngoingChat) markAllMessagesSeen(selectedConversation.id);
    }
  }, [messageDetails, loadMessages, selectedConversation.id]);

  useEffect(() => {
    if (isOngoingChat && prevAmount && prevAmount !== selectedConversation.id) {
      removeMessagesMarker(prevAmount);
    }
  }, [selectedConversation.id]);

  if (messages && messages.length > 0) {
    let { unSeenMarkerCount } = selectedConversation;

    messageItems = messages.map((message, index) => {
      let messageItem = message.isNotification ? (
        <NotificationMessage
          reportMessageSeen={reportMessageSeen}
          message={message}
          key={index}
        />
      ) : (
        <Message2
          key={index}
          initialMsgLoaded={initialMsgLoaded}
          reportMessageSeen={isOngoingChat ? reportMessageSeen : null}
          isMyMessage={message.isMyMessage}
          message={message}
          sender={{ name: selectedConversation.title }}
          deleteMessage={(msgID) =>
            deleteMessage(type, selectedConversation.id, msgID)
          }
        />
      );

      if (unSeenMarkerCount !== 0 && index === unSeenMarkerCount) {
        return (
          <>
            <NewMessageMarker key={"nmm" + index} />
            {messageItem}
          </>
        );
      }
      return messageItem;
    });
  }

  return (
    <div id="chat-message-list" ref={(el) => (wrapperRef = el)}>
      {messageItems}
    </div>
  );
};

const mapStateToProps = (state) => {
  const getMessagesForConversation = (conversationId) => {
    return state.messagesState.messageDetails[conversationId];
  };

  return {
    getMessagesForConversation,
  };
};

const mapDispatchToProps = (dispatch) => {
  const loadMessages = (type, conversationId, lastMessageId) => {
    console.log("called here");
    dispatch(messagesRequested(type, conversationId, 5, lastMessageId));
  };

  const reportMessageSeen = (conversationID, messageID) => {
    dispatch(reportMessageSeenRequested(conversationID, messageID));
  };

  const markAllMessagesSeen = (conversationID) => {
    dispatch(markAllMessageSeenRequested(conversationID));
  };

  const removeMessagesMarker = (conversationID) => {
    dispatch(removeUnSeenMarker(conversationID));
  };

  const deleteMessage = (type, conversationId, messageID) => {
    dispatch(removeMessageRequested(conversationId, type, messageID));
  };

  return {
    loadMessages,
    reportMessageSeen,
    markAllMessagesSeen,
    removeMessagesMarker,
    deleteMessage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
