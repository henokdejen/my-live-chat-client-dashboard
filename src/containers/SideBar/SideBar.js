import React, { useState } from "react";
import {
  BsChatFill,
  BsFillPeopleFill,
  BsFillGearFill,
  BsEnvelopeFill,
  BsBarChartFill,
  BsFillArchiveFill,
} from "react-icons/bs";
import { AiOutlineAreaChart } from "react-icons/ai";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import "./sidebar.scss";
import { Badge } from "../../components/controls/badge/Badge";
import { ProfilePopup } from "../../components/profile-popup/ProfilePopup";
import { AvatarWithOnlineIndicator } from "../../components/controls/avatar/AvatarWithOnlineIndicator";
import { logoutSucceded } from "../../store/actions";

const SideBar = ({
  onlineVisitorCount,
  unSeenTeamCount,
  unSeenPrivateCount,
  openTicketsCount,
  userInfo,
  projectInfo,
  allProjects,
  logout,
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

  const [showProfilePopup, setshowProfilePopup] = useState(false);

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
      <div className="lower-section">
        <div id="side-nav-avatar" onClick={() => setshowProfilePopup(true)}>
          <AvatarWithOnlineIndicator
            imageUrl={require("../../images/profiles/daryl.png")}
            online={true}
            width={40}
          />
          {showProfilePopup && (
            <ProfilePopup
              userInfo={userInfo}
              projectInfo={projectInfo}
              allProjects={allProjects}
              logout={logout}
              handleClose={() => {
                console.log("fine");
                setshowProfilePopup(false);
              }}
            />
          )}
        </div>
      </div>
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

const mapDispatchToProps = (dispatch) => ({
  logout: (history) => {
    console.log("fjaslkdfj saldjf", logoutSucceded(history));
    dispatch(logoutSucceded(history));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
