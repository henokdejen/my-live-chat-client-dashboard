import * as types from "../../constants";

export const loadTicketsRequested = (filters) => ({
  type: types.FETCH_ALL_TICKETS_REQUEST,
  filters,
});

export const ticketsLoaded = (tickets) => ({
  type: types.FETCH_ALL_TICKETS_SUCCESS,
  payload: tickets,
});

export const loadingTicketsFailed = () => ({
  type: types.FETCH_ALL_TICKETS_FAILURE,
});

export const ticketDetailsRequested = (ticketID, filters) => ({
  type: types.FETCH_TICKET_HISTORY_REQUEST,
  payload: { ticketID, filters },
});

export const ticketDetailsLoaded = (ticketID, details) => ({
  type: types.FETCH_TICKET_HISTORY_SUCCESS,
  payload: { ticketID, details },
});

export const loadingTicketsDetailsFailed = (message) => ({
  type: types.FETCH_TICKET_HISTORY_FAILURE,
  message,
});

// ticket messages

export const sendTicketMessageRequested = (selectedTicket, message) => ({
  type: types.SEND_TIKCET_MESSAGE,
  payload: { selectedTicket, message },
});

export const newTicketMessageAdded = (ticketID, message) => ({
  type: types.NEW_TICKET_MESSAGE_ADDED,
  payload: { ticketID, message },
});

export const ticketMessasgeSent = (ticketID, message) => ({
  type: types.TICKET_MESSAGE_SENT_RESULT,
  payload: { ticketID, message },
});

export const ticketClaimed = (ticketID, agent) => ({
  type: types.TICKET_CLAIMED,
  payload: { ticketID, agent },
});
