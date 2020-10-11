import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as API from "../../../API/base";
import Button from "../../controls/buttons/Button";
import InputWithLabel from "../../controls/inputWithLabel/InputWithLabel";
import Modal from "../../controls/modal/Modal";
import { connect } from "react-redux";
import Select from 'react-select';
import "./removeAgentFromDept.scss";

const RemoveAgentFromDept = ({ agents, handleClose, agentsindept, departmentid, onMembersRemove }) => {
  const agentList = [];
  const [selectedAgentList, setSelectedAgentList] = useState([]);
  const [shouldselectAgent, setShouldselectAgent] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);

  agents.forEach(agent => {
    if(agentsindept.some(d => d.agentID == agent.id)) {
      agentList.push({value: agent.id, label:agent.name});
    }
    else{
       // no agents found in the department
    }
  });

  const onSubmit = () => {
    if(selectedAgentList.length === 0){
      setShouldselectAgent(true);
    }
    else{
      setSubmittingForm(true);
        let newAgents = {
          agentIDs: selectedAgentList,
          departmentid: departmentid
        };
      setTimeout(() => {
        API.RemoveAgentsFromDepartment(newAgents)
          .then((response) => {
            let { data } = response;
            if (data.success) {
              onMembersRemove(newAgents);
              handleClose();
            } else {
              alert(data.message);
              handleClose();
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {});
      }, 600);
    }
  };

  const handleAgentAdd = selectedAgent => {
    if(!selectedAgent) return;
    let tempAgents = [];
    selectedAgent.forEach(agentselected => {
      tempAgents.push(agentselected.value);  
    });
    setSelectedAgentList(tempAgents);
    
    if(selectedAgent.length === 0){
      setShouldselectAgent(true);
    }
    else{setShouldselectAgent(false);}
  };

  return (
    <Modal show={true}>
      <div className="modal-title">Remove Agents From Department</div>
      <div className="modal-body">
        <Formik
        initialValues={{}} 
        onSubmit={onSubmit}>
          {() => (
            <Form>
              <InputWithLabel>
                <label>Select agents </label>
                <Select
                  closeMenuOnSelect={false}
                  isMulti
                  options={agentList} 
                  onChange={selectedAgent => {
                    handleAgentAdd(selectedAgent);
                  }}
                  disabled={submittingForm}
                  />
                  {shouldselectAgent && <div className="field-msg form-error-msg">select atleast one agent</div>}
              </InputWithLabel>

              <div className="modal-footer">
                <Button
                  variant="outlined"
                  size="l"
                  onClick={() => handleClose()}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="l"
                  type="submit"
                  disabled={submittingForm}>
                  Remove
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  let { agents, owner } = state.basicState.projectInfo;
  return {agents, ownerID: owner };
};

export default connect(mapStateToProps)(RemoveAgentFromDept);