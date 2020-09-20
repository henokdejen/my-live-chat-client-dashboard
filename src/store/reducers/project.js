import * as types from "../../constants";
import { LS_PID } from "../../constants";

const initialState = {
  projectInfo: [],
  ErrorMessage: "",
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADDPROJECT_SUCCESS:
      return {
        projectInfo: [...state.projectInfo, action.payload.projectInfo],
        ErrorMessage: "",
      };

    case types.ADDPROJECT_FAILURE:
      return {
        projectInfo: state.projectInfo,
        ErrorMessage: action.payload.message,
      };

    case types.ADDPROJECT_REQUEST:
      return {
        projectInfo: state.projectInfo,
        ErrorMessage: "",
      };
    case types.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default projectReducer;
