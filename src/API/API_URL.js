export const baseURL = "http://192.168.1.10:5000/agency/";
export const SOCKET_SERVER = "http://192.168.1.10:5000";

// export const SOCKET_SERVER = "http://localhost:5000";
// export const baseURL = "http://localhost:5000/agency";

export const LOAD_CONVERSATIONS = "conversations";
export const LOAD_MESSAGES = "history";
export const ONLINE_VISITORS = "onlineVisitors";

// export const CHECKEMAILAVAILABLE =
// "http://localhost:5000/agency/checkEmailAvailable/?email=";

// profile edit
export const CHANGE_PASSWORD = "agent/changePassword";
export const UPDATE_PROFILE = "agent";

export const LOGIN = "login";
export const SIGNUP = "signup";
export const LOGOUT = "logout";
export const CHECKEMAILAVAILABLE = `http://${SOCKET_SERVER}/visitor/checkEmailAvailable/?email=`;

export const ADD_AGENT = "addAgent";
export const ADD_PROJECT = "addProject";

export const getInitialDataURL = (projectID) =>
  `project/${projectID}/initialData`;

// Agent Related

export const getAddAgentURL = (projectID) => `project/${projectID}/addAgent`;

export const getRemoveAgentURL = (projectID, agentID) =>
  `project/${projectID}/agent/${agentID}/remove`;

export const getCheckAgentExists = (email) =>
  `checkAgentExistsInAgency/?email=${email}`;

//

export const getLoadActiveConversationsURL = (projectID) =>
  `project/${projectID}/conversations`; //active to be added

export const getLoadArchiveConversationsURL = (projectID) =>
  `project/${projectID}/archivedConversations`;

export const getLoadOnlineVisitorsURL = (projectID) =>
  `project/${projectID}/onlineVisitors`;

export const getLoadActiveConvMsgsURL = (projectID, conversationID) =>
  `project/${projectID}/conversations/${conversationID}/history/?fetchedHistoryCount=0`;

export const getLoadArchiveConvMsgsURL = (projectID, conversationID) =>
  `project/${projectID}/archivedConversations/${conversationID}/history?fetchedHistoryCount=0`;

// profile related

export const getChangePasswordURL = (projectID) => ``;

export const getChangeProfileDetailsURL = (projectID) => ``;

// ticket staff

const obsKeysToString = (obj) => {
  let res = "";
  for (let k in obj) {
    res += `${k}=${obj[k]}&`;
  }
  return res.substring(0, res.length - 1);
};

export const getLoadTicketURL = (projectID, filters) => {
  let base = `project/${projectID}/tickets?`;
  let query = obsKeysToString(filters);
  return base + query;
};

export const getLoadTicketDetailsURL = (projectID, ticketID) =>
  `project/${projectID}/tickets/${ticketID}`;

export const getSendTickeMsgURL = (projectID, ticketID) =>
  `project/${projectID}/tickets/${ticketID}/reply`;

export const getTicketClaimURL = (projectID, ticketID) =>
  `project/${projectID}/tickets/${ticketID}/claim`;

// project settings
export const getProjectSettingUpdateURL = (projectID) =>
  `project/${projectID}/setting`;

// report related

export const getLoadReportsURL = (projectID, startDate, endDate, item) =>
  `project/${projectID}/report?startDate=${encodeURIComponent(
    startDate
  )}&endDate=${encodeURIComponent(endDate)}&filterBy=${encodeURIComponent(
    item
  )}`;
