import * as types from "../../constants";

export const openModalRequested = (name, modalProps) => ({
  type: types.OPEN_MODAL,
  payload: { name, modalProps },
});

export const closeModalRequested = (name) => ({
  type: types.CLOSE_MODAL,
  payload: { name },
});
