import React, { useRef, useState } from "react";
import Switch from "react-switch";
import Button from "../controls/buttons/Button";

import "./chatWidgetIntegration.scss";

export const ChatWidgetIntegration = ({ embedeCode }) => {
  const [showCopySuccess, setshowCopySuccess] = useState(false);
  const [widgetActive, setwidgetActive] = useState(false);

  const integrationCode = embedeCode;

  console.log("Tset", embedeCode);

  const copyCode = (e) => {
    const showSuccess = () => {
      setshowCopySuccess(true);
      setTimeout(() => {
        setshowCopySuccess(false);
        if (document.selection) {
          document.selection.empty();
        } else if (window.getSelection) {
          window.getSelection().removeAllRanges();
        }
      }, 1500);
    };
    const fallBackCopyText = (text) => {
      let textarea = document.createElement("textarea");
      textarea.value = integrationCode;

      textarea.style.top = 0;
      textarea.style.left = 0;
      textarea.style.position = "fixed";

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      try {
        if (document.execCommand("copy")) showSuccess();
      } catch (error) {
        console.log(error);
      }

      document.body.removeChild(textarea);
    };

    if (!navigator.clipboard) {
      fallBackCopyText(integrationCode);
    } else {
      navigator.clipboard.writeText(integrationCode).then(() => {
        showSuccess();
      });
    }
  };

  return (
    <div className="chat-widget-integration">
      <div className="widget-status widget-setting">
        <div className="header">Widget Status</div>
        <div className="body">
          Active/InActive
          <Switch
            onChange={(checked) => {
              setwidgetActive(checked);
            }}
            checked={widgetActive}
            className="react-switch"
            height={20}
            width={38}
            uncheckedIcon={false}
            checkedIcon={false}
          />
        </div>
      </div>

      <div className="widget-integration-code widget-setting">
        <div className="header">Integration Code</div>
        <div className="body">
          <ol>
            <li>
              <p>
                Copy and paste this code before the closing &lt;/body&gt; tag on
                every page of your website.
              </p>
              <div className="code-wrapper">
                <code>{integrationCode}</code>
              </div>

              <div className="actions">
                {showCopySuccess && (
                  <span className="notification">Copied</span>
                )}
                <Button variant="primary" size="sm" onClick={copyCode}>
                  Copy
                </Button>
              </div>
            </li>
            <li>
              <p>
                Reload your website. LiveChat should appear in the bottom right
                corner.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};
