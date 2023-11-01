import React, { useState } from "react";
import "./ResetPassword.css"
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {

  const { id, token } = useParams();
  const [password, setPassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [defaultpass, setDefaultPass] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const togglePass = () => {
    setDefaultPass(!defaultpass);
  };


  const handleResetPass = () => {
    setLoading(true);

    if (!password || !password2) {
      alert("Both Fields are Required");
    setLoading(false);
      return;
    }
    // Check if both passwords match
    if (password !== password2) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }
    const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Z][A-Za-z\d@$!%*?&]{7,}$/;
  const isValidPassword = passwordRegex.test(password);
  if (password.length < 8) {
    alert("Password length should be Equal or greater than 8")
    setLoading(false);
    return;
  }
  if (!isValidPassword) {
   alert('Invalid Password')// 1000 milliseconds = 1 second
    setLoading(false);
    return;
  }

    const data = {
      id: id,
      token: token,
      password: password,
      password2: password2,
    };
  
    axios
      .post("http://127.0.0.1:8000/api/user/password-reset-confirm/${id}/${token}/", data)
      .then((response) => {
       
        console.log("Your Password has been reset");
       
       
        setTimeout(() => {
          alert("Your Password has been Reset"); 
          // setShowPopup(false);
          navigate("/")
        }, 100);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Password reset failed:", error);
        setTimeout(() => {
          alert("Your Token has been Expired"); // Show the alert after a delay
        }, 100)
        setLoading(false);
      });
  };


  return (
    <>
     {loading && (
        <div className="loader">
        <div className="spinner-border m-5 text-primary sixespinner" role="status">
    <span className="sr-only">Loading...</span>
  </div>
  </div>
      )}
   
    <div className="parent">
      <div className="sub_Parent">
        <img src="../../../src/assets/DMS_logo.png" alt="" />
        <h1 className="headddd">Create New Password</h1>
        

        {/* {showPopup && (
      <div className="modal-overlay">
        <div id="popup" className="popup">
         <p>Your Passowrd has been Reset</p>
        </div>
      </div>
    )} */}
        <div className="passfield">
          <input
            placeholder="Create New Password"
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
          <p className="format">
            First capital letter,At least one number and special character
          </p>
        </div>
        <div className="passfield">
          <input
            placeholder="Confirm New Password"
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
        <button className="submitbtn" onClick={handleResetPass}>
         Reset Password
        </button>
      
      </div>
      
    </div>
 
    </>
  );
};

export default ResetPassword;