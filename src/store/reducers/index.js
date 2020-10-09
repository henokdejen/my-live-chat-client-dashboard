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

export default combineReducers({
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
