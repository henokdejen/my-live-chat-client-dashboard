import React from "react";
import {
  BsChatFill,
  BsFillPeopleFill,
  BsFillGearFill,
  BsEnvelopeFill,
  BsBarChartFill,
  BsFillArchiveFill,
} from "react-icons/bs";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import "./sidebar.scss";
import { Badge } from "../../components/controls/badge/Badge";

const SideBar = ({
  onlineVisitorCount,
  unSeenTeamCount,
  unSeenPrivateCount,
  openTicketsCount,
}) => {
  const menus = [
    {
      title: "Home",
      icon: <BsFillGearFill />,
      path: "/home",
    },
    {
      title: "Team Inbox",
      icon: <BsChatFill />,
      path: "/teamInbox",
      showBadge: true,
      badgeValue: unSeenTeamCount,
    },
    {
      title: "Private Inbox",
      icon: <BsChatFill />,
      path: "/privateInbox",
      showBadge: true,
      badgeValue: unSeenPrivateCount,
    },
    {
      title: "Archives",
      icon: <BsFillArchiveFill />,
      path: "/archives",
    },
    {
      title: "Visitors",
      icon: <BsFillPeopleFill />,
      path: "/visitors",
      showBadge: true,
      badgeValue: onlineVisitorCount,
    },
    {
      title: "Tickets",
      icon: <BsEnvelopeFill />,
      path: "/tickets",
      showBadge: true,
      badgeValue: openTicketsCount,
    },

    {
      title: "Reports",
      icon: <BsBarChartFill />,
      path: "/reports",
    },
    {
      title: "Settings",
      icon: <BsFillGearFill />,
      path: "/settings",
    },
  ];

  return (
    <div className="side-bar">
      <div className="upper-section">
        {menus.map((menu, index) => (
          <NavLink
            to={menu.path}
            key={index}
            className="nav-item"
            activeClassName="active"
          >
            {menu.icon} {menu.title}
            {menu.showBadge && menu.badgeValue > 0 && (
              <Badge className="side-nav-badge">{menu.badgeValue}</Badge>
            )}
          </NavLink>
        ))}
      </div>
      <div className="lower-section"></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { unSeenTeamCount, unSeenPrivateCount } = state.conversationState;
  let props = {
    userInfo: state.basicState.userInfo,
    projectInfo: state.basicState.projectInfo,
    allProjects: state.basicState.allProjects,
    onlineVisitorCount: state.visitorsState.onlineVisitors.length,
    openTicketsCount: state.basicState.projectInfo.openTicketsCount,
    unSeenTeamCount,
    unSeenPrivateCount,
  };
  return props;
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
