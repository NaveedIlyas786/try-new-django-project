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
  const navigate = useNavigate();


  const togglePass = () => {
    setDefaultPass(!defaultpass);
  };


  const handleResetPass = () => {
    // Check if both passwords match
    if (password !== password2) {
      alert("Passwords do not match");
      return;
    }

    const data = {
      id: id,
      token: token,
      password: password,
      password2: password2,
    };
  
    axios
      .post(`http://127.0.0.1:8000/api/user/password-reset-confirm/${id}/${token}/`, data)
      .then((response) => {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate("/")
        }, 1000);
      })
      .catch((error) => {
        console.error("Password reset failed:", error);
      });
  };


  return (
    <>
   
    <div className="parent">
      <div className="sub_Parent">
        <img src="../../../src/assets/DMS_logo.png" alt="" />
        <h1 className="headddd">Create New Password</h1>
        

        {showPopup && (
      <div className="modal-overlay">
        <div id="popup" className="popup">
          <p>Congratulations! Your password has been reset.</p>
        </div>
      </div>
    )}
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
