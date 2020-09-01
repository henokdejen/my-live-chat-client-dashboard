// import { push } from 'react-router-redux';
import { eventChannel } from 'redux-saga';
import { call, delay, fork, put, race, take, takeEvery } from 'redux-saga/effects';
import io from 'socket.io-client';
import { SOCKET_SERVER } from '../../API/API_URL';
import * as types from '../../constants';
import { NEW_MESSAGE_ADDED } from '../../constants';
import { notify } from '../../services/notification';
import { messageSeen, messasgeSent, newConversationAdded, newMessageAdded, visitorGetOffline, visitorGetOnline, visitorLeftChat, conversationJoined } from '../actions';
import { getConversation, getMessage } from './helper';



const MessageStatus = types.MessageStatus

const query = { usertype: 'agent', agency: 'telegram', username: localStorage.getItem('username') }
let socket;

const connect = () => {
    const query = { usertype: 'agent', agency: 'telegram', username: 'henok' }
    socket = io(SOCKET_SERVER, { query });
    return new Promise((resolve) => {
        socket.on('connect', () => {
            console.log('Socket Connected!')
            resolve(socket);
        });
    });
};

const disconnect = () => {
    if (socket) {
        return new Promise((resolve) => {
            socket.on('disconnect', () => {
                resolve(socket);
            });
        });
    }
};

const reconnect = () => {
    if (socket) {

        return new Promise((resolve) => {
            socket.on('reconnect', () => {
                resolve(socket);
            });
        });

    }
};

function* read(channel) {
    // const channel = yield call(subscribe, socket);
    while (true) {
        let action = yield take(channel);
        if (action.type === NEW_MESSAGE_ADDED) notify(action.payload.message.messageText)
        yield put(action);
    }
}

function* sendMsg(socket, conversationId, message) {
    const msg = {
        text: message.messageText,
        time: Date.now(),
        conversationID: conversationId
    }
    yield put(newMessageAdded(conversationId, message))
    console.log('MSG TO BE SENT', msg)
    const result = yield new Promise(resolve => {
        socket.emit('MESSAGE', msg, function (comfiramtion) {
            console.log('Conf', comfiramtion)
            resolve()
        })
    })
    message.messageID = result
    yield put(messasgeSent(MessageStatus.SUCCESS, conversationId, message))
}

function* write(socket) {
    while (true) {
        const { payload } = yield take(types.SEND_MESSAGE)
        const { conversationId, message } = payload
        console.log("saga title", payload);
        yield fork(sendMsg, socket, conversationId, message)
    }
}

export function* subscribe(socket) {
    return new eventChannel(emit => {
        socket.on(types.NEW_CHAT_ASSIGNED, (data) => {
            console.log('Chat Assigned', data)
            const conv = getConversation(data)
            conv.joined = true
            emit(newConversationAdded(conv))
        })

        socket.on(types.MESSAGE, (data) => {
            console.log('new message received', data)
            // const msgTime = new Date(data.createdAt.time).toLocaleTimeString() //getTimeInMyTimeZone(data.createdAt.time, data.createdAt.serverTimeZone).toLocaleTimeString()
            let message = getMessage(data)
            message.seen = false
            message.shouldReport = true
            emit(newMessageAdded(data.conversationID, message))
        })

        socket.on(types.MESSAGE_SEEN, (data) => {
            console.log('Message Seen', data)
            emit(messageSeen(data.conversationID, data.messageID))
            // message seen event should be added here.
        })

        socket.on(types.VISITOR_CONNECTED, (data) => {
            console.log('visitor connected', data)
            emit(visitorGetOnline(data))
            // emit(onlineStatusChange(data.conversationID, true))
        })

        socket.on(types.VISITOR_DISCONNECTED, (data) => {
            console.log('visitor disconnected', data)
            emit(visitorGetOffline(data))

            // emit(onlineStatusChange(data.conversationID, false))
        })

        socket.on(types.VISITOR_LEFT_CHAT, (data) => {
            console.log('visitor left chat', data)
            emit(visitorLeftChat(data.conversationID))
            // message seen event should be added here.
        })
        return () => { }
    })
}

// connection monitoring sagas
const listenDisconnectSaga = function* () {
    while (true) {
        yield call(disconnect);
        console.log('Server is Off')
        // yield put({ type: SERVER_OFF });
    }
};

const listenConnectSaga = function* () {
    while (true) {
        yield call(reconnect);
        console.log('Server is On')
        // yield put({ type: SERVER_ON });
    }
};


export function* setupSocket() {
    try {
        // yield put({type: CHANNEL_ON});

        const { socket, timeout } = yield race({
            socket: call(connect),
            timeout: delay(2000),
        });

        if (timeout) {
            // server is down
            console.log('ServerSocket is down')
            socket = yield call(connect)

        }
        // const socket = yield call(connect)
        const channel = yield call(subscribe, socket);

        yield fork(listenDisconnectSaga);
        yield fork(listenConnectSaga);

        yield fork(read, channel)
        yield fork(write, socket)
    } catch (error) {

    } finally {

    }
}

export function* socketListener() {
    while (true) {
        yield take('connect')
        yield race({
            task: call(setupSocket),
            cancel: take('disconnect'),
        });
    }
    // // const socket = yield call(connect)
    // const socket = connect()
    // yield fork(read, socket)
    // yield fork(write, socket)
}

export function* reportMessageSeenSaga(action) {
    const { conversationId, messageId } = action.payload;
    if (socket) {
        yield socket.emit('MESSAGESEEN', {
            messageID: messageId,
            conversationID: conversationId
        });

        console.log('ayneshee ', conversationId, messageId)


        yield put({ type: types.MESSAGE_SEEN, payload: { conversationId, messageId } })
    }
}

export function* watchMessageSeenReport() {
    yield takeEvery(types.REPORT_MESSAGE_SEEN, reportMessageSeenSaga);
}


export function* startNewConvSaga(action) {
    console.log("I have iintereseerfasf")
    const { browserID, history } = action.payload
    history.push('/conversations')

    if (socket) {
        const result = yield new Promise(resolve => {
            socket.emit('STARTCONVERSATION', { browserID }, (err, conversation) => {
                if (err) {
                    alert('error creating new conversation')
                    resolve(false)
                } else {
                    console.log('Created Conversation', conversation)
                    resolve(conversation)
                }
            })
        })

        if (result) {
            const conv = getConversation(result)
            conv.joined = true
            yield put(newConversationAdded(conv))
            history.push(`/conversations/${conv.id}`);
            console.log('eje', conv)
        }

    }
}

export function* watchStartNewConversation() {
    yield takeEvery(types.CREATE_CONVERSATION_REQUEST, startNewConvSaga)
}


function* joinConversationSaga(action) {
    let { browserID, conversationID } = action.payload

    if (socket) {
        const result = yield new Promise(resolve => {
            socket.emit('JOINCHAT', { browserID, conversationID }, (err) => {
                resolve(err)
            })
        })

        if (!result) { // not error
            yield put(conversationJoined(conversationID))
            console.log('Join Result', result)
        }
    }
}


export function* watchJoinConversation() {
    yield takeEvery(types.JOIN_CONVERSATION_REQUEST, joinConversationSaga)
}
