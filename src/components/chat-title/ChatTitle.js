import React from 'react';

import TrashIcon from '../controls/icons/trash-icon/TrashIcon';

import './ChatTitle.scss';

const ChatTitle = ({ selectedConversation, onDeleteConversation }) => {
    let chatTitleContents = null;

    if (selectedConversation) {
        chatTitleContents = (
            <>
                <span>{ selectedConversation.title }</span>
                <div onClick={ () => { onDeleteConversation(); } } title="Delete Conversation" className="delete-icon">
                    <TrashIcon />
                </div>
            </>
        );
    }

    return (
        <div id="chat-title">
            { chatTitleContents }
        </div>
    );
}

export default ChatTitle;