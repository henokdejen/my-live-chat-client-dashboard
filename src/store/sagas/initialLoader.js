import { put, takeEvery, call, all, delay } from "redux-saga/effects";

import {
  FETCH_ONLINE_VISITORS_REQUESTED,
  LS_PID,
  LS_TOKEN,
} from "../../constants";
import * as APIs from "../../API";
import {
  onlineVisitorsLoaded,
  conversationLoaded,
  initialDataLoaded,
} from "../actions";
import { getConversation, getSortedConversations } from "./helper";
import * as API from "../../API/base";

const loadInitialDataSaga = function* ({ history }) {
  console.log("Initial Data requested");
  try {
    let projectID = localStorage.getItem(LS_PID);
    if (projectID) {
      let initialData = yield API.loadInitialData(projectID);

      if (initialData.success) {
        localStorage.setItem(LS_PID, initialData.data.projectInfo._id);
      }
      yield put(initialDataLoaded(initialData.data));

      const [conversationsResponse, visitorsResponse] = yield all([
        call(API.loadInitialConversations, projectID),
        call(API.loadInitialOnlineUsers, projectID),
      ]);

      console.log("Convs", conversationsResponse);

      if (conversationsResponse.success && visitorsResponse.success) {
        console.log("RECEIVED Conversations", conversationsResponse.data);
        console.log("RECEIVED online visitors", visitorsResponse.data);

        let conversations = conversationsResponse.data.map((conv) =>
          getConversation(conv)
        );
        let onlineVisitors = visitorsResponse.data;

        for (let conv of conversations) {
          for (let onVist of onlineVisitors) {
            if (conv.browserID === onVist.browserID) {
              conv.isOnline = true;
            }
          }
        }

        yield put(conversationLoaded(conversations));
        yield put(onlineVisitorsLoaded(onlineVisitors));

        yield put({ type: "FETCH_INITIAL_DATA_SUCCES" });
      }
    } else {
      // not authenticated
      localStorage.clear(LS_PID);
      localStorage.clear(LS_TOKEN);
      history.push("/join");
    }

    // let conversations = [];
    // let onlineVisitors = [];
    // sync online visitors

    // conversations = getSortedConversations(conversations)

    // conversations and online userssynchronization should be done
    // yield put({ type: "connect" });
    // }
  } catch (error) {
    console.log("Loading Initial Data failed", error);
  }
};

export function* watchGetInitialDataAsync() {
  yield takeEvery("LOAD_INITIAL_DATA_REQUESTED", loadInitialDataSaga);
}
