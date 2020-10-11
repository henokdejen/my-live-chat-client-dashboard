import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import * as API from "../../../API/base";
import Button from "../../controls/buttons/Button";
import InputWithLabel from "../../controls/inputWithLabel/InputWithLabel";
import Modal from "../../controls/modal/Modal";
import Select from 'react-select';
import "./addDepartmentModal.scss";

const AddAgentSchema = () => {

  return Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("* Required"),

    description: Yup.string()
      .min(3, "Too Short!")
      .max(100, "Too Long!")
      .required("* Required"), 
  });
};


const AddDepartmentModal = ({ agents, handleClose, addDepartmentToStore}) => {
  const agentList = [];
  const [selectedAgentList, setSelectedAgentList] = React.useState([]);
  const [shouldselectAgent, setShouldselectAgent] = React.useState(false);
  const [submittingForm, setSubmittingForm] = React.useState(false);

  agents.forEach(agent => {
    agentList.push({value: agent.id, label:agent.name});
  });

  const onSubmit = (values) => {
    if(selectedAgentList.length === 0){
      setShouldselectAgent(true);
    }
    else{
      setSubmittingForm(true);
      setTimeout(() => {
        let newdepartment = {
          name: values.name,
          description: values.description,
          agents: selectedAgentList
        };
        API.addDepartment(newdepartment)
          .then((response) => {
            let { data } = response;
            console.log("meta",response);
            if (data.success) {
              addDepartmentToStore(data.data);
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
          setSubmittingForm(false);
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
      <div className="modal-title">Add Department</div>
      <div className="modal-body">
        <Formik
          initialValues={{
            name: "",
            description: ""
          }}
          validationSchema={AddAgentSchema()}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <InputWithLabel>
                <label>Name </label>
                <Field className="input-text" type="text" name="name" disabled={submittingForm}/>
                {touched.name && errors.name && (
                  <div className="field-msg form-error-msg">{errors.name}</div>
                )}
              </InputWithLabel>

              <InputWithLabel>
                <label>Description </label>
                <Field className="input-text" type="text" name="description" disabled={submittingForm}/>
                {touched.description && errors.description && (
                  <div className="field-msg form-error-msg">{errors.description}</div>
                )}
              </InputWithLabel>

              <InputWithLabel>
                <label>Add agents </label>
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
                  Add Department
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default AddDepartmentModal;