import React from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="parent">
      <div className="sub_Parent">
        <img src="../../../src/assets/DMS_logo.png" alt="" />
        <h1>SignUp</h1>
        <input
          placeholder="Full-Name"
          className="SignUpInput"
          type="text"
        />
        <input
          placeholder="Email"
          className="SignUpInput"
          type="email"
        />
          <input
            placeholder="Password"
            className="SignUpInput"
            type="password"
          />
          
        <button type="submit" className="submitbtn">
        Send Request
        </button>
        <p className="signuplink">
          Already have an account: <Link className="Link" to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
