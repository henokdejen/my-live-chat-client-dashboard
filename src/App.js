import React, { useState } from 'react';

import ChatShell from './containers/shell/ChatShell';
import { Dashboard } from './containers/Dashboard/Dashboard';
import { JoinPage } from './containers/JoinPage/JoinPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';



const App = () => {
  let index = localStorage.getItem('usernames') ? 1 : 0
  const [pageIndex, setpageIndex] = useState(0)
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/join" name="Join Page" render={props => <JoinPage {...props} />} />
        <Route path="/" name="the app" render={props => <Dashboard {...props} />} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;


// </BrowserRouter><BrowserRouter>/<div>
// {pageIndex === 1 ? <JoinPage onJoin={i => setpageIndex(i)} /> : <Dashboard />}
// </div>