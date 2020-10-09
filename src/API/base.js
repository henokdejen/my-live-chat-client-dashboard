import axios from "axios";
import io from "socket.io-client";

import {
  baseURL,
  getRemoveAgentURL,
  getAddAgentURL,
  getAddDepartmentURL,
  getRemoveDepartmentURL,
  getAddAgentToDepartmentURL,
  getRemoveAgentFromDepartmentURL,
  getLoadConversationsURL,
  getLoadOnlineVisitorsURL,
  getInitialDataURL,
  getCheckAgentExists,
  CHANGE_PASSWORD,
  UPDATE_PROFILE,
  SOCKET_SERVER,
  getLoadConversationMsgsURL,
  getLoadTicketURL,
  getLoadTicketDetailsURL,
  getSendTickeMsgURL,
  getTicketClaimURL,
  getProjectSettingUpdateURL,
  banipaddressURL,
} from "./API_URL";
import {
  LS_TOKEN,
  INITIAL_DATA_LOADED,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  ADDPROJECT_SUCCESS,
  LS_PID,
} from "../constants";

let projectID = "";

let token = "";
let oldToken = localStorage.getItem(LS_TOKEN);

if (oldToken && !token) {
  token = oldToken;
}

const API = axios.create({
  baseURL: `${baseURL}`,
});

API.defaults.headers.common["Authorization"] = token;
API.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

export const myServiceMiddleware = () => {
  return () => (next) => (action) => {
    if (action.type == INITIAL_DATA_LOADED) {
      projectID = localStorage.getItem(LS_PID);
    } else if (action.type === ADDPROJECT_SUCCESS) {
      projectID = localStorage.getItem(LS_PID);
    } else if (
      action.type === LOGIN_SUCCESS ||
      action.type === SIGNUP_SUCCESS
    ) {
      token = action.payload.token;
      API.defaults.headers.common["Authorization"] = token;
    }
    return next(action);
  };
};

// project staff
export const loadInitialData = (projectID) => {
  return API.get(getInitialDataURL(projectID)).then((d) => d.data);
};

export const removeAgent = (agentID) => {
  return API.delete(getRemoveAgentURL(projectID, agentID));
};

export const addAgent = (agent) => {
  return API.post(getAddAgentURL(projectID), agent);
};

export const checkAgentExists = (email) => {
  return API.get(getCheckAgentExists(email)).then((d) => d.data);
};

// department related

export const addDepartment = (department) => {
  return API.post(getAddDepartmentURL(projectID), department);
};

export const removeDepartment = (departmentID) => {
  return API.delete(getRemoveDepartmentURL(projectID, departmentID));
};

export const addAgentsToDepartment = (newAgents) => {
  return API.post(getAddAgentToDepartmentURL(projectID, newAgents.departmentid), {agentIDs:newAgents.agentIDs});
};

export const RemoveAgentsFromDepartment = (agentsToRemove) => {
  return API.put(getRemoveAgentFromDepartmentURL(projectID, agentsToRemove.departmentid), {agentIDs:agentsToRemove.agentIDs});
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

// Ticket Staff goes here

export const loadTickets = (filters) => {
  return API.get(getLoadTicketURL(projectID, filters)).then((d) => d.data);
};

export const loadTicketDetails = (ticketID) => {
  return API.get(getLoadTicketDetailsURL(projectID, ticketID)).then(
    (d) => d.data
  );
};

export const sendTicketMessage = (ticketID, text) => {
  return API.post(getSendTickeMsgURL(projectID, ticketID), { text }).then(
    (d) => d.data
  );
};

export const claimTicketAssignee = (ticketID) => {
  return API.post(getTicketClaimURL(projectID, ticketID)).then((d) => d.data);
};

// setting related

export const updateProjectSettings = (newSettings) => {
  return API.put(getProjectSettingUpdateURL(projectID), newSettings).then(
    (d) => d.data
  );
};


// ban ip address related
export const banIPAddress = (banInfo) => {
  return API.post(banipaddressURL(projectID), banInfo);
};
