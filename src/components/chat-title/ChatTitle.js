import React from 'react';

import TrashIcon from '../controls/icons/trash-icon/TrashIcon';

import './ChatTitle.scss';
import { DropDownMenu } from '../controls/dropDownMenu/DropDownMenu';
import { DDMenuItem } from '../controls/dropDownMenu/DDMenuItem/DDMenuItem';

const ChatTitle = ({ selectedConversation, onDeleteConversation }) => {
    let chatTitleContents = null;

    const moreIcon = <span>more</span>

    if (selectedConversation) {
        chatTitleContents = (
            <>
                <span className="conv-title">{ selectedConversation.title }</span>
                <DropDownMenu trigger = {moreIcon} placement="bottomRight">
                    <DDMenuItem>Transfer to</DDMenuItem>
                    <DDMenuItem>Send Transcript</DDMenuItem>
                    <DDMenuItem>Ban this visitor</DDMenuItem>
                    <DDMenuItem>Leave</DDMenuItem>
                </DropDownMenu>
                {/* <div onClick={ () => { onDeleteConversation(); } } title="Delete Conversation" className="delete-icon">
                    <TrashIcon />
                </div> */}
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