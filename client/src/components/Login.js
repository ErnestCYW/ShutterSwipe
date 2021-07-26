import React, { Fragment, useState } from "react";
import LoginNavbar from "./navbar/Login_Navbar";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };

      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);

        setAuth(true);
        toast.success("login successfully");
      } else {
        setAuth(false);

        setErrors(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <LoginNavbar />
      <div className="authentication d-flex align-items-center">
        <div className="form-container">
          <div className="d-flex form-content-left justify-content-center align-items-center">
            <img
              src={require(`../Logo.svg`).default}
              alt="missing img"
              className="h-25 me-5"
            ></img>
            <div className="text-center my-5 display-4">Login</div>
          </div>

          <div className="form-content-right">
            <form onSubmit={onSubmitForm} className="form">
              <div className="form-inputs">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => onChange(e)} //allows you to type!
                />
                {errors.email && <p>{errors.email}</p>}
              </div>

              <div className="form-inputs">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  className="form-input"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => onChange(e)}
                />
                {errors.password && <p>{errors.password}</p>}
              </div>
              <button className="form-input-btn" type="submit">
                Submit
              </button>
              <span className="form-input-login">
                New to ShutterSwipe? Register <a href="/register">here</a>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
