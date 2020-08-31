import React, { useState } from 'react';
import { connect } from 'react-redux';

import ChatShell from './containers/shell/ChatShell';
import { Dashboard } from './containers/Dashboard/Dashboard';
import { JoinPage } from './containers/JoinPage/JoinPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import InitialLoader from './containers/InitialLoader/InitialLoader';



const App = ({ loadingOver }) => {
  let index = localStorage.getItem('usernames') ? 1 : 0
  const [pageIndex, setpageIndex] = useState(0)
  return (
    <>
      {
        !loadingOver ?
          <InitialLoader setIndex={setpageIndex} /> : (
            <BrowserRouter>
              <Switch>
                <Route exact path="/join" name="Join Page" render={props => <JoinPage {...props} />} />
                <Route path="/" name="the app" render={props => <Dashboard {...props} />} />
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

// export default App;


// </BrowserRouter><BrowserRouter>/<div>
// {pageIndex === 1 ? <JoinPage onJoin={i => setpageIndex(i)} /> : <Dashboard />}
// </div>