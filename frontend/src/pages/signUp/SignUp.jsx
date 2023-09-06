import React, { useState, useRef } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../redux/authSlice";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../firebase/context/AuthContext";

const Signup = () => {
  const [full_Name, setfull_Name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [defaultpass, setDefaultPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const nameref = useRef();
  const emailRef = useRef();
  const passref = useRef();
  const passConfirmref = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passref.current.value !== passConfirmref.current.value) {
      return setError("Password do not match !");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passref.current.value);
    } catch (error) {
      console.log(error);
      setError("Failed to create an account");
    }
    setLoading(false);
  }
  const togglePass = () => {
    setDefaultPass(!defaultpass);
  };

  const dispatch = useDispatch();

  const handleRegister = () => {
    // Create an object with user registration data
    const userData = {
      full_Name: full_Name,
      email: email,
      password: password,
      password2:password2
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
        <p className="signuplink">
          Already have an account:{" "}
          <Link className="Link" to="/">
            Login
          </Link>
        </p>
      </div>

      {/* <Card>
        <Card.Body className="w-100" style={{ minWidth: "400px" }}>
          <h2 className="text-center mb-4">Signup</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit} className="w-100">
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef}></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                ref={passref}
              ></Form.Control>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Confirm-Password</Form.Label>
              <Form.Control
                type="password"
                required
                ref={passConfirmref}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" disabled={loading} className="w-100 mt-4">
              SignUp
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mt-2">
          Already have an account? Login
        </div>
      </Card> */}
    </div>
  );
};

export default Signup;
