import React from "react";
import Logo from "../Logo.svg";

function Navbar() {
  return (
    <div>
      <nav class="navbar sticky-top navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <img src={Logo} alt="" width="62.5" height="50"></img>
            ShutterSwipe
          </a>
          <a href ="/login">Login</a>
          <a href ="/register">Register</a>
          <a href ="/dashboard">Dashboard</a>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
