import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./containers/Dashboard/Dashboard";
import ProtectedRoute from "./containers/protectedRoute/ProtectedRoute";
import Authpage from "./containers/authpage/Authpage";
import Panelform from "./containers/authpage/MultiformPanel/Panelform";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/authenticate"
          name="authentication page"
          component={(props) => <Authpage {...props} />}
        />
        <ProtectedRoute
          path="/projectForm"
          name="project form"
          component={(props) => <Panelform {...props} />}
        />
        <ProtectedRoute
          path="/"
          name="the app"
          component={(props) => <Dashboard {...props} />}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
