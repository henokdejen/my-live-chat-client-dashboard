export const baseURL = "http://192.168.1.10:5000/agency";

export const LOAD_CONVERSATIONS = "conversations";
export const LOAD_MESSAGES = "history";
export const ONLINE_VISITORS = "onlineVisitors";

export const ADD_AGENT = "addAgent";

export const getInitialDataURL = (projectID) =>
  `project/${projectID}/initialData`;

// Agent Related

export const getAddAgentURL = (projectID) => `project/${projectID}/addAgent`;

export const getRemoveAgentURL = (projectID, agentID) =>
  `project/${projectID}/agent/${agentID}`;

export const getCheckAgentExists = (email) =>
  `checkAgentExists/?email=${email}`;

//

export const getLoadConversationsURL = (projectID) =>
  `project/${projectID}/conversations`;

export const getLoadOnlineVisitorsURL = (projectID) =>
  `project/${projectID}/onlineVisitors`;

export const SOCKET_SERVER = "http://192.168.1.10:5000";
