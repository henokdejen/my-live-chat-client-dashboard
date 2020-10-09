import React from "react";
import classNames from "classnames";

import "./ConversationItem.scss";
import { NavLink, useRouteMatch } from "react-router-dom";
import { Badge } from "../../controls/badge/Badge";

const ConversationItem = ({ conversation, isActiveChat }) => {
  let { url } = useRouteMatch();

  const onlineStatusCN = classNames("online-status-indicator", {
    online: conversation.isOnline,
  });

  return (
    <NavLink
      className="conversation"
      activeClassName="active"
      to={`${url}/${conversation.id}`}
    >
      <div className="avatar-wrapper">
        <img src={conversation.imageUrl} alt={conversation.imageAlt} />
        {isActiveChat && <span className={onlineStatusCN}></span>}
      </div>
      <div className="title-text">{conversation.title}</div>
      <div className="created-date">{conversation.updatedAt}</div>
      <div className="conversation-message">
        {conversation.latestMessageText}
      </div>

      {conversation.unSeenCount ? (
        <Badge> {conversation.unSeenCount}</Badge>
      ) : null}
    </NavLink>
  );
};

export default ConversationItem;
