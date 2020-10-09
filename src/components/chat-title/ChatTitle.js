import React from "react";

import TrashIcon from "../controls/icons/trash-icon/TrashIcon";

import "./ChatTitle.scss";
import { DropDownMenu } from "../controls/dropDownMenu/DropDownMenu";
import { DDMenuItem } from "../controls/dropDownMenu/DDMenuItem/DDMenuItem";

import {
  BsThreeDotsVertical,
  BsArrowLeftRight,
  BsBoxArrowUpRight,
  BsSlashCircle,
  BsReverseLayoutSidebarReverse,
  BsBoxArrowUpLeft,
} from "react-icons/bs";

const ChatTitle = ({ selectedConversation, menus }) => {
  let chatTitleContents = null;

  const moreIcon = (
    <span>
      <BsThreeDotsVertical />{" "}
    </span>
  );

  if (selectedConversation) {
    chatTitleContents = (
      <>
        <span className="conv-title">{selectedConversation.title}</span>
        <DropDownMenu trigger={moreIcon} placement="bottomRight">
          {menus.map((menu, i) => (
            <DDMenuItem onClick={menu.click} key={i}>
              <menu.icon /> {menu.lable}
            </DDMenuItem>
          ))}
        </DropDownMenu>
      </>
    );
  }

  return <div id="chat-title">{chatTitleContents}</div>;
};

export default ChatTitle;
