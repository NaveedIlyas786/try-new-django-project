import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Projects.css";
import ProjectDirectory from "./ProjectDirectory";
import { useNavigate, Link } from "react-router-dom";
const Projects = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");

  // Fetch data from the API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/project/ProjectList/")
      .then((response) => response.data)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filteredData = data.filter((customer) => {
    return (
      (customer.estimating &&
        customer.estimating.toUpperCase().includes(filter.toUpperCase())) ||
      (customer.job_num &&
        customer.job_num
          .toString()
          .toUpperCase()
          .includes(filter.toUpperCase())) ||
      (customer.prjct_engnr &&
        customer.prjct_engnr.toUpperCase().includes(filter.toUpperCase())) ||
      (customer.bim_oprtr &&
        customer.bim_oprtr.toUpperCase().includes(filter.toUpperCase())) ||
      (customer.Forman &&
        customer.Forman.toUpperCase().includes(filter.toUpperCase()))
    );
  });

  const formatBidAmount = (amount) => {
    if (amount === null) return ""; // Return an empty string if the amount is null
    return amount.toLocaleString("en-US");
  };

  const navigate = useNavigate(); // Initialize the useHistory hook

  const navigateToLink = (itemId) => {
    navigate(`/homepage/projects/${itemId}`);
  };

  return (
    <div className="parentDiv px-5">
      <div className="titleWithSearch">
        <h3>Projects Summary</h3>
        <div className="inputSearchDiv">
          <input
            type="text"
            placeholder="Filter by Project Name, prjct_engnr Name, bim_oprtrs, job_num"
            value={filter}
            className="myinput"
            onChange={(e) => setFilter(e.target.value)}
          />
          <button className="btn btn-success searchbtn">Search</button>
        </div>
      </div>

      <div className="table-responsive projectTable mt-4">
        <table className="table table-striped   table-bordered table-hover text-center">
          <thead className="projectHeader">
            <tr>
              <th>Start Date</th>
              <th>Project Name</th>
              <th>Job Number</th>
              <th>Project Manager</th>
              <th>Project Engineer</th>
              <th>Bim Operator</th>
              <th>Foreman</th>
            </tr>
          </thead>
          <tbody className="cursor-pointer  bg-info jloop">
            {filteredData.map((item) => (
              <tr
                key={item.id}
                className="mytr"
                onClick={() => navigateToLink(item.id)}
                value={item.Prjct_Name}
              >
                <td className="mytd">{item.start_date}</td>
                <td className="mytd">{item.estimating}</td>
                <td className="mytd">{item.job_num}</td>
                <td className="mytd">{item.prjct_mngr}</td>
                <td className="mytd">{item.prjct_engnr}</td>
                <td className="mytd">{item.bim_oprtr}</td>
                <td className="mytd">{item.Forman}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
