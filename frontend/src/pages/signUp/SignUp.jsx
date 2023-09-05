import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [defaultpass, setDefaultPass] = useState(false);

  const togglePass = () => {
    setDefaultPass(!defaultpass);
  };

  const handleRegister = () => {
    console.log(name, email, password, confirmPassword);
  }

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

export default SignUp;
