import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Dashboard } from './containers/Dashboard/Dashboard';
import { JoinPage } from './containers/JoinPage/JoinPage';
import { Signin } from './containers/Signin/Signin';
import { Signup } from './containers/Signup/Signup';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import InitialLoader from './containers/InitialLoader/InitialLoader';
import ProtectedRoute from './containers/protectedRoute/ProtectedRoute';

const App = ({ loadingOver }) => {
  const [pageIndex, setpageIndex] = useState(0)
  return (
    <>
      {
        false ?
        <InitialLoader setIndex={setpageIndex} /> : (
          <BrowserRouter>
            <Switch>
              <Route path="/signin" name="signin page" component={props => <Signin {...props}/>} />
              <Route path="/signup" name="signup page" component={props => <Signup {...props}/>} />
              <ProtectedRoute exact path="/join" name="Join Page" component={props => <JoinPage {...props} />} />
              <ProtectedRoute path="/" name="the app" component={props => <Dashboard {...props} />} />
            </Switch>
          </BrowserRouter>
          )
      }
    </>

  );
}

const mapStateToProps = (state) => {
  let props = {
    loadingOver: (state.services.isInitialDataLoaded)
  };
  return props
};


export default connect(mapStateToProps)(App);