import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import {
  messagesRequested,
  reportMessageSeenRequested,
  markAllMessageSeenRequested,
  removeUnSeenMarker,
} from "../../store/actions";
import Message from "../../components/message/Message";
import "./MessageList.scss";
import { NotificationMessage } from "../../components/notification-message-item/NotificationMessage";
import { NewMessageMarker } from "../../components/new-message-marker/NewMessageMarker";

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
}) => {
  const messageDetails = getMessagesForConversation(selectedConversation.id);

  const messages = messageDetails ? messageDetails.messages : null;
  const initialMsgLoaded = messageDetails
    ? messageDetails.initiallyLoaded
    : false;
  let messageItems = null;

  let wrapperRef;

  let initialUnseenCount = 4;

  const prevAmount = usePrevious(selectedConversation.id);

  useEffect(() => {
    if (!messageDetails || !initialMsgLoaded) {
      loadMessages(selectedConversation.id, null);
    } else {
      wrapperRef.scrollTop = wrapperRef.scrollHeight;
      markAllMessagesSeen(selectedConversation.id);
    }
  }, [messageDetails, loadMessages, selectedConversation.id]);

  useEffect(() => {
    if (prevAmount && prevAmount !== selectedConversation.id) {
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
        <Message
          key={index}
          initialMsgLoaded={initialMsgLoaded}
          reportMessageSeen={reportMessageSeen}
          isMyMessage={message.isMyMessage}
          message={message}
          sender={{ name: selectedConversation.title }}
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
  const loadMessages = (conversationId, lastMessageId) => {
    dispatch(messagesRequested(conversationId, 5, lastMessageId));
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

  return {
    loadMessages,
    reportMessageSeen,
    markAllMessagesSeen,
    removeMessagesMarker,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
