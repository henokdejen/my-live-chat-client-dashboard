import { put, take, call, takeLatest } from 'redux-saga/effects';
import { ADDPROJECT_REQUEST } from '../../constants';
import { addprojectResponse, addprojectError } from '../actions/project';

import * as API from '../../API';

const addprojectRequestSaga = function* (action) {

    const projectdetails = action.payload;
    try {
        const response = yield call(API.addProjectAPI, projectdetails)
        if (response.success) yield put(addprojectResponse(response.data));
        else yield put(addprojectError(response.message));
    } catch (error) {
        console.log('Connection Error happened', error)
    }
}

export const watchaddProjectRequest = function* () {
    yield takeLatest(ADDPROJECT_REQUEST, addprojectRequestSaga);
}