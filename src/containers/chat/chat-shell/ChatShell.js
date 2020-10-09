import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  createNewConversation,
  archivesRequested,
  openModalRequested,
} from "../../../store/actions";
import ConversationList from "../../../components/conversation/conversation-list/ConversationList";
import ChatBody from "../chatBody/ChatBody";

import "./ChatShell.scss";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import { CONVERSATION_TYPES } from "../../../constants";

export const CHAT_SHELL_TYPES = {
  ACTIVE_CHAT: 0,
  ARCHIVES: 1,
};

const ChatShell = ({
  agents,
  getConversations,
  title,
  loadConversations,
  type,
  openAddNewConvModal,
}) => {
  let { path } = useRouteMatch();
  let conversations = getConversations(CHAT_SHELL_TYPES.ARCHIVES) || [];

  const [showAddChatModal, setshowAddChatModal] = useState(false);
  const agentOptions = agents.map((agent) => ({
    value: agent.id,
    label: agent.name,
  }));

  useEffect(() => {
    if (
      type === CONVERSATION_TYPES.ARCHIVE_CONVERSATION &&
      !conversations.length
    ) {
      loadConversations(type);
    }
  });

  return (
    <div id="chat-container">
      {/* {type === CONVERSATION_TYPES.PRIVATE_CONVERSATION && showAddChatModal && (
        <AddConversationModal
          agentOptions={agentOptions}
          handleSubmit={addNewConversation}
          handleClose={() => setshowAddChatModal(false)}
        />
      )} */}

      <div className="conversations-wrapper">
        <div className="conversations-header">
          <h1 className="section-title">{title}</h1>
          <div className="convs-actions">
            {type === CONVERSATION_TYPES.PRIVATE_CONVERSATION && (
              <BsPlusCircle onClick={() => openAddNewConvModal(agentOptions)} />
            )}
          </div>
        </div>

        <ConversationList
          conversations={conversations}
          isActiveChat={
            type === CONVERSATION_TYPES.PRIVATE_CONVERSATION ||
            type === CONVERSATION_TYPES.TEAM_CONVERSATION
          }
        />
      </div>
      <Switch>
        <Route exact path={path}>
          <div className="no-conversation-selected">
            <h3>Please select a conversation.</h3>
          </div>
        </Route>

        <Route
          path={`${path}/:conversationId`}
          name="conversations body page"
          render={(props) => <ChatBody {...props} type={type} />}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state, { type }) => {
  const currentAgentId = state.basicState.userInfo._id;
  let agents = state.basicState.projectInfo.agents;
  agents = agents.filter((agent) => agent.id !== currentAgentId);

  let props = {
    getConversations: () => {
      if (type === CONVERSATION_TYPES.TEAM_CONVERSATION) {
        return state.conversationState.conversations.filter(
          (conv) => conv.type === CONVERSATION_TYPES.TEAM_CONVERSATION
        );
      } else if (type === CONVERSATION_TYPES.PRIVATE_CONVERSATION) {
        return state.conversationState.conversations.filter(
          (conv) => conv.type === CONVERSATION_TYPES.PRIVATE_CONVERSATION
        );
      } else if (type === CONVERSATION_TYPES.ARCHIVE_CONVERSATION) {
        return state.conversationState.archives;
      }
    },
    agents,

    title:
      type === CONVERSATION_TYPES.TEAM_CONVERSATION
        ? "Team Inbox"
        : type === CONVERSATION_TYPES.PRIVATE_CONVERSATION
        ? "Private Inbox"
        : "Archived Conversations",
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadConversations: (isArchived) => {
      if (isArchived) {
        dispatch(archivesRequested());
      }
    },

    openAddNewConvModal: (agentOptions) => {
      dispatch(openModalRequested("ADD_PRIVATE_CHAT", { agentOptions }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatShell);
