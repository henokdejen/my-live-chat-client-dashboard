import React, { useState } from 'react';

import FormButton from '../controls/buttons/FormButton';
import AttachmentIcon from '../controls/icons/attachment-icon/AttachmentIcon';

import './ChatForm.scss';
import { MessageStatus } from '../../constants';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const isMessageEmpty = (textMessage) => {
    return adjustTextMessage(textMessage).length === 0;
}

const adjustTextMessage = (textMessage) => {
    return textMessage.trim();
};

const createTextMessage = (textMessage) => {
    return {
        front_id: Date.now(),
        imageUrl: null,
        imageAlt: null,
        messageText: textMessage,
        createdAt: '1 week ago',
        isMyMessage: true,
        status: MessageStatus.PENDING
    }
}

const ChatForm = ({ selectedConversation, onMessageSubmitted }) => {
    const [textMessage, setTextMessage] = useState('');
    const [showPicker, setShowPicker] = useState(false)
    const disableButton = isMessageEmpty(textMessage);
    let formContents = null;
    let handleFormSubmit = null;

    let conversationId = null

    const addEmoji = e => {
        let emoji = e.native;
        setTextMessage(textMessage + emoji);
    };

    const togglePickerView = (e) => {
        setShowPicker(!showPicker)
    }

    if (selectedConversation) {
        conversationId = selectedConversation.id
        formContents = (
            <>
                {showPicker &&
                    <Picker
                        style={{ position: 'absolute', bottom: '70px', right: '70px' }}
                        onSelect={addEmoji}
                        showPreview={false}
                    />}

                <div title="Add Attachment" className="attachment-icon">
                    <AttachmentIcon />
                </div>
                <input
                    type="text"
                    placeholder="type a message"
                    className="inputText"
                    value={textMessage}
                    onChange={(e) => { setTextMessage(e.target.value); }} />

                <span id="emoji-picker-toggler" className="toggle-emoji-picker" onClick={togglePickerView} >
                    😄
                </span>
                <FormButton disabled={disableButton} >Send</FormButton>
            </>
        );

        handleFormSubmit = (e) => {
            e.preventDefault();
            if (!isMessageEmpty(textMessage)) {
                setShowPicker(false)
                onMessageSubmitted(conversationId, createTextMessage(textMessage));
                setTextMessage('');
            }
        };
    }

    return (
        <form id="chat-form" onSubmit={handleFormSubmit}>
            {formContents}
        </form>
    );
}

export default ChatForm;