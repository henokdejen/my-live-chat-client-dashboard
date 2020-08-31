const getFormattedLocalTime = (milliseconds) => {
    let date = new Date(milliseconds)
    let dateFormated = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    return dateFormated
}

export const getAssignedConversation = (assigned) => {
    let visitor = assigned.visitor
    let now = Date.now()
    return {
        id: assigned.conversationID,
        imageUrl: require('../../images/profiles/daryl.png'),
        imageAlt: 'Daryl Duckmanton',
        title: visitor.email ? assigned.email : assigned.conversationID,
        created_at: now,
        browserID: visitor.browserID,
        unSeenCount: 0,
        createdAt: getFormattedLocalTime(now),
        latestMessageText: '',
    }
}

export const getSortedConversations = (conversations) => {
    let r = conversations.sort((a, b) => {
        if (a.updatedAt > b.updatedAt) return -1;
        if (b.updatedAt > a.updatedAt) return 1;
        return 0;
    })
    return r

}

export const getConversation = (dataFromServer) => {
    let latestMessage =
        dataFromServer.messages && dataFromServer.messages.length ? dataFromServer.messages[0].text : ''
    return {
        id: dataFromServer.conversationID,
        agency: dataFromServer.agency,
        imageUrl: require('../../images/profiles/daryl.png'),
        imageAlt: 'Daryl Duckmanton',
        ip: dataFromServer.ip ? dataFromServer.ip : '',
        lastAssignedAgent: dataFromServer.lastAssignedAgent ? dataFromServer.lastAssignedAgent : '',
        numberOfMessages: dataFromServer.numberOfMessages ? dataFromServer.numberOfMessages : 0,
        title: !dataFromServer.email ? dataFromServer.email : dataFromServer.conversationID,
        createdAtMs: dataFromServer.createdAt.time,
        updatedAtMs: dataFromServer.updatedAt.time,
        browserID: dataFromServer.browserID,
        unSeenCount: dataFromServer.agentUnseenCount ? dataFromServer.agentUnseenCount : 0,
        createdAt: getFormattedLocalTime(dataFromServer.createdAt.time),
        updatedAt: getFormattedLocalTime(dataFromServer.updatedAt.time),
        latestMessageText: latestMessage,
        joined: false
    }
}
export const MESSAGE_TYPES = {
    INCOMING: 0,
    OUTGOING: 1,
    FROM_SYSTEM: 2
}

export const getMessage = (dataFromServer) => {
    let isNotification = !dataFromServer.sender
    console.log('return back', dataFromServer.messageID)
    return {
        id: dataFromServer.messageID ? dataFromServer.messageID: dataFromServer._id,
        imageUrl: require('../../images/profiles/daryl.png'),
        imageAlt: null,
        conversationID: dataFromServer.conversationID,
        seen: true,
        messageText: dataFromServer.text,
        createdAt: getFormattedLocalTime(dataFromServer.createdAt.time),
        isNotification,
        isMyMessage: !isNotification && (!dataFromServer.sender.visitor),
    }
}

// export const createMessageInput = (textMsg, conversationID) => {

// }

