import React, { useState } from 'react';

import FormButton from '../controls/buttons/FormButton';
import AttachmentIcon from '../controls/icons/attachment-icon/AttachmentIcon';

import './ChatForm.scss';
import { MessageStatus } from '../../constants';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import { BsPaperclip } from 'react-icons/bs'
import { FaRegSmileWink } from 'react-icons/fa'

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
    const [msgType, setmsgType] = useState('message')
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

    const handleJoinFormSubmit = (e) => {
        e.preventDefault()
        console.log('request for join')
    }

    const handleMsgInputFormSubmit = (e) => {
        e.preventDefault();
        if (!isMessageEmpty(textMessage)) {
            setShowPicker(false)
            onMessageSubmitted(conversationId, createTextMessage(textMessage));
            setTextMessage('');
        }
    };

    const getJoinForm = () => (
        <form id="join-form" onSubmit={handleJoinFormSubmit}>
            <div className="join-msg"> You are not assigned to this conversation</div>
            <FormButton>Join Conversation</FormButton>
        </form>
    )

    const getMsgInputForm = () => (
        <form id="msg-input-form" onSubmit={handleMsgInputFormSubmit}>
            {showPicker &&
                <Picker
                    style={{ position: 'absolute', bottom: '85px', right: '25px' }}
                    onSelect={addEmoji}
                    showPreview={false}
                />}

            <div className="actual-input">
                <input
                    type="text"
                    placeholder="type a message"
                    className="inputText"
                    value={textMessage}
                    onChange={(e) => { setTextMessage(e.target.value); }} />
                <BsPaperclip className="input-icons" />
                <FaRegSmileWink id="emoji-picker-toggler" className="input-icons toggle-emoji-picker" onClick={togglePickerView} />

            </div>

            <div className="input-controls">
                <span
                    className={`msg-type ${msgType === 'message' ? 'active' : ''}`}
                    onClick={e => setmsgType('message')}>Message</span>
                <span
                    className={`msg-type ${msgType === 'whisper' ? 'active' : ''}`}
                    onClick={e => setmsgType('whisper')}>Whisper</span>
                <FormButton disabled={disableButton} >Send</FormButton>
            </div>


        </form>
    )

    if (selectedConversation) {
        conversationId = selectedConversation.id
        formContents = selectedConversation.joined ? getMsgInputForm(): getJoinForm()
    }

    return (
        <div id="chat-form" onSubmit={handleFormSubmit}>
            {formContents}
        </div>
    );
}

export default ChatForm;