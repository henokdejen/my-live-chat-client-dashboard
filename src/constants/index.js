export const MessageStatus = {
  FAILURE: 0,
  PENDING: 1,
  SUCCESS: 2,
};

// export const MessageEvents = {
//     NEW_MESSAGE: 'NEW_MESSAGE',
//     MESSAGE_SENT_RESULT: 'MESSAGE_SENT_RESULT',
//     MESSAGES_LOADED: 'MESSAGES_LOADED'
// }

// export const ConversationEvents = {
//     CONVERSATIONS_REQUESTED: 'CONVERSATIONS_REQUESTED',
//     CONVERSATIONS_LOADING: 'CONVERSATIONS_LOADING',
//     CONVERSATIONS_LOADED: 'CONVERSATIONS_LOADED',
//     SELECTED_CONVERSATION_CHANGED: 'SELECTED_CONVERSATION_CHANGED',
//     DELETE_CONVERSATION: 'DELETE_CONVERSATION',
//     NEW_CONVERSATION: 'NEW_CONVERSATION',
//     ONLINE_STATUS_CHANGE: 'ONLINE_STATUS_CHANGE'
// }

// export const SocketEvents = {
//     MESSAGE: 'MESSAGE',
//     MESSAGESEEN: 'MESSAGESEEN',
//     AGENTASSIGNED: 'AGENTASSIGNED',
//     ROOMASSIGNED: 'ROOMASSIGNED',
//     NEWCHATASSIGNED: 'NEWCHATASSIGNED',
//     GETCHATHISTORY: 'GETCHATHISTORY',
//     CHATHISTORY: 'CHATHISTORY',
//     GETPREVIOUSCHATS: 'GETPREVIOUSCHATS',
//     PREVIOUSCHATS: 'PREVIOUSCHATS',
//     GETANAGENT: 'GETANAGENT',
//     TOKEN: 'TOKEN',
//     ONLINE: 'ONLINE',
//     OFFLINE: 'OFFLINE',

// }

export * from "./auth";
export * from "./conversations";
export * from "./messages";
export * from "./sockets";
export * from "./services";
export * from "./users";
export * from "./visitors";
export * from "./dashboard";
export * from "./LocalStorageKeys";
export * from "./project";
export * from "./widget";
export * from "./tickets";
export * from "./modals";
