import React, { useState } from "react";
import { PopupContainer } from "../controls/popupContainer/PopupContainer";
import "./profilePopup.scss";
import Button from "../controls/buttons/Button";
import {
  BsBoxArrowInRight,
  BsArrowLeftRight,
  BsBellFill,
} from "react-icons/bs/";
import Switch from "react-switch";
import Select, { components } from "react-select";
import { AvatarWithOnlineIndicator } from "../controls/avatar/AvatarWithOnlineIndicator";
import { withRouter } from "react-router-dom";

const { Option } = components;

const IconOption = (props) => (
  <Option {...props}>
    {props.data.icon} {props.data.label}
  </Option>
);

const onlineStatusOptions = [
  { value: "online", label: "Online", icon: <BsBellFill /> },
  { value: "offline", label: "Offline", icon: <BsArrowLeftRight /> },
];

export const ProfilePopup = withRouter(
  ({ userInfo, projectInfo, allProjects, handleClose, history, logout }) => {
    const [desktopNotification, setDesktopNotification] = useState(false);
    const [soundNotification, setSoundNotification] = useState(false);
    const [acceptNotification, setacceptNotification] = useState(true);

    const handleDesktopNotificationChange = (checked) => {
      setDesktopNotification(checked);
    };

    const handleSoundNotificationChange = (checked) => {
      setSoundNotification(checked);
    };

    const handleEditProfile = (e) => {
      e.stopPropagation();
      console.log("Edditing...");
      history.push("/settings/me");
      handleClose();
    };

    const handleLogOut = (e) => {
      e.stopPropagation();
      console.log("Logging out...", e);
      logout(history);
      handleClose();
    };

    return (
      <PopupContainer
        className="profile-popup-wrapper"
        handleClose={handleClose}
      >
        <div className="section top-section">
          <AvatarWithOnlineIndicator
            imageUrl={require("../../images/profiles/daryl.png")}
            online={false}
          />
          {/* <img
          className="avatar"
          src={require("../../images/profiles/daryl.png")}
        /> */}
          <h3 className="current-agent-name">{userInfo.name}</h3>
          <h4 className="current-agent-email">{userInfo.email}</h4>

          <Button variant="outlined" size="sm" onClick={handleEditProfile}>
            Edit Profile
          </Button>
        </div>

        <div className="section">
          <label className="profile-action-btn">
            <span>Accept Messages</span>
            <Switch
              onChange={(c) => setacceptNotification(c)}
              checked={acceptNotification}
              className="react-switch"
              height={20}
              width={38}
              uncheckedIcon={false}
              checkedIcon={false}
            />
          </label>
        </div>

        <div className="section middle-section">
          <label className="profile-action-btn">
            <span>Desktop Notification</span>
            <Switch
              onChange={handleDesktopNotificationChange}
              checked={desktopNotification}
              className="react-switch"
              height={20}
              width={38}
              uncheckedIcon={false}
              checkedIcon={false}
            />
          </label>
          <label className="profile-action-btn">
            <span>Sound Notification</span>
            <Switch
              onChange={handleSoundNotificationChange}
              checked={soundNotification}
              className="react-switch"
              height={20}
              width={38}
              uncheckedIcon={false}
              checkedIcon={false}
            />
          </label>
        </div>

        <div className="section bottom-section">
          <p className="action-btn-with-icon" onClick={handleLogOut}>
            <BsBoxArrowInRight /> Logout
          </p>
        </div>
      </PopupContainer>
    );
  }
);
