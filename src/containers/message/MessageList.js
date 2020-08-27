import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { messagesRequested } from '../../store/actions';
import Message from '../../components/message/Message';
import './MessageList.scss';
import { NotificationMessage } from '../../components/notification-message-item/NotificationMessage';

const MessageList = ({ conversationId, getMessagesForConversation, loadMessages }) => {
    const messageDetails = getMessagesForConversation(conversationId);
    const messages = messageDetails ? messageDetails.messages : null;
    const initialMsgLoaded = messageDetails ? messageDetails.initiallyLoaded : false
    let messageItems = null;

    useEffect(() => {
        if (!messageDetails || !initialMsgLoaded) {
            loadMessages(conversationId, null);
        }
    }, [messageDetails, loadMessages, conversationId])

    if (messages && messages.length > 0) {
        messageItems = messages.map((message, index) => {
            return (message.isNotification) ?
                <NotificationMessage message={message} /> :
                <Message
                    key={index}
                    isMyMessage={message.isMyMessage}
                    message={message} />;
        });
    }

    return (
        <div id="chat-message-list">
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

    return { loadMessages };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageList);