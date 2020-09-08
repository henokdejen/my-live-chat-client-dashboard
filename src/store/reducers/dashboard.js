import * as types from "../../constants";

// const dummyAgents = [
//   {
//     id: 1,
//     name: "Henok Dejen",
//     email: "henokdejen84@gmail.com",
//     role: "admin",
//   },
//   {
//     id: 2,
//     name: "Henok Dejen ",
//     email: "henokdejen84@gmail.com",
//     role: "admin",
//   },
//   {
//     id: 21,
//     name: "Henok Dejen",
//     email: "henokdejen84@gmail.com",
//     role: "agent",
//   },
//   {
//     id: 3,
//     name: "Henok Dejen",
//     email: "henokdejen84@gmail.com",
//     role: "agent",
//   },
// ];

const getAgent = (agentData) => {
  return {
    id: agentData.agentID ? agentData.agentID : agentData._id,
    name: agentData.agentName ? agentData.agentName : agentData.name,
    email: agentData.agentEmail ? agentData.agentEmail : agentData.email,
    role: "agent",
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
      console.log("ss", data);
      // let's set few things
      const newState = { ...state, ...data };

      return newState;
    }
    case types.NEW_AGENT_ADDED: {
      let { agent } = action;
      agent = getAgent(agent);
      const newState = { ...state };
      newState.projectInfo.agents.push(agent);
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
    default:
      return state;
  }
};

export default dashboardReducer;