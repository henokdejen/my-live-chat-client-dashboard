import * as types from "../../constants";

export const addprojectRequested = ({websitename, websiteurl}) => ({
    type: types.ADDPROJECT_REQUEST,
    payload: {
        siteName: websitename,
        siteURL: websiteurl
    }
});

export const addprojectResponse = (projectInfo) => ({
    type: types.ADDPROJECT_SUCCESS,
    payload: {
        projectInfo
    }
});

export const addprojectError = (message) => ({
    type: types.ADDPROJECT_FAILURE,
    payload: {
        message
    }
});