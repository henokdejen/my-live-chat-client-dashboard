import React from "react";

import ConversationItem from "../conversation-item/ConversationItem";
import "./ConversationList.scss";

const ConversationList = ({ conversations, isActiveChat }) => {
  const conversationItems = conversations.map((conversation) => {
    return (
      <ConversationItem
        key={conversation.id}
        conversation={conversation}
        isActiveChat={isActiveChat}
      />
    );
  });

  return <div id="conversation-list">{conversationItems}</div>;
};

export default ConversationList;
