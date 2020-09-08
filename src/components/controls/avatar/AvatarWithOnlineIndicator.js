import React from "react";
import classNames from "classnames";
import "./avatarWithOnline.scss";

export const AvatarWithOnlineIndicator = ({ width, imageUrl, online }) => {
  const onlineStatusCN = classNames("online-status-indicator", {
    online: online,
  });

  const style = {
    width: width ? width : 70,
  };

  return (
    <div className="avatar-online-wrapper">
      <img src={imageUrl} alt="avatar" style={style} />
      <span className={onlineStatusCN}></span>
    </div>
  );
};
