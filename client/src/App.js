import React, { Fragment } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//components (import components)

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";

// The front end client side

function App() {
  return (
    <Fragment>
      <Router>
        <div classname="container">
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/dashboard"
              render={(props) => <Dashboard {...props} />}
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
