import * as types from "../../constants";

export const conversationChanged = (conversationId) => ({
  type: types.SELECTED_CONVERSATION_CHANGED,
  conversationId,
});

export const conversationsRequested = () => ({
  type: types.FETCH_ALL_CONVERSATIONS_REQUEST,
});

export const conversationDeleted = () => ({
  type: types.DELETE_CONVERSATION_REQUEST,
});

export const conversationsLoading = () => ({
  type: "ConversationEvents.CONVERSATIONS_LOADING",
});

export const conversationLoaded = (conversations) => ({
  type: types.FETCH_ALL_CONVERSATIONS_SUCCESS,
  payload: {
    conversations,
    selectedConversation: conversations[0],
  },
});

export const newConversationAdded = (data) => {
  return {
    type: types.NEW_CONVERSATION_ADDED,
    payload: data,
  };
};

export const onlineStatusChange = (conversationID, status) => {
  return {
    type: types.ONLINE_STATUS_CHANGE,
    payload: { conversationID, status },
  };
};

export const visitorLeftChat = (conversationId) => {
  return {
    type: types.VISITOR_LEFT_CHAT,
    conversationId,
  };
};

export const markAllMessageSeenRequested = (conversationId) => {
  return { type: types.MARK_ALL_MESSAGES_SEEN, conversationId };
};

export const createConversationRequested = (browserID, history) => {
  return {
    type: types.CREATE_CONVERSATION_REQUEST,
    payload: { browserID, history },
  };
};

export const joinConversationRequested = (browserID, conversationID) => {
  return {
    type: types.JOIN_CONVERSATION_REQUEST,
    payload: { browserID, conversationID },
  };
};

export const conversationJoined = (conversationID) => {
  return { type: types.JOIN_CONVERSATION_SUCCESS, conversationID };
};

export const removeUnSeenMarker = (conversationID) => {
  return { type: types.REMOVE_UNSEEN_MARKER, conversationID };
};
