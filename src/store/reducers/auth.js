import * as types from "../../constants";
import { LS_TOKEN, LS_PID } from "../../constants";

const initialState = {
  token: null,
  userInfo: [],
  ErrorMessage: "",
  emailAvailable: false,
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
      const {
        token,
        userInfo: { projects },
      } = action.payload;

      localStorage.setItem(LS_TOKEN, token);
      localStorage.setItem(
        LS_PID,
        projects.length ? projects[0].projectID : "no projects"
      );

      return {
        token: true,
        userInfo: action.payload.userInfo,
        ErrorMessage: "",
        emailAvailable: state.emailAvailable,
      };
    case types.SIGNUP_FAILURE:
      return {
        token: state.token,
        userInfo: state.userInfo,
        ErrorMessage: action.payload.message,
        emailAvailable: state.emailAvailable,
      };
    case types.LOGIN_SUCCESS: {
      const {
        token,
        userInfo: { projects },
      } = action.payload;

      localStorage.setItem(LS_TOKEN, token);
      localStorage.setItem(
        LS_PID,
        projects.length ? projects[0].projectID : "no projects"
      );
      return {
        token: true,
        userInfo: action.payload.userInfo,
        ErrorMessage: "",
        emailAvailable: state.emailAvailable,
      };
    }
    case types.LOGIN_FAILURE:
      return {
        token: false,
        userInfo: state.userInfo,
        ErrorMessage: action.payload.message,
        emailAvailable: state.emailAvailable,
      };
    case types.EMAIL_AVAILABLE:
      return {
        token: state.token,
        userInfo: state.userInfo,
        ErrorMessage: state.ErrorMessage,
        emailAvailable: action.payload.message,
      };
    case types.LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};

export default authenticationReducer;
