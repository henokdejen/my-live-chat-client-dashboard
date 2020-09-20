import React, { useEffect } from "react";
import { InnerHeader } from "../../components/controls/innerHeader/InnerHeader";
import { BsCheckCircle, BsClock, BsClockHistory } from "react-icons/bs";

import "./ticketManager.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { useRouteMatch } from "react-router-dom";
import { loadTicketsRequested } from "../../store/actions";

const statusFilters = {
  open: {
    value: "open",
    lable: "Open Tickets",
  },
  pending: {
    value: "pending",
    lable: "Pending Tickets",
  },
  closed: {
    value: "closed",
    lable: "Closed Tickets",
  },
};

const TicketItem = ({ ticket, onTicketSelected }) => {
  const { visitor, subject, updatedAt } = ticket;

  const onClick = () => {
    onTicketSelected(ticket._id);
  };
  return (
    <div className="ticketItem" onClick={onClick}>
      <div className={`status ${ticket.status}`}>
        {ticket.status === "open" ? (
          <BsClock />
        ) : ticket.status === "pending" ? (
          <BsClockHistory />
        ) : (
          <BsCheckCircle />
        )}
      </div>
      <div className="sender">{visitor.name}</div>
      <p className="subject-body">
        <span className="subject">{subject}</span>
        {/* <span className="body">
          {messages && messages.length && messages[0].text}
        </span> */}
      </p>

      <div className="time">{updatedAt}</div>
    </div>
  );
};

const TicketManager = withRouter(
  ({ title, filters, loadTickets, tickets, history }) => {
    let { path, params } = useRouteMatch();
    const filterValues = Object.values(filters).join("");

    useEffect(() => {
      loadTickets(filters);
    }, [filterValues]);

    const onTicketSelected = (id) => {
      console.log("KESE", path, params);
      let lastIndex = path.length - 1;
      path = path[lastIndex] === "/" ? path.substring(0, lastIndex) : path;
      history.push(`/tickets/${params.filter ? params.filter : "all"}/${id}`);
    };

    return (
      <div className="inner-body-section">
        <InnerHeader>
          <div className="title">{title}</div>
        </InnerHeader>

        {tickets.length ? (
          <div className="tickets-list">
            {tickets.map((ticket, i) => (
              <TicketItem
                key={i}
                ticket={ticket}
                onTicketSelected={onTicketSelected}
              />
            ))}
          </div>
        ) : (
          <div className="no-tickets-msg">You have got no ticket here</div>
        )}
      </div>
    );
  }
);

const mapStateToProps = (
  state,
  {
    match: {
      params: { filter },
    },
  }
) => {
  let title = "All Tickets";
  let filters = {};
  if (statusFilters[filter]) {
    filters.status = statusFilters[filter].value;
    title = statusFilters[filter].lable;
  } else if (filter === "mine") {
    filters.onlyMine = true;
    title = "My Tickets";
  } else if (filter === "unAssigned") {
    title = "Un Assigned Tickets";
  }
  let { tickets } = state.ticketState;
  return { tickets, title, filters };
};

const mapDispatchToProps = (dispatch) => ({
  loadTickets: (filters) => {
    dispatch(loadTicketsRequested(filters));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketManager);
