import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Dashboard"); // Set "Dashboard" as the initial active link

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <nav className="navbar navbar-expand-sm">
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
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navTabs navbar-collapse" id="mynavbar">
          <ul className="navbar-nav ms-auto gap-4">
            <Link
              className={`nav-item ${
                activeLink === "Dashboard" ? "active" : ""
              }`}
              to="dashboard"
              onClick={() => handleLinkClick("Dashboard")}
            >
              <li>Dashboard</li>
            </Link>
            <Link
              className={`nav-item ${
                activeLink === "Projects" ? "active" : ""
              }`}
              to="projects"
              onClick={() => handleLinkClick("Projects")}
            >
              <li>Projects</li>
            </Link>
            <Link
              className={`nav-item ${
                activeLink === "Estimators" ? "active" : ""
              }`}
              to="estimators"
              onClick={() => handleLinkClick("Estimators")}
            >
              <li>Estimators</li>
            </Link>
            <Link
              className={`nav-item ${activeLink === "Sheets" ? "active" : ""}`}
              to="sheets"
              onClick={() => handleLinkClick("Sheets")}
            >
              <li>Sheets</li>
            </Link>
            <Link
              className={`nav-item ${
                activeLink === "Submitters" ? "active" : ""
              }`}
              to="submitters"
              onClick={() => handleLinkClick("Submitters")}
            >
              <li>Submitters</li>
            </Link>
            <Link
              className={`nav-item ${
                activeLink === "Contacts" ? "active" : ""
              } contacts`}
              to="contacts"
              onClick={() => handleLinkClick("Contacts")}
            >
              <li>Contacts</li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
