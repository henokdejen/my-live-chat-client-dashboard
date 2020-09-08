import { all } from 'redux-saga/effects';

import { watchSignupRequest, watchLoginRequest, watchemailCheckRequest} from './auth';
import { watchGetConversationsAsync } from './conversations';
import { watchGetMessagesAsync, watchSendMsgAsync } from './messages';
import {socketListener, watchMessageSeenReport, watchStartNewConversation, watchJoinConversation} from './socket'
import { watchGetOnlineVistorsAsync } from './visitors';
import {watchGetInitialDataAsync} from './initialLoader'

export default function* rootSaga() {
    yield all([
        watchemailCheckRequest(),
        watchSignupRequest(),
        watchLoginRequest(),
        watchGetMessagesAsync(),
        watchSendMsgAsync(),
        socketListener(),
        watchGetInitialDataAsync(),
        watchMessageSeenReport(),
        watchStartNewConversation(),
        watchJoinConversation()
    ]);
}