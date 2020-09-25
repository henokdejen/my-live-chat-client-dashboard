import { put, takeLatest, call, select } from "redux-saga/effects";

import { messagesLoaded } from "../actions";
import { FETCH_ALL_MESSAGES_REQUEST } from "../../constants";
import * as API from "../../API/base";
import { getMessage } from "./helper";

const fetchMessagesSaga = function* (action) {
  const { conversationId } = action.payload;

  try {
    const response = yield call(API.loadConversationsMessages, conversationId);
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
