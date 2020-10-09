import * as types from "../../constants";

export const signupRequested = ({ email, password, country, name }, history) => ({
  type: types.SIGNUP_REQUEST,
  payload: {
    email: email,
    password: password,
    country: country,
    name: name,
    history
  },
});

export const signupResponse = (token, userInfo) => ({
  type: types.SIGNUP_SUCCESS,
  payload: {
    token,
    userInfo,
  },
});

export const signupError = (message) => ({
  type: types.SIGNUP_FAILURE,
  payload: {
    message,
  },
});

export const loginRequested = ({ email, password }, history) => ({
  type: types.LOGIN_REQUEST,
  payload: {
    email: email,
    password: password,
    history,
  },
});

export const loginResponse = (token, userInfo) => ({
  type: types.LOGIN_SUCCESS,
  payload: {
    token,
    userInfo,
  },
});

export const loginError = (message) => ({
  type: types.LOGIN_FAILURE,
  payload: {
    message,
  },
});

export const emailRequested = ({ email }) => ({
  type: types.CHECK_EMAIL_REQUEST,
  payload: { email: email },
});

export const emailResponse = (message) => ({
  type: types.EMAIL_AVAILABLE,
  payload: {
    message,
  },
});

export const logoutRequested = (history) => ({
  type: types.LOGOUT_REQUEST,
  history,
});

export const logoutSucceded = (history) => ({
  type: types.LOGOUT_SUCCESS,
  history,
});
