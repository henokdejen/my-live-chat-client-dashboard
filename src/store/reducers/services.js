import * as types from "../../constants";

const initialState = {
  loadedInitialData: {
    conversations: false,
    onlineVisitors: false,
  },
  isInitialDataLoaded: false,
  isConnected: false,
};

const checkIFAllLoaded = (loadedState) => {
  for (let loadable in loadedState) {
    if (!loadedState[loadable]) return false;
  }
  return true;
};

const servicesReducer = (state = initialState, action) => {
  switch (action.type) {
    // case types.FETCH_ALL_CONVERSATIONS_SUCCESS:{
    //     let newState = {...state}
    //     newState.loadedInitialData.conversations = true
    //     // newState.isInitialDataLoaded = checkIFAllLoaded(newState.loadedInitialData)
    //     return newState
    // }
    // case types.FETCH_ONLINE_VISITORS_SUCCESS: {
    //     let newState = {...state}
    //     newState.isInitialDataLoaded = checkIFAllLoaded(newState.loadedInitialData)
    //     newState.loadedInitialData.onlineVisitors = true
    //     return newState
    // }
    case "FETCH_INITIAL_DATA_SUCCES": {
      let newState = { ...state };
      newState.isInitialDataLoaded = true;
      return newState;
    }
    case types.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default servicesReducer;
