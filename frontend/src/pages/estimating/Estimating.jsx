import React, { useState, useEffect } from "react";
import "./Estimating.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Modal,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

const Estimator = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [purposalModal, setPurposalModal] = useState(false); // State to control modal visibility
  const [dueDate, setDueDate] = useState("");
  const [projectName, setProjectName] = useState("");
  const [estimatorName, setEstimatorName] = useState("");
  const [location, setLocation] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [company, setCompany] = useState(1); // Updated to store company name as a string
  const navigate = useNavigate();

  //********************************************/
  //TODO: Multistep Form  React Code
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Step 1", "Step 2", "Step 3"];

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  //********************************************/

  //************ To show data in Estimating List
  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/estimating/estimating/")
      .then((response) => response.data)
      .then((data) => {
        // console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //************ To show locations in dropdown in estimating post field

  const [userLocation, setUserLocation] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/estimating/location/")
      .then((response) => response.data)
      .then((data) => {
        // console.log(data);
        setUserLocation(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //************ To show Company Names in dropdown in estimating post field

  const [companyName, setCompanyName] = useState([]);

  useEffect(() => {
    // Make the API request using Axios
    axios
      .get("http://127.0.0.1:8000/api/project/company/")
      .then((response) => {
        // Check if the response status is OK (200)
        if (response.status === 200) {
          // Parse the response JSON
          const data = response.data;

          // Assuming the data is an array of objects with a "Cmpny_Name" property
          const companyNames = data.map((item) => item.Cmpny_Name);
          setCompanyName(companyNames);
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //************ To show Estimator full_Names in dropdown in estimating post field

  const [EstimatorName, setestimatorName] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/user/Userapi/")
      .then((response) => response.data)
      .then((data) => {
        const bidUser = data.filter((user) => user.roles.includes("Estimator"));
        // console.log(bidUser);
        setestimatorName(bidUser);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //************ To show bidder Names in dropdown in estimating post field
  // const [BidderName, setBidderName] = useState("");
  const [selectedBidderId, setSelectedBidderId] = useState("");

  const [bidderName, setbidderName] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/user/Userapi/")
      .then((response) => response.data)
      .then((data) => {
        const bidUser = data.filter((user) => user.roles.includes("Bidder"));
        setbidderName(bidUser);
        console.log(bidUser);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //************* Define the handleSubmit function
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Create a data object with the form values
    const formData = {
      due_date: dueDate,
      Prjct_Name: projectName,
      company: company, // Use the company state directly
      estimator: estimatorName,
      location: location,
      bid_amount: bidAmount,
      bidder: selectedBidderId, // Use BidderName here, not bidder
    };

    // Send a POST request to the API
    axios
      .post("http://127.0.0.1:8000/api/estimating/estimating/", formData)
      .then((response) => {
        // Handle the response if needed
        console.log("Data successfully submitted:", response.data);
        // You can also reset the form fields here if needed
        setDueDate("");
        setProjectName("");
        setCompany(""); // Reset companyName here
        setEstimatorName("");
        setLocation("");
        setBidAmount("");
        setSelectedBidderId("");
        // Close the modal
        closeModal();
      })
      .catch((error) => {
        // Handle any errors that occurred during the POST request
        console.error("Error submitting data:", error);
        // Log the response data for more details
        console.log("Response data:", error.response.data);
      });
  };

  const filteredData = data.filter(
    (customer) =>
      customer.Prjct_Name.toUpperCase().includes(filter.toUpperCase()) ||
      customer.status.toUpperCase().includes(filter.toUpperCase()) ||
      customer.due_date.toUpperCase().includes(filter.toUpperCase())
  );

  // Define a function to handle modal close
  const closeModal = () => {
    setShowModal(false);
    setPurposalModal(false);
    // Remove the 'modal-active' class when the modal is closed
    document.body.classList.remove("modal-active");
  };

  const movetoPurposalPage = () => {
    navigate("/homepage/purposal");
  };

  const handleDueDateChange = (e) => {
    // Get the selected date from the input field
    const selectedDate = e.target.value;

    // Create a Date object from the selected date
    const dateObject = new Date(selectedDate);

    // Check if the dateObject is a valid date
    if (!isNaN(dateObject.getTime())) {
      // Format the date as "YYYY-MM-DD"
      const formattedDate = dateObject.toISOString().split("T")[0];

      // Set the formatted date in the state
      setDueDate(formattedDate);
    } else {
      // Handle invalid date input here (e.g., show an error message)
      console.error("Invalid date format");
      // You might want to set an error state or display an error message to the user
    }
  };

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleEstimatorNameChange = (e) => {
    setEstimatorName(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleBidAmountChange = (e) => {
    setBidAmount(e.target.value);
  };

  const handleBidderChange = (e) => {
    setSelectedBidderId(e.target.value);
  };

  const handleCompanyNameChange = (e) => {
    setCompany(e.target.value);
  };

  return (
    <>
      <div className={`estimator px-5 ${showModal ? "modal-active" : ""}`}>
        <h3>Estimating Summary</h3>
        <div className="inputbtn d-flex gap-2 px-5">
          <input
            type="text"
            placeholder="Filter by Project Name"
            value={filter}
            className="myinput p-2 rounded"
            onChange={(e) => setFilter(e.target.value)}
          />
          <button
            className="btn btn-success"
            onClick={() => setShowModal(true)}
          >
            New
          </button>
        </div>
        <div className="table-responsive pt-3">
          <table className="table table-striped  table-bordered table-hover text-center">
            <thead>
              <tr>
                <th>Due Date</th>
                <th>Project Name</th>
                <th>Status</th>
                <th>Estimator</th>
                <th>Bidder</th>
                <th>Bid Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="cursor-pointer">
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.due_date}</td>
                  <td>{item.Prjct_Name}</td>
                  <td>{item.status}</td>
                  <td>{item.estimator}</td>
                  <td>{item.bidder}</td>
                  <td>{item.bid_amount}</td>
                  <td>
                    <button
                      className={`btn btn-primary ${
                        purposalModal ? "modal-active" : ""
                      }`}
                      // onClick={movetoPurposalPage}
                      onClick={() => setPurposalModal(true)}
                    >
                      Purposal
                    </button>
                    <button className="btn ms-3 btn-success">Project</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* New Estimating Entry Posting-Code */}
      {showModal && (
        <div className={`modal-container pt-5 ps-2 ${showModal ? "show" : ""}`}>
          <h4 className="text-center addnewtxt">Add New Estimating Entry</h4>
          <button className="close-btn" onClick={closeModal}></button>
          <div className="modal-content px-5">
            <form onSubmit={handleSubmit} className="d-flex flex-column">
              <div className="mb-3">
                <label htmlFor="dueDate" className="form-label">
                  Due_Date:
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dueDate"
                  value={dueDate}
                  onChange={handleDueDateChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="projectName" className="form-label">
                  Project_Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="projectName"
                  value={projectName}
                  onChange={handleProjectNameChange}
                />
              </div>
              {/* ******************* */}
              <div className="mb-3">
                <label htmlFor="companyName" className="form-label">
                  Company
                </label>
                <select
                  className="form-select"
                  id="companyName"
                  value={company}
                  onChange={handleCompanyNameChange}
                >
                  {/* <option value="">Select Company</option> */}
                  {companyName && companyName.length > 0 ? (
                    companyName.map((companyItem) => (
                      <option value={companyItem} key={companyItem}>
                        {companyItem}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      {companyName ? "No companies available" : "Loading..."}
                    </option>
                  )}
                </select>
              </div>
              {/* ****************** */}
              <div className="mb-3">
                <label htmlFor="estimatorName" className="form-label">
                  Estimator_Name:
                </label>
                <select
                  className="form-select"
                  id="estimatorName"
                  value={estimatorName}
                  onChange={handleEstimatorNameChange}
                >
                  <option value="">Select Estimator Name</option>

                  {EstimatorName && EstimatorName.length > 0 ? (
                    EstimatorName.map((user) => (
                      <option value={user.id} key={user.id}>
                        {user.full_Name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      Loading...
                    </option>
                  )}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Location:
                </label>
                <select
                  className="form-select"
                  id="location"
                  value={location}
                  onChange={handleLocationChange}
                >
                  <option value="">Select Location</option>

                  {userLocation && userLocation.length > 0 ? (
                    userLocation.map((place) => (
                      <option value={place.id} key={place.id}>
                        {place.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      Loading...
                    </option>
                  )}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="bidAmount" className="form-label">
                  Bid-Amount:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="bidAmount"
                  value={bidAmount}
                  onChange={handleBidAmountChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="bidder" className="form-label">
                  Bidder_Name:
                </label>
                <select
                  className="form-select"
                  id="bidder"
                  value={selectedBidderId}
                  onChange={handleBidderChange}
                >
                  <option value="null">Select Bidder Name</option>

                  {bidderName && bidderName.length > 0 ? (
                    bidderName.map((bidder) => (
                      <option value={bidder.id} key={bidder.id}>
                        {bidder.full_Name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      Loading...
                    </option>
                  )}
                </select>
              </div>
              <button type="submit" className="btn btn-submit mt-3 mb-4">
                Add
              </button>
            </form>
          </div>
        </div>
      )}
      {/* New Purposal Entries Posting-Code */}
      {purposalModal && (
        <div
          className={`modal-container pt-5 ps-2 ${purposalModal ? "show" : ""}`}
        >
          <h4 className="text-center addnewtxt">Add Purposal Entries</h4>
          <button className="close-btn" onClick={closeModal}></button>
          <div className="purposal-content px-5">
            //************* Implementation of Multistep-Form using Material UI Purposal Form
            <Modal
              open={purposalModal}
              onClose={closeModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div
                className={`modal-container pt-5 ps-2 ${
                  purposalModal ? "show" : ""
                }`}
              >
                <h4 className="text-center addnewtxt">Add Purposal Entries</h4>
                <button className="close-btn" onClick={closeModal}></button>
                <div className="purposal-content px-5">
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  <form onSubmit={handleSubmit} className="d-flex flex-column">
                    {activeStep === 0 && (
                      <div>
                        {/* Step 1 */}
                        <TextField
                          label="Field 1"
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          // Add value and onChange props
                        />
                        {/* Add more fields for Step 1 */}
                      </div>
                    )}
                    {activeStep === 1 && (
                      <div>
                        {/* Step 2 */}
                        <TextField
                          label="Field 2"
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          // Add value and onChange props
                        />
                        {/* Add more fields for Step 2 */}
                      </div>
                    )}
                    {activeStep === 2 && (
                      <div>
                        {/* Step 3 */}
                        <TextField
                          label="Field 3"
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          // Add value and onChange props
                        />
                        {/* Add more fields for Step 3 */}
                      </div>
                    )}
                    <div className="mt-3">
                      {activeStep <= 1 ? (
                        <>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleBack}
                          >
                            Back
                          </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                        >
                          Next
                        </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleBack}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
                            Submit
                          </Button>
                        </>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
};

export default Estimator;
