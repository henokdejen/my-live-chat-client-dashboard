export const FETCH_ALL_CONVERSATIONS_REQUEST = Symbol(
  "conversations/FETCH_ALL_CONVERSATIONS_REQUEST"
);
export const FETCH_ALL_CONVERSATIONS_SUCCESS = Symbol(
  "conversations/FETCH_ALL_CONVERSATIONS_SUCCESS"
);
export const FETCH_ALL_CONVERSATIONS_FAILURE = Symbol(
  "conversations/FETCH_ALL_CONVERSATIONS_FAILURE"
);

export const FETCH_MY_CONVERSATIONS_REQUEST = Symbol(
  "conversations/FETCH_MY_CONVERSATIONS_REQUEST"
);
export const FETCH_MY_CONVERSATIONS_SUCCESS = Symbol(
  "conversations/FETCH_MY_CONVERSATIONS_SUCCESS"
);
export const FETCH_MY_CONVERSATIONS_FAILURE = Symbol(
  "conversations/FETCH_MY_CONVERSATIONS_FAILURE"
);

export const FETCH_CONVERSATION_REQUEST = Symbol(
  "conversations/FETCH_CONVERSATION_REQUEST"
);
export const FETCH_CONVERSATION_SUCCESS = Symbol(
  "conversations/FETCH_CONVERSATION_SUCCESS"
);
export const FETCH_CONVERSATION_FAILURE = Symbol(
  "conversations/FETCH_CONVERSATION_FAILURE"
);

export const CREATE_CONVERSATION_REQUEST = Symbol(
  "conversations/CREATE_CONVERSATION_REQUEST"
);
export const CREATE_CONVERSATION_SUCCESS = Symbol(
  "conversations/CREATE_CONVERSATION_SUCCESS"
);
export const CREATE_CONVERSATION_FAILURE = Symbol(
  "conversations/CREATE_CONVERSATION_FAILURE"
);

export const SET_ACTIVE_CONVERSATION = Symbol(
  "conversations/SET_ACTIVE_CONVERSATION"
);
export const UNSET_ACTIVE_CONVERSATION = Symbol(
  "conversations/UNSET_ACTIVE_CONVERSATION"
);

export const JOIN_CONVERSATION_REQUEST = Symbol(
  "conversations/JOIN_CONVERSATION_REQUEST"
);
export const JOIN_CONVERSATION_SUCCESS = Symbol(
  "conversations/JOIN_CONVERSATION_SUCCESS"
);
export const JOIN_CONVERSATION_FAILURE = Symbol(
  "conversations/JOIN_CONVERSATION_FAILURE"
);

export const LEAVE_CONVERSATION_REQUEST = Symbol(
  "conversations/LEAVE_CONVERSATION_REQUEST"
);
export const LEAVE_CONVERSATION_SUCCESS = Symbol(
  "conversations/LEAVE_CONVERSATION_SUCCESS"
);
export const LEAVE_CONVERSATION_FAILURE = Symbol(
  "conversations/LEAVE_CONVERSATION_FAILURE"
);

export const DELETE_CONVERSATION_REQUEST = Symbol(
  "conversations/DELETE_CONVERSATION_REQUEST"
);
export const DELETE_CONVERSATION_SUCCESS = Symbol(
  "conversations/DELETE_CONVERSATION_SUCCESS"
);
export const DELETE_CONVERSATION_FAILURE = Symbol(
  "conversations/DELETE_CONVERSATION_FAILURE"
);

export const NEW_CONVERSATION_ADDED = Symbol(
  "conversations/RECEIVE_NEW_CONVERSATION"
);
export const SELECTED_CONVERSATION_CHANGED = Symbol(
  "conversations/SELECTED_CONVERSATION_CHANGED"
);
export const ONLINE_STATUS_CHANGE = Symbol(
  "conversations/ONLINE_STATUS_CHANGE"
);

export const MARK_ALL_MESSAGES_SEEN = Symbol(
  "conversations/MARK_ALL_MESSAGES_SEEN"
);
export const REMOVE_UNSEEN_MARKER = Symbol(
  "conversations/REMOVE_UNSEEN_MARKER"
);

export const CREATE_NEW_CONVERSATION_REQUEST = Symbol(
  "conversations/CREATE_NEW_CONVERSATION_REQUEST"
);
export const CREATE_NEW_CONVERSATION_SUCCESS = Symbol(
  "conversations/CREATE_NEW_CONVERSATION_SUCCESS"
);
export const CREATE_NEW_CONVERSATION_FAILURE = Symbol(
  "conversations/CREATE_NEW_CONVERSATION_FAILURE"
);

export const FETCH_ALL_ARCHIVES_REQUEST = Symbol(
  "conversations/FETCH_ALL_ARCHIVES_REQUEST"
);
export const FETCH_ALL_ARCHIVES_SUCCESS = Symbol(
  "conversations/FETCH_ALL_ARCHIVES_SUCCESS"
);
export const FETCH_ALL_ARCHIVES_FAILURE = Symbol(
  "conversations/FETCH_ALL_ARCHIVES_FAILURE"
);

export const ASSIGNED_TO_CONVERSATION = Symbol(
  "conversations/ASSIGNED_TO_CONVERSATION"
);

export const SEND_CONV_TRANS_REQUEST = Symbol(
  "conversations/SEND_CONV_TRANS_REQUEST"
);

export const SEND_CONV_TRANS_SUCCESS = Symbol(
  "conversations/SEND_CONV_TRANS_SUCCESS"
);

export const SEND_CONV_TRANS_FAILURE = Symbol(
  "conversations/SEND_CONV_TRANS_FAILURE"
);

export const CLOSE_CONVERSATION_REQUEST = Symbol(
  "conversations/CLOSE_CONVERSATION_REQUEST"
);

export const CLOSE_CONVERSATION_SUCCESS = Symbol(
  "conversations/CLOSE_CONVERSATION_SUCCESS"
);

export const AGENT_GET_ONLINE_OFFLINE = Symbol(
  "conversations/AGENT_GET_ONLINE_OFFLINE"
);

export const TRANSFER_CHAT_REQUEST = Symbol(
  "conversations/TRANSFER_CHAT_REQUEST"
);
export const TRANSFER_CHAT_SUCCESS = Symbol(
  "conversations/TRANSFER_CHAT_SUCCESS"
);

export const ACTIVE_CONVERSATION_TYPES = {
  TEAM_CONVERSATION: 0,
  PRIVATE_CONVERSATION: 1,
};

export const CONVERSATION_TYPES = {
  TEAM_CONVERSATION: 0,
  PRIVATE_CONVERSATION: 1,
  ARCHIVE_CONVERSATION: 2,
};
