import { put, takeEvery, call, all, delay } from "redux-saga/effects";

import { LS_PID, LS_TOKEN } from "../../constants";
import {
  onlineVisitorsLoaded,
  conversationLoaded,
  initialDataLoaded,
} from "../actions";
import { getConversation, mapConversationsWithOnlineStatus } from "./helper";
import * as API from "../../API/base";

const loadInitialDataSaga = function* ({ history }) {
  console.log("Initial Data requested", localStorage.getItem(LS_PID));
  // yield delay(2000);
  try {
    let projectID = localStorage.getItem(LS_PID);
    if (projectID) {
      let initialDataResponse = yield API.loadInitialData(projectID);

      if (initialDataResponse.success) {
        const initialData = initialDataResponse.data;

        localStorage.setItem(LS_PID, initialData.projectInfo._id);
        //

        const { agents, onlineAgents } = initialData.projectInfo;

        onlineAgents.push(initialData.userInfo._id);

        for (let agent of agents) {
          agent.isOnline = onlineAgents.includes(agent.agentID);
        }

        console.log("yalehegn", initialData.projectInfo.agents);
        yield put(initialDataLoaded(initialData));

        const [conversationsResponse, visitorsResponse] = yield all([
          call(API.loadActiveConversations, projectID),
          call(API.loadInitialOnlineUsers, projectID),
        ]);

        if (conversationsResponse.success && visitorsResponse.success) {
          console.log("RECEIVED Conversations", conversationsResponse.data);
          console.log("RECEIVED online visitors", visitorsResponse.data);

          const activeConvs = conversationsResponse.data.active;
          const privateConvs = conversationsResponse.data.private;

          let conversations = activeConvs
            .concat(privateConvs)
            .map((conv) => getConversation(conv));

          let onlineVisitors = visitorsResponse.data;
          onlineVisitors = onlineVisitors.map((visitor) => ({
            ...visitor,
            ...visitor.visitorInfo,
          }));

          // for (let conv of conversations) {
          //   for (let onVist of onlineVisitors) {
          //     if (conv.type == 0 && conv.browserID === onVist.browserID) {
          //       conv.isOnline = true;
          //     }
          //   }
          // }

          mapConversationsWithOnlineStatus(conversations, onlineVisitors);

          yield put(conversationLoaded(conversations));
          yield put(onlineVisitorsLoaded(onlineVisitors));

          yield put({ type: "FETCH_INITIAL_DATA_SUCCES" });
          yield put({
            type: "connect",
            payload: { projectID: initialData.projectInfo._id },
          });
        } else {
          console.log("Eenen ej");
        }
      } else {
        alert("Something went wrong ==> " + initialDataResponse.message);
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
