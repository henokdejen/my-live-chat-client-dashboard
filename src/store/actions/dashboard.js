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
