import React from "react";
import "./Forgot.css";

const Forgot = () => {
  return (
    <div className="parent">
      <div className="sub_Parentforgot" >
        <h1>Reset Your Password</h1>
        <p>Enter your email address you signup with</p>
        <input
          placeholder="Enter your email"
          className="ForgotInput"
          type="email"
        />
        
        <button type="submit" className="submitbtn">
          Submit
        </button>
        
      </div>
    </div>
  );
};

export default Forgot;
