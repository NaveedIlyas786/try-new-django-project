import React, { useState, useEffect } from "react";
import "./DMSDirectory.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DMSDirectory = () => {
  const [filter, setFilter] = useState("");
  const [DMSUserDirectory, setDMSUserDirectory] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/user/Userapi/")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setDMSUserDirectory(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const navigate = useNavigate();

  const filteredData = DMSUserDirectory.filter((customer) => {
    return (
      (customer.full_Name &&
        customer.full_Name.toUpperCase().includes(filter.toUpperCase())) ||
      (customer.email &&
        customer.email
          .trim()
          .toUpperCase()
          .includes(filter.trim().toUpperCase())) ||
      (customer.phone_number &&
        customer.phone_number.toUpperCase().includes(filter.toUpperCase()))
    );
  });

  const movetoEstimatingPage = () => {
    navigate("/homepage/estimating/");
  };

  return (
    <div className="parentDiv px-5">
      <div className="titleWithSearch">
        <h3 className="text-primary">DMS Directory</h3>
        <div className="inputSearchDiv">
          <input
            type="text"
            placeholder="Filter by Project Name, prjct_engnr Name, bim_oprtrs, job_num"
            value={filter}
            className="myinput"
            onChange={(e) => setFilter(e.target.value)}
          />
          <button className="btn btn-primary   searchbtn">Search</button>
        </div>
      </div>
    
      <button
        type="button"
        onClick={movetoEstimatingPage}
        className="btn btn-outline-primary backbtn"
      >
       <i className="fa-duotone me-2 fa fa-angles-left icons backicon"></i> Back
      </button>

      <div className="table-responsive proposalTable mt-2">
        <table
          className="table table-striped table-bordered table-hover"
          style={{ tableLayout: "auto" }}
        >
          <thead className="proposalHeader">
            <tr>
              <th className="successgreenColor">FullName</th>
              <th className="successgreenColor">Job Title</th>
              <th className="successgreenColor">Company</th>
              <th className="successgreenColor">Location</th>
              <th className="successgreenColor">Department</th>
              <th className="successgreenColor">Mobile</th>
              <th className="successgreenColor">Direct</th>
              <th className="successgreenColor">Email</th>
            </tr>
          </thead>
          <tbody className="cursor-pointer jktable bg-info jloop">
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td className=" dmsTD centered-td">{item.full_Name}</td>
                <td className=" dmsTD centered-td">{item.roles}</td>
                <td className=" dmsTD  centered-td">{item.company}</td>
                <td className=" dmsTD centered-td">{item.locaton}</td>
                <td className=" dmsTD centered-td">{item.department}</td>
                <td className=" dmsTD centered-td">{item.phone_number}</td>
                <td className=" dmsTD centered-td">{item.direct_number}</td>
                <td className=" dmsTD centered-td">{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DMSDirectory;
