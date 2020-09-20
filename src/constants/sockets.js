export const SOCKETS_CONNECTION_REQUEST = Symbol(
  "sockets/SOCKETS_CONNECTION_REQUEST"
);
export const SOCKETS_CONNECTION_SUCCESS = Symbol(
  "sockets/SOCKETS_CONNECTION_SUCCESS"
);
export const SOCKETS_CONNECTION_FAILURE = Symbol(
  "sockets/SOCKETS_CONNECTION_FAILURE"
);
export const SOCKETS_CONNECTION_MISSING = Symbol(
  "sockets/SOCKETS_CONNECTION_MISSING"
);

export const MOUNT_CHAT = Symbol("sockets/MOUNT_CHAT");
export const UNMOUNT_CHAT = Symbol("sockets/UNMOUNT_CHAT");

export const SEND_MESSAGE = "sockets/SEND_MESSAGE";

// socket events
export const MESSAGE = "MESSAGE";
export const WHISPER = "WHISPER";

export const MESSAGE_SEEN = "MESSAGESEEN";

export const NEW_CHAT_ASSIGNED = "NEWCHATASSIGNED";
export const JOINCHAT = "JOINCHAT";
export const LEAVECHAT = "LEAVECHAT";

export const VISITOR_CONNECTED = "VISITORCONNECTED";
export const VISITOR_DISCONNECTED = "VISITORDISCONNECTED";
export const VISITOR_TYPING = "VISITORTYPING";

export const VISITOR_LEFT_CHAT = "VISITORLEFTCHAT";
export const RECIEVE_DELETED_CHAT = "sockets/RECIEVE_DELETED_CHAT";
