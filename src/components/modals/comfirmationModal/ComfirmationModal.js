import React from "react";
import Button from "../../controls/buttons/Button";
import Modal from "../../controls/modal/Modal";
import "./comfirmationModals.scss";

export const ComfirmationModal = ({ message, handleCancel, handleComfirm }) => {
  return (
    <Modal show={true} cn="comfirmation-modal">
      <div className="modal-body comfirmation-modal">
        <div className="comf-message">{message}</div>
      </div>
      <div className="modal-footer">
        <Button variant="outlined" size="sm" onClick={() => handleCancel()}>
          No
        </Button>
        <Button
          variant="primary"
          size="sm"
          type="submit"
          onClick={() => handleComfirm()}
        >
          Yes
        </Button>
      </div>
    </Modal>
  );
};
