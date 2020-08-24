import { MessageEvents } from "../../constants";

export const newMessageAdded = textMessage => ({
    type: 'NEW_MESSAGE_ADDED',
    textMessage
});

export const messagesRequested = (conversationId, numberOfMessages, lastMessageId) => ({
    type: 'MESSAGES_REQUESTED',
    payload: {
        conversationId,
        numberOfMessages,
        lastMessageId
    }
});

export const messagesLoaded = (conversationId, messages, hasMoreMessages, lastMessageId) => ({
    type: 'MESSAGES_LOADED',
    payload: {
        conversationId,
        messages,
        hasMoreMessages,
        lastMessageId
    }
});

export const sendMessage = (conversationId, message) => ({
    type: 'SEND_MESSAGE',
    payload: { conversationId, message }
})

export const showNewMessage = (conversationId, message) => ({
    type: MessageEvents.NEW_MESSAGE,
    payload: { conversationId, message }
})

export const messasgeSent = (status, conversationId, message) => ({
    type: 'MESSAGE_SENT_RESULT',
    payload: { status, conversationId, message }
})