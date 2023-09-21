import React, { useState, useEffect } from "react";
import "./Estimating.css";
import { Link, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

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
  // ***********************************
  const [openRow, setOpenRow] = useState(null);

  const toggleDropdown = (rowId) => {
    if (openRow === rowId) {
      setOpenRow(null); // Close the dropdown if it's already open
    } else {
      setOpenRow(rowId); // Open the dropdown for the clicked row
    }
  };

  //********************************************/
  //TODO: Multistep Form  React Code
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
    console.log(activeStep);
  };

  //*********************Multistep Purposal-form Addendum Section***********************/
  const [entries, setEntries] = useState([
    {
      addendumNumber: "",
      addendumDate: "",
    },
  ]);
  const [specentries, setSpecEntries] = useState([
    {
      specName: "",
      specNumber: "",
    },
  ]);

  const [addendumNumber, setAddendumNumber] = useState("");
  const [addendumDate, setAddendumDate] = useState("");

  const handleNewEntry = () => {
    // Create a new entry object with the input data
    const newEntry = {
      addendumNumber,
      addendumDate,
    };

    // Add the new entry to the entries array
    setEntries([...entries, newEntry]);

    // Clear the input fields
    setAddendumNumber("");
    setAddendumDate("");
  };
  const handleRemoveEntry = (index) => {
    // Create a copy of the entries array
    const updatedEntries = [...entries];
    // Remove the entry at the specified index
    updatedEntries.splice(index, 1);
    // Update the state with the modified entries array
    setEntries(updatedEntries);
  };
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

  // ****************************Getting Services Entries from Api start

  const [ServiceData, setServiceData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/estimating/service/")
      .then((response) => response.data)
      .then((data) => {
        if (data.length > 0) {
          // Extract service names and store them in the state
          const serviceNames = data.map((service) => service.name);
          setServiceData(serviceNames);
          // console.log(serviceNames);
        } else {
          console.log("No services found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // ****************************Getting Services Entries from Api End
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
  const [bidderName, setbidderName] = useState("");

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
      bidder: bidderName, // Use BidderName here, not bidder
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
        setbidderName("");
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
  //************* Define the handleProposalSubmitPosting function

  const [selectedEstimatingID, setSelectedEstimatingID] = useState();
  const [step0FormData, setStep0FormData] = useState({
    date: "",
    architect_name: "",
    architect_firm: "",
    estimating: selectedEstimatingID,
  });

  console.log(
    "Submitting proposal with estimating ID:",
    step0FormData.estimating
  );

  const [step2FormData, setStep2FormData] = useState({
    specific_name: "",
    budget: "",
    sefic: [],
    specificationDetails: [], // Initialize an empty array for specification details
  });

  // Function to add a new specification detail
  const handleAddSpecificationDetail = () => {
    setStep2FormData((prevState) => ({
      ...prevState,
      specificationDetails: [
        ...prevState.specificationDetails,
        { name: "", number: "" },
      ],
    }));
  };

  // Function to remove a specification detail by index
  const handleRemoveSpecificationDetail = (index) => {
    setStep2FormData((prevState) => ({
      ...prevState,
      specificationDetails: prevState.specificationDetails.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const [step1FormData, setStep1FormData] = useState({
    Addendums: [], // Make sure it's an array
  });

  const [services, setServices] = useState([]);
  useEffect(() => {
    // Define an async function to fetch data from the API
    async function fetchServiceData() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/estimating/service/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // Map the data to the serviceTypes array
        // const updatedServiceTypes = data.map((myservice, id) => ({
        //   proposal: myservice.proposal, // Provide a value for 'proposal'
        //   service: myservice.service,   // Provide a value for 'service'
        //   type: "Exclusion",           // Default type, you can change it to 'Inclusion' if needed
        //   name: myservice.name,         // Assign the service name from the API
        // }));

        console.log(data);

        // setServices(data);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    }

    // Call the fetchServiceData function when the component mounts
    fetchServiceData();
  }, []);
  const handleProposalSubmitPosting = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/estimating/proposals/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: step0FormData.date,
            estimating: step0FormData.estimating,
            architect_name: step0FormData.architect_name,
            architect_firm: step0FormData.architect_firm,
            Addendums: step1FormData.Addendums.map((addendum) => ({
              addendum_Number: addendum.addendum_Number,
              date: addendum.date,
            })),
            spcifc: [
              {
                specific_name: step2FormData.specific_name,
                budget: step2FormData.budget,
                sefic: step2FormData.specificationDetails.map((detail) => ({
                  sefic: step2FormData.specific_name, // This might need adjustment based on your data structure
                  number: detail.number,
                  name: detail.name,
                })),
              },
            ],
            services: "",
          }),
        }
      );

      if (response.ok) {
        console.log("Proposal data submitted successfully");
      } else {
        console.error("Error submitting proposal data");
        const errorResponse = await response.json();
        console.error("Error response:", errorResponse);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const filteredData = data.filter((customer) => {
    return (
      (customer.Prjct_Name &&
        customer.Prjct_Name.toUpperCase().includes(filter.toUpperCase())) ||
      (customer.status &&
        customer.status.toUpperCase().includes(filter.toUpperCase())) ||
      (customer.due_date &&
        customer.due_date.toUpperCase().includes(filter.toUpperCase())) ||
      (customer.bidder &&
        customer.bidder.toUpperCase().includes(filter.toUpperCase())) ||
      (customer.bid_amount &&
        customer.bid_amount
          .toString()
          .toUpperCase()
          .includes(filter.toUpperCase()))
    );
  });

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
    setbidderName(e.target.value);
  };

  const handleCompanyNameChange = (e) => {
    setCompany(e.target.value);
  };

  const [inputGroups, setInputGroups] = useState([
    {
      id: 1,
      specificationNumber: "",
      specificationDescription: "",
    },
  ]);

  const addInputGroup = (e) => {
    e.preventDefault();
    setInputGroups((prevInputGroups) => [
      ...prevInputGroups,
      {
        id: Date.now(),
        specificationNumber: "",
        specificationDescription: "",
      },
    ]);
  };

  const handleSpecificDetailDelete = (indexToDelete) => {
    setInputGroups((prevInputGroups) =>
      prevInputGroups.filter((_, index) => index !== indexToDelete)
    );
  };



  return (
    <>
      <div className={`estimator px-5 ${showModal ? "modal-active" : ""}`}>
        <h3>Estimating Summary</h3>
        <div className="inputbtn d-flex gap-2 px-5">
          <input
            type="text"
            placeholder="Filter by Project Name,Status"
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
            <tbody className="cursor-pointer  bg-info jloop">
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td className="mytd">{item.due_date}</td>
                  <td className="mytd myproject">{item.Prjct_Name}</td>
                  <td className="mytd">{item.status}</td>
                  <td className="mytd">{item.estimator}</td>
                  <td className="mytdbidder">{item.bidder}</td>
                  <td className="mytd">{item.bid_amount}</td>
                  <td className="mytd">
                    <div className="relative-container">
                      <i
                        onClick={() => toggleDropdown(item.id)}
                        style={{ cursor: "pointer" }}
                        className="fa-solid threeDotIcon fa-ellipsis-vertical"
                      ></i>
                      <div
                        className={`mydiv ${
                          openRow === item.id ? "open" : " "
                        }`}
                      >
                        <button
                          className="btn dropbtns"
                          onClick={() => {
                            console.log(item.id);
                            setStep0FormData({
                              ...step0FormData,
                              estimating: item.id,
                            });
                            setSelectedEstimatingID(item.id); // Set the selected estimating ID
                            setPurposalModal(true);
                          }}
                        >
                          Proposal
                        </button>

                        <button className="btn dropbtns">Project</button>
                        <button className="btn dropbtns">Status</button>
                      </div>
                    </div>
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
                <label htmlFor="bidderName" className="form-label">
                  Bidder Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="bidderName"
                  value={bidderName}
                  onChange={handleBidderChange}
                />
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
          <h4 className="text-center addnewtxt">Add Proposal Entries</h4>
          <button className="close-btn" onClick={closeModal}></button>
          <div className="purposal-content px-5">
            {/* ************* Implementation of Multistep-Form using Material UI */}
            Proposal {/* Updated text to "Proposal" */}
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
                <h4 className="text-center addnewtxt">Add Proposal Entries</h4>{" "}
                {/* Updated text to "Proposal Entries" */}
                <button className="close-btn" onClick={closeModal}></button>
                <div className="purposal-content pt-4 px-5">
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  <form
                    // onSubmit={handleProposalSubmitPosting}
                    className="d-flex flex-column"
                  >
                    {activeStep === 0 && (
                      <>
                        <div className="mb-2 mt-3">
                          <label htmlFor="dateID" className="form-label">
                            {/* Updated ID to "ProposalID" */}
                            Current Date:
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="dateID"
                            name="dateID"
                            value={step0FormData.date}
                            onChange={(e) =>
                              setStep0FormData({
                                ...step0FormData,
                                date: e.target.value,
                              })
                            }
                          />
                        </div>
                        {/* <div className="mb-2 mt-3">
                          <label htmlFor="ProjectID" className="form-label">
                            Estimating ID:
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="ProjectID"
                            name="ProjectID"
                            value={selectedEstimatingID}
                            onChange={(e) =>
                              setStep0FormData({
                                ...step0FormData,
                                estimating: e.target.value,
                              })
                            }
                            readOnly
                          />
                        </div> */}

                        <div className="mb-2 mt-3">
                          <label htmlFor="ArchitectName" className="form-label">
                            Architect Name:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="ArchitectName"
                            name="ArchitectName"
                            value={step0FormData.architect_name}
                            onChange={(e) =>
                              setStep0FormData({
                                ...step0FormData,
                                architect_name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="mb-2 mt-3">
                          <label htmlFor="ArchitectFirm" className="form-label">
                            Architect Firm:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="ArchitectFirm"
                            name="ArchitectFirm"
                            value={step0FormData.architect_firm}
                            onChange={(e) =>
                              setStep0FormData({
                                ...step0FormData,
                                architect_firm: e.target.value,
                              })
                            }
                          />
                        </div>
                      </>
                    )}
                    {activeStep === 1 && (
                      <div className="mt-2">
                        {/* Render the entries */}
                        <label className="form-label">
                          <strong> Addendum Information</strong>
                        </label>
                        {entries.map((entry, index) => (
                          <div key={index} className="mb-2 mt-3">
                            <div
                              id={"proposalAddendumDiv" + index}
                              className="input-group"
                            >
                              <input
                                id={"proposalAddendumNumber" + index}
                                type="number"
                                name="addendum_Number" // Set the name attribute to differentiate
                                className="form-control"
                                value={
                                  step1FormData.Addendums?.[index]
                                    ?.addendum_Number || ""
                                }
                                onChange={(e) => {
                                  const { name, value } = e.target;
                                  setStep1FormData((prevState) => {
                                    const newAddendumEntries = [
                                      ...(prevState.Addendums || []), // Ensure Addendums is an array
                                    ];
                                    const updatedAddendum = {
                                      ...(newAddendumEntries[index] || {}), // Get the existing Addendum or an empty object
                                      [name]: value, // Dynamically set the field (addendum_Number)
                                    };
                                    newAddendumEntries[index] = updatedAddendum;
                                    return {
                                      ...prevState,
                                      Addendums: newAddendumEntries, // Update Addendums in the state
                                    };
                                  });
                                }}
                              />
                              <input
                                id={"proposalAddendumDate" + index}
                                type="date"
                                name="date" // Set the name attribute to differentiate
                                className="form-control"
                                value={
                                  step1FormData.Addendums?.[index]?.date || ""
                                }
                                onChange={(e) => {
                                  const { name, value } = e.target;
                                  setStep1FormData((prevState) => {
                                    const newAddendumEntries = [
                                      ...(prevState.Addendums || []), // Ensure Addendums is an array
                                    ];
                                    const updatedAddendum = {
                                      ...(newAddendumEntries[index] || {}), // Get the existing Addendum or an empty object
                                      [name]: value, // Dynamically set the field (date)
                                    };
                                    newAddendumEntries[index] = updatedAddendum;
                                    return {
                                      ...prevState,
                                      Addendums: newAddendumEntries, // Update Addendums in the state
                                    };
                                  });
                                }}
                              />
                              <button
                                className="btn btn-danger"
                                onClick={() => handleRemoveEntry(index)}
                              >
                                <i className="far">X</i>
                              </button>
                            </div>
                            {index === entries.length - 1 && (
                              <button
                                className="btn btn-success bk"
                                onClick={handleNewEntry}
                              >
                                <i className="fa-regular icon fa-plus"></i>
                              </button>
                            )}
                          </div>
                        ))}

                        {/* Initial "New-Entry" button */}
                        {entries.length === 0 && (
                          <button
                            className="btn btn-success ms-3 rounded-0"
                            onClick={handleNewEntry}
                          >
                            New-Entry
                          </button>
                        )}
                      </div>
                    )}

                    {activeStep === 2 && (
                      <div>
                        <label
                          htmlFor="projectName"
                          className="form-label mt-2"
                        >
                          <strong>Specifications</strong>
                        </label>
                        <div className="specificationEntry bg-warning">
                          <div className="mb-2 mt-3">
                            <label
                              htmlFor="specificName"
                              className="form-label"
                            >
                              Specification Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="specificName"
                              value={step2FormData.specific_name || ""}
                              onChange={(e) =>
                                setStep2FormData({
                                  ...step2FormData,
                                  specific_name: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mb-2 mt-3">
                            <label
                              htmlFor="specificbudget"
                              className="form-label"
                            >
                              Specification Budget
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="specificbudget"
                              value={step2FormData.budget || ""}
                              onChange={(e) =>
                                setStep2FormData({
                                  ...step2FormData,
                                  budget: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mb-2 mt-3">
                            <label
                              htmlFor="specificdetails"
                              className="form-label"
                            >
                              Specification Details
                            </label>
                            {inputGroups.map((group,index) => (
                              <div
                                key={group.id}
                                className="input-group myrowInputgrouup bg-primary"
                              >
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Specification Number"
                                  value={group.specificationNumber}
                                  onChange={(e) => {
                                    const updatedInputGroups = [...inputGroups];
                                    const index = updatedInputGroups.findIndex(
                                      (item) => item.id === group.id
                                    );
                                    updatedInputGroups[
                                      index
                                    ].specificationNumber = e.target.value;
                                    setInputGroups(updatedInputGroups);
                                  }}
                                />
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Specification Description"
                                  value={group.specificationDescription}
                                  onChange={(e) => {
                                    const updatedInputGroups = [...inputGroups];
                                    const index = updatedInputGroups.findIndex(
                                      (item) => item.id === group.id
                                    );
                                    updatedInputGroups[
                                      index
                                    ].specificationDescription = e.target.value;
                                    setInputGroups(updatedInputGroups);
                                  }}
                                />
                                <button
                                  className="btn btn-danger"
                                  onClick={()=>handleSpecificDetailDelete(index)}
                                >
                                  <i className="far">X</i>
                                </button>
                              </div>
                            ))}
                            <button
                              className="btn btn-success bk"
                              onClick={addInputGroup}
                            >
                              <i className="fa-regular icon fa-plus"></i> Add
                              New Entry
                            </button>
                          </div>
                        </div>
                        <button className="btn btn-success" onClick={() => {}}>
                          Add-New-Specification-Section
                        </button>
                      </div>
                    )}

                    {activeStep === 3 && (
                      <div className="mb-2 mt-3">
                        <label htmlFor="projectName" className="form-label">
                          <strong>Services (Inclusions & Exclusions):</strong>
                        </label>
                        <div>
                          {services.map((service, id) => (
                            <div key={id} className="mb-2 d-flex">
                              <input
                                type="text"
                                className="form-control serviceInput"
                                placeholder={`Service ${id + 1}`}
                                value={service.name}
                                readOnly
                              />
                              <select
                                value={service.type}
                                onChange={(e) => {
                                  const updatedServiceTypes = [...services];
                                  updatedServiceTypes[id].type = e.target.value;
                                  setServices(updatedServiceTypes);
                                }}
                              >
                                <option value="Exclusion">Exclusion</option>
                                <option value="Inclusion">Inclusion</option>
                              </select>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-1">
                      {activeStep < 3 ? (
                        <div className="parentbtnsdiv">
                          <div className="spacebtns">
                            <Button
                              variant="contained"
                              color="primary"
                              disabled={activeStep === 0} // Disable the button when activeStep is 0
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
                          </div>
                        </div>
                      ) : (
                        <div className="parentbtnsdiv">
                          <div className="spacebtns">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleBack}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              type="button"
                              onClick={handleProposalSubmitPosting}
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
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
