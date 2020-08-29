// import { ConversationEvents, MessageEvents, FETCH_ALL_CONVERSATIONS_REQUEST } from "../../constants";
import * as types from '../../constants';



const initialState = {
    conversations: [],
    selectedConversation: {},
};

initialState.selectedConversation = initialState.conversations[1];

const conversationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_ALL_CONVERSATIONS_SUCCESS:{
            const newState = { ...state };
            newState.conversations = action.payload.conversations ? action.payload.conversations : [];
            newState.selectedConversation = action.payload.selectedConversation;
            return newState;
        }
        case types.NEW_CONVERSATION_ADDED: {
            const { payload } = action
            const newState = { ...state };
            let selectedConversationIndex =
                newState.conversations.findIndex(c => c.id === payload.id);

            if (selectedConversationIndex >= 0) {
                newState.conversations[selectedConversationIndex] = payload
            } else {
                newState.conversations.unshift(action.payload)
            }
            if (newState.conversations.length === 1) {
                newState.selectedConversation = action.payload
            }
            return newState
        }
        case types.SELECTED_CONVERSATION_CHANGED: {
            const newState = { ...state };
            newState.selectedConversation =
                newState.conversations.find(
                    conversation => conversation.id === action.conversationId
                );

            return newState;
        }
        case types.DELETE_CONVERSATION_REQUEST: {
            if (state.selectedConversation) {
                const newState = { ...state };

                let selectedConversationIndex =
                    newState.conversations.findIndex(c => c.id === newState.selectedConversation.id);
                newState.conversations.splice(selectedConversationIndex, 1);

                if (newState.conversations.length > 0) {
                    if (selectedConversationIndex > 0) {
                        --selectedConversationIndex;
                    }

                    newState.selectedConversation = newState.conversations[selectedConversationIndex];
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

            let selectedConversationIndex =
                newState.conversations.findIndex(c => c.id === conversationId);

            newState.conversations[selectedConversationIndex].latestMessageText = message.messageText
            // newState.selectedConversation.latestMessageText = message.messageText
            return newState
        }
        case types.ONLINE_STATUS_CHANGE: {
            const { conversationID, status } = action.payload
            const newState = { ...state };

            let selectedConversationIndex =
                newState.conversations.findIndex(c => c.id === conversationID);

            newState.conversations[selectedConversationIndex].isOnline = status
            return newState
        }

        case types.VISITOR_LEFT_CHAT: {
            // visitor left chat to be handled
            return state
        }

        default:
            return state;
    }
}

export default conversationsReducer;