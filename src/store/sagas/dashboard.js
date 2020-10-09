import { put, takeLatest, call, select } from "redux-saga/effects";
import { REMOVE_AGENT_REQUEST } from "../../constants";
import { agentRemoved, archivesLoaded } from "../actions";
import * as API from "../../API/base";
import { confirmSaga } from "./modals";

const removeAgent = function* (action) {
  const { agentID } = action.payload;

  // let's initialize the comfirmation first
  const confirmed = yield call(
    confirmSaga,
    `Are you sure you want to remove this agent?`
  );

  if (confirmed) {
    yield put(agentRemoved(agentID));
    const removeAgentResponse = yield call(API.removeAgent, agentID);
    if (removeAgentResponse.success) {
      alert("remove success");
    } else {
      alert("remove failed");
    }
  }
};

export function* watchRemoveAgentAsync() {
  yield takeLatest(REMOVE_AGENT_REQUEST, removeAgent);
}
