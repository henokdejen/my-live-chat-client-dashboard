import React from "react";
import { Redirect } from "react-router-dom";
import { LS_TOKEN, LS_PID } from "../../constants";

class ProtectedRoute extends React.Component {
  render() {
    const Component = this.props.component;
    let isAuthenticated = false;

    if (localStorage.getItem(LS_TOKEN) && localStorage.getItem(LS_PID)) {
      isAuthenticated = true;
    }
    return isAuthenticated ? (
      <Component />
    ) : (
      <Redirect to={{ pathname: "/authenticate" }} />
    );
  }
}

export default ProtectedRoute;
