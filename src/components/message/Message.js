import React from 'react';
import classNames from 'classnames';

import './Message.scss';
import { MessageStatus } from '../../constants';

const isOnlyEmoji = (str) => {
    const ranges = [
        '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
        '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
        '\ud83d[\ude80-\udeff]', // U+1F680 to U+1F6FF
        ' ', // Also allow spaces
      ].join('|');
      
      const removeEmoji = str => str.replace(new RegExp(ranges, 'g'), '');
      
      const isOnlyEmojis = str => !removeEmoji(str).length;
      return isOnlyEmojis(str)
}

const Message = ({ isMyMessage, message }) => {
    const messageClass = classNames('message-row', {
        'you-message': isMyMessage,
        'other-message': !isMyMessage
    });

    const msgTextClass = classNames('message-text', {
        'not-sent-yet': isMyMessage && (message.status === MessageStatus.PENDING),
        'emoji-msg': isOnlyEmoji(message.messageText)
    })

    const imageThumbnail = isMyMessage ? null : <img src={message.imageUrl} alt={message.imageAlt} />;

    return (
        <div className={messageClass}>
            <div className="message-content">
                {imageThumbnail}
                <div className={msgTextClass}>
                    {message.messageText}
                </div>
                <div className="message-time">{
                    message.status === MessageStatus.PENDING ?
                        'sending...' :
                        message.createdAt}</div>
            </div>
        </div>
    );
}

export default Message;