import React from "react";
import Logo from "../Logo.svg";

function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <img src={Logo} alt="" width="62.5" height="50"></img>
            ShutterSwipe
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="navbarSupportedContent"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <a class="nav-link" href="/dashboard">
                  Home
                </a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="/register">
                  Register
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
