import { put, takeLatest, takeEvery, call } from "redux-saga/effects";
import {
  SIGNUP_REQUEST,
  LOGIN_REQUEST,
  CHECK_EMAIL_REQUEST,
  LOGIN_SUCCESS,
  LS_PID,
  LS_TOKEN,
  LOGOUT_SUCCESS,
} from "../../constants";
import {
  signupResponse,
  signupError,
  emailResponse,
  loginResponse,
} from "../actions/auth";
import * as API from "../../API";

const signupRequestSaga = function* (action) {
  const userCredential = action.payload;
  try {
    const response = yield call(API.signupuser, userCredential);
    if (response.success){
      yield put(signupResponse(response.data.token, response.data.userInfo));
      userCredential.history.push("/projectForm");
    } else yield put(signupError(response.message));
  } catch (error) {
    console.log("Connection Error happened", error);
  }
};

const loginRequestSaga = function* (action) {
  const userCredential = action.payload;
  try {
    const response = yield call(API.loginuser, userCredential);
    if (response.success) {
      yield put(loginResponse(response.data.token, response.data.userInfo));
      userCredential.history.push("/");
    } else yield put(signupError(response.message));
  } catch (error) {
    console.log("Connection Error happened", error);
  }
};

const emailCheckRequestSaga = function* (action) {
  const { email } = action.payload;
  try {
    const response = yield call(API.checkemailavailable, email);
    if (response.success) yield put(emailResponse(response.data.available));
  } catch (error) {
    console.log("Connection Error happened", error);
  }
};

const logoutRequesetSaga = function* (action) {
  const { history } = action;
  localStorage.removeItem(LS_TOKEN);
  localStorage.removeItem(LS_PID);
  history.push("/");
};

export const watchSignupRequest = function* () {
  yield takeLatest(SIGNUP_REQUEST, signupRequestSaga);
};

export const watchLoginRequest = function* () {
  yield takeLatest(LOGIN_REQUEST, loginRequestSaga);
};

export const watchemailCheckRequest = function* () {
  yield takeLatest(CHECK_EMAIL_REQUEST, emailCheckRequestSaga);
};

export const watchLogoutRequest = function* () {
  yield takeLatest(LOGOUT_SUCCESS, logoutRequesetSaga);
};
