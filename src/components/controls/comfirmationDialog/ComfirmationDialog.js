import React, { useState } from "react";
import Modal from "../modal/Modal";
import Button from "../buttons/Button";

import "./comfirmationDialog.scss";

export const ComfirmationDialog = ({
  show,
  message,
  cancelBtnTitle,
  comfirmBtnTitle,
  onComfirmation,
  onDeny,
}) => {
  const onDenied = () => {
    onDeny();
  };

  const onComfirmed = () => {
    onComfirmation();
  };

  return (
    <Modal show={show}>
      <div className="comfirmation-msg">{message}</div>
      <div className="modal-footer-btns">
        <Button variant="outlined" size="sm" onClick={onDeny}>
          {cancelBtnTitle}
        </Button>
        <Button variant="primary" size="sm" onClick={onComfirmation}>
          {comfirmBtnTitle}
        </Button>
      </div>
    </Modal>
  );
};
