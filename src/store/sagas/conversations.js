import { put, takeEvery, call } from "redux-saga/effects";
import { FETCH_ALL_CONVERSATIONS_REQUEST } from "../../constants";
import {
  conversationLoaded,
  conversationsLoading,
  messagesLoaded,
} from "../actions";
import * as API from "../../API";
import { getConversation, getSortedConversations } from "./helper";

export const loadConversationsSaga = function* () {
  try {
    const response = yield call(API.loadConversations);
    if (response.success) {
      console.log("RECEIVED Conversations", response.data);

      let conversations = response.data.map((conv) => getConversation(conv));
      conversations = getSortedConversations(conversations);

      yield put(conversationLoaded(conversations));

      // yield put({type: 'connect'})
    }
  } catch (error) {}

  // const { response, error } = yield call(API.loadConversations)
};

export function* watchGetConversationsAsync() {
  yield takeEvery(FETCH_ALL_CONVERSATIONS_REQUEST, loadConversationsSaga);
}
