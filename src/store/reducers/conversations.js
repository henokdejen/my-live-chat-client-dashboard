import * as types from "../../constants";
import { ACTIVE_CONVERSATION_TYPES, CONVERSATION_TYPES } from "../../constants";
import { NEW_MESSAGE_SOUND } from "../../constants/notifications";

const initialState = {
  conversations: [],
  archives: [],
  selectedConversation: {},
  selectedArchive: {},
  unSeenTeamCount: 0,
  unSeenPrivateCount: 0,
};

// initialState.selectedConversation = initialState.conversations[1];

const getUnSeenMsgsCount = (conversations) => {
  let unSeenTeamCount = 0,
    unSeenPrivateCount = 0;
  conversations.forEach((conv) => {
    if (conv.type === CONVERSATION_TYPES.PRIVATE_CONVERSATION)
      unSeenTeamCount += conv.unSeenCount;
    else if (conv.type === CONVERSATION_TYPES.TEAM_CONVERSATION)
      unSeenPrivateCount += conv.unSeenCount;
  });
  return { unSeenTeamCount, unSeenPrivateCount };
};

// const getConvs = (type, newState) => {
//   let convs = [];
//   if (type === CONVERSATION_TYPES.TEAM_CONVERSATION) {
//     convs = newState.conversations;
//   } else if (type === CONVERSATION_TYPES.PRIVATE_CONVERSATION) {
//     convs = newState.privateConversations;
//   }
//   return convs;
// };

const conversationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ALL_CONVERSATIONS_SUCCESS: {
      console.log('%PUBLIC_URL%') 
      const { conversations } = action.payload;
      const newState = { ...state };
      newState.conversations = conversations ? conversations : [];
      newState.selectedConversation = conversations.length
        ? conversations[0]
        : {};

      const { unSeenTeamCount, unSeenPrivateCount } = getUnSeenMsgsCount(
        conversations
      );
      newState.unSeenTeamCount = unSeenTeamCount;
      newState.unSeenPrivateCount = unSeenPrivateCount;

      return newState;
    }
    case types.NEW_CONVERSATION_ADDED: {
      const { conversation } = action.payload;
      let selectedConversationIndex = state.conversations.findIndex(
        (c) => c.id === conversation.id
      );
      console.log("ene", selectedConversationIndex);
      if (selectedConversationIndex === -1) {
        const newState = { ...state };
        conversation.isOnline = true;
        newState.conversations.unshift(conversation);
        if (newState.conversations.length === 1) {
          newState.selectedConversation = conversation;
        }

        return newState;
      }

      return state;
    }

    case types.ASSIGNED_TO_CONVERSATION: {
      const { conversation } = action.payload;
      const newState = { ...state };

      let existingConversation = newState.conversations.find(
        (c) => c.id === conversation.id
      );

      if (existingConversation) {
        existingConversation.joined = true; // do additiona codes
      } else {
        newState.conversations.unshift(conversation);
      }

      console.log("you said what!");

      return newState;
    }

    case types.TRANSFER_CHAT_SUCCESS: {
      const { conversationId } = action.payload;
      const newState = { ...state };
      let selectedConversation = newState.conversations.find(
        (c) => c.id === conversationId
      );
      selectedConversation.joined = false;
      return newState;
    }

    case types.LEAVE_CONVERSATION_SUCCESS: {
      const { conversationId } = action.payload;
      const newState = { ...state };
      let convs = newState.conversations;
      let selectedConversation = convs.find((c) => c.id === conversationId);
      selectedConversation.joined = false;

      if (
        selectedConversation.type === CONVERSATION_TYPES.PRIVATE_CONVERSATION
      ) {
        //let's remove it
        newState.conversations = convs.filter(
          (conv) => conv.id !== conversationId
        );
      }
      return newState;
    }

    case types.SELECTED_CONVERSATION_CHANGED: {
      const newState = { ...state };
      newState.selectedConversation = newState.conversations.find(
        (conversation) => conversation.id === action.conversationId
      );
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

      let convs = newState.conversations;
      let selectedConversation = convs.find((c) => c.id === conversationId);

      if (!selectedConversation.joined) {
        selectedConversation.latestMessageText = message.messageText;
        return newState;
      }

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
          if (
            selectedConversation.type === CONVERSATION_TYPES.TEAM_CONVERSATION
          ) {
            newState.unSeenTeamCount += 1;
          } else {
            newState.unSeenPrivateCount += 1;
          }
          if (!selectedConversation.isLastPreview) {
            selectedConversation.unSeenMarkerCount += 1;
          }
          selectedConversation.isLastPreview = false;
        }
      }

      // newState.conversations[selectedConversationIndex] = selectedConversation;

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
      const { conversationId } = action.payload;
      const newState = { ...state };

      let convs = newState.conversations;
      let selectedConversation = convs.find((c) => c.id === conversationId);

      const unSeenCount = selectedConversation.unSeenCount;

      if (selectedConversation.type === CONVERSATION_TYPES.TEAM_CONVERSATION) {
        newState.unSeenTeamCount -= unSeenCount;
      } else if (
        selectedConversation.type === CONVERSATION_TYPES.PRIVATE_CONVERSATION
      ) {
        newState.unSeenPrivateCount -= unSeenCount;
      }
      selectedConversation.unSeenCount = 0;
      return newState;
    }
    case types.REMOVE_UNSEEN_MARKER: {
      const { conversationId } = action.payload;
      const newState = { ...state };
      let convs = newState.conversations;
      const selectedConversation = convs.find((c) => c.id === conversationId);
      selectedConversation.unSeenMarkerCount = 0;
      return newState;
    }
    case types.LOGOUT_SUCCESS:
      return initialState;

    case types.FETCH_ALL_ARCHIVES_SUCCESS: {
      const { archives } = action.payload;
      console.log("ager", archives);
      const newState = { ...state };
      newState.archives = archives ? archives : [];
      newState.selectedArchive = archives.length ? archives[0] : {};
      return newState;
    }
    default:
      return state;
  }
};

export default conversationsReducer;
