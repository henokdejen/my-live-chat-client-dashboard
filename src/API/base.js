import axios from "axios";
import {
  baseURL,
  getRemoveAgentURL,
  getAddAgentURL,
  getLoadConversationsURL,
  getLoadOnlineVisitorsURL,
  getInitialDataURL,
  getCheckAgentExists,
} from "./API_URL";
import { LS_TOKEN } from "../constants";

let token = "Bearer " + localStorage.getItem(LS_TOKEN);
// if (token.length > 0) {
//   token = "Bearer " + token[1];
// } else {
//   token = "Bearer " + token[0];
// }

console.log("My Token", token);

// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2VudElEIjoiNWY1NjY0NzljYTg0ZGUxZGE4M2E3YTZmIiwibmFtZSI6Ikhpc2tlbCBLZWxlbWV3b3JrIiwiZW1haWwiOiJ3dWhodUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJhZ2VuY3lJRCI6IjVmNTY2NDc5Y2E4NGRlMWRhODNhN2E2ZSIsImlhdCI6MTU5OTQ5NzMzN30.gcz7rmnH1oDr99331y2g-nw_kJeyc3nHaBMB3KHFNyA";
const API = axios.create({
  baseURL: `${baseURL}/`,
});

API.defaults.headers.common["Authorization"] = token;
API.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

// project staff

export const loadInitialData = (projectID) => {
  return API.get(getInitialDataURL(projectID)).then((d) => d.data);
};

export const removeAgent = (projectID, agentID) => {
  return API.delete(getRemoveAgentURL(projectID, agentID));
};

export const addAgent = (projectID, agent) => {
  return API.post(getAddAgentURL(projectID), agent);
};

export const checkAgentExists = (email) => {
  return API.get(getCheckAgentExists(email)).then((d) => d.data);
};

// Conversations staffa
export const loadInitialConversations = (projectID) => {
  return API.get(getLoadConversationsURL(projectID)).then((d) => d.data);
};

export const loadInitialOnlineUsers = (projectID) => {
  return API.get(getLoadOnlineVisitorsURL(projectID)).then((d) => d.data);
};

export default API;
