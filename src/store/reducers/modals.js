import * as types from "../../constants";

const initialState = {
  openModals: [],
};

const modalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN_MODAL: {
      const { name, modalProps } = action.payload;
      return {
        ...state,
        openModals: [...state.openModals, { id: Date.now(), name, modalProps }],
      };
    }
    case types.CLOSE_MODAL: {
      const { name } = action.payload;
      let openModals = [...state.openModals];
      openModals = openModals.filter((om) => om.name != name);
      console.log("ay", openModals, name);
      return { ...state, openModals };
    }
    default:
      return state;
  }
};

export default modalsReducer;
