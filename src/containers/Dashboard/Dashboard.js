import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { rootRoutes } from "../../routes";
import InitialLoader from "../../Layouts/InitialLoader/InitialLoader";
import SideBar from "../SideBar/SideBar";
import "./dashboard.scss";
import Header from "../Header/Header";
import ModalManager from "../modalManager/ModalManager";

const Dashboard = ({ loadingOver }) => {
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
            <Header />
            <div className="main-section-body-wrapper">
              <Switch>
                {rootRoutes &&
                  rootRoutes.routes.map((route, index) => (
                    <Route
                      key={index}
                      path={`/${route.path}`}
                      name={route.name}
                      render={(props) => (
                        <route.component
                          {...props}
                          {...route.additionalProps}
                        />
                      )}
                    />
                  ))}

                <Redirect to={{ pathname: "/home" }} />
              </Switch>
            </div>
          </div>

          <ModalManager />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  let props = {
    loadingOver: state.services.isInitialDataLoaded,
  };

  return props;
};

export default connect(mapStateToProps)(Dashboard);
