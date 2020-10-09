import { put, take, call, takeLatest, race } from "redux-saga/effects";
import { MODAL_COMFIRM_NO, MODAL_COMFIRM_YES } from "../../constants";
import { closeModalRequested, openModalRequested } from "../actions";

export function* confirmSaga(confirmationMessage) {
  yield put(
    openModalRequested("COMFIRMATION", {
      message: confirmationMessage,
    })
  ); // Wait for either a yes or a no.
  // The dialog UI component receives yes and no event handlers
  // in its props that dispatch these actions.
  const { yes } = yield race({
    yes: take(MODAL_COMFIRM_YES),
    no: take(MODAL_COMFIRM_NO),
  });
  // Tell a reducer to hide the dialog
  yield put(closeModalRequested("COMFIRMATION"));
  // Returns true if the 'yes' action was received
  return !!yes;
}
