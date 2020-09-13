export const baseURL = "http://192.168.1.10:5000/agency/";

// export const baseURL = "http://localhost:5000/agency";

export const LOAD_CONVERSATIONS = "conversations";
export const LOAD_MESSAGES = "history";
export const ONLINE_VISITORS = "onlineVisitors";

export const LOGIN = "login";
export const SIGNUP = "signup";
export const LOGOUT = "logout";
export const CHECKEMAILAVAILABLE =
  "http://localhost:5000/agency/checkEmailAvailable/?email=";

// profile edit
export const CHANGE_PASSWORD = "agent/changePassword";
export const UPDATE_PROFILE = "agent";

export const LOGIN = "login";
export const SIGNUP = "signup";
export const LOGOUT = "logout";
export const CHECKEMAILAVAILABLE =
  "http://192.168.1.10:5000/visitor/checkEmailAvailable/?email=";

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

export const getLoadConversationsURL = (projectID) =>
  `project/${projectID}/conversations`;

export const getLoadOnlineVisitorsURL = (projectID) =>
  `project/${projectID}/onlineVisitors`;

export const getLoadConversationMsgsURL = (projectID, conversationID) =>
  `project/${projectID}/conversations/${conversationID}/history/?fetchedHistoryCount=0`;

export const SOCKET_SERVER = "http://192.168.1.10:5000";

// profile related

export const getChangePasswordURL = (projectID) => ``;

export const getChangeProfileDetailsURL = (projectID) => ``;
