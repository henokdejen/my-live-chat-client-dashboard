export const baseURL = "http://localhost:5000/agency";

export const LOAD_CONVERSATIONS = 'conversations'
export const LOAD_MESSAGES = 'history'
export const ONLINE_VISITORS = 'onlineVisitors'

export const LOGIN = 'login'
export const SIGNUP = 'signup'
export const LOGOUT = 'logout'
export const CHECKEMAILAVAILABLE = 'http://localhost:5000/agency/checkEmailAvailable/?email='

export const ADD_AGENT = "addAgent";
export const ADD_PROJECT = "addProject";

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
