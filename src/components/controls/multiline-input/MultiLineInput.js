import React from "react";
import { useEffect } from "react";
import "./multilineInput.scss";

export const MultiLineInput = ({
  innerRef,
  className,
  onChange,
  value,
  placeholder,
  onSubmit,
  onFocus,
}) => {
  let cn = "multiline-input " + (className || "");

  const handleKeyDown = (e) => {
    if (e.key == "Enter" && !e.shiftKey && onSubmit) {
      onSubmit(e);
    }
  };

  const handleKeyUp = (e) => {
    onChange(e.target.innerHTML);
  };

  const handleBlur = (e) => {
    if (e.target.innerText.trim() === "") {
      e.target.innerHTML = "";
    }
  };

  useEffect(() => {
    const el = innerRef.current;
    el.focus();
    if (
      typeof window.getSelection != "undefined" &&
      typeof document.createRange != "undefined"
    ) {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  }, [placeholder]);

  return (
    <div
      ref={innerRef}
      className={cn}
      contentEditable="true"
      data-placeholder={placeholder}
      spellCheck="false"
      role="textbox"
      onFocus={onFocus}
      aria-multiline="true"
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={handleBlur}
    />
  );
};
