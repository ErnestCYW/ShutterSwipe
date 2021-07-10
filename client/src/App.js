import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//components

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Feed from "./components/Feed";
import Group from "./components/Group";
import Discover from "./components/Discover";
import Profile from "./components/Profile";

import NavbarAuth from "./components/Navbar_Auth";
import NavbarUnauth from "./components/Navbar_Unauth";

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      console.log(isAuthenticated);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  });

  return (
    <Fragment>
      {isAuthenticated ? <NavbarAuth setAuth={setAuth} /> : <NavbarUnauth />}
      <Router>
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" render={(props) => <Home />} />
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                localStorage.token ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/feed"
              // render={(props) => <Feed {...props} />}
              render={(props) =>
                localStorage.token ? (
                  <Feed {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/group"
              // render={(props) => <Feed {...props} />}
              render={(props) =>
                localStorage.token ? (
                  <Group {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/discover"
              render={(props) =>
                localStorage.token ? (
                  <Discover {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/profile/:id"
              render={(props) =>
                localStorage.token ? (
                  <Profile {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
