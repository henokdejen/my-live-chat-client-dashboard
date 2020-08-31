import React from 'react';
import { BsChatFill, BsFillPeopleFill } from 'react-icons/bs';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './sidebar.scss';
import { Badge } from '../../components/controls/badge/Badge';

const SideBar = ({ onlineVisitorCount, totalUnseenCount }) => {
    const menus = [
        {

            title: 'Chat',
            icon: <BsChatFill />,
            path: '/conversations',
            showBadge: true,
            badgeValue: totalUnseenCount
        },
        {

            title: 'Visitors',
            icon: <BsFillPeopleFill />,
            path: '/visitors',
            showBadge: true,
            badgeValue: onlineVisitorCount
        }
    ]

    return (
        <div className="side-bar">
            {
                menus.map((menu, index) => (

                    <NavLink
                        to={menu.path}
                        key={index}
                        className="nav-item"
                        activeClassName="active">
                        {menu.icon} {menu.title}
                        {
                            (menu.showBadge && menu.badgeValue > 0) &&
                            <Badge className="side-nav-badge">{menu.badgeValue}</Badge>}
                    </NavLink>
                ))
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    let props = {
        onlineVisitorCount: state.visitorsState.onlineVisitors.length,
        totalUnseenCount: state.conversationState.unSeenCount
    };
    return props
};

// const mapDispatchToProps = dispatch => ({
//     loadConversations: () => { 
//         dispatch(conversationsRequested()) 
//         dispatch(allOnlineVisitorsRequested())
//     }
// });

export default connect(mapStateToProps)(SideBar);
