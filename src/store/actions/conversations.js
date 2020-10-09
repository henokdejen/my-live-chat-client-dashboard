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
  payload: { conversations },
});

export const newConversationAdded = (conversation) => {
  return {
    type: types.NEW_CONVERSATION_ADDED,
    payload: { conversation },
  };
};

export const assignedToConversation = (conversation) => {
  return {
    type: types.ASSIGNED_TO_CONVERSATION,
    payload: { conversation },
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
  return {
    type: types.MARK_ALL_MESSAGES_SEEN,
    payload: { conversationId },
  };
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

export const removeUnSeenMarker = (conversationId) => {
  return {
    type: types.REMOVE_UNSEEN_MARKER,
    payload: { conversationId },
  };
};

export const createNewConversation = (roomDetail) => {
  console.log("Ney wuch", roomDetail);
  return {
    type: types.CREATE_NEW_CONVERSATION_REQUEST,
    payload: { name: roomDetail.name, members: roomDetail.members },
  };
};

export const newConversationCreated = () => {
  return { type: types.CREATE_NEW_CONVERSATION_SUCCESS };
};

export const leaveConversationRequested = (conversationId) => {
  return {
    type: types.LEAVE_CONVERSATION_REQUEST,
    payload: { conversationId },
  };
};

export const conversationLeft = (conversationId) => {
  return {
    type: types.LEAVE_CONVERSATION_SUCCESS,
    payload: { conversationId },
  };
};

export const sendChatTransRequested = (conversationId) => {
  return {
    type: types.SEND_CONV_TRANS_REQUEST,
    payload: { conversationId },
  };
};

export const chatTransSent = (conversationId) => {
  return {
    type: types.SEND_CONV_TRANS_SUCCESS,
    payload: { conversationId },
  };
};

export const closeConvRequested = (conversationId) => {
  return {
    type: types.CLOSE_CONVERSATION_REQUEST,
    payload: { conversationId },
  };
};

export const convClosed = (conversationId) => {
  return {
    type: types.CLOSE_CONVERSATION_SUCCESS,
    payload: { conversationId },
  };
};

export const chatTransferRequested = (conversationId, agentId) => {
  return {
    type: types.TRANSFER_CHAT_REQUEST,
    payload: { conversationId, agentId },
  };
};

export const chatTransfered = (conversationId) => {
  return {
    type: types.TRANSFER_CHAT_SUCCESS,
    payload: { conversationId },
  };
};

// ADRCHIVES related
export const archivesRequested = () => ({
  type: types.FETCH_ALL_ARCHIVES_REQUEST,
});

export const archivesLoaded = (archives) => ({
  type: types.FETCH_ALL_ARCHIVES_SUCCESS,
  payload: {
    archives,
    selectedArchive: archives[0],
  },
});
