import { put, takeLatest, takeEvery, call, select } from "redux-saga/effects";

import { messagesLoaded, messasgeSent, newMessageAdded } from "../actions";
import { MessageStatus, FETCH_ALL_MESSAGES_REQUEST } from "../../constants";
import * as API from "../../API/base";
import { getMessage } from "./helper";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const fetchMessagesSaga = function* (action) {
  const { conversationId, numberOfMessages, lastMessageId } = action.payload;

  try {
    const response = yield call(API.loadConversationsMessages, conversationId);
    const userInfo = yield select((state) => state.basicState.userInfo);

    if (response.success) {
      let messages = response.data.history.reverse().map((msg) => {
        return getMessage(msg, userInfo._id);
      });
      console.log("RECEIVED messages", messages);
      if (!messages) messages = [];

      // const startIndex = lastMessageId ? messages.findIndex(message => message.id === lastMessageId) + 1 : 0;
      // const endIndex = startIndex + numberOfMessages;
      // const pageGroup = messages.slice(startIndex, endIndex);
      // const newLastMessageId = pageGroup.length > 0 ? pageGroup[pageGroup.length - 1].id : null;
      // const hasMoreMessages = newLastMessageId && endIndex < (messages.length - 1);

      yield put(messagesLoaded(conversationId, messages, false, null));
    }
  } catch (error) {
    console.log("Connection Error ezih ga", error);
  }

  // const {response, error} = yield call(loadMessages, conversationId)

  // if (response){
  // console.log('response', response)
  // const messages = yield response;
  // let messages = messageDetails[conversationId];
  // if (!messages) messages = []
  // const startIndex = lastMessageId ? messages.findIndex(message => message.id === lastMessageId) + 1 : 0;
  // const endIndex = startIndex + numberOfMessages;
  // const pageGroup = messages.slice(startIndex, endIndex);
  // const newLastMessageId = pageGroup.length > 0 ? pageGroup[pageGroup.length - 1].id : null;
  // const hasMoreMessages = newLastMessageId && endIndex < (messages.length - 1);

  // yield put(messagesLoaded(
  //     conversationId,
  //     pageGroup,
  //     hasMoreMessages,
  //     newLastMessageId
  // ));
  // } else {
  //     console.log('error', error)
  // }
};

const sendMsgSaga = function* (action) {
  const { conversationId, message } = action.payload;
  yield put(newMessageAdded(conversationId, message));
  yield put({ type: "SEND_MESSAGE_SOCKET", data: { conversationId, message } });
  yield delay(700);
  yield put(messasgeSent(MessageStatus.SUCCESS, conversationId, message));
};

export const watchGetMessagesAsync = function* () {
  yield takeLatest(FETCH_ALL_MESSAGES_REQUEST, fetchMessagesSaga);
};

export const watchSendMsgAsync = function* () {
  // yield takeEvery('SEND_MESSAGE', sendMsgSaga)
};
