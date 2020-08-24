import React from 'react';

import './NotificationMessage.scss'

export const NotificationMessage = ({message}) => {
    console.log(message)
    return (
        <div className="notification-msg">
            {message.messageText}
        </div>
    )
}
