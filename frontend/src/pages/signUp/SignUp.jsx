// Signup.js

import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../redux/authSlice";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [defaultpass, setDefaultPass] = useState(false);

  const togglePass = () => {
    setDefaultPass(!defaultpass);
  };

  const dispatch = useDispatch();

  const handleRegister = () => {
    // Create an object with user registration data
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    // Dispatch the signUpUser action to send data to the backend
    dispatch(signUpUser(userData))
      .then((response) => {
        // Handle success response from the backend (if needed)
        console.log("User registration successful:", response);
        // Redirect the user to a success page or do something else
      })
      .catch((error) => {
        // Handle error response from the backend
        console.error("User registration failed:", error);
        // Display an error message to the user
      });
  };

  return (
    <div className="parent">
      <div className="sub_Parent">
      <img src="../../../src/assets/DMS_logo.png" alt="" />
        <h1>SignUp</h1>
        <input placeholder="Full-Name" className="SignUpInput" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" className="SignUpInput" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="passfield">
          <input
            placeholder="Password"
            className="SignUpInput"
            type={defaultpass ? "text" : "password"}
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={togglePass} className="signup-toggle-pass">
            {defaultpass ? (
              <i className="fa-sharp fa fa-light fa-eye"></i>
            ) : (
              <i className="fa-light fa fa-eye-slash"></i>
            )}
          </span>
        </div>
        <div className="passfield">
          <input
            placeholder="Confirm-Password"
            className="SignUpInput"
            type={defaultpass ? "text" : "password"}
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span onClick={togglePass} className="signup-toggle-pass">
            {defaultpass ? (
              <i className="fa-sharp fa fa-light fa-eye"></i>
            ) : (
              <i className="fa-light fa fa-eye-slash"></i>
            )}
          </span>
        </div>
        <button className="submitbtn" onClick={handleRegister}>
          Send Request
        </button>
        <p className="signuplink">
          Already have an account:{" "}
          <Link className="Link" to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

