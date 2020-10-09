import { put, takeLatest, call, select, race, take } from "redux-saga/effects";

import {
  closeModalRequested,
  messageRemoved,
  messagesLoaded,
  openModalRequested,
} from "../actions";
import {
  CONVERSATION_TYPES,
  FETCH_ALL_MESSAGES_REQUEST,
  MODAL_COMFIRM_NO,
  MODAL_COMFIRM_YES,
  REMOVE_MESSAGE_REQUEST,
} from "../../constants";
import * as API from "../../API/base";
import { getMessage } from "./helper";
import { confirmSaga } from "./modals";

const fetchMessagesSaga = function* (action) {
  const { conversationId, type } = action.payload;
  try {
    let loader =
      type === CONVERSATION_TYPES.PRIVATE_CONVERSATION ||
      type === CONVERSATION_TYPES.TEAM_CONVERSATION
        ? API.loadActiveConvMessages
        : API.loadArchiveConMessages;
    const response = yield call(loader, conversationId);
    const userInfo = yield select((state) => state.basicState.userInfo);

    if (response.success) {
      let messages = response.data.history.reverse().map((msg) => {
        return getMessage(msg, userInfo._id);
      });
      console.log("RECEIVED messages", messages);
      if (!messages) messages = [];
      yield put(messagesLoaded(conversationId, messages, false, null));
    }
  } catch (error) {
    console.log("Connection Error ezih ga", error);
  }
};

export const watchGetMessagesAsync = function* () {
  yield takeLatest(FETCH_ALL_MESSAGES_REQUEST, fetchMessagesSaga);
};
