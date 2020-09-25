import React, { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import { InnerHeader } from "../../../components/controls/innerHeader/InnerHeader";
import { TicketInputControls } from "../../../components/ticket/ticket-input-contorls/TicketInputControls";
import { TicketMessagesList } from "../../../components/ticket/ticketMessageList/TicketMessagesList";
import {
  sendTicketMessageRequested,
  ticketClaimed,
  ticketDetailsRequested,
} from "../../../store/actions/";
import "./ticketBody.scss";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "#fff",
    borderColor: "#ddd",
    minHeight: "30px",
    height: "30px",
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
  }),

  input: (provided) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "30px",
  }),
};

const statuses = [
  {
    value: "Open",
    label: "Open",
  },
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Closed",
    label: "Closed",
  },
];

const TicketBody = withRouter(
  ({
    selectedTicket,
    currentAgent,
    loadTicketDetails,
    sendTicketMessage,
    getTicketMessages,
    notifyTicketClaimed,
  }) => {
    const ticketMessages = getTicketMessages();

    useEffect(() => {
      if (!ticketMessages) {
        loadTicketDetails(selectedTicket._id);
      }
    }, [selectedTicket]);

    const onExit = () => {
      window.history.back();
    };

    return (
      <div className="ticket-body inner-body-section">
        <InnerHeader>
          <div className="title">
            <IoIosArrowBack onClick={onExit} />
            {selectedTicket.visitor.name}
          </div>

          <div className="actions-right">
            <Select
              className="status-selector"
              classNamePrefix="select"
              defaultValue={statuses[0]}
              options={statuses}
              styles={customStyles}
            />
          </div>
        </InnerHeader>

        <TicketMessagesList
          ticketMessages={ticketMessages ? ticketMessages : []}
          visitor={selectedTicket.visitor}
          currentAgent={currentAgent}
        />
        <TicketInputControls
          onSubmit={(messasge) => {
            sendTicketMessage(selectedTicket, messasge);
          }}
          amIAssigned={
            selectedTicket.assignedAgent &&
            selectedTicket.assignedAgent.id &&
            selectedTicket.assignedAgent.id === currentAgent._id
          }
          isItOpen={selectedTicket.status === "open"}
          selectedTicket={selectedTicket}
          ticketClaimed={() => {
            notifyTicketClaimed(selectedTicket._id, currentAgent);
          }}
        />
      </div>
    );
  }
);

const mapStateToProps = (state, { match: { params } }) => {
  const selectedTicket = state.ticketState.tickets.find(
    (ticket) => ticket._id === params.id
  );

  const getTicketMessages = () =>
    selectedTicket ? selectedTicket.messages : undefined;

  const { userInfo } = state.basicState;

  return { selectedTicket, getTicketMessages, currentAgent: userInfo };
};

const mapDispatchToProps = (dispatch) => {
  const loadMessages = (ticketID, filters) => {
    dispatch(loadTicketDetails(ticketID, filters));
  };

  const loadTicketDetails = (ticketID) => {
    dispatch(ticketDetailsRequested(ticketID));
  };

  const sendTicketMessage = (selectedTicket, message) => {
    console.log("Rece", message);
    dispatch(sendTicketMessageRequested(selectedTicket, message));
  };

  const notifyTicketClaimed = (ticketID, agent) => {
    dispatch(ticketClaimed(ticketID, agent));
  };

  return {
    loadMessages,
    loadTicketDetails,
    sendTicketMessage,
    notifyTicketClaimed,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketBody);
