import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Dashboard"); // Set "Dashboard" as the initial active link

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <nav className="navbar navbar-expand-lg ">
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
          <ul className="navbar-nav ms-auto gap-2">
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
                activeLink === "Estimating" ? "active" : ""
              }`}
              to="estimating"
              onClick={() => handleLinkClick("Estimating")}
            >
              <li>Estimating</li>
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
                activeLink === "BIM" ? "active" : ""
              }`}
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
              className={`nav-item ${
                activeLink === "HrPayRoll" ? "active" : ""
              }`}
              to="hrPayroll"
              onClick={() => handleLinkClick("HrPayRoll")}
            >
              <li>HR/Payroll</li>
            </Link>
            <Link
              className={`nav-item  ${
                activeLink === "DMSDirectory" ? "active" : ""
              } dmsDirectory`}
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