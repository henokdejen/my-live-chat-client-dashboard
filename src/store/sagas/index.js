import { all } from "redux-saga/effects";

import {
  watchSignupRequest,
  watchLoginRequest,
  watchemailCheckRequest,
  watchLogoutRequest,
} from "./auth";
import { watchaddProjectRequest } from "./project";
import { watchGetMessagesAsync, watchSendMsgAsync } from "./messages";
import {
  socketListener,
  watchJoinConversation,
  watchMessageSeenReport,
  watchStartNewConversation,
} from "./socket";
import { watchGetInitialDataAsync } from "./initialLoader";
import {
  watchLoadTicketMsgsAsync,
  watchLoadTicketsAsync,
  watchSendTicketMsgsAsync,
} from "./ticket";

export default function* rootSaga() {
  yield all([
    watchemailCheckRequest(),
    watchSignupRequest(),
    watchLoginRequest(),
    watchaddProjectRequest(),
    watchGetMessagesAsync(),
    socketListener(),
    watchGetInitialDataAsync(),
    watchMessageSeenReport(),
    watchStartNewConversation(),
    watchLogoutRequest(),
    watchLoadTicketMsgsAsync(),
    watchSendTicketMsgsAsync(),
    watchLoadTicketsAsync(),
    watchJoinConversation(),
  ]);
}
