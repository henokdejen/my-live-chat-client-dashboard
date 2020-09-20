import { select } from "redux-saga/effects";
// import { ConversationEvents, MessageEvents, FETCH_ALL_CONVERSATIONS_REQUEST } from "../../constants";
import * as types from "../../constants";

const initialState = {
  conversations: [],
  selectedConversation: {},
  unSeenCount: 0,
};

initialState.selectedConversation = initialState.conversations[1];

const getUnSeenMsgsCount = (conversations) => {
  let sum = 0;
  conversations.forEach((conv) => {
    sum += conv.unSeenCount;
  });
  return sum;
};

const conversationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ALL_CONVERSATIONS_SUCCESS: {
      const newState = { ...state };
      newState.conversations = action.payload.conversations
        ? action.payload.conversations
        : [];
      newState.selectedConversation = action.payload.selectedConversation;
      newState.unSeenCount = getUnSeenMsgsCount(newState.conversations);
      return newState;
    }
    case types.NEW_CONVERSATION_ADDED: {
      const { payload } = action;
      const newState = { ...state };
      let selectedConversationIndex = newState.conversations.findIndex(
        (c) => c.id === payload.id
      );

      payload.isOnline = true;

      if (selectedConversationIndex >= 0) {
        newState.conversations[selectedConversationIndex] = payload;
      } else {
        newState.conversations.unshift(action.payload);
      }
      if (newState.conversations.length === 1) {
        newState.selectedConversation = action.payload;
      }
      return newState;
    }
    case types.SELECTED_CONVERSATION_CHANGED: {
      const newState = { ...state };
      newState.selectedConversation = newState.conversations.find(
        (conversation) => conversation.id === action.conversationId
      );
      // newState.unSeenCount -= newState.selectedConversation ? newState.selectedConversation.unSeenCount : 0
      return newState;
    }
    case types.DELETE_CONVERSATION_REQUEST: {
      if (state.selectedConversation) {
        const newState = { ...state };

        let selectedConversationIndex = newState.conversations.findIndex(
          (c) => c.id === newState.selectedConversation.id
        );
        newState.conversations.splice(selectedConversationIndex, 1);

        if (newState.conversations.length > 0) {
          if (selectedConversationIndex > 0) {
            --selectedConversationIndex;
          }

          newState.selectedConversation =
            newState.conversations[selectedConversationIndex];
        } else {
          newState.selectedConversation = null;
        }

        return newState;
      }

      return state;
    }
    case types.NEW_MESSAGE_ADDED: {
      const { conversationId, message } = action.payload;
      const newState = { ...state };

      let selectedConversationIndex = newState.conversations.findIndex(
        (c) => c.id === conversationId
      );

      let selectedConversation =
        newState.conversations[selectedConversationIndex];

      if (message.isSneakPreview) {
        if (
          selectedConversation.unSeenMarkerCount &&
          !selectedConversation.isLastPreview
        ) {
          selectedConversation.unSeenMarkerCount += 1;
          selectedConversation.isLastPreview = true;
        }
        return newState;
      } else {
        selectedConversation.latestMessageText = message.messageText;
        if (!message.isMyMessage) {
          selectedConversation.unSeenCount += 1;
          newState.unSeenCount += 1;
          if (!selectedConversation.isLastPreview) {
            selectedConversation.unSeenMarkerCount += 1;
          }
          selectedConversation.isLastPreview = false;
        }
      }

      newState.conversations[selectedConversationIndex] = selectedConversation;

      // newState.selectedConversation.latestMessageText = message.messageText
      return newState;
    }
    case types.VISITOR_GET_ONLINE:
    case types.VISITOR_GET_OFFLINE: {
      const { browserID, socketID } = action.payload;
      const newState = { ...state };

      let selectedConversationIndex = newState.conversations.findIndex(
        (c) => c.browserID === browserID
      );

      if (selectedConversationIndex >= 0) {
        newState.conversations[selectedConversationIndex].isOnline =
          action.type === types.VISITOR_GET_ONLINE;
        newState.conversations[selectedConversationIndex].joined = false;
      }

      return newState;
    }

    case types.JOIN_CONVERSATION_SUCCESS: {
      const { conversationID } = action;
      const newState = { ...state };

      let selectedConversationIndex = newState.conversations.findIndex(
        (c) => c.id === conversationID
      );

      if (selectedConversationIndex >= 0) {
        newState.conversations[selectedConversationIndex].joined = true;
      }

      return newState;
    }

    case types.VISITOR_LEFT_CHAT: {
      // visitor left chat to be handled
      return state;
    }

    case types.MARK_ALL_MESSAGES_SEEN: {
      const { conversationId } = action;
      const newState = { ...state };

      let selectedConversationIndex = newState.conversations.findIndex(
        (c) => c.id === conversationId
      );

      let unSeenCount =
        newState.conversations[selectedConversationIndex].unSeenCount;
      newState.conversations[selectedConversationIndex].unSeenCount = 0;
      newState.unSeenCount -= unSeenCount;

      // newState.selectedConversation.latestMessageText = message.messageText
      return newState;
    }
    case types.REMOVE_UNSEEN_MARKER: {
      const { conversationID } = action;
      const newState = { ...state };

      let selectedConversationIndex = newState.conversations.findIndex(
        (c) => c.id === conversationID
      );

      newState.conversations[selectedConversationIndex].unSeenMarkerCount = 0;
      return newState;
    }
    case types.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default conversationsReducer;
