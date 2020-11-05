import { ACTIVE_CONVERSATION_TYPES, MessageStatus } from "../../constants";

export const getFormattedLocalTime = (milliseconds, long) => {
  let date = new Date(milliseconds);

  let additonal = long
    ? { day: "2-digit", month: "2-digit", year: "2-digit" }
    : {};

  let dateFormated = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    ...additonal,
    hour12: true,
  });
  return dateFormated;
};

export const getAssignedConversation = (assigned) => {
  let visitor = assigned.visitor;
  let now = Date.now();
  return {
    id: assigned.conversationID,
    imageUrl: require("../../images/profiles/daryl.png"),
    imageAlt: "Daryl Duckmanton",
    title: visitor.email ? assigned.email : assigned.conversationID,
    created_at: now,
    browserID: visitor.browserID,
    unSeenCount: 0,
    createdAt: getFormattedLocalTime(now),
    latestMessageText: "",
  };
};

export const getSortedConversations = (conversations) => {
  let r = conversations.sort((a, b) => {
    if (a.updatedAt > b.updatedAt) return -1;
    if (b.updatedAt > a.updatedAt) return 1;
    return 0;
  });
  return r;
};

export const getConversation = (dataFromServer) => {
  let latestMessage =
    dataFromServer.messages && dataFromServer.messages.length
      ? dataFromServer.messages[0].text
      : "";
  let id = dataFromServer.conversationID
    ? dataFromServer.conversationID
    : dataFromServer._id;

  let conversation = {
    id: id,
    members: dataFromServer.members,
    agency: dataFromServer.agency,
    imageUrl: require("../../images/profiles/daryl.png"),
    imageAlt: "Daryl Duckmanton",
    ip: dataFromServer.ip ? dataFromServer.ip : "",
    lastAssignedAgent: dataFromServer.lastAssignedAgent
      ? dataFromServer.lastAssignedAgent
      : "",
    numberOfMessages: dataFromServer.numberOfMessages
      ? dataFromServer.numberOfMessages
      : 0,
    title: dataFromServer.name
      ? dataFromServer.name
      : dataFromServer.email
      ? dataFromServer.email
      : id,
    createdAtMs: dataFromServer.createdAt.time,
    updatedAtMs: dataFromServer.updatedAt.time,
    browserID: dataFromServer.browserID,
    unSeenCount: dataFromServer.unseencount || 0,
    createdAt: getFormattedLocalTime(dataFromServer.createdAt.time),
    updatedAt: getFormattedLocalTime(dataFromServer.updatedAt.time),
    latestMessageText: latestMessage,
    type: dataFromServer.type,
    new: true, // until overriden
  };
  conversation.unSeenMarkerCount = conversation.unSeenCount;
  conversation.joined =
    conversation.type === ACTIVE_CONVERSATION_TYPES.PRIVATE_CONVERSATION ||
    false;

  return conversation;
};
export const MESSAGE_TYPES = {
  INCOMING: 0,
  OUTGOING: 1,
  FROM_SYSTEM: 2,
};

export const getSneakPreviewMessage = (dataFromServer) => {
  return {
    conversationID: dataFromServer.conversationID,
    seen: true,
    messageText: dataFromServer.text,
    isNotification: false,
    isSneakPreview: true,
    isMyMessage: false,
    imageUrl: require("../../images/profiles/daryl.png"),
    imageAlt: null,
  };
};

export const getMessage = (dataFromServer, currentUserId) => {
  let isNotification = !dataFromServer.sender;
  console.log("return back", dataFromServer.messageID);
  let message = { ...dataFromServer };
  message = {
    ...dataFromServer,
    id: dataFromServer.messageID
      ? dataFromServer.messageID
      : dataFromServer._id,
    imageUrl: require("../../images/profiles/daryl.png"),
    imageAlt: null,
    conversationID: dataFromServer.conversationID,
    seen: true,
    messageText: dataFromServer.text,
    createdAtMs: dataFromServer.createdAt.time,
    createdAt: getFormattedLocalTime(dataFromServer.createdAt.time),
    isNotification,
    isMyMessage: !isNotification && currentUserId === dataFromServer.sender.id,
  };
  return message;
};

export const getTicket = (dataFromServer) => {
  let ticket = { ...dataFromServer };
  ticket.updatedAtMs = ticket.updatedAt
    ? ticket.updatedAt.time
    : ticket.createdAt.time;
  ticket.updatedAt = getFormattedLocalTime(ticket.updatedAtMs, true);
  return ticket;
};

export const getTicketMessage = (dataFromServer) => {
  let message = { ...dataFromServer };

  message.createdAtMS = message.createdAt.time;

  message.createdAt = getFormattedLocalTime(message.createdAtMS, true);
  message.status = MessageStatus.SUCCESS;
  return message;
};

export const createMessageFromInput = (textMessage, whisper, type) => {
  let now = Date.now();
  return {
    front_id: now,
    imageUrl: null,
    imageAlt: null,
    whisper,
    messageText: textMessage,
    createdAtMs: now,
    createdAt: getFormattedLocalTime(now),
    isMyMessage: true,
    status: MessageStatus.PENDING,
    type,
  };
};

export const mapConversationsWithOnlineStatus = (
  conversations,
  onlineVisitors
) => {
  for (let conv of conversations) {
    for (let onVist of onlineVisitors) {
      if (conv.browserID === onVist.browserID) {
        conv.isOnline = true;
      }
    }
  }
};
