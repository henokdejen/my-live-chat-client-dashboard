import { MessageStatus, MessageEvents } from "../../constants";

const initialState = {
    messageDetails: {}
}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case MessageEvents.MESSAGES_LOADED:
            const { conversationId, messages, hasMoreMessages, lastMessageId } = action.payload;
            const currentConversationMapEntry = state.messageDetails[conversationId];
            const newConversationMapEntry = { hasMoreMessages, lastMessageId, messages: [] };

            if (currentConversationMapEntry) {
                newConversationMapEntry.messages = [...currentConversationMapEntry.messages];
            }

            newConversationMapEntry.messages = [...newConversationMapEntry.messages, ...messages];
            newConversationMapEntry.initiallyLoaded = true
            
            const newMessageDetails = { ...state.messageDetails };
            newMessageDetails[conversationId] = newConversationMapEntry;

            return { messageDetails: newMessageDetails };

        case MessageEvents.MESSAGE_SENT_RESULT: {
            const { status, conversationId, message } = action.payload;
            const newConversationMapEntry = { ...state.messageDetails[conversationId] };
            newConversationMapEntry.messages = newConversationMapEntry.messages.map(msg => {
                if (msg.front_id == message.front_id) {
                    msg.status = status
                }
                return msg
            })

            const newMessageDetails = { ...state.messageDetails };
            newMessageDetails[conversationId] = newConversationMapEntry
            return { messageDetails: newMessageDetails };
        }

        case MessageEvents.NEW_MESSAGE: {
            const { conversationId, message } = action.payload;
            let newConversationMapEntry;
            if (state.messageDetails[conversationId]){
                newConversationMapEntry = { ...state.messageDetails[conversationId] };
                newConversationMapEntry.messages.unshift(message)
            } else {
                newConversationMapEntry = {}
                newConversationMapEntry.initiallyLoaded = false
                newConversationMapEntry.messages = [message]
            }
            const newMessageDetails = { ...state.messageDetails };
            newMessageDetails[conversationId] = newConversationMapEntry

            return { messageDetails: newMessageDetails };
        }

        default:
            return state;
    }
}

export default messagesReducer;