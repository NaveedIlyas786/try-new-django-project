import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../redux/authSlice";
import axios from "axios";

const Signup = () => {
  const [full_Name, setfull_Name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [defaultpass, setDefaultPass] = useState(false);
  const [error, setError] = useState("");
  const [SubmitbtnClicked, setSubmitbtnClicked] = useState(false);
  const [successMessage, setSuccessMessage] = useState(
    "Registered Successfully !"
  );

  const navigate = useNavigate();

  const togglePass = () => {
    setDefaultPass(!defaultpass);
  };

  const dispatch = useDispatch();

  const handleRegister = async () => {
    // Reset error messages
    setError("");
    setSuccessMessage("");
    setSubmitbtnClicked(true);

    // Check for empty fields
    if (!full_Name || !email || !password || !password2) {
      setError("All fields are required");
      return;
    }

    // Check if password and confirm password match
    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }

    // Check if password meets the validation criteria
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Z][A-Za-z\d@$!%*?&]{7,}$/;
    const isValidPassword = passwordRegex.test(password);

    if (password.length < 8) {
      setError("Password length should be equal or greater than 8");
      return;
    }
    if (!isValidPassword) {
      setError(
        <h6>Password first letter should be capital, at least one number & special character like this '<strong> Kingdom123? </strong>'</h6>
      );
      return;
    }
    try {
    
        const userData = {
          full_Name: full_Name,
          email: email,
          password: password,
          password2: password2,
        };
    
        // Dispatch the signUpUser action to send data to the backend
        dispatch(signUpUser(userData))
          .then((response) => {
            // Handle success response from the backend (if needed)
            console.log("User registration successful:", response);
            setSuccessMessage("Registration Successful!");
            setTimeout(() => {
              navigate("/waitingPage")
              // navigate("/");
            }, 1000);
            // Redirect the user to a success page or do something else
          })
          .catch((error) => {
            // Handle error response from the backend
            console.error("User registration failed:", error);
            setError("Registration failed. Please try again.");
          });
      }
    catch (error) {
      console.error("Error checking email:", error);
      setError("Error checking email. Please try again.");
    }
  };

  return (
    <div className="parent">
      <div className="sub_Parent">
        <img src="../../../src/assets/DMS_logo.png" alt="" />
        <h1>SignUp</h1>
        {SubmitbtnClicked && (
          <>
            {error ? (
              <div
                className="error bg-danger w-100 p-2 text-center rounded"
                style={{ color: "white" }}
              >
                {error}
              </div>
            ) : (
              successMessage && (
                <div
                  className="success bg-success w-100 p-2 text-center rounded"
                  style={{ color: "white" }}
                >
                  {successMessage}
                </div>
              )
            )}
          </>
        )}

        <input
          placeholder="Full-Name"
          className="SignUpInput"
          type="text"
          value={full_Name}
          onChange={(e) => setfull_Name(e.target.value)}
        />
        <input
          placeholder="Email"
          className="SignUpInput"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="passfield">
          <input
            placeholder="Password"
            className="SignUpInput"
            type={defaultpass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={password2}
            onChange={(e) => setpassword2(e.target.value)}
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
        {/* <p className="signuplink">
          Already have an account:{" "}
          <Link className="Link" to="/">
            Login
          </Link>
        </p> */}
      </div>
    </div>
  );
};

export default Signup;
