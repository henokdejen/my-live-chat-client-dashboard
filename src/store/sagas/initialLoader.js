import { put, takeEvery, call, all } from "redux-saga/effects";

import { LS_PID, LS_TOKEN } from "../../constants";
import {
  onlineVisitorsLoaded,
  conversationLoaded,
  initialDataLoaded,
} from "../actions";
import { getConversation } from "./helper";
import * as API from "../../API/base";

const loadInitialDataSaga = function* ({ history }) {
  console.log("Initial Data requested", localStorage.getItem(LS_PID));
  try {
    let projectID = localStorage.getItem(LS_PID);
    if (projectID) {
      let initialData = yield API.loadInitialData(projectID);

      if (initialData.success) {
        localStorage.setItem(LS_PID, initialData.data.projectInfo._id);
        yield put(initialDataLoaded(initialData.data));

        const [conversationsResponse, visitorsResponse] = yield all([
          call(API.loadInitialConversations, projectID),
          call(API.loadInitialOnlineUsers, projectID),
        ]);

        if (conversationsResponse.success && visitorsResponse.success) {
          console.log("RECEIVED Conversations", conversationsResponse.data);
          console.log("RECEIVED online visitors", visitorsResponse.data);

          let conversations = conversationsResponse.data.map((conv) =>
            getConversation(conv)
          );
          let onlineVisitors = visitorsResponse.data;
          onlineVisitors = onlineVisitors.map((visitor) => ({
            ...visitor,
            ...visitor.visitorInfo,
          }));
          // onlineVisitors = { ...onlineVisitors, ...onlineVisitors.visitorInfo };

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
          yield put({
            type: "connect",
            payload: { projectID: initialData.data.projectInfo._id },
          });
        } else {
          console.log("Eenen ej");
        }
      } else {
        alert("Something went wrong ==> " + initialData.message);
      }
    } else {
      localStorage.clear(LS_PID);
      localStorage.clear(LS_TOKEN);
      history.push("/");
    }
  } catch (error) {
    console.log("Loading Initial Data failed", error);
  }
};

export function* watchGetInitialDataAsync() {
  yield takeEvery("LOAD_INITIAL_DATA_REQUESTED", loadInitialDataSaga);
}
