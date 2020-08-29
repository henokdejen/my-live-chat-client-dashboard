import React from 'react';
import classNames from 'classnames';

import './ConversationItem.scss';
import { NavLink, useRouteMatch } from 'react-router-dom';

const ConversationItem = ({ conversation }) => {
    let { url } = useRouteMatch();

    const onlineStatusCN = classNames('online-status-indicator', {
        'online': conversation.isOnline
    })

    return (
        <NavLink
            className='conversation'
            activeClassName='active'
            to={`${url}/${conversation.id}`}>

            <div className="avatar-wrapper">
                <img src={conversation.imageUrl} alt={conversation.imageAlt} />
                <span className={onlineStatusCN}></span>
            </div>
            <div className="title-text">{conversation.title}</div>
            <div className="created-date">{conversation.createdAt}</div>
            <div className="conversation-message">
                {conversation.latestMessageText}
            </div>

            {/* <div className="unseen-msgs-count">2</div> */}
        </NavLink>
    );
}

export default ConversationItem;