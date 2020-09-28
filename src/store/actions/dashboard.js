import * as types from "../../constants";

export const newAgentAdded = (agent) => ({
  type: types.NEW_AGENT_ADDED,
  agent,
});

export const agentRemoved = (agentID) => ({
  type: types.AGENT_REMOVED,
  agentID,
});

export const initialDataLoaded = (data) => ({
  type: types.INITIAL_DATA_LOADED,
  payload: data,
});

// user related
export const userDataChanged = (name, timeZone) => ({
  type: types.EDIT_USER_SUCCESS,
  payload: { name, timeZone },
});


// related with department
export const newDepartmentAdded = (department) => ({
  type: types.NEW_DEPARTMENT_ADDED,
  department,
});

export const departmentRemoved = (departmentID) => ({
  type: types.DEPARTMENT_REMOVED,
  departmentID,
});

export const addAgentsToDepartment = (agents) => ({
  type: types.ADD_AGENTS_TO_DEPARTMENT,
  agents,
});

export const removeAgentsFromDepartment = (agents) => ({
  type: types.REMOVE_AGENTS_FROM_DEPARTMENT,
  agents,
});