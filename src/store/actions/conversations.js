import * as types from "../../constants";

export const conversationChanged = conversationId => ({
    type: types.SELECTED_CONVERSATION_CHANGED,
    conversationId
});

export const conversationsRequested = () => ({
    type: types.FETCH_ALL_CONVERSATIONS_REQUEST
});

export const conversationDeleted = () => ({
    type: types.DELETE_CONVERSATION_REQUEST
});

export const conversationsLoading = () => ({
    type: "ConversationEvents.CONVERSATIONS_LOADING"
})


export const conversationLoaded = (conversations) =>({
    type: types.FETCH_ALL_CONVERSATIONS_SUCCESS,
    payload: {
        conversations,
        selectedConversation: conversations[0]
    }
})

export const newConversationAdded = (data) => {
    return {
        type: types.NEW_CONVERSATION_ADDED,
        payload: data
    }
}

export const onlineStatusChange = (conversationID, status) => {
    return {
        type: types.ONLINE_STATUS_CHANGE,
        payload: {conversationID, status}
    }
}


export const visitorLeftChat = (conversationId) => {
    return {
        type: types.VISITOR_LEFT_CHAT,
        conversationId
    }
}
