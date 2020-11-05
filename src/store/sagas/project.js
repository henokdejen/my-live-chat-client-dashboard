import { put, take, call, takeLatest, all } from "redux-saga/effects";
import {
  ADDPROJECT_REQUEST,
  LS_PID,
  OPEN_ADD_PROJECT,
  SWITCH_PROJECT_REQUESET,
} from "../../constants";
import {
  addprojectResponse,
  addprojectError,
  switchProjectSuccess,
  openAddProjectSucces,
} from "../actions/project";

import * as API from "../../API";

const addprojectRequestSaga = function* (action) {
  const projectdetails = action.payload;
  try {
    const response = yield call(API.addProjectAPI, projectdetails);
    if (response.success) {
      const { _id } = response.data;
      localStorage.setItem(LS_PID, _id);
      yield put(addprojectResponse(response.data));
      projectdetails.history.push("/");
    } else yield put(addprojectError(response.message));
  } catch (error) {
    console.log("Connection Error happened", error);
  }
};

const watchaddProjectRequest = function* () {
  yield takeLatest(ADDPROJECT_REQUEST, addprojectRequestSaga);
};

const switchprojectRequestSaga = function* (action) {
  const { projectId, history } = action.payload;

  yield put(switchProjectSuccess(projectId));
  history.push("/");
  // let's clear everything here
};

const watchSwitchProjectRequest = function* () {
  yield takeLatest(SWITCH_PROJECT_REQUESET, switchprojectRequestSaga);
};

const openAddProjectSaga = function* (action) {
  const { history } = action.payload;

  yield put(openAddProjectSucces());
  history.push("/projectForm");
  // let's clear everything here
};

const watchOpenAddProject = function* () {
  yield takeLatest(OPEN_ADD_PROJECT, openAddProjectSaga);
};

export const projectSagas = function* watchAll() {
  yield all([
    watchOpenAddProject(),
    watchaddProjectRequest(),
    watchSwitchProjectRequest(),
  ]);
};
