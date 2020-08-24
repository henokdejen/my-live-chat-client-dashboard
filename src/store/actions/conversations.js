import { ConversationEvents } from "../../constants";

export const conversationChanged = conversationId => ({
    type: ConversationEvents.SELECTED_CONVERSATION_CHANGED,
    conversationId
});

export const conversationsRequested = () => ({
    type: ConversationEvents.CONVERSATIONS_REQUESTED
});

export const conversationDeleted = () => ({
    type: ConversationEvents.DELETE_CONVERSATION
});

export const conversationsLoading = () => ({
    type: ConversationEvents.CONVERSATIONS_LOADING
})


export const conversationLoaded = (conversations) =>({
    type: ConversationEvents.CONVERSATIONS_LOADED,
    payload: {
        conversations,
        selectedConversation: conversations[0]
    }
})

export const newConversationAdded = (data) => {
    const conv =     { 
        id: data.conversationID,
        imageUrl: require('../../images/profiles/stacey.jpeg'),
        imageAlt: 'Stacey Wilson',
        title: data.visitor.id,
        createdAt: '30 mins ago',
        latestMessageText: '',
        messages: []
    }
    return {
        type: ConversationEvents.NEW_CONVERSATION,
        payload: conv
    }
}

