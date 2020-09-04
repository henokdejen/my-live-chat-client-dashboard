import { put, takeEvery, call, all, delay } from 'redux-saga/effects';

import { FETCH_ONLINE_VISITORS_REQUESTED } from "../../constants";
import * as API from '../../API'
import { onlineVisitorsLoaded, conversationLoaded } from '../actions';
import { getConversation, getSortedConversations } from './helper';

const loadInitialDataSaga = function* () {
    console.log('Initial Data requested')
    try {
        const [conversationsResponse, visitorsResponse] = yield all([
            call(API.loadConversations),
            call(API.loadOnlineVisitors)
        ])

        if (conversationsResponse.success && visitorsResponse.success) {
            console.log('RECEIVED Conversations', conversationsResponse.data)
            console.log('RECEIVED online visitors', visitorsResponse.data)

            let conversations = conversationsResponse.data.map(conv => (getConversation(conv)))
            let onlineVisitors = visitorsResponse.data

            // sync online visitors 

            for (let conv of conversations) {
                for (let onVist of onlineVisitors) {
                    if (conv.browserID === onVist.browserID) {
                        conv.isOnline = true
                    }
                }
            }


            // conversations = getSortedConversations(conversations)

            yield put(conversationLoaded(conversations));
            yield put(onlineVisitorsLoaded(visitorsResponse.data))

            // conversations and online userssynchronization should be done
            yield put({type: 'connect'})
            yield put({type: 'FETCH_INITIAL_DATA_SUCCES'})
        }
    } catch (error) {
        console.log('Loading Initial Data failed', error)
    }
}

export function* watchGetInitialDataAsync() {
    yield takeEvery('LOAD_INITIAL_DATA_REQUESTED', loadInitialDataSaga);
}