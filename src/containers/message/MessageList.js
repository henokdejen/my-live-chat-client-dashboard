import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { messagesRequested, reportMessageSeenRequested, markAllMessageSeenRequested } from '../../store/actions';
import Message from '../../components/message/Message';
import './MessageList.scss';
import { NotificationMessage } from '../../components/notification-message-item/NotificationMessage';

const MessageList = ({
    conversationId,
    getMessagesForConversation,
    loadMessages,
    reportMessageSeen,
    markAllMessagesSeen
}) => {
    const messageDetails = getMessagesForConversation(conversationId);

    const messages = messageDetails ? messageDetails.messages : null;
    const initialMsgLoaded = messageDetails ? messageDetails.initiallyLoaded : false
    let messageItems = null;

    let wrapperRef

    useEffect(() => {
        if (!messageDetails || !initialMsgLoaded) {
            loadMessages(conversationId, null);
        } else {
            wrapperRef.scrollTop = wrapperRef.scrollHeight
            markAllMessagesSeen(conversationId) 
        }
    }, [messageDetails, loadMessages, conversationId])

    // useEffect(() => {
    //     if (messageDetails) {
    //         wrapperRef.scrollTop = wrapperRef.scrollHeight
    //         markAllMessagesSeen(conversationId)
    //     }
    // }, [messages])

    if (messages && messages.length > 0) {
        messageItems = messages.map((message, index) => {
            return (message.isNotification) ?
                <NotificationMessage
                    reportMessageSeen={reportMessageSeen}
                    message={message}
                    key={index} /> :
                <Message
                    key={index}
                    reportMessageSeen={reportMessageSeen}
                    isMyMessage={message.isMyMessage}
                    message={message} />;
        });
    }

    return (
        <div id="chat-message-list" ref={(el) => wrapperRef = el}>
            {messageItems}
        </div>
    );
}

const mapStateToProps = state => {
    const getMessagesForConversation = conversationId => {
        return state.messagesState.messageDetails[conversationId];
    }

    return {
        getMessagesForConversation
    }
}

const mapDispatchToProps = dispatch => {
    const loadMessages = (conversationId, lastMessageId) => {
        dispatch(messagesRequested(conversationId, 5, lastMessageId));
    }

    const reportMessageSeen = (conversationID, messageID) => {
        dispatch(reportMessageSeenRequested(conversationID, messageID))
    }

    const markAllMessagesSeen = (conversationID) => {
        dispatch(markAllMessageSeenRequested(conversationID))
    }

    return { loadMessages, reportMessageSeen, markAllMessagesSeen };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageList);