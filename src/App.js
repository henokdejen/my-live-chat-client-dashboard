import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./containers/Dashboard/Dashboard";
import { JoinPage } from "./containers/JoinPage/JoinPage";
import ProtectedRoute from "./containers/protectedRoute/ProtectedRoute";
import Signin from "./containers/Signin/Signin";
import Signup from "./containers/Signup/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/signin"
          name="signin page"
          component={(props) => <Signin {...props} />}
        />
        <Route
          path="/signup"
          name="signup page"
          component={(props) => <Signup {...props} />}
        />
        <ProtectedRoute
          exact
          path="/join"
          name="Join Page"
          component={(props) => <JoinPage {...props} />}
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
