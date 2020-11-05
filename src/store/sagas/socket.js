// import { push } from 'react-router-redux';
import { eventChannel } from "redux-saga";
import {
  all,
  call,
  delay,
  fork,
  put,
  race,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import * as types from "../../constants";
import {
  messageSeen,
  messasgeSent,
  newConversationAdded,
  newMessageAdded,
  visitorGetOffline,
  visitorGetOnline,
  visitorLeftChat,
  conversationJoined,
  conversationLoaded,
  assignedToConversation,
  closeModalRequested,
  conversationLeft,
  messagesRemoved,
  convClosed,
  agentOnlineOffline,
  chatTransfered,
} from "../actions";
import { getConversation, getMessage, getSneakPreviewMessage } from "./helper";
import { connectSocket } from "../../API/base";
import {
  CLOSE_CONVERSATION_REQUEST,
  CONVERSATION_TYPES,
  LEAVE_CONVERSATION_REQUEST,
  OPEN_ADD_PROJECT,
  REMOVE_MESSAGE_REQUEST,
  SWITCH_PROJECT_REQUESET,
  TRANSFER_CHAT,
  TRANSFER_CHAT_REQUEST,
} from "../../constants";
import { confirmSaga } from "./modals";

const MessageStatus = types.MessageStatus;

let socket;

const connect = (projectID) => {
  socket = connectSocket(projectID);
  return new Promise((resolve) => {
    socket.on("connect", () => {
      console.log("Socket Connected!");
      resolve(socket);
    });

    socket.on("error", (err) => {
      console.log("huhu", err);
    });
  });
};

const disconnect = () => {
  if (socket) {
    return new Promise((resolve) => {
      socket.on("disconnect", () => {
        resolve(socket);
      });
    });
  }
};

const reconnect = () => {
  if (socket) {
    return new Promise((resolve) => {
      socket.on("reconnect", () => {
        resolve(socket);
      });
    });
  }
};

function* read(channel) {
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* sendMsg(socket, conversationId, message) {
  const msg = {
    text: message.messageText,
    time: Date.now(),
    conversationID: conversationId,
    whisper: message.whisper,
  };
  yield put(newMessageAdded(conversationId, message));
  const result = yield new Promise((resolve) => {
    let eventName = types.PRIVATE_MESSAGE;
    if (message.type === CONVERSATION_TYPES.TEAM_CONVERSATION) {
      eventName = msg.whisper ? types.WHISPER : types.VISITOR_MESSAGE;
    }

    console.log("MSG TO BE SENT", message, eventName);
    socket.emit(eventName, msg, function (err, { messageID }) {
      if (err) {
        alert("error creating new conversation");
        resolve(false);
      } else {
        console.log("Message sent", messageID);
        resolve(messageID);
      }
      resolve();
    });
  });
  message.id = result;
  yield put(
    messasgeSent(
      result ? MessageStatus.SUCCESS : MessageStatus.FAILURE,
      conversationId,
      message
    )
  );
}

function* write(socket) {
  while (true) {
    const { payload } = yield take(types.SEND_MESSAGE);
    const { conversationId, message } = payload;
    console.log("saga title", payload);
    yield fork(sendMsg, socket, conversationId, message);
  }
}

function* subscribe(socket) {
  return new eventChannel((emit) => {
    const onNewConversationReceived = (data, joined) => {
      const conv = getConversation(data);
      conv.joined = joined;
      conv.isOnline = true;
      console.log("adv", conv);
      emit(newConversationAdded(conv));
    };

    // conversation related
    socket.on(types.VISITOR_LEFT_CHAT, (data) => {
      console.log("visitor left chat", data);
      emit(visitorLeftChat(data.conversationID));
    });

    socket.on(types.AGENT_SIDE_CHATS, (data) => {
      console.log("metenal", data);
    });

    socket.on(types.AGENT_JOINED_CONVERSATION, (data) => {
      console.log("Joined Conversation", data);
      onNewConversationReceived(data, true);
    });

    socket.on(types.CONVERSATION_STARTED, (data) => {
      onNewConversationReceived(data, true);
    });

    socket.on(types.NEW_ACTIVE_CHAT, (data) => {
      console.log("Endale malet new", data);
      onNewConversationReceived(data, false);
    });

    socket.on(types.NEW_CHAT_ASSIGNED, (data) => {
      console.log("Chat Assigned", data);
      const conv = getConversation(data);
      conv.joined = true;
      conv.isOnline = true;
      emit(assignedToConversation(conv));
    });

    // message related
    socket.on(types.ACTIVE_CHAT_MESSAGE, (data) => {
      console.log("new message received", data);
      let message = getMessage(data);
      message.seen = false;
      message.shouldReport = true;
      emit(newMessageAdded(data.conversationID, message));
    });

    socket.on(types.MESSAGE_SEEN, (data) => {
      console.log("Message Seen", data);
      emit(messageSeen(data.conversationID, data.messageID));
    });

    socket.on("VISITORTYPING", (data) => {
      console.log("Typing..", data);
    });

    socket.on("SNEAKPREVIEW", (data) => {
      const message = getSneakPreviewMessage(data);
      console.log("SneakPreview", data, message);
      emit(newMessageAdded(data.conversationID, message));
    });

    socket.on(types.DELETED_MESSAGES, (data) => {
      const { conversationID, messageIDs } = data;
      emit(messagesRemoved(conversationID, messageIDs));
    });

    // visitor related
    socket.on(types.VISITOR_CONNECTED, (data) => {
      console.log("visitor connected", data);
      emit(visitorGetOnline(data));
    });

    socket.on(types.VISITOR_DISCONNECTED, (data) => {
      console.log("visitor disconnected", data);
      emit(visitorGetOffline(data));
    });

    // agent related
    socket.on(types.AGENT_ONLINE, (data) => {
      console.log("Agent Online", data);
      emit(agentOnlineOffline(true, data.agentID));
    });

    socket.on(types.AGENT_OFFLINE, (data) => {
      console.log("Agent Offline", data);
      emit(agentOnlineOffline(false, data.agentID));
    });

    return () => {};
  });
}

// connection monitoring sagas
const listenDisconnectSaga = function* () {
  while (true) {
    yield call(disconnect);
    console.log("Server is Off");
    // yield put({ type: SERVER_OFF });
  }
};

const listenConnectSaga = function* () {
  while (true) {
    yield call(reconnect);
    console.log("Server is On");
    // yield put({ type: SERVER_ON });
  }
};

function* setupSocket(projectID) {
  try {
    // yield put({type: CHANNEL_ON});

    const { socket, timeout } = yield race({
      socket: call(connect, projectID),
      timeout: delay(2000),
    });

    if (timeout) {
      // server is down
      console.log("ServerSocket is down");
      socket = yield call(connect);
    }
    // const socket = yield call(connect)
    const channel = yield call(subscribe, socket);

    // yield fork(listenDisconnectSaga);
    // yield fork(listenConnectSaga);

    yield fork(read, channel);
    yield fork(write, socket);
  } catch (error) {
  } finally {
  }
}

function* socketListener() {
  while (true) {
    const action = yield take("connect");
    yield race({
      task: call(setupSocket, action.payload.projectID),
      cancel: take("disconnect"),
    });
  }
}

function* reportMessageSeenSaga(action) {
  const { conversationId, messageId } = action.payload;
  if (socket) {
    yield socket.emit("MESSAGESEEN", {
      messageID: messageId,
      conversationID: conversationId,
    });

    console.log("ayneshee ", conversationId, messageId);

    yield put({
      type: types.MESSAGE_SEEN,
      payload: { conversationId, messageId },
    });
  }
}

function* watchMessageSeenReport() {
  yield takeEvery(types.REPORT_MESSAGE_SEEN, reportMessageSeenSaga);
}

// conversation related

function* startNewConvSaga(action) {
  const { browserID, history } = action.payload;
  if (socket) {
    const result = yield new Promise((resolve) => {
      socket.emit(
        types.START_CONVERSATION,
        { browserID },
        (err, conversation) => {
          if (err) {
            alert("error creating new conversation");
            resolve(false);
          } else {
            console.log("Created Conversation", conversation);
            resolve(conversation);
          }
        }
      );
    });

    if (result) {
      const conv = getConversation(result);
      conv.joined = true;
      conv.new = result.new;
      yield put(newConversationAdded(conv));
      history.push(`/teamInbox/${conv.id}`);
    }
  }
}

function* watchStartNewConversation() {
  yield takeEvery(types.CREATE_CONVERSATION_REQUEST, startNewConvSaga);
}

function* joinConversationSaga(action) {
  let { browserID, conversationID } = action.payload;

  if (socket) {
    const result = yield new Promise((resolve) => {
      socket.emit(
        types.START_CONVERSATION,
        { browserID, conversationID },
        (err) => {
          resolve(err);
        }
      );
    });

    if (!result) {
      // not error
      yield put(conversationJoined(conversationID));
      console.log("Join Result", result);
    }
  }
}

function* watchJoinConversation() {
  yield takeEvery(types.JOIN_CONVERSATION_REQUEST, joinConversationSaga);
}

function* createNewPrivateConvSaga(action) {
  let { name, members } = action.payload;

  console.log("tke", name, members);
  // return;
  if (socket) {
    const result = yield new Promise((resolve) => {
      socket.emit(
        types.CREATE_NEW_PRIVATE_CONVERSATION,
        { name, members },
        (err, conversation) => {
          if (err) {
            alert("error creating new conversation");
            resolve(false);
          } else {
            console.log("Created Conversation", conversation);
            resolve(conversation);
          }
        }
      );
    });

    if (result) {
      alert("Created");
      console.log("Deh", result);
      const conv = getConversation(
        result,
        CONVERSATION_TYPES.PRIVATE_CONVERSATION
      );
      conv.joined = true;
      yield put(newConversationAdded(conv));
      yield put(closeModalRequested("ADD_PRIVATE_CHAT"));
      // history.push(`/conversations/${conv.id}`);
    }
  }
}

function* watchCreateNewConversation() {
  yield takeEvery(
    types.CREATE_NEW_CONVERSATION_REQUEST,
    createNewPrivateConvSaga
  );
}

// const leaveConversation = function* (action) {
//   const { conversationId } = action.payload;

//   // let's initialize the comfirmation first
//   const confirmed = yield call(
//     confirmSaga,
//     `Are you sure you want to leave this conversation?`
//   );

//   if (confirmed && socket) {
//     yield put(conversationLeft(conversationId));
//     alert("Ezih ga");
//     const result = yield new Promise((resolve) => {
//       socket.emit(
//         types.LEAVECHAT,
//         { conversationID: conversationId },
//         (err, data) => {
//           if (err) {
//             alert("error creating new conversation");
//             resolve(false);
//           } else {
//             console.log("Created Conversation", data);
//             resolve(data);
//           }
//         }
//       );
//     });

//     // const removeAgentResponse = yield call(API.removeAgent, agentID);
//     // if (removeAgentResponse.success) {
//     //   alert("remove success");
//     // } else {
//     //   alert("remove failed");
//     // }
//   }
// };

// helper

const closeOrLeaveConversation = function* (action) {
  const { conversationId } = action.payload;

  // let's initialize the comfirmation first
  let msg, eventName, resultAction;
  if (action.type === LEAVE_CONVERSATION_REQUEST) {
    msg = `Are you sure you want to leave this conversation?`;
    eventName = types.LEAVE_CHAT;
    resultAction = conversationLeft;
  } else if (action.type === CLOSE_CONVERSATION_REQUEST) {
    msg = `Are you sure you want to CLOSE and ARCHIVE this conversation?`;
    eventName = types.CLOSE_CHAT;
    resultAction = convClosed;
  }

  if (!eventName) return;

  const confirmed = yield call(confirmSaga, msg);

  if (confirmed && socket) {
    yield put(resultAction(conversationId));
    const result = yield new Promise((resolve) => {
      alert("Ezih ga");
      console.log("man", eventName, { conversationID: conversationId });

      socket.emit(
        "LEAVECHAT",
        { conversationID: conversationId },
        (err, data) => {
          alert("find");
          if (err) {
            alert("error creating new conversation");
            resolve(false);
          } else {
            console.log("Close or leave", data);
            resolve(data);
          }
        }
      );
    });
  }
};

function* watchLeaveConversationAsync() {
  yield takeEvery(LEAVE_CONVERSATION_REQUEST, closeOrLeaveConversation);
}

function* watchCloseConversationAsync() {
  yield takeEvery(CLOSE_CONVERSATION_REQUEST, closeOrLeaveConversation);
}

const transferChatSaga = function* (action) {
  const { conversationId, agentId, departmentId } = action.payload;
  console.log("heee", conversationId, agentId);
  const result = yield new Promise((resolve) => {
    socket.emit(
      types.TRANSFER_CHAT,
      { conversationID: conversationId, agentID: agentId },
      (err, data) => {
        if (err) {
          console.log("Transfer err", err);
          alert("error creating transferring chat");
          resolve(false);
        } else {
          console.log("Chat transferred", data);
          resolve(true);
        }
      }
    );
  });

  if (result) {
    yield put(chatTransfered(conversationId));
    yield put(closeModalRequested("TRANSFER_CHAT"));
  }
};

function* watchTransferChatAsync() {
  yield takeEvery(TRANSFER_CHAT_REQUEST, transferChatSaga);
}

// MESSAGE RELATED
const removeMessageSaga = function* (action) {
  const { conversationId, messageId } = action.payload;

  // console.log('lela', )

  // let's initialize the comfirmation first
  const confirmed = yield call(
    confirmSaga,
    `Are you sure you want to remove this message?`
  );
  if (confirmed) {
    yield put(messagesRemoved(conversationId, [messageId]));
    // call the API HERE
    // return;

    console.log("Begin sent", {
      conversationID: conversationId,
      messageIDs: [messageId],
    });
    const result = yield new Promise((resolve) => {
      socket.emit(
        types.DELETE_MESSAGES,
        { conversationID: conversationId, messageIDs: [messageId] },
        (err, data) => {
          if (err) {
            console.log("ene", err);
            alert("error REMOVE MESSAGES");
            resolve(false);
          } else {
            console.log("REMOVE MESSAGE RESULT", data);
            resolve(true);
          }
        }
      );
    });
  }
};

const watchRemoveMessage = function* () {
  yield takeEvery(REMOVE_MESSAGE_REQUEST, removeMessageSaga);
};

// const watchRemoveMessage = function* () {
//   yield takeEvery(REMOVE_MESSAGE_REQUEST, removeMessageSaga);
// };

const openAddProjectSaga = function* (action) {
  socket.disconnect();
  yield put({ type: "disconnect" });
  socket = null;
};

const watchOpenAddProject = function* () {
  yield takeLatest(OPEN_ADD_PROJECT, openAddProjectSaga);
};

const switchprojectRequestSaga = function* (action) {
  socket.disconnect();
  console.log(socket);
  yield put({ type: "disconnect" });
  socket = null;
};

const watchSwitchProjectRequest = function* () {
  yield takeLatest(SWITCH_PROJECT_REQUESET, switchprojectRequestSaga);
};

export const socketSagas = function* watchAll() {
  yield all([
    watchLeaveConversationAsync(),
    socketListener(),
    watchCloseConversationAsync(),
    watchCreateNewConversation(),
    watchJoinConversation(),
    watchMessageSeenReport(),
    watchRemoveMessage(),
    watchStartNewConversation(),
    watchTransferChatAsync(),
    watchOpenAddProject(),
    watchSwitchProjectRequest(),
  ]);
};
