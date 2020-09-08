import React from "react";
import { connect } from "react-redux";

import { Route, Switch } from "react-router-dom";
import ChatShell from "../shell/ChatShell";
import SideBar from "../SideBar/SideBar";
import VisitorShell from "../visitor/VisitorShell";
import "./dashboard.scss";
import Settings from "../Layouts/settings/Settings";

import InitialLoader from "../InitialLoader/InitialLoader";

const Dashboard = ({ loadingOver }) => {
  console.log("why here", loadingOver);
  return (
    <>
      {!loadingOver ? (
        <InitialLoader />
      ) : (
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
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  console.log("I am hereaf", state.services.isInitialDataLoaded);
  let props = {
    loadingOver: state.services.isInitialDataLoaded,
  };
  return props;
};

export default connect(mapStateToProps)(Dashboard);
