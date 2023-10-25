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

    // Check if the email already exists before proceeding

    // Check for empty fields
    if (!full_Name || !email || !password || !password2) {
      // setError("All fields are required");
      setError(
        <>
          <div className="modal-overlay">
            <div className="popuppass">
              {/* <p>All Fields are required</p> */}
              {alert("All Fields are required")}
            </div>
          </div>
        </>
      );

      // Use setTimeout to remove the error message after 1 second
      setTimeout(() => {
        setError(null); // Remove the error message
      }, 1000);
      return;
    }
    //if email is invalid

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const isValidEmail = emailPattern.test(email);
    if (!isValidEmail) {
      setError(
        <>
          <div className="modal-overlay">
            <div className="popuppass">
              {/* <p>Invalid Email</p> */}
              {alert("Your Email is Invalid")}
            </div>
          </div>
        </>
      );

      // Use setTimeout to remove the error message after 1 second
      setTimeout(() => {
        setError(null); // Remove the error message
      }, 1000); // 1000 milliseconds = 1 second

      useEffect(() => {
        // Effect to handle the response from the server
        if (email) {
          checkDuplicateEmail(email);
        }
      }, [email]);

      const checkDuplicateEmail = (email) => {
        // Replace this with your own logic to check for duplicate emails
        // Example: If your backend returns a response like { isDuplicate: true }, or { isDuplicate: false }
        // You can adjust this code accordingly

        axios
          .post("http://127.0.0.1:8000/api/user/register/", { email })

          .catch((error) => {
            console.error("Error checking email:", error);
            setError(
              <div className="modal-overlay">
                <div className="popuppass">
                  <p> Email checking Exist</p>
                </div>
              </div>
            );
          });
      };
    }

    // Check if password and confirm password match
    if (password !== password2) {
      // setError("Passwords do not match");
      setError(
        <>
          <div className="modal-overlay">
            <div className="popuppass">
              {/* <p> Password do not match</p> */}
              {alert("Password do not match")}
            </div>
          </div>
        </>
      );

      // Use setTimeout to remove the error message after 1 second
      setTimeout(() => {
        setError(null); // Remove the error message
      }, 1000);
      return;
    }

    // Check if password meets the validation criteria
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Z][A-Za-z\d@$!%*?&]{7,}$/;
    const isValidPassword = passwordRegex.test(password);
    if (password.length < 8) {
      // setError("Password length should be equal or greater than 8");
      setError(
        <>
          <div className="modal-overlay">
            <div className="popuppass">
              <p>Password length should be Equal or greater than8</p>
            </div>
          </div>
        </>
      );

      // Use setTimeout to remove the error message after 1 second
      setTimeout(() => {
        setError(null); // Remove the error message
      }, 1000);
      return;
    }
    if (!isValidPassword) {
      setError(
        <>
          <div className="modal-overlay">
            <div className="popuppass">
              {/* <p>Invalid Password</p> */}
              {alert("Password is not Matched")}
            </div>
          </div>
        </>
      );

      // Use setTimeout to remove the error message after 1 second
      setTimeout(() => {
        setError(null); // Remove the error message
      }, 1000); // 1000 milliseconds = 1 second

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
        .unwrap()
        .then((response) => {
          // Handle success response from the backend (if needed)
          console.log("User registration successful:", response);
          setSuccessMessage(
            <div className="modal-overlay">
              <div className="popupsuccess">
                <p>Registration Successfull</p>
                {alert("Registration Successfull")}
              </div>
            </div>
          );
          // setTimeout(() => {
          //   navigate("/waitingPage");
          //   // navigate("/");
          // }, 1000);
          // Redirect the user to a success page or do something else
        })
        .catch((error) => {
          // Handle error response from the backend
          console.error("User registration failed:", error);

          // Adjust this to fit the actual error structure you’re receiving
          if (
            error &&
            error.email &&
            error.email.includes("user with this Email already exists.")
          ) {
            setError(
              <>
                <div className="modal-overlay">
                  <div className="popuppass">
                    <p>User with this Email already exists.</p>
                  </div>
                </div>
              </>
            );
          } else {
            setError("Registration failed. Please try again.");
          }
          setTimeout(() => {
            setError(null);
          }, 1000);
        });
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="parent">
      <div className="sub_Parent">
        <img src="../../../src/assets/DMS_logo.png" alt="" />
        <h1 className="signnn">SignUp </h1>
        {SubmitbtnClicked && (
          <>
            {error ? (
              <div
              // className="error bg-danger w-100 p-2 text-center rounded"
              // style={{ color: "white" }}
              >
                {error}
              </div>
            ) : (
              successMessage && (
                <div
                // className="success bg-success w-100 p-2 text-center rounded"
                // style={{ color: "white" }}
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
        <div className="password-validation ">
          <p className="format">First capital letter,At least one number and 
          special character</p>
        </div>

        <div className="passfield pass2">
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
        <button type="button" className="submitbtn" onClick={handleRegister}>
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
