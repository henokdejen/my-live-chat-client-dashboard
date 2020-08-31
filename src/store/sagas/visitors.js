import { put, takeEvery, call } from 'redux-saga/effects';

import { FETCH_ONLINE_VISITORS_REQUESTED } from "../../constants";
import * as API from '../../API'
import { onlineVisitorsLoaded } from '../actions';

export const loadOnlineUsersSaga = function* () {
    console.log('Online visitors requested')
    try {
        const response = yield call(API.loadOnlineVisitors)
        if (response.success) {
            console.log('RECEIVED online visitors', response.data)
            yield put(onlineVisitorsLoaded(response.data))
        }
    } catch (error) {
        console.log('Loading online visitors failed', error)   
    }
}

export function* watchGetOnlineVistorsAsync() {
    yield takeEvery(FETCH_ONLINE_VISITORS_REQUESTED, loadOnlineUsersSaga);
}