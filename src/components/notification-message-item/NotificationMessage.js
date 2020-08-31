import React from 'react';
import classNames from 'classnames';

import './NotificationMessage.scss'

export const NotificationMessage = ({isDate, message}) => {
    const className = classNames({
        'notification-msg': !isDate,
        'date-msg': isDate
    })
    return (
        <div className={className}>
            {message.messageText}
        </div>
    )
}
