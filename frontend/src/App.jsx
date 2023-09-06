import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Projects from "./pages/projects-Screen/Projects";
import Estimators from "./pages/estimators/Estimators";
import Contacts from "./pages/contacts/Contacts";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import Forgot from "./pages/forgot-Screen/Forgot";
import HomePage from "./pages/homePage/HomePage";
import { AuthProvider } from "./firebase/context/AuthContext";

function App() {


  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotScreen" element={<Forgot />} />
        <Route path="/homepage/" element={<HomePage />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="estimators" element={<Estimators />} />
          <Route path="sheets" element={<Dashboard />} />
          <Route path="submitters" element={<Dashboard />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
