import * as types from "../../constants";
const initialState = {
  onlineVisitors: [],
};

const visitorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ONLINE_VISITORS_SUCCESS: {
      const { onlineVisitors } = action.payload;
      const newState = { ...state };

      newState.onlineVisitors = onlineVisitors;
      return newState;
    }
    case types.VISITOR_GET_OFFLINE: {
      const { browserID } = action.payload;
      const newState = { ...state };

      let newOnlineVisitors = newState.onlineVisitors.filter((visitor) => {
        return visitor.browserID !== browserID;
      });

      newState.onlineVisitors = newOnlineVisitors;
      return newState;
    }
    case types.VISITOR_GET_ONLINE: {
      const { browserID } = action.payload;
      const newState = { ...state };

      let newOnlineVisitors = newState.onlineVisitors.filter((visitor) => {
        return visitor.browserID !== browserID;
      });

      newOnlineVisitors.push(action.payload);

      newState.onlineVisitors = newOnlineVisitors;
      return newState;
    }
    case types.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default visitorsReducer;
