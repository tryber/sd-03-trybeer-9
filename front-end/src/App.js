import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import userRegisterPage from './pages/User-Register';

function App() {
  <div className="App">
    <BrowserRouter>
      <Switch>
        <Route exact path="/register" component={userRegisterPage} />
      </Switch>
    </BrowserRouter>
  </div>
}

export default App;
