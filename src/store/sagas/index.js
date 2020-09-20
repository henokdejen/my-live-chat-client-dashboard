import { all } from "redux-saga/effects";

import {
  watchSignupRequest,
  watchLoginRequest,
  watchemailCheckRequest,
  watchLogoutRequest,
} from "./auth";
import { watchaddProjectRequest } from "./project";
import { watchGetConversationsAsync } from "./conversations";
import { watchGetMessagesAsync, watchSendMsgAsync } from "./messages";
import {
  socketListener,
  watchMessageSeenReport,
  watchStartNewConversation,
  watchJoinConversation,
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
    watchSendMsgAsync(),
    socketListener(),
    watchGetInitialDataAsync(),
    watchMessageSeenReport(),
    watchStartNewConversation(),
    watchJoinConversation(),
    watchLogoutRequest(),
    watchLoadTicketMsgsAsync(),
    watchSendTicketMsgsAsync(),
    watchLoadTicketsAsync(),
  ]);
}
