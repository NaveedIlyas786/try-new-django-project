import React, { useState, useEffect } from "react";
import "./DMSDirectory.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DMSDirectory = () => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [filter, setFilter] = useState("");
  const [DMSUserDirectory, setDMSUserDirectory] = useState([]);
  const closeModal = () => {
    setShowModal(false);

    // Remove the 'modal-active' class when the modal is closed
    document.body.classList.remove("modal-active");
  };
  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/estimating/dmsDrectory/")
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
      (customer.first_name &&
        customer.first_name.toUpperCase().includes(filter.toUpperCase())) ||
      (customer.email &&
        customer.email
          .trim()
          .toUpperCase()
          .includes(filter.trim().toUpperCase())) ||
      (customer.mobile_number &&
        customer.mobile_number.toUpperCase().includes(filter.toUpperCase()))
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
          <button className="btn btn-primary   searchbtn" onClick={(e)=>{
            setShowModal(true)
          }}>New</button>
        </div>
      </div>
      <button
        type="button"
        onClick={movetoEstimatingPage}
        className="btn btn-outline-primary backbtn"
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
              <th className="successgreenColor">Last Name</th>
              <th className="successgreenColor">First Name</th>
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
                <td className=" dmsTD centered-td">{item.last_name}</td>
                <td className=" dmsTD centered-td">{item.first_name}</td>
                <td className=" dmsTD centered-td">{item.job_title}</td>
                <td className=" dmsTD  centered-td">{item.company}</td>
                <td className=" dmsTD centered-td">{item.locaton}</td>
                <td className=" dmsTD centered-td">{item.department}</td>
                <td className=" dmsTD centered-td">{item.mobile_number}</td>
                <td className=" dmsTD centered-td">{item.direct_number}</td>
                <td className=" dmsTD centered-td">{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
        <div
          className={`modal-container bg-white pt-5 ps-2 ${
            showModal ? "show" : ""
          }`}
        >
          <h4 className="text-center addnewtxt">DMS Directory</h4>
          <button className="close-btn" onClick={closeModal}></button>
          <div className="modal-content px-5">
            <form className="MyForm">
              <div className="bothDiv gap-2 mt-5">
                <div className="Oneline">
                  <label htmlFor="first_name" className="form-label">
                    First Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"

                    id="first_name"
                    // value={startDate}
                    // onChange={handlestartDateChange}
                  />
                </div>
                <div className="Oneline">
                  <label htmlFor="last_name" className="form-label">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"

                    id="last_name"
                    // value={startDate}
                    // onChange={handlestartDateChange}
                  />
                </div>
                <div className="Oneline">
                  <label htmlFor="companyName" className="form-label">
                    Company
                  </label>
                  <select
                    className="form-select"
                    id="companyName"
                    // value={company}
                    // onChange={handleCompanyNameChange}
                  >
                    <option value="">Select Company</option>
                    {/* {companyName && companyName.length > 0 ? (
                      companyName.map((companyItem) => (
                        <option value={companyItem.id} key={companyItem.id}>
                          {companyItem.Cmpny_Name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        {companyName ? "No companies available" : "Loading..."}
                      </option>
                    )} */}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="Job_Title" className="form-label">
                Job Title:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Job_Title"
                  // value={projectName}
                  // onChange={handleProjectNameChange}
                />
              </div>

              <div className="bothDiv">
                <div className="Oneline">
                  <label htmlFor="email" className="form-label">
                    Estimator Name:
                  </label>
                  <select
                    className="form-select"
                    id="email"
                    // value={estimatorName}
                    // onChange={handleEstimatorNameChange}
                  >
                    <option value="">Select Estimator Name</option>

                    {/* {EstimatorName && EstimatorName.length > 0 ? (
                      EstimatorName.map((user) => (
                        <option value={user.id} key={user.id}>
                          {user.full_Name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        Loading...
                      </option>
                    )} */}
                  </select>
                </div>

                <div className="Oneline">
                  <label htmlFor="location" className="form-label">
                    Location:
                  </label>
                  <select
                    className="form-select"
                    id="location"
                    // value={location}
                    // onChange={handleLocationChange}
                  >
                    <option value="">Select Location</option>

                    {/* {userLocation && userLocation.length > 0 ? (
                      userLocation.map((place) => (
                        <option value={place.id} key={place.id}>
                          {place.name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        Loading...
                      </option>
                    )} */}
                  </select>
                </div>
              </div>

              <div className="bothDiv">
                <div className="Oneline">
                  <label htmlFor="dueDate" className="form-label">
                    Due Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    // value={dueDate}
                    // onChange={handleDueDateChange}
                  />
                </div>
                <div className="Oneline timefield">
                  <label htmlFor="time" className="form-label">
                    Time:
                  </label>
                  <div className="d-flex bg-white">
                    <input
                      type="time"
                      placeholder="Select Time"
                      // value={selectedTime}
                      // onChange={(e) => setSelectedTime(e.target.value)}
                    />
                    {/* <p>Selected Time: {selectedTime}</p> */}
                    <select
                      // value={timezone}
                      // onChange={handleTimeZoneChange}
                      className="selectpicker"
                    >
                      <option value="">Select TimeZone</option>
                      <option value="PDT">PDT</option>
                      <option value="CT">CT</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* <div className="bothDiv"> */}
              {/* <div className="Oneline">
                  <label htmlFor="bidAmount" className="form-label">
                    Bid Amount:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="bidAmount"
                    value={bidAmount}
                    onChange={handleBidAmountChange}
                  />
                </div> */}
              <div>
                <label htmlFor="bidderName" className="form-label">
                  Bidder Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="bidderName"
                  // value={bidderName}
                  // onChange={handleBidderChange}
                />
              </div>
              {/* </div> */}
              <div>
                <label htmlFor="bidderDetails" className="form-label">
                  Bidder Details:
                </label>
                <textarea
                  name="#"
                  className="form-control"
                  id="bidderDetails"
                  placeholder="Write your details!"
                  cols="10"
                  rows="10"
                  // value={bidder_detail}
                  // onChange={handleBidderDetailChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-submit mt-3 mb-4">
                Add
              </button>
            </form>
          </div>
        </div>
      )}


      </div>
    </div>
  );
};

export default DMSDirectory;