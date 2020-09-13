import axios from "axios";
import io from "socket.io-client";

import {
  baseURL,
  getRemoveAgentURL,
  getAddAgentURL,
  getLoadConversationsURL,
  getLoadOnlineVisitorsURL,
  getInitialDataURL,
  getCheckAgentExists,
  CHANGE_PASSWORD,
  UPDATE_PROFILE,
  SOCKET_SERVER,
  getLoadConversationMsgsURL,
} from "./API_URL";
import { LS_TOKEN, INITIAL_DATA_LOADED } from "../constants";

let projectID = "";

export const myServiceMiddleware = () => {
  return () => (next) => (action) => {
    if (action.type == INITIAL_DATA_LOADED) {
      projectID = action.payload.userInfo.lastActiveProjectID;
    }
    return next(action);
  };
};
let token = "Bearer " + localStorage.getItem(LS_TOKEN);

// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2VudElEIjoiNWY1NjY0NzljYTg0ZGUxZGE4M2E3YTZmIiwibmFtZSI6Ikhpc2tlbCBLZWxlbWV3b3JrIiwiZW1haWwiOiJ3dWhodUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJhZ2VuY3lJRCI6IjVmNTY2NDc5Y2E4NGRlMWRhODNhN2E2ZSIsImlhdCI6MTU5OTQ5NzMzN30.gcz7rmnH1oDr99331y2g-nw_kJeyc3nHaBMB3KHFNyA";
const API = axios.create({
  baseURL: `${baseURL}`,
});

API.defaults.headers.common["Authorization"] = token;
API.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

// project staff

export const loadInitialData = (projectID) => {
  return API.get(getInitialDataURL(projectID)).then((d) => d.data);
};

export const removeAgent = (agentID) => {
  return API.post(getRemoveAgentURL(projectID, agentID));
};

export const addAgent = (agent) => {
  return API.post(getAddAgentURL(projectID), agent);
};

export const checkAgentExists = (email) => {
  return API.get(getCheckAgentExists(email)).then((d) => d.data);
};

// Conversations staffa
export const loadInitialConversations = () => {
  return API.get(getLoadConversationsURL(projectID)).then((d) => d.data);
};

export const loadInitialOnlineUsers = () => {
  return API.get(getLoadOnlineVisitorsURL(projectID)).then((d) => d.data);
};

export const loadConversationsMessages = (conversationID) => {
  return API.get(getLoadConversationMsgsURL(projectID, conversationID)).then(
    (d) => d.data
  );
};

// profile related

export const changePassword = (oldPassword, newPassword) => {
  return API.put(CHANGE_PASSWORD, { oldPassword, newPassword }).then(
    (d) => d.data
  );
};

export const updateProfile = (name, timeZone) => {
  return API.put(UPDATE_PROFILE, { name, timeZone }).then((d) => d.data);
};

// socket Stuff
export const connectSocket = () => {
  const agentQuery = {
    usertype: "agent",
    projectID,
    token,
  };

  return io(SOCKET_SERVER, { query: agentQuery, forceNew: true });
};
