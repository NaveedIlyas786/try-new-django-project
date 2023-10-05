import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Projects from "./pages/projects-Screen/Projects";
import Estimating from "./pages/estimating/Estimating";
import Contacts from "./pages/dmsDirectory/DMSDirectory";
import Reports from "./pages/reports/Reports";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import Forgot from "./pages/forgot-Screen/Forgot";
import HomePage from "./pages/homePage/HomePage";
import HrPayRoll from "./pages/hrPayRoll/HrPayRoll";
import BIM from "./pages/bim/BIM";
import PostEstimating from "./pages/estimating/PostEstimating";
import Purposal from "./pages/purposal/Purposal";
import ProjectDirectory from "./pages/projects-Screen/ProjectDirectory";
import EstimatingDirectory from "./pages/estimating/EstimatingDirectory";
import URLPage from "./pages/urlPage/URLPage";
import WonProjects from "./pages/won_lost_Projects/WonProjects";
import LostProjects from "./pages/won_lost_Projects/LostProjects";
import DMSDirectory from "./pages/dmsDirectory/DMSDirectory";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotScreen" element={<Forgot />} />
        {/* <Route path="/purposal" element={<Purposal />} /> */}
        <Route path="/homepage/" element={<HomePage />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="purposal" element={<Purposal />} />
          <Route path="urlpage" element={<URLPage />} />
          <Route path="wonProjectspage" element={<WonProjects />} />
          <Route path="lostProjectspage" element={<LostProjects />} />
          <Route path="projects/:id" element={<ProjectDirectory />} />
          <Route path="bim" element={<BIM />} />
          <Route path="estimating" element={<Estimating />} />
          <Route path="estimating/:id" element={<EstimatingDirectory />} />
          <Route path="reports" element={<Reports />} />
          <Route path="dmsDirectory" element={<DMSDirectory />} />
          <Route path="hrPayroll" element={<HrPayRoll />} />
          <Route path="postEstimating" element={<PostEstimating />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
