import React from 'react';

import Button from '../../controls/buttons/Button';

import './NoConversations.scss';

const NoConversations = () => {
    return (
        <div id="no-coversation-layout">
            <div id="no-conversation-content">
                <h2>No Conversations</h2>
                <p>Currently you have no conversations.</p>
                <p>Wait until a vistor starts a conversation.</p>
            </div>
        </div>
    );
}

export default NoConversations;