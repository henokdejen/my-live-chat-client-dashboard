import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {conversationsRequested } from '../../store/actions';
import ConversationSearch from '../../components/conversation/conversation-search/ConversationSearch';
import ConversationList from '../../components/conversation/conversation-list/ConversationList';
import ChatBody from './chatBody/ChatBody';

import './ChatShell.scss';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

const ChatShell = ({ getConversations, loadConversations }) => {
    let { path } = useRouteMatch();
    let conversations = getConversations()

    useEffect(() => {
        loadConversations();
    }, [loadConversations]);

    return (
        <div id="chat-container">
            <div className="conversations-wrapper">
                <ConversationSearch conversations={conversations} className="fasd" />
                <ConversationList conversations={conversations} />
            </div>
            <Switch>
                <Route exact path={path}>
                    <h3>Please select a topic.</h3>
                </Route>

                <Route
                    path={`${path}/:conversationId`}
                    name="conversations body page"
                    render={props => <ChatBody {...props} />} />

            </Switch>
        </div>
    );
}

const mapStateToProps = (state) => {
    let props = {
        getConversations: () => (state.conversationState.conversations),
    };
    return props
};

const mapDispatchToProps = dispatch => ({
    loadConversations: () => { dispatch(conversationsRequested()) }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatShell);