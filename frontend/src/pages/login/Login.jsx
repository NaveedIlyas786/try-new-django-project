import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = () => {
    navigate('/homepage/dashboard');
  };

  return (
    <div className="parent">
      <div className="sub_Parent">
        <img src="../../../src/assets/DMS_logo.png" alt="" />
        <h1>Login</h1>
        <input
          placeholder="Enter your email"
          className="loginInput"
          type="email"
        />
        <div className="pass">
          <input
            placeholder="Enter your password"
            className="loginInput"
            type={passwordVisible ? "text" : "password"} // Toggle between text and password
          >
          </input>
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {passwordVisible ? <i className="fa-sharp fa fa-light fa-eye"></i> : <i className="fa-light fa fa-eye-slash"></i> } 
          </span>
          <Link className="forgot" to="/forgotScreen">
            Forgot Password
          </Link>
        </div>
        <button onClick={handleLogin} className="submitbtn">
          Login
        </button>
        <p className="signuplink">
          Create a New account:
          <Link className="Link" to="/signup">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
