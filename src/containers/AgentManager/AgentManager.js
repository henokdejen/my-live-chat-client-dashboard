import React, { useState } from "react";
import "./agentManager.scss";
import { Badge } from "../../components/controls/badge/Badge";
import { InnerHeader } from "../../components/controls/innerHeader/InnerHeader";
import Button from "../../components/controls/buttons/Button";
import { BsFillPeopleFill } from "react-icons/bs";
import Modal from "../../components/controls/modal/Modal";
import InputWithLabel from "../../components/controls/inputWithLabel/InputWithLabel";
import InputText from "../../components/controls/inputText/InputText";

import ClipLoader from "react-spinners/ClipLoader";
import { ComfirmationDialog } from "../../components/controls/comfirmationDialog/ComfirmationDialog";
import {
  visitorGetOnline,
  agentRemoved,
  newAgentAdded,
} from "../../store/actions";
import { connect } from "react-redux";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { AddAgentModal } from "../../components/modals/addAgentModal/AddAgentModal";
import * as API from "../../API/base";

const dummyAgents = [
  {
    id: 1,
    name: "Henok Dejen",
    email: "henokdejen84@gmail.com",
    role: "admin",
  },
  {
    id: 2,
    name: "Henok Dejen ",
    email: "henokdejen84@gmail.com",
    role: "admin",
  },
  {
    id: 21,
    name: "Henok Dejen",
    email: "henokdejen84@gmail.com",
    role: "agent",
  },
  {
    id: 3,
    name: "Henok Dejen",
    email: "henokdejen84@gmail.com",
    role: "agent",
  },
];

const AgentItem = ({ isUserTheProjAdmin, isAdmin, agent, onAgentRemoved }) => {
  let { id, name, email } = agent;

  const role = isAdmin ? "Project Owner" : "agent";
  const [show, setshow] = useState(false);

  const onDeleteComifrmed = () => {
    setshow(false);
    console.log("deleting things");
    onAgentRemoved(id);
  };

  const onDeleteDenied = () => {
    setshow(false);
  };

  return (
    <>
      <tr className="agent-item">
        <td className="agent-name">{name}</td>
        <td className="agent-email">{email}</td>
        <td className="agent-role">
          {" "}
          <span>{role}</span>
        </td>

        {isUserTheProjAdmin && !isAdmin && (
          <td className="actions">
            <Button size="sm" variant="primary" onClick={(e) => setshow(true)}>
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
        )}
      </tr>
    </>
  );
};

// const AddAgentModal = ({ show, addAgent, handleClose }) => {
//   return (
//     <Modal show={show}>
//       <div className="modal-title">Add Agent</div>
//       <div className="modal-body">
//         <Formik
//           initialValues={{ email: "", name: "" }}
//           validate={(values) => {
//             const errors = {};
//             if (!values.email) {
//               errors.email = "* Required";
//             } else if (
//               !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//             ) {
//               errors.email = "Invalid email address";
//             }

//             if (!values.name) {
//               errors.name = "* Required";
//             }

//             return errors;
//           }}
//           onSubmit={(values, { setSubmitting }) => {
//             setTimeout(() => {
//               let newAgent = {
//                 id: Date.now(),
//                 name: values.name,
//                 email: values.email,
//                 role: "admin",
//               };
//               addAgent(newAgent);
//               setSubmitting(false);
//               handleClose();
//             }, 100);
//           }}
//         >
//           {({ isSubmitting }) => (
//             <Form>
//               <InputWithLabel>
//                 <label>Name </label>
//                 <Field className="input-text" type="text" name="name" />
//                 <ErrorMessage name="name" component="div" />
//               </InputWithLabel>

//               <InputWithLabel>
//                 <label>Email </label>
//                 <Field className="input-text" type="email" name="email" />
//                 <ErrorMessage name="email" component="div" />
//               </InputWithLabel>

//               <div className="modal-footer">
//                 <Button
//                   variant="outlined"
//                   size="l"
//                   onClick={(e) => handleClose()}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   variant="primary"
//                   size="l"
//                   type="submit"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? <ClipLoader /> : "Add Agent"}
//                 </Button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </Modal>
//   );
// };

const AgentManager = ({
  userInfo,
  agents,
  ownerID,
  projectID,
  removeAgentFromStore,
  addAgentToStore,
}) => {
  const [showAddAgentModal, setshowAddAgentModal] = useState(false);

  const removeAgent = (id) => {
    API.removeAgent(projectID, id)
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
    <div className="agents-management">
      {showAddAgentModal && (
        <AddAgentModal
          projectID={projectID}
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
              size="l"
              onClick={(e) => {
                setshowAddAgentModal(!showAddAgentModal);
              }}
            >
              Add Agent
            </Button>
          )}
        </div>
      </InnerHeader>{" "}
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
  let { agents, _id, owner } = state.basicState.projectInfo;
  let { userInfo } = state.basicState;
  return { userInfo, agents, projectID: _id, ownerID: owner };
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
