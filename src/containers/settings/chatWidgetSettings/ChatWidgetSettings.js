import React, { useState } from "react";
import { connect } from "react-redux";
import ChatWidgetAppearance from "../../../components/chat-widget-appearance/ChatWidgetAppearance";
import { ChatWidgetIntegration } from "../../../components/chat-widget-integration/ChatWidgetIntegration";
import { InnerHeader } from "../../../components/controls/innerHeader/InnerHeader";
import "./chatWidget.scss";

const Tabs = ({ activeIndex, tabNames, onTabChange }) => {
  return (
    <div className="tabs">
      {tabNames.map((tab, index) => {
        let cn = activeIndex === index ? "tab active" : "tab";
        return (
          <div className={cn} key={index} onClick={(e) => onTabChange(index)}>
            {tab}
          </div>
        );
      })}
    </div>
  );
};

const ChatWidgetSettings = ({ embedeCode }) => {
  const [pageIndex, setpageIndex] = useState(1);

  const onTabChange = (index) => {
    setpageIndex(index);
  };

  return (
    <div className="chat-widget-settings inner-body-section">
      <InnerHeader>
        <div className="title">Chat Widget</div>
      </InnerHeader>
      <Tabs
        activeIndex={pageIndex}
        onTabChange={onTabChange}
        tabNames={["Integration", "Appearance"]}
      />
      {pageIndex === 0 ? (
        <ChatWidgetIntegration embedeCode={embedeCode} />
      ) : (
        <ChatWidgetAppearance />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  let { embeddingCode } = state.basicState.projectInfo;

  return {
    embedeCode: embeddingCode,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChatWidgetSettings);
