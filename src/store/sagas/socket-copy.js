// import io from 'socket.io-client';
// import { eventChannel } from 'redux-saga';
// import { fork, take, call, put, cancel } from 'redux-saga/effects';


// function connect() {
//     const socket = io('http://localhost:5000');
//     return new Promise(resolve => {
//         socket.on('connect', () => {
//             resolve(socket);
//         });
//     });
// }

// function subscribe(socket) {
//     console.log('here')
//     return eventChannel(emit => {
//         socket.on('msg', (data) => {
//             console.log('received')
//             emit({ type: 'Ale Aydel', data });
//         });
//         socket.on('users.logout', ({ username }) => {
//             emit({ username });
//         });
//         // socket.on('messages.new', ({ message }) => {
//         //   emit(newMessage({ message }));
//         // });
//         // socket.on('disconnect', e => {
//         //   // TODO: handle
//         // });
//         return () => { };
//     });
// }

// function* read(socket) {
//     const channel = yield call(subscribe, socket);
//     while (true) {
//         console.log('Cah', channel)

//         let action = yield take(channel);
//         console.log('Action Received', action)
//         yield put(action);
//     }
// }

// function* write(socket) {
//     while (true) {
//         const { data } = yield take(`ss`); //sendMessage
//         console.log('To Send', data)
//         socket.emit('msg', data);
//     }
// }

// function* handleIO(socket) {
//     console.log('aaaa')
//     yield fork(read, socket);
//     yield fork(write, socket);
// }

// export function* flow() {
//     // while (true) {
//     //     console.log('Inside hererer')
//     //     // const yehoone = yield take(`connect`);
//     //     // console.log(yehoone)
//     //     // const yehoone = yeild take("*");
//     //     const socket = yield call(connect);
//     //     // socket.emit('login', { username: payload.username });

//     //     const task = yield fork(handleIO, socket);

//     //     // let action = yield take(`${logout}`);
//     //     const aa = take('fasdf')
//     //     yield cancel(task);
//     //     socket.emit('logout');
//     // }

//     const socket = yield call(connect);
//     // socket.emit('login', { username: payload.username });

//     const task = yield fork(handleIO, socket);

//     // let action = yield take(`${logout}`);
//     const aa = take('fasdf')
// }
