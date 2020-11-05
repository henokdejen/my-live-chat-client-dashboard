import * as types from "../../constants";

export const messagesRequested = (
  type,
  conversationId,
  numberOfMessages,
  lastMessageId
) => ({
  type: types.FETCH_ALL_MESSAGES_REQUEST,
  payload: {
    type,
    conversationId,
    numberOfMessages,
    lastMessageId,
  },
});

export const messagesLoaded = (
  conversationId,
  messages,
  hasMoreMessages,
  lastMessageId
) => ({
  type: types.FETCH_ALL_MESSAGES_SUCCESS,
  payload: {
    conversationId,
    messages,
    hasMoreMessages,
    lastMessageId,
  },
});

export const sendMessage = (conversationId, message) => ({
  type: types.SEND_MESSAGE,
  payload: { conversationId, message },
});

export const newMessageAdded = (conversationId, message) => ({
  type: types.NEW_MESSAGE_ADDED,
  payload: { conversationId, message },
});

export const messasgeSent = (status, conversationId, message) => ({
  type: types.MESSAGE_SENT_RESULT,
  payload: { status, conversationId, message },
});

export const messageSeen = (conversationId, messageId) => ({
  type: types.MESSAGE_SEEN,
  payload: { conversationId, messageId },
});

export const reportMessageSeenRequested = (conversationId, messageId) => ({
  type: types.REPORT_MESSAGE_SEEN,
  payload: { conversationId, messageId },
});

export const removeMessageRequested = (conversationId, type, messageId) => ({
  type: types.REMOVE_MESSAGE_REQUEST,
  payload: { conversationId, type, messageId },
});

export const messagesRemoved = (conversationId, messageIds) => ({
  type: types.REMOVE_MESSAGE_SUCCESS,
  payload: { conversationId, messageIds },
});
