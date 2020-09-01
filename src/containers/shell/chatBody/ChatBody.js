import React from 'react'
import { connect } from 'react-redux';
import MessageList from '../../message/MessageList';
import ChatTitle from '../../../components/chat-title/ChatTitle';
import ChatForm from '../../../components/chat-form/ChatForm';
import NoConversations from '../../../components/conversation/no-conversations/NoConversations';
import { VisitorDetail } from '../../VisitorDetail/VisitorDetail';
import { sendMessage, joinConversationRequested } from '../../../store/actions';

const ChatBody = ({ selectedConversation, onMessageSubmitted, onJoinRequested }) => {

    let conversationContent = (
        <>
            <NoConversations></NoConversations>
        </>
    );

    if (selectedConversation) {
        conversationContent = (
            <>
                <MessageList conversationId={selectedConversation.id} />
            </>
        );
    }

    return (
        <>

            <div className="chat-body">
                <ChatTitle
                    selectedConversation={selectedConversation} />

                <div className="conversationContent">
                    {conversationContent}
                </div>
                {
                    selectedConversation && selectedConversation.isOnline &&
                    <ChatForm
                        selectedConversation={selectedConversation}
                        onMessageSubmitted={onMessageSubmitted}
                        onJoinRequested={onJoinRequested} />
                }

            </div>

            <div className="client-information-wrapper">
                <VisitorDetail />
            </div>
        </>
    )
}

const mapStateToProps = (state, { match: { params } }) => {
    let selectedConversation = state.conversationState.conversations.find(
        conversation => conversation.id === params.conversationId
    );
    let props = { selectedConversation };
    return props
};

const mapDispatchToProps = dispatch => ({
    onMessageSubmitted: (conversationId, message) => {
        dispatch(sendMessage(conversationId, message));
    },
    onJoinRequested: (browserID, conversationID) => {
        dispatch(joinConversationRequested(browserID, conversationID))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatBody);
