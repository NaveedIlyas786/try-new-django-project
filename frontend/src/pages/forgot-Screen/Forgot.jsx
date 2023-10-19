import React, { useState } from "react";
import "./Forgot.css";
import axios from "axios";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = () => {
    // Make a POST request to the API endpoint to send the reset password email
    axios
      .post("http://127.0.0.1:8000/api/user/send_reset_password_email/", {
        email: email,
      })
      .then((response) => {
        // Handle a successful email submission
        setMessage("Password reset email sent successfully.");
        setShowMessage(true);
      })
      .catch((error) => {
        // Handle errors, e.g., if the email is not found in your system
        setMessage("Error: Unable to send the password reset email.");
        setShowMessage(true);
      });
  };

  return (
    <div className="parent">
      <div className="sub_Parentforgot">
        <h1>Reset Your Password</h1>
        <p>Enter your email address you signed up with</p>
        <input
          placeholder="Enter your email"
          className="ForgotInput"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="submitbtn" onClick={handleSubmit}>
          Submit
        </button>
        {showMessage && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Forgot;
