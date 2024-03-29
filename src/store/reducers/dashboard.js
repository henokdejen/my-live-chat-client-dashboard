import * as types from "../../constants";

const getAgent = (agentData) => {
  return {
    id: agentData.agentID ? agentData.agentID : agentData._id,
    name: agentData.agentName ? agentData.agentName : agentData.name,
    email: agentData.agentEmail ? agentData.agentEmail : agentData.email,
    role: "agent",
    isOnline: agentData.isOnline,
  };
};

const formatInitialData = (initialData) => {
  let newInitalData = { ...initialData };
  newInitalData.projectInfo.agents = newInitalData.projectInfo.agents.map(
    (agentData) => getAgent(agentData)
  );

  return newInitalData;
};

const initialState = {};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INITIAL_DATA_LOADED: {
      let data = action.payload;
      data = formatInitialData(data);
      // let's set few things
      const newState = { ...state, ...data };
      return newState;
    }
    case types.NEW_AGENT_ADDED: {
      let { agent } = action;
      agent = getAgent(agent);
      const newState = { ...state };
      newState.projectInfo.agents = newState.projectInfo.agents.concat(agent);
      return newState;
    }
    case types.AGENT_REMOVED: {
      const { agentID } = action;
      const newState = { ...state };
      newState.projectInfo.agents = newState.projectInfo.agents.filter(
        (agt) => agt.id !== agentID
      );
      return newState;
    }

    case types.NEW_DEPARTMENT_ADDED: {
      let { department } = action;
      const newState = { ...state };
      newState.projectInfo.departments.push(department);
      return newState;
    }

    case types.DEPARTMENT_REMOVED: {
      const { departmentID } = action;
      const newState = { ...state };
      newState.projectInfo.departments = newState.projectInfo.departments.filter(
        (dept) => dept._id !== departmentID
      );
      return newState;
    }

    case types.ADD_AGENTS_TO_DEPARTMENT: {
      const {agents} = action;
      let tempIDs = [];
      agents.agentIDs.forEach((ag) => {
        tempIDs.push({agentID:ag});
      });
    
      const newState = { ...state };
      newState.projectInfo.departments.forEach((dep)=>{
        if(dep._id == agents.departmentid){
          dep.agents.push(...tempIDs);
        }
      });
      
      return newState;
    }

    case types.REMOVE_AGENTS_FROM_DEPARTMENT: {
      const {agents} = action;
      let agentsToRemove = agents.agentIDs;

      const newState = {...state};

      newState.projectInfo.departments.forEach((dep)=>{
        if(dep._id == agents.departmentid){
          dep.agents = dep.agents.filter(el => !agentsToRemove.includes(el.agentID));
        }
      });

      return newState;
    }
    case types.AGENT_GET_ONLINE_OFFLINE: {
      const { online, agentId } = action.payload;
      const newState = { ...state };
      newState.projectInfo.agents = newState.projectInfo.agents.map((agent) => {
        if (agent.id === agentId) {
          agent.isOnline = online;
        }
        return agent;
      });
      console.log("ss", newState.projectInfo.agents);
      return newState;
    }

    case types.EDIT_USER_SUCCESS: {
      const { name, timeZone } = action.payload;
      const newState = { ...state };
      newState.userInfo = { ...newState.userInfo, ...{ name, timeZone } };
      const currentUserId = newState.userInfo._id;
      newState.projectInfo.agents = newState.projectInfo.agents.map((agent) => {
        if (agent.id === currentUserId) {
          return { ...agent, ...{ name, timeZone } };
        }
        return agent;
      });

      return newState;
    }
    case types.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default dashboardReducer;
