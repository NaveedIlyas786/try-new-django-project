import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [SubmitbtnClicked, setSubmitbtnClicked] = useState(false);
  const [error, setError] = useState(""); // State to store error message
  const [successMessage, setSuccessMessage] = useState(
    "Login Successfully !"
  );

  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    setSubmitbtnClicked(true)
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
  
    try {
      // Send a request to the server to authenticate the user
      const response = await dispatch(loginUser({ email, password }));
  
      if (loginUser.fulfilled.match(response)) {
        // Successful login, you can redirect the user or perform other actions here
        setError(""); // Clear any previous errors
        setSuccessMessage("Loggedin Successfully!")
        setTimeout(() => {
          navigate("/homepage/dashboard");
        }, 1700);
      } else {
        // Handle authentication failure, display an error message
        setError("Invalid email or password.");
      }
    } catch (error) {
      console.error("An error occurred during login: ", error);
      setError("An error occurred during login.");
    }
  };
  

  return (
    <div className="parent">
      <div className="sub_Parent">
        <img src="../../../src/assets/DMS_logo.png" alt="" />
        <h1>Login</h1>
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
          placeholder="Enter your email"
          className="loginInput"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="pass">
          <input
            placeholder="Enter your password"
            className="loginInput"
            value={password}
            type={passwordVisible ? "text" : "password"} // Toggle between text and password
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {passwordVisible ? (
              <i className="fa-sharp fa fa-light fa-eye"></i>
            ) : (
              <i className="fa-light fa fa-eye-slash"></i>
            )}
          </span>
          <Link className="forgot" to="/forgotScreen">
            Forgot Password
          </Link>
        </div>
        {/* {error && <div className="error">{error}</div>} Display error message */}
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
