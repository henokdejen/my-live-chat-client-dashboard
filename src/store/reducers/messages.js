import * as types from "../../constants";
import { NEW_MESSAGE_SOUND } from "../../constants/notifications";
import { notify } from "../../services/notification";

const initialState = {
  messageDetails: {},
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ALL_MESSAGES_SUCCESS:
      const {
        conversationId,
        messages,
        hasMoreMessages,
        lastMessageId,
      } = action.payload;
      const currentConversationMapEntry = state.messageDetails[conversationId];
      const newConversationMapEntry = {
        hasMoreMessages,
        lastMessageId,
        messages: [],
      };

      // if (currentConversationMapEntry) {
      //     newConversationMapEntry.messages = [...currentConversationMapEntry.messages];
      // }

      // newConversationMapEntry.messages = [...newConversationMapEntry.messages, ...messages];
      newConversationMapEntry.messages = [...messages];
      newConversationMapEntry.initiallyLoaded = true;

      const newMessageDetails = { ...state.messageDetails };
      newMessageDetails[conversationId] = newConversationMapEntry;

      return { messageDetails: newMessageDetails };

    case types.MESSAGE_SENT_RESULT: {
      const { status, conversationId, message } = action.payload;
      const newConversationMapEntry = {
        ...state.messageDetails[conversationId],
      };
      newConversationMapEntry.messages = newConversationMapEntry.messages.map(
        (msg) => {
          if (msg.front_id == message.front_id) {
            // msg.status = status
            msg.status = status;
            msg.id = message.id;
            return msg;
          }
          return msg;
        }
      );

      const newMessageDetails = { ...state.messageDetails };
      newMessageDetails[conversationId] = newConversationMapEntry;
      return { messageDetails: newMessageDetails };
    }

    case types.NEW_MESSAGE_ADDED: {
      const { conversationId, message } = action.payload;
      let newConversationMapEntry;
      if (state.messageDetails[conversationId]) {
        newConversationMapEntry = { ...state.messageDetails[conversationId] };

        let lastElement = newConversationMapEntry.messages[0];

        if (lastElement.isSneakPreview) {
          newConversationMapEntry.messages[0] = message;
        } else {
          newConversationMapEntry.messages.unshift(message);
        }
      } else {
        newConversationMapEntry = {};
        newConversationMapEntry.initiallyLoaded = false;
        newConversationMapEntry.messages = [message];
      }
      if (!message.isSneakPreview && !message.isMyMessage) {
        notify(message.messageText);
        const audio = new Audio(NEW_MESSAGE_SOUND);
        audio.play();

      }
      const newMessageDetails = { ...state.messageDetails };
      newMessageDetails[conversationId] = newConversationMapEntry;
      return { messageDetails: newMessageDetails };
    }

    case types.MESSAGE_SEEN: {
      const { conversationId, messageId } = action.payload;
      // to be handled
      const newConversationMapEntry = {
        ...state.messageDetails[conversationId],
      };
      newConversationMapEntry.messages = newConversationMapEntry.messages.map(
        (msg) => {
          if (msg.id == messageId) {
            msg.seen = true;
          }
          return msg;
        }
      );

      const newMessageDetails = { ...state.messageDetails };
      newMessageDetails[conversationId] = newConversationMapEntry;
      return { messageDetails: newMessageDetails };
    }
    case types.LOGOUT_SUCCESS:
      return initialState;

    case types.REMOVE_MESSAGE_SUCCESS: {
      const { conversationId, type, messageIds } = action.payload;
      const newConversationMapEntry = {
        ...state.messageDetails[conversationId],
      };

      console.log("huhu", action.payload);

      newConversationMapEntry.messages = newConversationMapEntry.messages.filter(
        (msg) => !messageIds.includes(msg.id)
      );
      const newMessageDetails = { ...state.messageDetails };
      newMessageDetails[conversationId] = newConversationMapEntry;
      return { messageDetails: newMessageDetails };
    }

    default:
      return state;
  }
};

export default messagesReducer;
