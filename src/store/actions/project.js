import * as types from "../../constants";

export const addprojectRequested = ({ websitename, websiteurl }, history) => ({
  type: types.ADDPROJECT_REQUEST,
  payload: {
    siteName: websitename,
    siteURL: websiteurl,
    history,
  },
});

export const addprojectResponse = (projectInfo) => ({
  type: types.ADDPROJECT_SUCCESS,
  payload: {
    projectInfo,
  },
});

export const addprojectError = (message) => ({
  type: types.ADDPROJECT_FAILURE,
  payload: {
    message,
  },
});

export const switchProjectRequested = (projectId, history) => ({
  type: types.SWITCH_PROJECT_REQUESET,
  payload: {
    projectId,
    history,
  },
});

export const switchProjectSuccess = (projectId) => ({
  type: types.SWITCH_PROJECT_SUCCESS,
  payload: {
    projectId,
  },
});

export const openAddProject = (history) => ({
  type: types.OPEN_ADD_PROJECT,
  payload: {
    history,
  },
});

export const openAddProjectSucces = () => ({
  type: types.OPEN_ADD_PROJECT_SUCCESS,
});
