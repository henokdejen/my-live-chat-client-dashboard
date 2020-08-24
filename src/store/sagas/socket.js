import { take, put, call, fork, race, delay } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import io from 'socket.io-client';

import { showNewMessage, messasgeSent, newConversationAdded } from '../actions';
import { MessageStatus, MessageEvents, SocketEvents } from '../../constants';
import { notify } from '../../services/notification';
import {SOCKET_SERVER} from '../../API/API_URL'

const query = { usertype: 'agent', agency: 'telegram', username: localStorage.getItem('username') }
console.log('qer', query)
let socket;
const connect = () => {
    const query = { usertype: 'agent', agency: 'telegram', username: localStorage.getItem('username') }

    socket = io(SOCKET_SERVER, { query });
    return socket
    return new Promise((resolve) => {
        socket.on('connect', () => {
            resolve(socket);
        });
    });
};

const disconnect = () => {
    socket = io(SOCKET_SERVER, {query});
    return new Promise((resolve) => {
        socket.on('disconnect', () => {
            resolve(socket);
        });
    });
};

const reconnect = () => {
    socket = io(SOCKET_SERVER, {query});
    return new Promise((resolve) => {
        socket.on('reconnect', () => {
            resolve(socket);
        });
    });
};


// function connect() {
//     // this.socket = io('http://localhost:5000', { query: { ...this.visitorQuery, token }, forceNew: true }); // remov forcenew on production!!

//     const socket = io('http://localhost:5000', { query: { usertype: 'agent', agency: 'telegram', username: 'Henok Dejen' } });
//     return socket
//     return new Promise(resolve => {
//         socket.on('connect', () => {
//             resolve(socket);
//             console.log("Socket connected");
//         });
//     });
// }

function* read(channel) {
    // const channel = yield call(subscribe, socket);
    while (true) {
        let action = yield take(channel);
        if (action.type === 'NEW_MESSAGE') notify(action.payload.message.messageText)
        yield put(action);
    }
}

function* sendMsg(socket, conversationId, message) {
    const msg = {
        body: message.messageText,
        time: Date.now(),
        conversationID: conversationId
    }
    yield put(showNewMessage(conversationId, message))
    yield new Promise(resolve => {
        socket.emit('MESSAGE', msg, function (comfiramtion) {
            resolve()
        })
    })
    yield put(messasgeSent(MessageStatus.SUCCESS, conversationId, message))
}

function* write(socket) {
    while (true) {
        const { payload } = yield take('SEND_MESSAGE')
        const { conversationId, message } = payload
        console.log("saga title", payload);
        yield fork(sendMsg, socket, conversationId, message)
    }
}

export function* subscribe(socket) {
    return new eventChannel(emit => {
        socket.on(SocketEvents.NEWCHATASSIGNED, (data) => {
            console.log('lela', data)
            emit(newConversationAdded(data))
        })

        socket.on('MESSAGE', (data) => {
            console.log('here I am ', data)
            const message = {
                id: data.messageID,
                imageUrl: null,
                imageAlt: null,
                messageText: data.body,
                createdAt: 'Oct 20',
                isMyMessage: false
            }
            // console.log('To')
            emit(showNewMessage(data.conversationID, message))
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

        const {socket, timeout } = yield race({
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