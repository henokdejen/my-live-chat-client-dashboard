import { combineReducers } from "redux";

import conversationState from "./conversations";
import messagesState from "./messages";
import visitorsState from "./visitor";
import services from "./services";
import authenticationState from "./auth";
import basicState from "./dashboard";
import projectState from "./project";
import ticketState from "./tickets";
import modalState from "./modals";
import {
  LOGOUT_SUCCESS,
  LS_PID,
  LS_TOKEN,
  OPEN_ADD_PROJECT_SUCCESS,
  SWITCH_PROJECT_SUCCESS,
} from "../../constants";

const appReducer = combineReducers({
  conversationState,
  messagesState,
  visitorsState,
  services,
  authenticationState,
  basicState,
  projectState,
  ticketState,
  modalState,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    localStorage.removeItem("persist:root");
    state = undefined;
  } else if (action.type === SWITCH_PROJECT_SUCCESS) {
    state = undefined;
    let token = localStorage.getItem(LS_TOKEN);
    localStorage.removeItem("persist:root");
    localStorage.setItem(LS_TOKEN, token);
    localStorage.setItem(LS_PID, action.payload.projectId);
  } else if (action.type === OPEN_ADD_PROJECT_SUCCESS) {
    let token = localStorage.getItem(LS_TOKEN);
    localStorage.removeItem("persist:root");
    localStorage.setItem(LS_TOKEN, token);
    state = undefined;
  }
  console.log("my state", state);
  return appReducer(state, action);
};

export default rootReducer;
