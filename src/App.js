import React, { useState } from 'react';

import ChatShell from './containers/shell/ChatShell';
import { Dashboard } from './containers/Dashboard/Dashboard';
import { JoinPage } from './containers/JoinPage/JoinPage';

const App = () => {
  const [pageIndex, setpageIndex] = useState(0)
  return (
    <div>
      {pageIndex === 0 ? <JoinPage onJoin = {i => setpageIndex(i)}/> : <Dashboard />}
    </div>
  );
}

export default App;