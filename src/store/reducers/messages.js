import * as types from "../../constants";

const initialState = {
    messageDetails: {}
}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_ALL_MESSAGES_SUCCESS:
            const { conversationId, messages, hasMoreMessages, lastMessageId } = action.payload;
            const currentConversationMapEntry = state.messageDetails[conversationId];
            const newConversationMapEntry = { hasMoreMessages, lastMessageId, messages: [] };

            // if (currentConversationMapEntry) {
            //     newConversationMapEntry.messages = [...currentConversationMapEntry.messages];
            // }

            // newConversationMapEntry.messages = [...newConversationMapEntry.messages, ...messages];
            newConversationMapEntry.messages = [...messages];
            newConversationMapEntry.initiallyLoaded = true
            
            const newMessageDetails = { ...state.messageDetails };
            newMessageDetails[conversationId] = newConversationMapEntry;

            return { messageDetails: newMessageDetails };

        case types.MESSAGE_SENT_RESULT: {
            const { status, conversationId, message } = action.payload;
            const newConversationMapEntry = { ...state.messageDetails[conversationId] };
            newConversationMapEntry.messages = newConversationMapEntry.messages.map(msg => {
                if (msg.front_id == message.front_id) {
                    // msg.status = status
                    message.status = status
                    return msg
                }
                return msg
            })

            const newMessageDetails = { ...state.messageDetails };
            newMessageDetails[conversationId] = newConversationMapEntry
            return { messageDetails: newMessageDetails };
        }

        case types.NEW_MESSAGE_ADDED: {
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

        case types.MESSAGE_SEEN: {
            const {conversationId, messageId} = action.payload
            // to be handled
            const newConversationMapEntry = { ...state.messageDetails[conversationId] };
            newConversationMapEntry.messages = newConversationMapEntry.messages.map(msg => {
                if (msg.id == messageId) {
                    msg.seen = true
                }
                return msg
            })

            const newMessageDetails = { ...state.messageDetails };
            newMessageDetails[conversationId] = newConversationMapEntry
            return { messageDetails: newMessageDetails };
        }

        default:
            return state;
    }
}

export default messagesReducer;