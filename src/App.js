import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/Login';

function App() {
  return (
    <Router>
      <Login/>
      <Switch>
          <Route path="/">
            {/* <Home /> */}
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
