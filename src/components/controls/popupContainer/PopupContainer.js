import React, { useState, useEffect } from "react";
import "./popupContainer.scss";
import { useRef } from "react";

export const PopupContainer = ({ children, className, handleClose }) => {
  //   let popupVisitiblity = show ? "popup-show" : "popup-hide";
  let containerRef = useRef(null);
  useEffect(() => {
    document.addEventListener("click", closePopup);

    return () => {
      document.removeEventListener("click", closePopup);
    };
  }, []);

  const closePopup = (e) => {
    if (!containerRef.current.contains(e.target)) {
      document.removeEventListener("click", closePopup);
      handleClose();
    }
  };
  return (
    <div ref={containerRef} className={`popup-container ${className}`}>
      {children}
    </div>
  );
};
