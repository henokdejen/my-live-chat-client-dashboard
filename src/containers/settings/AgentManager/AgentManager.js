import React, { useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { connect } from "react-redux";
import * as API from "../../../API/base";
import Button from "../../../components/controls/buttons/Button";
import { ComfirmationDialog } from "../../../components/controls/comfirmationDialog/ComfirmationDialog";
import { InnerHeader } from "../../../components/controls/innerHeader/InnerHeader";
import { AddAgentModal } from "../../../components/modals/addAgentModal/AddAgentModal";
import { agentRemoved, newAgentAdded } from "../../../store/actions";
import "./agentManager.scss";

const AgentItem = ({ isUserTheProjAdmin, isAdmin, agent, onAgentRemoved }) => {
  let { id, name, email } = agent;

  const role = isAdmin ? "Project Owner" : "agent";
  const [show, setshow] = useState(false);

  const onDeleteComifrmed = () => {
    setshow(false);
    onAgentRemoved(id);
  };

  const onDeleteDenied = () => {
    setshow(false);
  };

  return (
    <tr className="agent-item">
      <td className="agent-name">{name}</td>
      <td className="agent-email">{email}</td>
      <td className="agent-role">
        {" "}
        <span>{role}</span>
      </td>

      {isUserTheProjAdmin && !isAdmin ? (
        <td className="actions">
          <Button size="sm" variant="primary" onClick={() => setshow(true)}>
            Remove
          </Button>

          <ComfirmationDialog
            show={show}
            message="Are you sure you want to remove this agent?"
            cancelBtnTitle="Cancel"
            comfirmBtnTitle="Remove"
            onComfirmation={onDeleteComifrmed}
            onDeny={onDeleteDenied}
          />
        </td>
      ) : (
        <td className="actions"></td>
      )}
    </tr>
  );
};

const AgentManager = ({
  userInfo,
  agents,
  ownerID,
  removeAgentFromStore,
  addAgentToStore,
}) => {
  const [showAddAgentModal, setshowAddAgentModal] = useState(false);

  console.log("afafa", agents);

  const removeAgent = (id) => {
    API.removeAgent(id)
      .then((response) => {
        console.log(response);
        let { data } = response;
        if (data.success) {
          removeAgentFromStore(id);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        // always executed
        console.log("Finally hre");
      });
  };

  const isUserTheProjAdmin = ownerID === userInfo._id;

  return (
    <div className="agents-management inner-body-section">
      {showAddAgentModal && (
        <AddAgentModal
          addAgent={addAgentToStore}
          handleClose={() => setshowAddAgentModal(false)}
        />
      )}
      <InnerHeader>
        <div className="title">
          <BsFillPeopleFill />
          Agents
        </div>

        <div className="action-menu">
          {isUserTheProjAdmin && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setshowAddAgentModal(true);
              }}
            >
              Add Agent
            </Button>
          )}
        </div>
      </InnerHeader>
      <table>
        <tbody>
          {agents.map((agent) => (
            <AgentItem
              isUserTheProjAdmin={isUserTheProjAdmin}
              isAdmin={agent.id === ownerID}
              agent={agent}
              key={agent.id}
              onAgentRemoved={removeAgent}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  let { agents, owner } = state.basicState.projectInfo;
  let { userInfo } = state.basicState;
  console.log("fjasdf fjasldj f", agents);
  return { userInfo, agents, ownerID: owner };
};

const mapDispatchToProps = (dispatch) => ({
  removeAgentFromStore: (agentID) => {
    dispatch(agentRemoved(agentID));
  },
  addAgentToStore: (agent) => {
    dispatch(newAgentAdded(agent));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AgentManager);
