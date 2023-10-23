

import React, { useState } from "react";
import "./Navbar.css"; // Make sure to import your CSS file
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Dashboard");

  const handleToggleClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setIsNavOpen(false); // Close the navbar when a link is clicked
  };

  return (
   
   <nav className={`navbar navbar-expand-lg navbar-inverse ${isNavOpen ? 'expanded' : ''}`}>
      <div className="container-fluid px-5">
        <Link
          className="navbar-brand"
          to="/homepage/dashboard"
          onClick={() => handleLinkClick("Dashboard")}
        >
          <img
            src="../../src/assets/DMS_logo.png"
            style={{ height: 35 }}
            alt=""
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          
          onClick={handleToggleClick}
          
          
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navTabs navbar-collapse ${isNavOpen ? 'show expanded' : ''}`} id="mynavbar">
       
        <ul className={`navbar-nav ms-auto gap-2 navTabs ${isNavOpen ? 'show expanded' : ''}`}>
            <Link
              className={`nav-item ${activeLink === "Dashboard" ? "active" : ""}`}
              to="dashboard"
              onClick={() => handleLinkClick("Dashboard")}
            >
              <li>Dashboard</li>
            </Link>
            <Link
              className={`nav-item ${activeLink === "Estimating" ? "active" : ""}`}
              to="estimating"
              onClick={() => handleLinkClick("Estimating")}
            >
              <li>Estimating</li>
            </Link>
            <Link
              className={`nav-item ${activeLink === "Projects" ? "active" : ""}`}
              to="projects"
              onClick={() => handleLinkClick("Projects")}
            >
              <li>Projects</li>
            </Link>
            <Link
              className={`nav-item ${activeLink === "BIM" ? "active" : ""}`}
              to="bim"
              onClick={() => handleLinkClick("BIM")}
            >
              <li>BIM</li>
            </Link>
            <Link
              className={`nav-item ${activeLink === "Reports" ? "active" : ""}`}
              to="reports"
              onClick={() => handleLinkClick("Reports")}
            >
              <li>Reports</li>
            </Link>
            <Link
              className={`nav-item ${activeLink === "HrPayRoll" ? "active" : ""}`}
              to="hrPayroll"
              onClick={() => handleLinkClick("HrPayRoll")}
            >
              <li>HR/Payroll</li>
            </Link>
            <Link
              className={`nav-item ${activeLink === "DMSDirectory" ? "active" : ""} dmsDirectory`}
              to="dmsDirectory"
              onClick={() => handleLinkClick("DMSDirectory")}
            >
              <li>DMS Directory</li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>


  );
};

export default Navbar;