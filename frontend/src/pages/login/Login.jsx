import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom"; // Import usenavigate

const Login = () => {
  const navigate = useNavigate(); // Initialize usenavigate


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
            type="password"
          />
          <Link className="forgot" to="/forgotScreen">
            Forgot Password
          </Link>
        </div>
        <Link to='/homepage/dashboard' className="submitbtn Link">
          Login
        </Link>
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
