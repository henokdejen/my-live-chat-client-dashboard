import React, { useState } from "react";
import { BsBoxArrowInRight } from "react-icons/bs/";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Switch from "react-switch";
import { AvatarWithOnlineIndicator } from "../../../components/controls/avatar/AvatarWithOnlineIndicator";
import Button from "../../../components/controls/buttons/Button";
import { PopupContainer } from "../../../components/controls/popupContainer/PopupContainer";
import { logoutSucceded } from "../../../store/actions";
import "./profile-popup.scss";

const Profile = withRouter(({ userInfo, history, logout }) => {
  const [desktopNotification, setDesktopNotification] = useState(false);
  const [soundNotification, setSoundNotification] = useState(false);
  const [acceptNotification, setacceptNotification] = useState(true);

  const [showPopup, setshowPopup] = useState(false);

  const handleDesktopNotificationChange = (checked) => {
    setDesktopNotification(checked);
  };

  const handleSoundNotificationChange = (checked) => {
    setSoundNotification(checked);
  };

  const handleEditProfile = (e) => {
    e.stopPropagation();
    history.push("/settings/me");
    setshowPopup(false);
  };

  const handleLogOut = (e) => {
    e.stopPropagation();
    logout(history);
    setshowPopup(false);
  };

  return (
    <div className="profile-popup-wrapper">
      <div
        className="profile-link-item"
        onClick={() => setshowPopup(!showPopup)}
      >
        <AvatarWithOnlineIndicator
          imageUrl={require("../../../images/profiles/jacob.png")}
          online={true}
          width={35}
        />
      </div>

      {showPopup && (
        <PopupContainer
          className="profile-inner-wrapper"
          handleClose={() => setshowPopup(false)}
        >
          <div className="section top-section">
            <AvatarWithOnlineIndicator
              imageUrl={require("../../../images/profiles/jacob.png")}
              online={true}
            />

            <h3 className="current-agent-name">{userInfo.name}</h3>
            <h4 className="current-agent-email">{userInfo.email}</h4>

            <Button variant="outlined" size="sm" onClick={handleEditProfile}>
              Edit Profile
            </Button>
          </div>

          <div className="section">
            <label className="profile-action-btn">
              <span>Accept Chats</span>
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
      )}
    </div>
  );
});

const mapStateToProps = (state) => {
  let props = {
    userInfo: state.basicState.userInfo,
    projectInfo: state.basicState.projectInfo,
    allProjects: state.basicState.allProjects,
  };
  return props;
};

const mapDispatchToProps = (dispatch) => ({
  logout: (history) => {
    console.log("fjaslkdfj saldjf", logoutSucceded(history));
    dispatch(logoutSucceded(history));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
