import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { conversationChanged, newMessageAdded, newMessageTobeSent, conversationDeleted, conversationsRequested, sendMessage } from '../../store/actions';
import ConversationSearch from '../../components/conversation/conversation-search/ConversationSearch';
import NoConversations from '../../components/conversation/no-conversations/NoConversations';
import ConversationList from '../../components/conversation/conversation-list/ConversationList';
import NewConversation from '../../components/conversation/new-conversation/NewConversation';
import ChatTitle from '../../components/chat-title/ChatTitle';
import MessageList from '../message/MessageList';
import ChatForm from '../../components/chat-form/ChatForm';

import './ChatShell.scss';

const ChatShell = ({
    getConversations,
    selectedConversation,
    conversationChanged,
    onMessageSubmitted,
    onDeleteConversation,
    loadConversations
}) => {

    let conversations = getConversations()

    useEffect(() => {
        loadConversations();
    }, [loadConversations]);

    let conversationContent = (
        <>
            <NoConversations></NoConversations>
        </>
    );

    if (conversations.length > 0) {
        conversationContent = (
            <>
                <MessageList conversationId={selectedConversation.id} />
            </>
        );
    }


    return (
        <div id="chat-container">
            <div className="conversations-wrapper">
                <ConversationSearch conversations={conversations} className="fasd" />
                <ConversationList
                    onConversationItemSelected={conversationChanged}
                    conversations={conversations}
                    selectedConversation={selectedConversation} />

            </div>

            <div className="chat-body">
                {/* <ChatTitle
                    selectedConversation={selectedConversation}
                    onDeleteConversation={onDeleteConversation} />

                <div className="conversation-content">
                    {conversationContent}
                </div>
                <ChatForm
                    selectedConversation={selectedConversation}
                    onMessageSubmitted={onMessageSubmitted} /> */}

                <ChatTitle
                    selectedConversation={selectedConversation}
                    onDeleteConversation={onDeleteConversation} />
                {/* <div className="yehone"/> */}
                <div className="conversationContent">
                    {conversationContent}
                </div>
                <ChatForm
                    selectedConversation={selectedConversation}
                    onMessageSubmitted={onMessageSubmitted} />
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    // updater porps is there just to make update the content always.
    let props = {
        getConversations: () => (state.conversationState.conversations),
        selectedConversation: state.conversationState.selectedConversation
    };

    return props
};

const mapDispatchToProps = dispatch => ({
    conversationChanged: conversationId => dispatch(conversationChanged(conversationId)),
    onMessageSubmitted: (conversationId, message) => {
        dispatch(sendMessage(conversationId, message));
    },
    onDeleteConversation: () => { dispatch(conversationDeleted()); },
    loadConversations: () => { dispatch(conversationsRequested()) }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatShell);