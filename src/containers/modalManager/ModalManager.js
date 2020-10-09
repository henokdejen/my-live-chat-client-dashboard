import React from "react";
import { connect } from "react-redux";
import { AddConversationModal } from "../../components/modals/addConversationModal/AddConversationModal";
import { MODAL_COMFIRM_NO, MODAL_COMFIRM_YES } from "../../constants";
import { MODALS_LOOKUP_TABLE } from "../../modalsLookUpTable";
import { closeModalRequested } from "../../store/actions";
import "./modalManager.scss";

const ModalManager = ({ openModals, closeModal, comfirm }) => {
  console.log("beyera", openModals);
  const renderedModals = openModals.map((modal, index) => {
    const { name, modalProps = {} } = modal;
    const ModalComponent = MODALS_LOOKUP_TABLE[name];

    let additonalProps = {};

    if (name == "COMFIRMATION") {
      additonalProps.handleComfirm = () => comfirm(true);
      additonalProps.handleCancel = () => comfirm(false);
    } else {
      additonalProps.handleClose = () => closeModal(name);
    }

    return (
      <ModalComponent {...modalProps} key={name + index} {...additonalProps} />
    );
  });

  return <>{renderedModals}</>;
};

const mapStateToProps = (state) => {
  return { openModals: state.modalState.openModals };
};

const mapDispatchToProps = (dispatch) => ({
  closeModal: (name) => {
    dispatch(closeModalRequested(name));
  },

  comfirm: (yes) => {
    dispatch({ type: yes ? MODAL_COMFIRM_YES : MODAL_COMFIRM_NO });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalManager);
