import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Dashboard } from './containers/Dashboard/Dashboard';
import { JoinPage } from './containers/JoinPage/JoinPage';
import Authpage from './containers/authpage/Authpage';
import Panelform from './containers/MultiformPanel/Panelform';

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
              <Route path="/authenticate" name="authentication page" component={props => <Authpage {...props}/>} />
              <Route path="/projectForm" name="project form" component={props => <Panelform {...props}/>} />
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