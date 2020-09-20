import {
  FETCH_ALL_TICKETS_REQUEST,
  FETCH_TICKET_HISTORY_REQUEST,
  SEND_TIKCET_MESSAGE,
} from "../../constants/tickets";
import * as API from "../../API/base";
import {
  call,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  newTicketMessageAdded,
  ticketDetailsLoaded,
  ticketMessasgeSent,
  ticketsLoaded,
} from "../actions/ticket";

import { getTicket, getTicketMessage } from "./helper";
import { MessageStatus } from "../../constants";
import { act } from "react-dom/test-utils";

const loadTickets = function* (action) {
  const { filters } = action;
  console.log("Anakaew", action);
  try {
    const ticketsResponse = yield call(API.loadTickets, filters);
    if (ticketsResponse.success) {
      console.log("RECEIVED tickets", ticketsResponse);
      // let tickets = ticketsResponse.data;
      const data = ticketsResponse.data;
      data.tickets = data.tickets.map((ticket) => getTicket(ticket));
      yield put(ticketsLoaded(data));
    }
  } catch (error) {
    console.log(error);
  }
};

const loadTicketDetails = function* (action) {
  const { ticketID, filters } = action.payload;

  console.log("Finall  fjl df jf ", ticketID, filters);

  try {
    const response = yield call(API.loadTicketDetails, ticketID);

    if (response.success) {
      console.log("RECEIVED ticket details", response.data);
      const data = response.data;
      data.messages = data.messages.map((message) => getTicketMessage(message));
      yield put(ticketDetailsLoaded(ticketID, data));
    } else {
    }
  } catch (error) {
    console.error("loading ticket messages error", error);
  }
};

const sendTicketMessage = function* (action) {
  const { selectedTicket, message } = action.payload;
  const ticketID = selectedTicket._id;

  message.status = MessageStatus.PENDING;
  message.front_id = Date.now();
  message.sender = { agent: true };

  // const userInfo = yield select((state) => state.basicState.userInfo);

  let goodToSend = true;
  if (!selectedTicket.assignedAgent) {
    const claimResp = yield call(API.claimTicketAssignee, ticketID);
    goodToSend = claimResp.success;
  }

  if (goodToSend) {
    yield put(newTicketMessageAdded(ticketID, message));
    const response = yield call(API.sendTicketMessage, ticketID, message.text);

    let sentMessage = message;
    if (response.success) {
      sentMessage = getTicketMessage(response.data);
      sentMessage.front_id = message.front_id;
      sentMessage.status = MessageStatus.SUCCESS;
    } else {
      sentMessage.status = MessageStatus.FAILURE;
      sentMessage.erroMsg = response.message;
    }

    yield put(ticketMessasgeSent(ticketID, sentMessage));
  } else {
    console.log("Claim Failed");
  }
};

export function* watchLoadTicketsAsync() {
  yield takeEvery(FETCH_ALL_TICKETS_REQUEST, loadTickets);
}

export function* watchLoadTicketMsgsAsync() {
  yield takeLatest(FETCH_TICKET_HISTORY_REQUEST, loadTicketDetails);
}

export function* watchSendTicketMsgsAsync() {
  yield takeLatest(SEND_TIKCET_MESSAGE, sendTicketMessage);
}
