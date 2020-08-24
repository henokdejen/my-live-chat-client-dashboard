import { all } from 'redux-saga/effects';

import { watchGetConversationsAsync } from './conversations';
import { watchGetMessagesAsync, watchSendMsgAsync } from './messages';
import {socketListener} from './socket'

export default function* rootSaga() {
    yield all([
        watchGetConversationsAsync(),
        watchGetMessagesAsync(),
        watchSendMsgAsync(),
        socketListener()
    ]);
}