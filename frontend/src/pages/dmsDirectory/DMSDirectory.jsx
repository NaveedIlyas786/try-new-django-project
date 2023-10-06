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
        <h3 className="text-success">DMS Directory</h3>
        <div className="inputSearchDiv">
          <input
            type="text"
            placeholder="Filter your data here..........."
            value={filter}
            className="myinput"
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={movetoEstimatingPage}
        className="btn btn-primary backbtn"
      >
        Back
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
                <td className="mytd centered-td">{item.full_Name}</td>
                <td className="mytd centered-td">
                  {item.time} <strong>{item.timezone}</strong>
                </td>
                <td className="mytd myproject centered-td">
                  {item.prjct_name}
                </td>
                <td className="mytd centered-td">{item.location}</td>
                <td className="mytdbidder centered-td">department</td>
                <td className="mytdbidder centered-td">{item.phone_number}</td>
                <td className="mytd centered-td">
                  Direct
                </td>
                <td className="mytd centered-td">
                  {item.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DMSDirectory;
