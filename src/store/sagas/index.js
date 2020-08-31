import { all } from 'redux-saga/effects';

import { watchGetConversationsAsync } from './conversations';
import { watchGetMessagesAsync, watchSendMsgAsync } from './messages';
import {socketListener, watchMessageSeenReport} from './socket'
import { watchGetOnlineVistorsAsync } from './visitors';
import {watchGetInitialDataAsync} from './initialLoader'

export default function* rootSaga() {
    yield all([
        watchGetMessagesAsync(),
        watchSendMsgAsync(),
        socketListener(),
        watchGetInitialDataAsync(),
        watchMessageSeenReport()
    ]);
}