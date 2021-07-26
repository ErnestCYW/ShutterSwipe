import React from "react";
import { toast } from "react-toastify";
import Logo from "../../Logo.svg";

function FeedNavbar({ setAuth }) {
  const logout = (e) => {
    e.preventDefault();
    console.log("Triggered");
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully");
  };

  return (
    <div className="myNavbar">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand ms-4" href="/">
            <img
              src={Logo}
              className="ms-4"
              alt=""
              width="62.5"
              height="50"
            ></img>
            ShutterSwipe
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#feedNavbar"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="feedNavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="/feed">
                  Feed
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/dashboard">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/group">
                  Groups
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/discover">
                  Discover
                </a>
              </li>{" "}
            </ul>
            <button
              className="btn btn-primary btn-sm "
              onClick={(e) => logout(e)}
              id="logout"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default FeedNavbar;
