import React, { useState } from "react";
import "./Forgot.css";
import axios from "axios";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    if(email===""){
      alert("Please Enter Email");
      setLoading(false);
    }else{
    // Make a POST request to the API endpoint to send the reset password email
    axios
      .post("http://127.0.0.1:8000/api/user/send_reset_password_email/", {
        email: email,
      })
      .then((response) => {
        
        // Handle a successful email submission
        console.log("Passowrd reset email sent successfully");
        setMessage( setTimeout(() => {
          alert("Password reset Email sent successfully"); // Show the alert after a delay
        }, 100));
        setShowMessage(true);
        setLoading(false);
        setEmail("");
        
        
      })
      .catch((error) => {
        // Handle errors, e.g., if the email is not found in your system
        console.log("this email is not found in the system");
        setMessage(setTimeout(()=>{alert("Error: This Email is not found in the System")},100));
        setShowMessage(true);
        setLoading(false);
        
      })
  };
}

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
      <div className="sub_Parentforgot ">
        <h1 className="text-dark">Reset Your Password</h1>
        <p>Enter your email address you signed up with</p>
        <input
          placeholder="Enter your email"
          className="ForgotInput mb-3"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value) }
        />
        <button type="button" className="submitbtn w-100 mt-2" onClick={handleSubmit}>
          Submit
        </button>
        {/* {showMessage && <p className="message">{message}</p>} */}
      </div>
    </div>
    </>
  );
};

export default Forgot;