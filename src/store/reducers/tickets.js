import * as types from "../../constants";

const initialState = {
  tickets: [],
  totalCount: 0,
};

const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ALL_TICKETS_SUCCESS: {
      const data = action.payload;
      console.log("hreere", action.payload);
      let newState = { ...state };
      newState.tickets = data.tickets;
      newState.totalCount = data.count;

      return newState;
    }
    case types.FETCH_TICKET_HISTORY_SUCCESS: {
      const { ticketID, details } = action.payload;

      let newState = { ...state };
      // newState.ticketMessages[ticketID] = details.messages;
      let selectedTicketIndex = newState.tickets.findIndex(
        (t) => t._id === ticketID
      );

      newState.tickets[selectedTicketIndex] = {
        ...details,
        ...newState.tickets[selectedTicketIndex],
      };
      return newState;
    }
    case types.NEW_TICKET_MESSAGE_ADDED: {
      const { ticketID, message } = action.payload;
      let newState = { ...state };
      let selectedTicketIndex = newState.tickets.findIndex(
        (t) => t._id === ticketID
      );
      newState.tickets[selectedTicketIndex].messages.push(message);
      return newState;
    }

    case types.TICKET_MESSAGE_SENT_RESULT: {
      const { ticketID, message } = action.payload;
      let newState = { ...state };
      let selectedTicketIndex = newState.tickets.findIndex(
        (t) => t._id === ticketID
      );

      let newTicketMessages = newState.tickets[selectedTicketIndex].messages;
      let selectedMessageIndex = newTicketMessages.findIndex(
        (m) => m.front_id === message.front_id
      );

      newTicketMessages[selectedMessageIndex] = message;
      newState.tickets[selectedTicketIndex].messages = newTicketMessages;
      return newState;
    }

    case types.TICKET_CLAIMED: {
      const { ticketID, agent } = action.payload;
      let newState = { ...state };
      let selectedTicketIndex = newState.tickets.findIndex(
        (t) => t._id === ticketID
      );

      console.log("Neka", agent);
      if (selectedTicketIndex > -1) {
        let assignedAgent = {
          email: agent.email,
          name: agent.name,
          id: agent._id,
        };
        newState.tickets[selectedTicketIndex].assignedAgent = assignedAgent;
        newState.tickets[selectedTicketIndex].status = "pending";
      }
      return newState;
    }

    default:
      return state;
  }
};

export default ticketsReducer;
