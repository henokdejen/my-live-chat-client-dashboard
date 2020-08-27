import { ConversationEvents, MessageEvents } from "../../constants";

const initialState = {
    conversations: [],
    selectedConversation: {},
};

initialState.selectedConversation = initialState.conversations[1];

const conversationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ConversationEvents.CONVERSATIONS_LOADED: {
            const newState = { ...state };
            newState.conversations = action.payload.conversations ? action.payload.conversations : [];
            newState.selectedConversation = action.payload.selectedConversation;
            return newState;
        }
        case ConversationEvents.NEW_CONVERSATION: {
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
        case ConversationEvents.SELECTED_CONVERSATION_CHANGED: {
            const newState = { ...state };
            newState.selectedConversation =
                newState.conversations.find(
                    conversation => conversation.id === action.conversationId
                );

            return newState;
        }
        case ConversationEvents.DELETE_CONVERSATION: {
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
        case MessageEvents.NEW_MESSAGE: {
            console.log('re', action.payload)
            const { conversationId, message } = action.payload;
            const newState = { ...state };

            let selectedConversationIndex =
                newState.conversations.findIndex(c => c.id === conversationId);

            console.log('old', newState.conversations, selectedConversationIndex, conversationId)
            newState.conversations[selectedConversationIndex].latestMessageText = message.messageText
            // newState.selectedConversation.latestMessageText = message.messageText
            return newState
        }
        case ConversationEvents.ONLINE_STATUS_CHANGE: {
            const { conversationID, status } = action.payload
            const newState = { ...state };

            let selectedConversationIndex =
                newState.conversations.findIndex(c => c.id === conversationID);

            newState.conversations[selectedConversationIndex].isOnline = status
            return newState
        }

        default:
            return state;
    }
}

export default conversationsReducer;