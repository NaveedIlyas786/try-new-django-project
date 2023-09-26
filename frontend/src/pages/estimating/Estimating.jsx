import { useState, useEffect } from "react";
import "./Estimating.css";
import { useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

import axios from "axios";
import {
  Modal,
  // TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  // Typography,
} from "@mui/material";
// import { styled } from "@mui/system";

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
  const [company, setCompany] = useState(""); // Updated to store company name as a string
  // const navigate = useNavigate();
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

  //********************Multistep Purposal-form Addendum Section**********************/
  const [entries, setEntries] = useState([
    {
      addendumNumber: "",
      addendumDate: "",
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
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/estimating/company/")
      .then((response) => response.data)
      .then((data) => {
        // console.log(data);
        setCompanyName(data);
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

  //**************************To Post Project-Form Data To the api start here *********************** */
  const navigate = useNavigate();
  // Initialize state variables to hold form data
  const [startDate, setStartDate] = useState("");
  const [jobNo, setJobNo] = useState("");
  const [selectedForeman, setSelectedForeman] = useState("");
  const [selectedProjectEngineer, setSelectedProjectEngineer] = useState("");
  const [selectedProjectID, setSelectedProjectID] = useState("");
  const [selectedProjectManager, setSelectedProjectManager] = useState("");
  const [selectedBimOperator, setSelectedBimOperator] = useState("");

  // Event handlers for form inputs
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleJobNoChange = (e) => setJobNo(e.target.value);
  const handleForemanChange = (e) => setSelectedForeman(e.target.value);
  const handleBimOperatorChange = (e) => setSelectedBimOperator(e.target.value);
  const handleProjectEngineerChange = (e) =>
    setSelectedProjectEngineer(e.target.value);
  const handleProjectManagerChange = (e) =>
    setSelectedProjectManager(e.target.value);
  const handleProjectIDChange = (e) => setSelectedProjectID(e.target.value);

  // Function to handle form submission
  const [isDivOpen, setIsDivOpen] = useState(false); // State variable to track div visibility

  const openDiv = () => {
    setIsDivOpen(true);
  };

  const closeDiv = () => {
    setIsDivOpen(false);
  };
  const handleProjectFormSubmit = (e) => {
    e.preventDefault();

    const formData = {
      start_date: startDate,
      job_num: jobNo,
      estimating: selectedProjectID,
      prjct_mngr: selectedProjectManager,
      Forman: selectedForeman,
      bim_oprtr: selectedBimOperator,
      prjct_engnr: selectedProjectEngineer,
    };

    console.log("formData to be sent", formData);

    // Send a POST request using Axios
    axios
      .post("http://127.0.0.1:8000/api/project/ProjectList/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Data successfully submitted", response.data);

        // Clear the form fields by resetting the state variables
        setStartDate(""); // Clear the startDate
        setJobNo(""); // Clear the jobNo
        setSelectedProjectID(""); // Clear the selectedProjectID
        setSelectedProjectManager(""); // Clear the selectedProjectManager
        setSelectedForeman(""); // Clear the selectedForeman
        setSelectedBimOperator(""); // Clear the selectedBimOperator
        setSelectedProjectEngineer(""); // Clear the selectedProjectEngineer

        setTimeout(() => {
          navigate("/homepage/projects");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here
      });
  };

  // ************************projectManager Role Seleted **********

  const [projectManager, setProjectManager] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/user/Userapi/")
      .then((response) => response.data)
      .then((data) => {
        const managerUser = data.filter((user) =>
          user.roles.includes("Project Manager")
        );
        console.log(managerUser);
        setProjectManager(managerUser);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // ************************Forman Role Seleted **********
  const [formanName, setFormanName] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/user/Userapi/")
      .then((response) => response.data)
      .then((data) => {
        const formanUser = data.filter((user) => user.roles.includes("Forman"));
        console.log(formanUser);
        setFormanName(formanUser);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // ************************BimOperator Role Seleted **********

  const [BimOperator, setBimOperator] = useState([]);
  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/user/Userapi/")
      .then((response) => response.data)
      .then((data) => {
        const bimOperatorUser = data.filter((user) =>
          user.roles.includes("Bim Operator")
        );
        setBimOperator(bimOperatorUser);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // ************************Project Engineer Role Seleted **********

  const [ProjEnger, setProjEnger] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/user/Userapi/")
      .then((response) => response.data)
      .then((data) => {
        const ProjEngerUser = data.filter((user) =>
          user.roles.includes("Project Engineer")
        );
        setProjEnger(ProjEngerUser);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //************ To show bidder Names in dropdown in estimating post field
  const [bidderName, setbidderName] = useState("");
  const [bidder_detail, setBidder_detail] = useState("");

  //************* Define the handleSubmit function below
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
      bidder_deatil: bidder_detail,
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
        setBidder_detail("");
        // Close the modal
        setTimeout(() => {
          setShowModal(false);
        }, 1000);
        // closeModal();
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
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(currentDate.getDate()).padStart(2, "0"); // Add leading zero if needed
    return `${year}-${month}-${day}`;
  };

  const [step0FormData, setStep0FormData] = useState({
    date: getCurrentDate(),
    architect_name: "",
    architect_firm: "",
    estimating: selectedEstimatingID,
  });
  const [step1FormData, setStep1FormData] = useState({
    Addendums: [], // Make sure it's an array
  });
  const [step2FormData, setStep2FormData] = useState({
    specific_name: "",
    budget: null,
    sefic: [],
  });

  const formatNumber = (value) => {
    // Remove any existing commas and non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");

    // Check if the numeric value is not empty
    if (numericValue.length > 0) {
      // Convert the numeric value to a number
      const numberValue = parseFloat(numericValue);

      // Format the number with commas for thousands and millions
      const formattedValue = numberValue.toLocaleString("en-US");

      return formattedValue;
    }

    return ""; // Return an empty string if the input is empty or contains non-numeric characters
  };

  const [services, setServices] = useState([]);
  async function fetchServiceData() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/estimating/service/"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const updatedServiceTypes = data.map((myservice, id) => ({
        proposal: id + 1,
        service: myservice.service || id + 1,
        type: myservice.type || "EX",
        name: myservice.name,
      }));
      console.log(updatedServiceTypes);
      // Make sure each 'service' object has a 'type' key
      updatedServiceTypes.forEach((service) => {
        if (typeof service.type === "undefined") {
          service.type = "EX"; // Set a default 'type' value if it's missing
        }
      });

      setServices(updatedServiceTypes);
    } catch (error) {
      console.error("Error fetching service data:", error.message);
    }
  }

  // Call fetchServiceData when the component mounts
  useEffect(() => {
    fetchServiceData();
  }, []);
  const [isFocused, setIsFocused] = useState(false);
  const handleTypeChange = (index) => {
    // Create a copy of the services array
    const updatedServices = [...services];

    // Update the type property based on the current value
    updatedServices[index].type =
      updatedServices[index].type === "IN" ? "EX" : "IN";

    // If the current service is set to "IN," set its proposal to 1
    if (updatedServices[index].type === "IN") {
      updatedServices[index].proposal = 1;
    } else {
      // If the current service is set to "EX," calculate the proposal value
      // based on the index of the first "EX" service + 1
      const firstEXIndex = updatedServices.findIndex(
        (service) => service.type === "EX"
      );
      if (firstEXIndex !== -1) {
        updatedServices[index].proposal = firstEXIndex + 2; // Add 1 to the index
      } else {
        // If there are no "EX" services, set the proposal to 1
        updatedServices[index].proposal = 1;
      }
    }

    // Update the services state with the modified array
    setServices(updatedServices);
  };
  // Define a function to handle modal close
  const closeModal = () => {
    setShowModal(false);
    setPurposalModal(false);
    // Remove the 'modal-active' class when the modal is closed
    document.body.classList.remove("modal-active");
  };
  const handleProposalSubmitPosting = async (e) => {
    e.preventDefault();

    try {
      console.log("Services data to be sent:", services);

      // Check if all elements in the services array have the 'service' key
      const hasMissingService = services.some(
        (service) => typeof service.proposal === "undefined"
      );

      if (hasMissingService) {
        console.error("Missing 'perposal' key in services array");
        return;
      }

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
                sefic: step2FormData.sefic.map((detail) => ({
                  sefic: detail.specific_name,
                  number: detail.number,
                  name: detail.name,
                })),
              },
            ],
            services: services.map((service) => ({
              proposal: service.proposal,
              service: service.service,
              type: service.type === "IN" ? "IN" : "EX",
            })),
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response data:", responseData);
        // Clear form fields after successful submission
        setStep0FormData({
          date: getCurrentDate(),
          estimating: "",
          architect_name: "",
          architect_firm: "",
        });

        setStep1FormData({
          Addendums: [],
        });

        setStep2FormData({
          specific_name: "",
          budget: "",
          sefic: [],
        });

        setTimeout(() => {
          closeModal();
        }, 1000);
      } else {
        console.error("Error submitting proposal data");
        const errorResponse = await response.text(); // Read the response as text
        console.error("Error response:", errorResponse);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
  const filteredData = data.filter((customer) => {
    // console.log("Filter:", filter);
    // console.log("Status:", customer.status);
    return (
      (customer.Prjct_Name &&
        customer.Prjct_Name.toUpperCase().includes(filter.toUpperCase())) ||
      (customer.status &&
        customer.status
          .trim()
          .toUpperCase()
          .includes(filter.trim().toUpperCase())) ||
      (customer.estimator &&
        customer.estimator.toUpperCase().includes(filter.toUpperCase())) ||
      (customer.bidder &&
        customer.bidder.toUpperCase().includes(filter.toUpperCase())) ||
      (customer.bid_amount &&
        customer.bid_amount
          .toString()
          .toUpperCase()
          .includes(filter.toUpperCase()))
    );
  });

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

  // };
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
  const handleBidderDetailChange = (e) => {
    setBidder_detail(e.target.value);
  };

  const handleCompanyNameChange = (e) => {
    setCompany(e.target.value);
  };
  // ********************************
  // Function to format the integer value with commas
  const formatNumberWithCommas = (value) => {
    if (value === null) return ""; // Return an empty string if the value is null
    return value.toLocaleString("en-US");
  };

  // Event handler for the budget input
  const handlebudgetchange = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseInt(inputValue.replace(/[^0-9]/g, ""), 10); // Parse the input to an integer

    setStep2FormData({
      ...step2FormData,
      budget: isNaN(numericValue) ? null : numericValue, // Store as integer or null if not a valid number
    });
  };

  // **********************

  const handleSpecificationInputChange = (index, key, value) => {
    // Clone the current sefic array to avoid mutating the state directly
    const updatedSefic = [...step2FormData.sefic];

    // Update the specific property for the specified index
    updatedSefic[index][key] = value;

    // Update the state
    setStep2FormData({
      ...step2FormData,
      sefic: updatedSefic,
    });
  };

  const handleAddSpecificationEntry = (e) => {
    e.preventDefault();
    // Clone the current sefic array to avoid mutating the state directly
    const updatedSefic = [...step2FormData.sefic];

    // Add a new entry with default values
    updatedSefic.push({
      specific_name: "",
      budget: "",
      sefic: "",
      number: "",
      name: "",
    });

    // Update the state
    setStep2FormData({
      ...step2FormData,
      sefic: updatedSefic,
    });
  };

  const handleRemoveSpecificationEntry = (index) => {
    // Clone the current sefic array to avoid mutating the state directly
    const updatedSefic = [...step2FormData.sefic];

    // Remove the entry at the specified index
    updatedSefic.splice(index, 1);

    // Update the state
    setStep2FormData({
      ...step2FormData,
      sefic: updatedSefic,
    });
  };

  const formatBidAmount = (amount) => {
    if (amount === null) return ""; // Return an empty string if the amount is null
    return amount.toLocaleString("en-US");
  };

  return (
    <>
      <div className={`estimator  px-5 ${showModal ? "modal-active" : ""}`}>
        <h3>Estimating Summary</h3>
        {/* {ProjectformModal && ( */}
        <div
          className="modal fade modalContainer"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title" id="staticBackdropLabel">
                  Project Details
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              {/* <form className="myform" onSubmit={handleProjectFormSubmit}> */}

              <div className="modal-body d-flex justify-content-center align-items-center flex-column gap-5 pb-5 px-5">
                {/* <div className="projName">
                    <label htmlFor="projectName" className="form-label">
                      Project Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="projectName"
                      placeholder="AutoPopulate not shown on frontend"
                      value={selectedProjectID}
                      onChange={handleProjectIDChange}
                    />
                  </div> */}
                <div className="bothDiv gap-3">
                  <div className="projName Oneline">
                    <label htmlFor="projectName" className="form-label">
                      Start Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="DateId"
                      value={startDate}
                      onChange={handleStartDateChange}
                    />
                  </div>
                  <div className="projName Oneline">
                    <label htmlFor="projectName" className="form-label">
                      Job No#:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="projectID"
                      value={jobNo}
                      onChange={handleJobNoChange}
                    />
                  </div>
                </div>
                <div className="bothDiv gap-3">
                  <div className="Oneline">
                    <label htmlFor="estimatorName" className="form-label">
                      Project Manager:
                    </label>
                    <select
                      className="form-select"
                      id="projectManagerID"
                      value={selectedProjectManager}
                      onChange={handleProjectManagerChange}
                    >
                      <option value="">Select Project Manager</option>
                      {projectManager && projectManager.length > 0 ? (
                        projectManager.map((user) => (
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
                  <div className="Oneline">
                    <label htmlFor="location" className="form-label">
                      Foreman:
                    </label>
                    <select
                      className="form-select"
                      id="estimatorNameID"
                      value={selectedForeman}
                      onChange={handleForemanChange}
                    >
                      <option value="">Select Forman</option>
                      {formanName.length > 0 ? (
                        formanName.map((user) => (
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
                </div>

                <div className="bothDiv gap-3">
                  <div className="Oneline">
                    <label htmlFor="estimatorName" className="form-label">
                      Bim Operator:
                    </label>
                    <select
                      className="form-select"
                      id="bimOperatorID"
                      value={selectedBimOperator} // Use the selectedBimOperator value
                      onChange={handleBimOperatorChange}
                    >
                      <option value="">Select Bim Operator</option>
                      {BimOperator && BimOperator.length > 0 ? (
                        BimOperator.map((user) => (
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
                  <div className="Oneline">
                    <label htmlFor="location" className="form-label">
                      Project Engineer:
                    </label>
                    <select
                      className="form-select"
                      id="ProjectEngineerID"
                      value={selectedProjectEngineer}
                      onChange={handleProjectEngineerChange}
                    >
                      <option value="">Select Location</option>

                      {ProjEnger && ProjEnger.length > 0 ? (
                        ProjEnger.map((user) => (
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
                </div>
              </div>

              {/* </form> */}
              <div className="modal-footer">
                {/* <h5>Footer</h5> */}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleProjectFormSubmit}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* )} */}

        <div className="inputbtn d-flex gap-2 px-5">
          <input
            type="text"
            placeholder="Filter by Project Name, Estimator Name, Bidders, Bid Amount, Status"
            value={filter}
            className="myinput p-2"
            onChange={(e) => setFilter(e.target.value)}
          />
          <button
            className="btn btn-success"
            onClick={() => setShowModal(true)}
          >
            New
          </button>
        </div>
        <div className="table-responsive proposalTable mt-4">
          <table className="table table-striped table-bordered table-hover">
            <thead className="proposalHeader">
              <tr>
                <th>Due Date</th>
                <th>Project Name</th>
                <th>Area</th>
                <th>Estimator</th>
                <th>Status</th>
                <th>Bidders</th>
                <th>Bid Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="cursor-pointer bg-info jloop">
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td className="mytd centered-td">{item.due_date}</td>
                  <td className="mytd myproject centered-td">
                    {item.Prjct_Name}
                  </td>
                  <td className="mytd centered-td">{item.location}</td>
                  <td className="mytd centered-td">{item.estimator}</td>
                  <td className="mytd centered-td">{item.status}</td>
                  <td className="mytdbidder centered-td">
                    {item.bidder + " " + item.bidder_deatil}
                  </td>
                  <td className="mytd centered-td">
                    $ {formatBidAmount(item.bid_amount)}
                  </td>
                  <td className="mytd centered-td">
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
                            console.log(item.Prjct_Name);
                            setStep0FormData({
                              ...step0FormData,
                              estimating: item.id,
                            });
                            setSelectedEstimatingID(item.Prjct_Name); // Set the selected estimating ID
                            setPurposalModal(true);
                          }}
                          // onClick={movetoPurposalPage}
                        >
                          Proposal
                        </button>

                        <button
                          type="button"
                          className="btn dropbtns"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          onClick={() => {
                            console.log(item.id);
                            setSelectedProjectID(item.id); // Set the selected estimating ID
                          }}
                        >
                          Projects
                        </button>
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
        <div
          className={`modal-container bg-white pt-5 ps-2 ${
            showModal ? "show" : ""
          }`}
        >
          <h4 className="text-center addnewtxt">Add New Estimating Entry</h4>
          <button className="close-btn" onClick={closeModal}></button>
          <div className="modal-content px-5">
            <form onSubmit={handleSubmit} className="MyForm">
              <div className="bothDiv mt-5">
                <div className="Oneline">
                  <label htmlFor="dueDate" className="form-label">
                    Due Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    value={dueDate}
                    onChange={handleDueDateChange}
                  />
                </div>
                <div className="Oneline">
                  <label htmlFor="companyName" className="form-label">
                    Company
                  </label>
                  <select
                    className="form-select"
                    id="companyName"
                    value={company}
                    onChange={handleCompanyNameChange}
                  >
                    <option value="">Select Company</option>
                    {companyName && companyName.length > 0 ? (
                      companyName.map((companyItem) => (
                        <option value={companyItem.id} key={companyItem.id}>
                          {companyItem.Cmpny_Name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        {companyName ? "No companies available" : "Loading..."}
                      </option>
                    )}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="projectName" className="form-label">
                  Project Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="projectName"
                  value={projectName}
                  onChange={handleProjectNameChange}
                />
              </div>

              <div className="bothDiv">
                <div className="Oneline">
                  <label htmlFor="estimatorName" className="form-label">
                    Estimator Name:
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
                <div className="Oneline">
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
              </div>
              <div className="bothDiv">
                <div className="Oneline">
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
                <div className="Oneline">
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
              </div>
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
                  value={bidder_detail}
                  onChange={handleBidderDetailChange}
                ></textarea>
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
            Proposal
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
                            Proposal Date:
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
                        <div className="mb-2 mt-3">
                          <label htmlFor="ProjectID" className="form-label">
                            Estimating ID:
                          </label>
                          <input
                            type="text"
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
                        </div>

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
                        <div className="specificationEntry">
                          <div className="mb-2 mt-3">
                            <label
                              htmlFor="specificName"
                              className="form-label"
                            >
                              Specification Name
                            </label>
                            {/* <input
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
                            /> */}
                            {/* ************************ */}
                            <select
                              className="form-select"
                              aria-label="Select Specification"
                              value={step2FormData.specific_name || ""}
                              onChange={(e) =>
                                setStep2FormData({
                                  ...step2FormData,
                                  specific_name: e.target.value,
                                })
                              }
                            >
                              <option value="" disabled>
                                Select Specification
                              </option>
                              <option value="Add/Alt Building Insulation">
                                Add/Alt Building Insulation
                              </option>
                              <option value="Add/Alt Interior Wall Insulation">
                                Add/Alt Interior Wall Insulation
                              </option>
                              <option value="Add/Alt Weather Barriers">
                                Add/Alt Weather Barriers
                              </option>
                              <option value="Base Bid Drywall/Framing/Plaster">
                                Base Bid Drywall/Framing/Plaster
                              </option>
                              <option value=" Add/Alt Integrated Ceiling Assemblies">
                                Add/Alt Integrated Ceiling Assemblies
                              </option>
                            </select>

                            {/* ************************ */}
                          </div>
                          <div className="mb-2 mt-3">
                            <label
                              htmlFor="specificbudget"
                              className="form-label"
                            >
                              Specification Budget
                            </label>
                            <input
                              type="text" // Use type "text" to allow non-numeric characters (e.g., commas)
                              className="form-control"
                              id="specificbudget"
                              value={formatNumberWithCommas(
                                step2FormData.budget
                              )} // Format with commas when displaying
                              onChange={handlebudgetchange}
                              onBlur={handlebudgetchange}
                            />
                          </div>
                          <div className="mb-2 mt-3">
                            <label
                              htmlFor="specificdetails"
                              className="form-label"
                            >
                              Specification Details
                            </label>
                            {step2FormData.sefic.map((entry, index) => (
                              <div
                                key={index}
                                className="input-group myrowInputgrouup"
                              >
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Specification Number"
                                  value={formatNumber(entry.number)}
                                  onChange={(e) =>
                                    handleSpecificationInputChange(
                                      index,
                                      "number",
                                      e.target.value
                                    )
                                  }
                                />
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Specification Description"
                                  value={entry.name}
                                  onChange={(e) =>
                                    handleSpecificationInputChange(
                                      index,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                />
                                <button
                                  className="btn btn-danger"
                                  onClick={() =>
                                    handleRemoveSpecificationEntry(index)
                                  }
                                >
                                  <i className="far">X</i>
                                </button>
                              </div>
                            ))}
                            <button
                              className="btn btn-success bk"
                              onClick={handleAddSpecificationEntry}
                            >
                              <i className="fa-regular icon fa-plus"></i>
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
                        <div className=" myservices p-3">
                          {services.map((service, id) => (
                            <div
                              key={id}
                              className="mb-2 serviceDiv d-flex justify-content-center align-items-center"
                            >
                              {/* ... other input elements */}
                              {/* <input
                                type="number"
                                className="form-control serviceInput"
                                placeholder={Proposal ${id}}
                                value={services.proposal}
                                readOnly
                              /> */}
                              <input
                                type="text"
                                className={`serviceInput ${
                                  isFocused ? "focused" : ""
                                }`}
                                placeholder={`Service ${id + 1}`}
                                value={service.name}
                                readOnly
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                              />
                              <label className="switch">
                                <div className="bg-info">
                                  <input
                                    type="checkbox"
                                    className="checkCircle"
                                    checked={service.type === "IN"}
                                    onChange={() => {
                                      handleTypeChange(id);
                                      console.log(
                                        "Proposal value after toggle:",
                                        services[id].proposal
                                      );
                                    }}
                                  />

                                  <span className="slider round"></span>
                                </div>
                              </label>
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
