import React from "react";
import { Route, Switch } from "react-router-dom";
import ChatShell from "../shell/ChatShell";
import SideBar from "../SideBar/SideBar";
import VisitorShell from "../visitor/VisitorShell";
import "./dashboard.scss";
import Settings from "../Layouts/settings/Settings";

export const Dashboard = () => {
  return (
    <div className="main-container">
      <div className="side-bar-wrapper">
        <SideBar />
      </div>
      <div className="main-section-wrapper">
        <Switch>
          <Route
            path="/conversations"
            name="conversations Page"
            render={(props) => <ChatShell {...props} />}
          />
          <Route
            path="/visitors"
            name="visitors Page"
            render={(props) => <VisitorShell {...props} />}
          />
          <Route
            path="/settings"
            name="settings Page"
            render={(props) => <Settings {...props} />}
          />
        </Switch>
      </div>
    </div>
  );
};
