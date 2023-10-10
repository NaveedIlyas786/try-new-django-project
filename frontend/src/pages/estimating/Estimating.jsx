import { useState, useEffect } from "react";
import "./Estimating.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { fetchEstimatingData } from "../../store/EstimatingSlice";
import { addProject } from "../../store/ProjectFormSlice";
import { Modal, Button, Stepper, Step, StepLabel } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import { addEstimating } from "../../store/EstimatingSlice";
// import "aos/dist/aos.css";
import ParticlesAnimation from "../../components/particleAnimation/ParticlesAnimation";
import { useSelector, useDispatch } from "react-redux";
import { updateStatus } from "../../store/EstimatingSlice";
import { createSelector } from "reselect";
// import { storeProposalData } from "../../store/EstimatingProposalSlice";

const Estimator = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [purposalModal, setPurposalModal] = useState(false); // State to control modal visibility
  const [showProjectModal, setshowProjectModal] = useState(false); // State to control modal visibility
  const [dueDate, setDueDate] = useState("");
  const [projectName, setProjectName] = useState("");
  const [estimatorName, setEstimatorName] = useState("");
  const [location, setLocation] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [company, setCompany] = useState(""); // Updated to store company name as a string
  // const navigate = useNavigate();
  // ***********************************
  const dispatch = useDispatch();

  const [numberOfCircles, setNumberOfCircles] = useState();

  const handleNumberOfCirclesChange = (event) => {
    setNumberOfCircles(Number(event.target.value));
  };

  useEffect(() => {
    const newNumberOfCircles = 100; // Set the desired number of circles
    handleNumberOfCirclesChange({ target: { value: newNumberOfCircles } });
  }, []);

  window.onload = () => {
    const newNumberOfCircles = 100; // Set the desired number of circles
    handleNumberOfCirclesChange({ target: { value: newNumberOfCircles } });
  };

  //! For AOS page scrolling Aimation ↴↴
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

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
    dispatch(fetchEstimatingData());
  }, [dispatch]);

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
  // const [SelectedTimeZone, setSelectedTimeZone] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/estimating/company/")
      .then((response) => response.data)
      .then((data) => {
        const activeCompanies = data.filter((company) => company.is_active);
        // console.log('Active Companies:', activeCompanies);  // Log the filtered companies to the console
        setCompanyName(activeCompanies);
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
        const bidUser = data.filter(
          (user) => user.roles.includes("Estimator") && user.is_active
        );
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
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(currentDate.getDate()).padStart(2, "0"); // Add leading zero if needed
    return `${year}-${month}-${day}`;
  };
  const [startDate, setStartDate] = useState(getCurrentDate());
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
        dispatch(addProject(response.data));
        // Clear the form fields by resetting the state variables
        setStartDate(""); // Clear the startDate
        setJobNo(""); // Clear the jobNo
        setSelectedProjectID(""); // Clear the selectedProjectID
        setSelectedProjectManager(""); // Clear the selectedProjectManager
        setSelectedForeman(""); // Clear the selectedForeman
        setSelectedBimOperator(""); // Clear the selectedBimOperator
        setSelectedProjectEngineer(""); // Clear the selectedProjectEngineer
        setTimeout(() => {
          setshowProjectModal(false);
        }, 200);
        // navigate("/homepage/projects");
        // window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here are
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
        // console.log(managerUser);
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
        // console.log(formanUser);
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
  const [selectedTime, setSelectedTime] = useState("");
  const [timezone, settimezone] = useState("");

  const handleTimeZoneChange = (e) => {
    settimezone(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Function to validate and format the time input

    console.log("Selected Time before validation:", selectedTime);
    const validateAndFormatTime = (time) => {
      // Split the time into hours and minutes
      const [hours, minutes] = time.split(":").map(Number);

      // Check if hours and minutes are valid
      if (
        Number.isNaN(hours) ||
        Number.isNaN(minutes) ||
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59
      ) {
        // Invalid hours or minutes
        console.log("Invalid hours or minutes");
        return "";
      }

      // Format the time as "hh:mm AM" or "hh:mm PM"
      let formattedTime = `${String(hours % 12).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;

      return formattedTime;
    };

    // validateAndFormatTime()

    console.log("Selected Time:", selectedTime);

    // Validate and format the selectedTime
    const formattedTime = validateAndFormatTime(selectedTime);
    console.log("Formatted Time: ", formattedTime);

    if (!formattedTime) {
      // Handle invalid time format here, display an error message or prevent form submission
      console.error("Invalid time format");
      return;
    }

    // Create a data object with the form values
    const formData = {
      due_date: dueDate,
      start_date: startDate,
      time: formattedTime,
      timezone: timezone,
      prjct_name: projectName,
      company: company, // Use the company state directly
      estimator: estimatorName,
      location: location,
      // bid_amount: bidAmount,
      bidder: bidderName, // Use BidderName here, not bidder
      bidder_deatil: bidder_detail,
    };

    // Send a POST request to the API
    axios
      .post("http://127.0.0.1:8000/api/estimating/estimating/", formData)
      .then((response) => {
        // Handle the response if needed
        console.log("Data successfully submitted:", response.data);

        // dispatch(addEstimating(response.data));

        // You can also reset the form fields here if needed
        setDueDate("");
        setSelectedTime("");
        setStartDate("");
        settimezone("");
        setProjectName("");
        setCompany(""); // Reset companyName here
        setEstimatorName("");
        setLocation("");
        // setBidAmount("");
        setbidderName("");
        setBidder_detail("");
        // Close the modal
        setTimeout(() => {
          setShowModal(false);
        }, 1000);
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
    date: getCurrentDate(),
    architect_name: "",
    architect_firm: "",
    estimating: selectedEstimatingID,
  });
  const [step1FormData, setStep1FormData] = useState({
    Addendums: [], // Make sure it's an array
  });
  const [step2FormData, setStep2FormData] = useState({
    specific_name: "Base Bid Drywall/Framing",
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
      // console.log(data);
      const updatedServiceTypes = data.map((myservice, id) => ({
        proposal: id + 1,
        service: myservice.service || id + 1,
        type: myservice.type || "EX",
        name: myservice.name,
      }));
      // console.log(updatedServiceTypes);
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
    setshowProjectModal(false);
    // Remove the 'modal-active' class when the modal is closed
    document.body.classList.remove("modal-active");
  };
  const handleProposalSubmitPosting = async (e, dispatch) => {
    e.preventDefault();

    try {
      console.log("Services data to be sent:", services);

      // Check if all elements in the services array have the 'proposal' key
      const hasMissingService = services.some(
        (service) => typeof service.proposal === "undefined"
      );

      if (hasMissingService) {
        console.error("Missing 'proposal' key in services array");
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
        console.log("Data Successfully Submitted !", responseData);

        // Dispatch the proposal data to the Redux store
        // dispatch(storeProposalData(responseData)); // Make sure `storeProposalData` is imported

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
        }, 500);
      } else {
        console.error("Error submitting proposal data");
        const errorResponse = await response.text();
        console.error("Error response:", errorResponse);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  // ****************Get Estimating data From Store
  const selectEstimatingData = (state) => state.estimating.data;

  const selectFilteredData = createSelector([selectEstimatingData], (data) => {
    return data.filter((customer) => {
      return (
        ((customer.prjct_name &&
          customer.prjct_name.toUpperCase().includes(filter.toUpperCase())) ||
          (customer.status &&
            customer.status
              .trim()
              .toUpperCase()
              .includes(filter.trim().toUpperCase())) ||
          (customer.estimator &&
            customer.estimator.toUpperCase().includes(filter.toUpperCase())) ||
          (customer.bidder &&
            customer.bidder.toUpperCase().includes(filter.toUpperCase()))) &&
        (customer.status === "Working" || customer.status === "Pending")
      ); // Filter by 'Working' and 'Pending' status
    });
  });

  const filteredData = useSelector(selectFilteredData);

  const handlestartDateChange = (e) => {
    setStartDate(e.target.value);
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
  const [specificationCount, setSpecificationCount] = useState(1);
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
  const viewpdf = () => {
    navigate("/homepage/purposal");
  };
  const movetoWonProjectsPage = () => {
    navigate("/homepage/wonProjectspage/");
  };
  const movetoLostProjectsPage = () => {
    navigate("/homepage/lostProjectspage/");
  };

  // ************************************************

  // const [estimatorchoice, setEstimatorchoice] = useState({});
  const [statusMap, setStatusMap] = useState({});

  // Function to update the status of an item
  const updateItemStatus = (itemId, newStatus) => {
    // Dispatch the action to update the status in the Redux store
    dispatch(updateStatus({ id: itemId, newStatus }));
  };
  const handleUpdationChange = async (event, itemId) => {
    const updatedStatus = event.target.value;
    console.log("Updated Status:", updatedStatus);

    const itemToUpdate = filteredData.find((item) => item.id === itemId);
    console.log("Item to Update:", itemToUpdate);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/estimating/estimating/${itemId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: updatedStatus,
            prjct_name: itemToUpdate.prjct_name,
          }),
        }
      );

      console.log("API Response:", response);

      if (response.ok) {
        // Dispatch the updateStatus action to update the status in the Redux store
        updateItemStatus(itemId, updatedStatus);

        // Log a success message to the console
        console.log(`Data updated successfully for item with ID ${itemId}`);
        // You may need to refresh the UI or update the specific row accordingly
      } else {
        if (response.status === 404) {
          // Handle the case where the resource was not found (404 error)
          console.error("Resource not found.");
        } else {
          // Handle other non-success responses
          const responseData = await response.text();
          console.error("Failed to updations! Server response:", responseData);
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const [estimatorchoice, setEstimatorchoice] = useState({});
  const handleEstimatorChange = async (event, itemId) => {
    const updatedEstimatorId = parseInt(event.target.value, 10);
    console.log("Updated Estimator ID:", updatedEstimatorId);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/estimating/estimating/${itemId}/`, // Use backticks (`) for template literals
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            estimator: updatedEstimatorId, // Only update the estimator
          }),
        }
      );

      console.log("API Response:", response);

      if (response.ok) {
        // Handle success response here
        const updatedEstimatorchoiceId = updatedEstimatorId;
        setEstimatorchoice((prevEstimatorChoice) => ({
          ...prevEstimatorChoice,
          [itemId]: updatedEstimatorchoiceId,
        }));
        console.log("Updated estimatorchoice:", estimatorchoice);

        // Log a success message to the console
        console.log(`Data updated successfully for item with ID ${itemId}`);
        // You may need to refresh the UI or update the specific row accordingly
      } else {
        if (response.status === 404) {
          // Handle the case where the resource was not found (404 error)
          console.error("Resource not found.");
        } else {
          // Handle other non-success responses
          const responseData = await response.text();
          console.error("Failed to update! Server response:", responseData);
        }
      }
    } catch (error) {
      console.error("Error updating estimator:", error);
    }
  };
  const [AreaChoice, setAreaChoice] = useState({});
  const handleAreaChange = async (event, itemId) => {
    const updatedAreaId = parseInt(event.target.value, 10);
    console.log("Updated Estimator ID:", updatedAreaId);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/estimating/estimating/${itemId}/`, // Use backticks (`) for template literals
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location: updatedAreaId, // Only update the estimator
          }),
        }
      );

      console.log("API Response:", response);

      if (response.ok) {
        // Handle success response here
        const updatedAreaChoiceId = updatedAreaId;
        setAreaChoice((prevAreaChoice) => ({
          ...prevAreaChoice,
          [itemId]: updatedAreaChoiceId,
        }));
        console.log("Updated AreaChoice:", AreaChoice);

        // Log a success message to the console
        console.log(`Area updated successfully for item with ID ${itemId}`);
        // You may need to refresh the UI or update the specific row accordingly
      } else {
        if (response.status === 404) {
          // Handle the case where the resource was not found (404 error)
          console.error("Resource not found.");
        } else {
          // Handle other non-success responses
          const responseData = await response.text();
          console.error("Failed to update! Server response:", responseData);
        }
      }
    } catch (error) {
      console.error("Error updating estimator:", error);
    }
  };

  const MovetoURLpage = () => {
    navigate("/homepage/urlpage");
  };
  return (
    <div className="ParentAllDiv">
      <div className={`estimator ${showModal ? "modal-active" : ""}`}>
        <div className="AllbackDivs">
          <div className="backDiv1"></div>
          <div className="backDiv1"></div>
        </div>
        <div className="estimatingTable px-5">
          <h3 className="text-black">Estimating Summary</h3>
          <div className="btn-group" data-aos="fade-left">
            <button
              type="button"
              className="btn btn-outline-success lp"
              onClick={movetoWonProjectsPage}
            >
              Won Projects
            </button>
            <button
              type="button"
              className="btn btn-outline-danger lp"
              on
              onClick={movetoLostProjectsPage}
            >
              Archived Projects
            </button>
          </div>
          {/* {ProjectformModal && ( */}
          {showProjectModal && (
            <div
              className={`modal-container bg-white pt-5 ps-2 ${
                showProjectModal ? "show" : ""
              }`}
            >
              <h4 className="text-center addnewtxt">Add New Project Entry</h4>
              <button className="close-btn" onClick={closeModal}></button>
              <div className="d-flex justify-content-center align-items-center flex-column gap-5 pb-5 px-5">
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
                <div className="bothDiv gap-3 mt-3">
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
                      Job Number:
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
                      <option value="">Select Project Engineer</option>

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
                <button
                  type="button"
                  onClick={handleProjectFormSubmit}
                  className="btn btn-submit m-auto mt-3 mb-4"
                >
                  Add Project
                </button>
              </div>
            </div>
          )}

          <div className="inputbtn d-flex gap-2 px-5" data-aos="fade-down">
            <input
              type="text"
              placeholder="Filter by Project Name, Estimator Name, Bidders, Bid Amount, Status"
              value={filter}
              className="myinput p-2"
              onChange={(e) => setFilter(e.target.value)}
            />
            <button className="btn btn-primary" onClick={MovetoURLpage}>
              URL
            </button>
            <button
              className="btn btn-success"
              onClick={() => setShowModal(true)}
            >
              New
            </button>
          </div>
          <ParticlesAnimation numberOfCircles={numberOfCircles} />
          <div
            className="table-responsive proposalTable mt-2"
            data-aos="fade-up"
          >
            <table
              className="table table-striped table-bordered table-hover"
              style={{ tableLayout: "auto" }}
            >
              <thead className="proposalHeader">
                <tr>
                  <th>Due Date</th>
                  <th>Due Time</th>
                  <th>Project Name</th>
                  <th>Area</th>
                  <th>Estimator</th>
                  <th>Status</th>
                  <th>Bidders</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="cursor-pointer jktable bg-info jloop">
                {filteredData.map((item) => (
                  <tr key={item.id}>
                    <td
                      className="mytd centered-td"
                      style={{ minWidth: "100px" }}
                    >
                      {item.due_date}
                    </td>
                    <td
                      className="mytd centered-td"
                      style={{ minWidth: "120px" }}
                    >
                      {item.time} <strong>{item.timezone}</strong>
                    </td>
                    <td className="mytd myproject centered-td">
                      {item.prjct_name}
                    </td>
                    <td
                      className="mytd centered-td"
                      style={{ minWidth: "110px" }}
                    >
                      <select
                        className="form-select dropUpdation"
                        id="estimatorName"
                        onChange={(event) => handleAreaChange(event, item.id)}
                        value={AreaChoice[item.id] || item.location}
                      >
                        <option value="">{item.location}</option>
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
                    </td>
                    <td
                      className="mytd centered-td"
                      style={{ minWidth: "210px" }}
                    >
                      <select
                        className="form-select dropUpdation"
                        id="estimatorName"
                        onChange={(event) =>
                          handleEstimatorChange(event, item.id)
                        }
                        value={estimatorchoice[item.id] || item.estimator}
                        // Set the width to 100%
                      >
                        <option value="">
                          {item.estimator ? item.estimator : "No Estimator"}
                        </option>
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
                    </td>
                    <td className="mytd centered-td ">
                      <select
                        className="dropUpdation p-2 m-3"
                        name="#"
                        id="#"
                        onChange={(event) =>
                          handleUpdationChange(event, item.id)
                        }
                        value={statusMap[item.id] || item.status}
                      >
                        {/* <option value={item.status}>{item.status}</option> */}
                        <option value="Won">Won</option>
                        <option value="Pending">Pending</option>
                        <option value="Working">Working</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </td>
                    <td className="mytdbidder centered-td">
                      {item.bidder + " " + item.bidder_deatil}
                    </td>
                    <td className="mytd centered-td actionTD">
                      <div className="relative-container loop">
                        <button
                          type="button"
                          className="btn dropbtns btn-primary"
                        >
                          Edit
                        </button>
                        <button
                          className="btn dropbtns btn-success"
                          onClick={() => {
                            console.log(item.prjct_name);
                            setStep0FormData({
                              ...step0FormData,
                              estimating: item.id,
                            });
                            setSelectedEstimatingID(item.prjct_name);
                            setPurposalModal(true);
                          }}
                        >
                          Create
                        </button>

                        {/* <button
                          type="button"
                          className="btn dropbtns btn-primary"
                          onClick={() => {
                            console.log(item.id);
                            setSelectedProjectID(item.id);
                            setshowProjectModal(true);
                          }}
                        >
                          Project
                        </button> */}
                        <button
                          className="btn dropbtns btn-secondary"
                          onClick={() => {
                            navigate("/homepage/purposal");
                          }}
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              <div className="bothDiv gap-2 mt-5">
                <div className="Oneline">
                  <label htmlFor="dueDate" className="form-label">
                    Start Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    value={startDate}
                    onChange={handlestartDateChange}
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
                <div className="Oneline timefield">
                  <label htmlFor="time" className="form-label">
                    Time:
                  </label>
                  <div className="d-flex bg-white">
                    <input
                      type="time"
                      placeholder="Select Time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    />
                    {/* <p>Selected Time: {selectedTime}</p> */}
                    <select
                      value={timezone}
                      onChange={handleTimeZoneChange}
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
                  value={bidderName}
                  onChange={handleBidderChange}
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
                            Estimating Name:
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
                          <strong> Scope of work</strong>
                        </label>

                        {/* Render specifications based on the specificationCount */}
                        {[...Array(specificationCount)].map((_, index) => (
                          <div className="specificationEntry" key={index}>
                              <div className="mb-2 mt-3">
                                <label
                                  htmlFor="specificName"
                                  className="form-label"
                                >
                                  Scope of work name
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
                                  <option value="Base Bid Drywall/Framing">
                                    Base Bid Drywall/Framing
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
                                  <option value=" Add/Alt Integrated Ceiling Assemblies">
                                    Add/Alt Integrated Ceiling Assemblies
                                  </option>
                                </select>
                              </div>
                              <div className="mb-2 mt-3">
                                <label
                                  htmlFor="specificbudget"
                                  className="form-label"
                                >
                                  Scope of work amount
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
                                  Scope of work divisions
                                </label>
                                {step2FormData.sefic.map((entry, index) => (
                                  <div
                                    key={index}
                                    className="input-group myrowInputgrouup"
                                  >
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder=" Scope Of Work Number"
                                      value={entry.number}
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
                                      placeholder=" Scope Of Work Description"
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
                            {/* </div> */}
                          </div>
                        ))}
                        <button
                          className="btn btn-success"
                          onClick={(e) => {
                            e.preventDefault();
                            setSpecificationCount(specificationCount + 1);
                          }}
                        >
                          Add alternate scope of work
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
    </div>
  );
};

export default Estimator;
