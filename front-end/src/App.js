import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserRegisterPage from './pages/User-Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/register" component={UserRegisterPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
