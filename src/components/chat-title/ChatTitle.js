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

const ChatTitle = ({ selectedConversation, openTransferChat }) => {
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
          <DDMenuItem onClick={openTransferChat}>
            {" "}
            <BsArrowLeftRight /> Transfer to
          </DDMenuItem>
          <DDMenuItem>
            {" "}
            <BsBoxArrowUpRight /> Send Transcript
          </DDMenuItem>
          <DDMenuItem>
            {" "}
            <BsSlashCircle /> Ban this visitor
          </DDMenuItem>
          <DDMenuItem>
            {" "}
            <BsBoxArrowUpLeft /> Leave
          </DDMenuItem>
        </DropDownMenu>
        {/* <div onClick={ () => { onDeleteConversation(); } } title="Delete Conversation" className="delete-icon">
                    <TrashIcon />
                </div> */}
      </>
    );
  }

  return <div id="chat-title">{chatTitleContents}</div>;
};

export default ChatTitle;
