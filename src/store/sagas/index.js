import { all } from "redux-saga/effects";

import {
  watchSignupRequest,
  watchLoginRequest,
  watchemailCheckRequest,
  watchLogoutRequest,
} from "./auth";
import { watchaddProjectRequest } from "./project";
import { watchGetMessagesAsync, watchSendMsgAsync } from "./messages";
import { watchGetInitialDataAsync } from "./initialLoader";
import {
  watchLoadTicketMsgsAsync,
  watchLoadTicketsAsync,
  watchSendTicketMsgsAsync,
} from "./ticket";
import { watchloadArchivesAsync } from "./conversations";
import { watchRemoveAgentAsync } from "./dashboard";
import { socketSagas } from "./socket";

export default function* rootSaga() {
  yield all([
    watchemailCheckRequest(),
    watchSignupRequest(),
    watchLoginRequest(),
    watchaddProjectRequest(),
    watchGetMessagesAsync(),
    watchGetInitialDataAsync(),
    watchLogoutRequest(),
    watchLoadTicketMsgsAsync(),
    watchSendTicketMsgsAsync(),
    watchLoadTicketsAsync(),
    watchloadArchivesAsync(),
    watchRemoveAgentAsync(),

    socketSagas(),
  ]);
}
