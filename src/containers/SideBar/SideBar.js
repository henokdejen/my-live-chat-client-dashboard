import React, { useState } from "react";
import {
  BsChatFill,
  BsFillPeopleFill,
  BsFillGearFill,
  BsArrowLeftRight,
} from "react-icons/bs";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import "./sidebar.scss";
import { Badge } from "../../components/controls/badge/Badge";
import { DropDownMenu } from "../../components/controls/dropDownMenu/DropDownMenu";
import { DDMenuItem } from "../../components/controls/dropDownMenu/DDMenuItem/DDMenuItem";
import { PopupContainer } from "../../components/controls/popupContainer/PopupContainer";
import { ProfilePopup } from "../../components/profile-popup/ProfilePopup";
import { AvatarWithOnlineIndicator } from "../../components/controls/avatar/AvatarWithOnlineIndicator";

const SideBar = ({
  onlineVisitorCount,
  totalUnseenCount,
  userInfo,
  projectInfo,
  allProjects,
}) => {
  const menus = [
    {
      title: "Chat",
      icon: <BsChatFill />,
      path: "/conversations",
      showBadge: true,
      badgeValue: totalUnseenCount,
    },
    {
      title: "Visitors",
      icon: <BsFillPeopleFill />,
      path: "/visitors",
      showBadge: true,
      badgeValue: onlineVisitorCount,
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
        <div id="side-nav-avatar" onClick={(e) => setshowProfilePopup(true)}>
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
              handleClose={(e) => {
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
  let props = {
    userInfo: state.basicState.userInfo,
    projectInfo: state.basicState.projectInfo,
    allProjects: state.basicState.allProjects,
    onlineVisitorCount: state.visitorsState.onlineVisitors.length,
    totalUnseenCount: state.conversationState.unSeenCount,
  };
  return props;
};

// const mapDispatchToProps = dispatch => ({
//     loadConversations: () => {
//         dispatch(conversationsRequested())
//         dispatch(allOnlineVisitorsRequested())
//     }
// });

export default connect(mapStateToProps)(SideBar);
