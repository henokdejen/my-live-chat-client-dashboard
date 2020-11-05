import React, { useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { connect } from "react-redux";
import * as API from "../../../API/base";
import Button from "../../../components/controls/buttons/Button";
import { ComfirmationDialog } from "../../../components/controls/comfirmationDialog/ComfirmationDialog";
import { InnerHeader } from "../../../components/controls/innerHeader/InnerHeader";
import AddDepartmentModal from "../../../components/modals/addDepartmentModal/AddDepartmentModal";
import AddAgentToDeptModal from "../../../components/modals/addAgentToDeptModal/AddAgentToDeptModal";
import RemoveAgentFromDept from "../../../components/modals/removeAgentFromDeptModal/RemoveAgentFromDept";
import { departmentRemoved, newDepartmentAdded, addAgentsToDepartment, removeAgentsFromDepartment } from "../../../store/actions";
import './departmentManager.scss';

const DepartMentItem = ({isUserTheProjAdmin, department, onDepartmentRemoved, agents, onMembersAdd, onMembersRemove}) => {
    const [show, setshow] = useState(false);
    const [showAddAgentsModal, setshowAddAgentsModal] = useState(false);
    const [showRemoveAgentsModal,setshowRemoveAgentsModal] = useState(false);
    let hasmembers = false;

    if(department.agents.length > 0) hasmembers = true;

    const onDeleteComifrmed = () => {
      setshow(false);
      onDepartmentRemoved(department._id);
    };
  
    const onDeleteDenied = () => {
      setshow(false);
    };
  
    return (
      <>
        <tr className="department-item-container">
          <td className="department-item-name">{department.name}</td>
          <td className="department-item-description">{department.description}</td>
          <td className="department-item-member">{department.agents.length} members</td>
        
          {isUserTheProjAdmin ? (
            <>
            <td>
             <Button size="sm" variant="outlined" onClick={() => setshowAddAgentsModal(true)}>
               Add Member
             </Button>

             {showAddAgentsModal && (
              <AddAgentToDeptModal
                agents={agents}
                agentsindept={department.agents}
                departmentid={department._id}
                handleClose={() => setshowAddAgentsModal(false)}
                onMembersAdd={onMembersAdd}/>)}

             </td>
             <td>
            {hasmembers && <Button size="sm" variant="outlined" onClick={() => setshowRemoveAgentsModal(true)}>
               Remove Member
             </Button>}

             {showRemoveAgentsModal && (
              <RemoveAgentFromDept
                agents={agents}
                agentsindept={department.agents}
                departmentid={department._id}
                handleClose={() => setshowRemoveAgentsModal(false)}
                onMembersRemove={onMembersRemove}/>)}
           </td>
           <td>
              <Button size="sm" variant="primary" onClick={() => setshow(true)}>
                Remove
              </Button>
  
              <ComfirmationDialog
                show={show}
                message="Are you sure you want to remove this department?"
                cancelBtnTitle="Cancel"
                comfirmBtnTitle="Remove"
                onComfirmation={onDeleteComifrmed}
                onDeny={onDeleteDenied}
              />
            </td>            
           </>
          ) : (
            <td className="actions"></td>
          )}
        </tr>
      </>
    );
  };

const DepartmentManager = ({departments, agents, userInfo, ownerID, removeDepartmentFromStore, addDepartmentToStore, removeAgentsFromDepartmentStore, addAgentsToDepartmentStore}) => {

  const [showAddDepartmentModal, setshowAddDepartmentModal] = useState(false);
  const isUserTheProjAdmin = ownerID === userInfo._id;

  const removeDepartment = (id) => {
    API.removeDepartment(id)
      .then((response) => {
        let { data } = response;
        if (data.success) {
          removeDepartmentFromStore(id);
        }
      })
       .catch((error) => {
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  };

  return (
    <div className="departments-management inner-body-section">
      {showAddDepartmentModal && (
        <AddDepartmentModal
          agents={agents}
          addDepartmentToStore={addDepartmentToStore}
          handleClose={() => setshowAddDepartmentModal(false)}
        />
      )}
      <InnerHeader>
        <div className="title">
          <BsFillPeopleFill />
          Departments
        </div>
        <div className="action-menu">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setshowAddDepartmentModal(true)}>
              Add Department
            </Button>
        </div>
      </InnerHeader>
      <table>
        <tbody>
        {departments.map((dept, index) => (
            <DepartMentItem
              isUserTheProjAdmin={isUserTheProjAdmin}
              department={dept}
              key={index}
              onDepartmentRemoved={removeDepartment}
              agents={agents}
              onMembersAdd={addAgentsToDepartmentStore}
              onMembersRemove={removeAgentsFromDepartmentStore}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}


const mapStateToProps = (state) => {
  let {departments ,agents, owner } = state.basicState.projectInfo;
  let { userInfo } = state.basicState;
  return { userInfo, departments, agents, ownerID: owner };
};

const mapDispatchToProps = (dispatch) => ({
  removeDepartmentFromStore: (departmentID) => {
    dispatch(departmentRemoved(departmentID));
  },
  addDepartmentToStore: (ndepartment) => {
    dispatch(newDepartmentAdded(ndepartment));
  },
  removeAgentsFromDepartmentStore: (agentIDs) => {
    dispatch(removeAgentsFromDepartment(agentIDs));
  },
  addAgentsToDepartmentStore: (nagents) => {
    dispatch(addAgentsToDepartment(nagents));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentManager);

