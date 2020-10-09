import { put, takeLatest, call, select } from "redux-saga/effects";
import {
  FETCH_ALL_ARCHIVES_REQUEST,
  LEAVE_CONVERSATION_REQUEST,
} from "../../constants";
import { archivesLoaded, conversationLeft } from "../actions";
import * as API from "../../API/base";
import { getConversation } from "./helper";
import { confirmSaga } from "./modals";

const loadArchivesSage = function* (action) {
  const archivesResponse = yield call(API.loadArchivedConversations);
  if (archivesResponse.success) {
    let archives = archivesResponse.data.map((archive) =>
      getConversation(archive)
    );
    yield put(archivesLoaded(archives));
  }
};

export function* watchloadArchivesAsync() {
  yield takeLatest(FETCH_ALL_ARCHIVES_REQUEST, loadArchivesSage);
}
