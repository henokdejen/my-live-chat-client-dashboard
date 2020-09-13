import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { rootRoutes } from "../../routes";
import InitialLoader from "../InitialLoader/InitialLoader";
import SideBar from "../SideBar/SideBar";
import "./dashboard.scss";

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
              {rootRoutes &&
                rootRoutes.routes.map((route, index) => (
                  <Route
                    key={index}
                    path={`/${route.path}`}
                    name={route.name}
                    render={(props) => <route.component {...props} />}
                  />
                ))}
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
