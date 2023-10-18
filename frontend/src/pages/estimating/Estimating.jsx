import { useState, useEffect } from "react";
import "./Estimating.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { fetchEstimatingData } from "../../store/EstimatingSlice";
// import { addProject } from "../../store/ProjectFormSlice";
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
// import { margin } from "@mui/system";

const Estimator = () => {
  // const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [showEstimatingEditModal, setshowEstimatingEditModal] = useState(false); // State to control modal visibility
  const [purposalModal, setPurposalModal] = useState(false); // State to control modal visibility
  const [showProjectModal, setshowProjectModal] = useState(false); // State to control modal visibility
  const [dueDate, setDueDate] = useState("");
  const [projectName, setProjectName] = useState("");
  const [estimatorName, setEstimatorName] = useState("");
  const [location, setLocation] = useState("");
  // const [bidAmount, setBidAmount] = useState("");
  const [company, setCompany] = useState(""); // Updated to store company name as a string

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

  const main = () => {
    <h1 className="bg-danger">NO here</h1>;
  };
  // ****************************Getting Services Entries from Api End
  const [EstimatorName, setestimatorName] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/user/register/")
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
  const [SelectedGeneralSuperintendent, setSelectedGeneralSuperintendent] =
    useState("");
  const [selectedProjectAddress, setselectedProjectAddress] = useState("");
  const [selectedAddendum, setselectedAddendum] = useState("");
  const [selectedBid, setselectedBid] = useState("");
  const [selectedspec, setselectedspec] = useState("");
  const [selectedWallType, setSelectedWallType] = useState("");
  const [selectedDrywell, setSelectedDrywell] = useState("");
  const [selectedPROGRESSTRACKING, setSelectedPROGRESSTRACKING] = useState("");
  const [selectedRO_Door, setSelectedRO_Door] = useState("");
  const [selectedRO_Window, setSelectedRO_Window] = useState("");
  const [selectedProjectStatus, setProjectStatus] = useState("");
  const [selectedContacts, setSelectedContacts] = useState("");
  const [selectedSubstitution, setSelectedSubstitution] = useState("");
  const [selectedContract, setSelectedContract] = useState("");
  const [selectedProjectDate, setSelectedProjectDate] = useState("");
  const [selectedFINISHLEVELMARKUPS, setSelectedFINISHLEVELMARKUPS] =
    useState("");

  const [selectedEstimatingID, setSelectedEstimatingID] = useState(null);

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleJobNoChange = (e) => setJobNo(e.target.value);
  const handleForemanChange = (e) => setSelectedForeman(e.target.value);
  const handleBimOperatorChange = (e) => setSelectedBimOperator(e.target.value);
  const handleGenralSuperintendentChange = (e) =>
    setSelectedGeneralSuperintendent(e.target.value);
  const handleProjectAddressChange = (e) =>
    setselectedProjectAddress(e.target.value);
  const handleSelectedAddendumChange = (e) =>
    setselectedAddendum(e.target.value);
  const handleSelectedBidChange = (e) => setselectedBid(e.target.value);
  const handleSelectedSpecChange = (e) => setselectedspec(e.target.value);
  const handleWallTypeChange = (e) => setSelectedWallType(e.target.value);
  const handlePROGRESSTRACKINGChange = (e) =>
    setSelectedPROGRESSTRACKING(e.target.value);
  const handleFINISHLEVELMARKUPSChange = (e) =>
    setSelectedFINISHLEVELMARKUPS(e.target.value);
  const handleDrywellChange = (e) => setSelectedDrywell(e.target.value);
  const handleRO_DoorChange = (e) => setSelectedRO_Door(e.target.value);
  const handleRO_WindowChange = (e) => setSelectedRO_Window(e.target.value);
  const handleProjectStatusChange = (e) => setProjectStatus(e.target.value);
  const handleContactsChange = (e) => setSelectedContacts(e.target.value);
  const handleSubstitutionChange = (e) =>
    setSelectedSubstitution(e.target.value);
  const handleContractChange = (e) => setSelectedContract(e.target.value);
  const handleProjectDateChange = (e) => setSelectedProjectDate(e.target.value);
  const handleProjectEngineerChange = (e) =>
    setSelectedProjectEngineer(e.target.value);
  const handleProjectManagerChange = (e) =>
    setSelectedProjectManager(e.target.value);

  // ****************** Smart way to handle Nested Fields with multistep form **********
  const [ProjectStep1FormData, setProjectStep1FormData] = useState({
    start_date: getCurrentDate(),
    estimating: selectedEstimatingID,
    job_num: "",
    prjct_mngr: "",
    Forman: "",
    bim_oprtr: "",
    prjct_engnr: "",
  });
  const [ProjectStep2FormData, setProjectStep2FormData] = useState({
    general_superintendent: "",
    addendums: "",
    project_address: "",
    Spec: "",
    bid: "",
    wall_type: "",
    drywell: "",
  });
  const [ProjectStep3FormData, setProjectStep3FormData] = useState({
    finish: "",
    progress: "",
    contacts: "",
    status: "",
    ro_door: "",
    ro_window: "",
    substitution: "",
  });
  const [ProjectStep4FormData, setProjectStep4FormData] = useState({
    contracts: [],
    schedule_of_values: [],
    insurancs: [],
    bond: [],
  });
  const [ProjectStep5FormData, setProjectStep5FormData] = useState({
    zliens: [
      {
        zlien: "",
        date: "",
      },
    ],
    submittals: [
      {
        scop_work_number: "",
        status: "",
        date: "",
      },
    ],
  });

  const [ProjectStep6FormData, setProjectStep6FormData] = useState({
    shopdrawing: [],
    safity: [],
    schedule: [],
    sub_contractors: [],
  });

  // Function to handle form submission
  //TODO: Multistep Form  React Code
  const [projectactiveStep, setprojectActiveStep] = useState(0);
  const projectSteps = [
    "Step 1",
    "Step 2",
    "Step 3",
    "Step 4",
    "Step 5",
    "Step 6",
    "Step 7",
    "Step 8",
  ];

  const handleprojectBack = () => {
    setprojectActiveStep((prevStep) => prevStep - 1);
  };
  const handleprojectNext = () => {
    setprojectActiveStep((prevStep) => prevStep + 1);
    console.log(projectactiveStep);
  };

  const handleFieldChange = (field, value, index, category) => {
    setProjectStep5FormData((prevData) => {
      const updatedData = { ...prevData };
      updatedData[category][index] = {
        ...updatedData[category][index],
        [field]: value,
      };
      return updatedData;
    });
  };
  const handleProjectFormSubmit = (e) => {
    e.preventDefault();

    const formData = {
      // *****step 01
      start_date: ProjectStep1FormData.start_date,
      job_num: ProjectStep1FormData.job_num,
      estimating: ProjectStep1FormData.estimating,
      prjct_mngr: ProjectStep1FormData.prjct_mngr,
      Forman: ProjectStep1FormData.Forman,
      bim_oprtr: ProjectStep1FormData.bim_oprtr,
      prjct_engnr: ProjectStep1FormData.prjct_engnr,

      // *****step 02

      general_superintendent: ProjectStep2FormData.general_superintendent,
      addendums: ProjectStep2FormData.addendums,
      project_address: ProjectStep2FormData.project_address,
      bid: ProjectStep2FormData.bid,
      Spec: ProjectStep2FormData.Spec,
      drywell: ProjectStep2FormData.drywell,
      wall_type: ProjectStep2FormData.wall_type,

      // *****step 03

      finish: ProjectStep3FormData.finish,
      progress: ProjectStep3FormData.progress,
      contacts: ProjectStep3FormData.contacts,
      ro_door: ProjectStep3FormData.ro_door,
      ro_window: ProjectStep3FormData.ro_window,
      status: ProjectStep3FormData.status,
      substitution: ProjectStep3FormData.substitution,

      // *****step 04

      contracts: ProjectStep4FormData.contracts.map((mycontract) => ({
        contract: mycontract.contract,
        contract_date: mycontract.contract_date,
      })),
      schedule_of_values: ProjectStep4FormData.schedule_of_values.map(
        (myschedule) => ({
          schedule: myschedule.schedule,
          schedule_date: myschedule.schedule_date,
        })
      ),
      insurancs: ProjectStep4FormData.insurancs.map((myinsurancs) => ({
        insurance: myinsurancs.insurancs,
        date: myinsurancs.date,
      })),
      bond: ProjectStep4FormData.contracts.map((mybond) => ({
        bond: mybond.bond,
        date: mybond.date,
      })),

      // *****step 05

      zliens: ProjectStep5FormData.zliens.map((myzliens) => ({
        zlien: myzliens.zlien,
        date: myzliens.date,
      })),
      submittals: ProjectStep5FormData.submittals.map((mysubmittals) => ({
        status: mysubmittals.status,
        date: mysubmittals.date,
        scop_work_number: mysubmittals.scop_work_number,
      })),
    };

    console.log("formData to be sent", formData);

    // Send a POST request using Axios
    axios
      .post("http://127.0.0.1:8000/api/project/Project/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Data successfully submitted", response.data);
        const updatedEstimatingData = estimatingData.filter(
          (entry) => entry.id !== formData.estimating // Replace 'id' with your actual identifier field
        );

        setshowProjectModal(false);
        setEstimatingData(updatedEstimatingData);

        // Clear the form fields by resetting the state variables
        setStartDate("");
        setJobNo("");
        setSelectedProjectID("");
        setSelectedProjectManager("");
        setSelectedForeman("");
        setSelectedBimOperator("");
        setSelectedProjectEngineer("");
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
      .get("http://127.0.0.1:8000/api/user/register/")
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
  // ************************General Superintendent Role Seleted **********

  const [GeneralSuperintendent, setGeneralSuperintendent] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/user/register/")
      .then((response) => response.data)
      .then((data) => {
        const superintendent = data.filter((user) =>
          user.roles.includes("General Superintendent")
        );
        // console.log(managerUser);
        setGeneralSuperintendent(superintendent);
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
      .get("http://127.0.0.1:8000/api/user/register/")
      .then((response) => response.data)
      .then((data) => {
        const formanUser = data.filter((user) =>
          user.roles.includes("Foreman")
        );
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
      .get("http://127.0.0.1:8000/api/user/register/")
      .then((response) => response.data)
      .then((data) => {
        const bimOperatorUser = data.filter((user) =>
          user.roles.includes("BIM/Manager PR")
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
      .get("http://127.0.0.1:8000/api/user/register/")
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

  // console.log("Selected Time before validation:", selectedTime);
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

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Function to validate and format the time input

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

        dispatch(addEstimating(response.data));

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
        }, 500);
      })
      .catch((error) => {
        // Handle any errors that occurred during the POST request
        console.error("Error submitting data:", error);
        // Log the response data for more details
        console.log("Response data:", error.response.data);
      });
  };

  //************* Define the handleEstimatingEditing function

  const [selectedEstimator, setSelectedEstimator] = useState("");
  const [selectedBidder, setSelectedBidder] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedStatus, setselectedStatus] = useState("");
  const [selecteddueDate, setSelecteddueDate] = useState("");
  const [SelectedTimeforUpdate, setSelectedTimeforUpdate] = useState("");
  const [SelectedTimeZone, setSelectedTimeZone] = useState("");
  const [selectedstart_date, setSelectedstart_date] = useState("");
  const [selectedbidder_address, setSelectedbidder_address] = useState("");
  const selectedStartDate = new Date(selectedstart_date);
  const selectedmydueDate = new Date(selecteddueDate);
  const formattedStartDate = `${selectedStartDate.getFullYear()}-${(
    selectedStartDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${selectedStartDate
    .getDate()
    .toString()
    .padStart(2, "0")}`;
  const formattedDueDate = `${selectedmydueDate.getFullYear()}-${(
    selectedmydueDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${selectedmydueDate
    .getDate()
    .toString()
    .padStart(2, "0")}`;

  // *******************************************************
  const [itemId, setItemId] = useState();

  const convertToIsoTime = (formattedTime) => {
    // Convert "hh:mm AM/PM" to "hh:mm"
    const timeParts = formattedTime.split(" ");
    if (timeParts.length === 2) {
      const [time, ampm] = timeParts;
      const [hours, minutes] = time.split(":");
      const isPM = ampm === "PM" || ampm === "pm";
      let isoHours = parseInt(hours, 10);
      if (isPM && isoHours !== 12) {
        isoHours += 12;
      } else if (!isPM && isoHours === 12) {
        isoHours = 0;
      }
      return `${String(isoHours).padStart(2, "0")}:${minutes}`;
    }
    return formattedTime;
  };

  const formattedTimeEdit = convertToIsoTime(SelectedTimeforUpdate);
  // console.log("formattedTimeEdit:", formattedTimeEdit);

  const handleEstimatingEditing = async (event) => {
    event.preventDefault();

    const updatedData = {
      prjct_name: selectedEstimatingID,
      due_date: formattedDueDate,
      time: SelectedTimeforUpdate,
      timezone: SelectedTimeZone,
      status: selectedStatus,
      start_date: formattedStartDate,
      company: parseInt(selectedCompany, 10),
      location: parseInt(selectedLocation, 10),
      estimator: parseInt(selectedEstimator, 10),
      bidder: selectedBidder,
      bidder_address: selectedbidder_address,
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/estimating/estimating/${itemId}/`, // Use itemId here
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        console.log(`Data updated successfully for item with ID ${itemId}`);

        setselectedStatus("");
        setSelectedBidder("");
        setSelectedCompany("");
        setSelectedEstimator("");
        setSelectedLocation("");
        setSelectedbidder_address("");
        setSelecteddueDate("");
        setSelectedstart_date("");
        setSelectedEstimatingID("");
        setTimeout(() => {
          setshowEstimatingEditModal(false);
        }, 300);
      } else if (response.status === 404) {
        console.error("Resource not found.");
      } else {
        const responseData = await response.text();
        console.error("Failed to update! Server response:", responseData);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
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
  const [step2FormData, setStep2FormData] = useState([
    {
      specific_name: "Base Bid Drywall/Framing",
      budget: null,
      sefic: [],
    },
  ]);

  // ****************new entry of scope of work with unique id

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
    setshowEstimatingEditModal(false);
    // Remove the 'modal-active' class when the modal is closed
    document.body.classList.remove("modal-active");
  };

  const handleEntryChange = (index, field, value) => {
    setStep2FormData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index][field] = value;
      return updatedData;
    });
  };

  const handleAddEntry = () => {
    setStep2FormData((prevData) => [
      ...prevData,
      {
        specific_name: "",
        budget: null,
        sefic: [],
      },
    ]);
  };

  const handleProposalSubmitPosting = async (e) => {
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
      console.log("step2FormData to be send:", step2FormData);

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
            spcifc: step2FormData.map((entry) => ({
              specific_name: entry.specific_name,
              budget: entry.budget,
              sefic: entry.sefic.map((detail) => ({
                sefic: detail.specific_name,
                number: detail.number,
                name: detail.name,
              })),
            })),

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
        // console.log("Response data:", responseData);
        console.log("Data Successfully Submitted !", responseData);

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
    const now = new Date(); // Get the current date and time
    return data
      .filter((customer) => {
        return (
          (customer.prjct_name &&
            customer.prjct_name.toUpperCase().includes(filter.toUpperCase())) ||
          (customer.status &&
            customer.status
              .trim()
              .toUpperCase()
              .includes(filter.trim().toUpperCase())) ||
          (customer.estimator &&
            customer.estimator.toUpperCase().includes(filter.toUpperCase())) ||
          (customer.bidder &&
            customer.bidder.toUpperCase().includes(filter.toUpperCase()))
        );
      })
      .sort((a, b) => {
        // Parse the due dates as Date objects
        const dueDateA = new Date(a.due_date);
        const dueDateB = new Date(b.due_date);

        // Calculate the time difference in milliseconds
        const timeDiffA = dueDateA - now;
        const timeDiffB = dueDateB - now;

        // Sort by the time difference, with the smallest (coming soon) first
        return timeDiffA - timeDiffB;
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

  // **********************

  const handleScopeDivisionInputChange = (index, detailIndex, key, value) => {
    // Clone the current step2FormData array to avoid mutating the state directly
    const updatedFormData = [...step2FormData];
    // Clone the current sefic array for the specific entry
    const updatedSefic = [...updatedFormData[index].sefic];

    // Update the specific property for the specified detailIndex and key
    updatedSefic[detailIndex][key] = value;

    // Update the state by updating the specific entry's sefic array
    updatedFormData[index].sefic = updatedSefic;

    setStep2FormData(updatedFormData);
  };

  const handleRemoveScopeDivisionEntry = (index, detailIndex) => {
    // Clone the current step2FormData array to avoid mutating the state directly
    const updatedFormData = [...step2FormData];
    // Clone the current sefic array for the specific entry
    const updatedSefic = [...updatedFormData[index].sefic];

    // Remove the entry at the specified detailIndex
    updatedSefic.splice(detailIndex, 1);

    // Update the state by updating the specific entry's sefic array
    updatedFormData[index].sefic = updatedSefic;

    setStep2FormData(updatedFormData);
  };

  const handleRemoveWholeWorkSectionEntry = (index) => {
    // Clone the current step2FormData array to avoid mutating the state directly
    const updatedFormData = [...step2FormData];

    // Remove the entry at the specified index
    updatedFormData.splice(index, 1);

    // Update the state
    setStep2FormData(updatedFormData);
  };

  const handleAddScopeDivisionEntry = (index) => {
    setStep2FormData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].sefic.push({
        number: "",
        name: "",
      });
      return updatedData;
    });
  };

  const formatBidAmount = (amount) => {
    if (amount === null) return ""; // Return an empty string if the amount is null
    return amount.toLocaleString("en-US");
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

  const handleStatusChange = async (event, itemId) => {
    const updatedStatus = event.target.value;
    console.log("Updated Status:", updatedStatus);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/estimating/estimating/${itemId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: updatedStatus, // Update the status
          }),
        }
      );

      console.log("API Response:", response);

      if (response.ok) {
        // Handle success response here
        const updatedStatusMap = { ...statusMap };
        updatedStatusMap[itemId] = updatedStatus;
        setStatusMap(updatedStatusMap);

        // Fetch the "prjct_name" corresponding to the selected "itemId"
        const responseEstimating = await fetch(
          `http://127.0.0.1:8000/api/estimating/estimating/${itemId}/`
        );
        if (responseEstimating.ok) {
          const estimatingData = await responseEstimating.json();
          // Set the "prjct_name" as the value for the "Estimating/Project Name" field
          setSelectedEstimatingID(estimatingData.prjct_name);
        }

        // Check if the updated status is "Won" and open the project modal
        if (updatedStatus === "Won") {
          setshowProjectModal(true);
        }

        // Log a success message to the console
        console.log(`Status updated successfully for item with ID ${itemId}`);
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
      console.error("Error updating status:", error);
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
          <div className="both d-flex flex-column">
            <div className="inputbtn d-flex gap-2 px-5 " data-aos="fade-down">
              <input
                type="text"
                placeholder="Filter by Project Name, Estimator Name, Bidders, Bid Amount, Status"
                value={filter}
                className="mysearchinput p-2"
                onChange={(e) => setFilter(e.target.value)}
              />
              <button className="btn btn-primary" onClick={MovetoURLpage}>
                URL
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                New
              </button>
            </div>
            <div className="d-flex mt-5  justify-content-between align-items-center h-70 ">
              <div>
                <h3 className=" estisum" data-aos="fade-left">
                  Estimating Summary
                </h3>
              </div>
              <div
                className="btn-group btn-group-md bg-info  wonloseDiv"
                data-aos="fade-left"
              >
                <button
                  type="button"
                  className="btn  lp wonb"
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
            </div>
          </div>

          {showProjectModal && (
            <div
              className={`modal-container pt-5 ps-2 ${
                showProjectModal ? "show" : ""
              }`}
            >
              <h4 className="text-center addnewtxt">Add Project Entries</h4>
              <button className="close-btn" onClick={closeModal}></button>
              <div className="purposal-content px-5">
                {/* ************* Implementation of Multistep-Form using Material UI */}
                Project
                <Modal
                  open={showProjectModal}
                  onClose={closeModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <div
                    className={`modal-container pt-5 ps-2 ${
                      showProjectModal ? "show" : ""
                    }`}
                  >
                    <h4 className="text-center addnewtxt">
                      Add Project Entries
                    </h4>{" "}
                    <button className="close-btn" onClick={closeModal}></button>
                    <div className="purposal-content pt-4 px-5">
                      <Stepper activeStep={projectactiveStep} alternativeLabel>
                        {projectSteps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                      <form className="d-flex mt-4 gap-3 flex-column">
                        {projectactiveStep === 0 && (
                          <>
                            <div
                              className="projName mt-3"
                              style={{ width: "100%" }}
                            >
                              <label
                                htmlFor="projectName"
                                className="form-label"
                              >
                                Estimating/Project Name:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="projectName"
                                name="projectName"
                                placeholder="AutoPopulate not shown on frontend"
                                defaultValue={selectedEstimatingID}
                                // value={selectedEstimatingID}
                                // onChange={(e) =>
                                //   setStep0FormData({
                                //     ...step0FormData,
                                //     estimating: e.target.value,
                                //   })
                                // }
                                // readOnly
                              />
                            </div>
                            <div className="bothDiv gap-3">
                              <div className="projName Oneline">
                                <label
                                  htmlFor="projectName"
                                  className="form-label"
                                >
                                  Start Date:
                                </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  id="dateId"
                                  name="dateID"
                                  value={ProjectStep1FormData.start_date}
                                  onChange={(e) =>
                                    setProjectStep1FormData({
                                      ...ProjectStep1FormData,
                                      start_date: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="projName Oneline">
                                <label
                                  htmlFor="projectName"
                                  className="form-label"
                                >
                                  Job Number:
                                </label>
                                <input
                                  type="text"
                                  name="jobNumber"
                                  id="jobNumber"
                                  className="form-control"
                                  value={ProjectStep1FormData.job_num}
                                  onChange={(e) =>
                                    setProjectStep1FormData({
                                      ...ProjectStep1FormData,
                                      job_num: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="bothDiv gap-3">
                              <div className="Oneline">
                                <label
                                  htmlFor="estimatorName"
                                  className="form-label"
                                >
                                  Project Manager:
                                </label>
                                <select
                                  className="form-select"
                                  id="projectManagerID"
                                  name="dateID"
                                  value={ProjectStep1FormData.prjct_mngr}
                                  onChange={(e) =>
                                    setProjectStep1FormData({
                                      ...ProjectStep1FormData,
                                      prjct_mngr: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">
                                    Select Project Manager
                                  </option>
                                  {projectManager &&
                                  projectManager.length > 0 ? (
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
                                <label
                                  htmlFor="location"
                                  className="form-label"
                                >
                                  Foreman:
                                </label>
                                <select
                                  className="form-select"
                                  id="formanID"
                                  name="formanID"
                                  value={ProjectStep1FormData.Forman}
                                  onChange={(e) =>
                                    setProjectStep1FormData({
                                      ...ProjectStep1FormData,
                                      Forman: e.target.value,
                                    })
                                  }
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
                                <label
                                  htmlFor="estimatorName"
                                  className="form-label"
                                >
                                  BIM Modeler:
                                </label>
                                <select
                                  className="form-select"
                                  id="bimOperatorID"
                                  name="bimOperatorID"
                                  value={ProjectStep1FormData.bim_oprtr}
                                  onChange={(e) =>
                                    setProjectStep1FormData({
                                      ...ProjectStep1FormData,
                                      bim_oprtr: e.target.value,
                                    })
                                  }
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
                                <label
                                  htmlFor="location"
                                  className="form-label"
                                >
                                  Project Engineer:
                                </label>
                                <select
                                  className="form-select"
                                  id="ProjectEngineerID"
                                  name="ProjectEngineerID"
                                  value={ProjectStep1FormData.prjct_engnr}
                                  onChange={(e) =>
                                    setProjectStep1FormData({
                                      ...ProjectStep1FormData,
                                      prjct_engnr: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">
                                    Select Project Engineer
                                  </option>

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
                          </>
                        )}
                        {projectactiveStep === 1 && (
                          <>
                            <div className="bothDiv gap-3 mt-4">
                              <div className="Oneline">
                                <label
                                  htmlFor="location"
                                  className="form-label"
                                >
                                  Genral_superintendent:
                                </label>
                                <select
                                  className="form-select"
                                  id="general_superintendent"
                                  name="general_superintendent"
                                  value={
                                    ProjectStep2FormData.general_superintendent
                                  }
                                  onChange={(e) =>
                                    setProjectStep2FormData({
                                      ...ProjectStep2FormData,
                                      general_superintendent: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">
                                    Select Project Engineer
                                  </option>

                                  {GeneralSuperintendent &&
                                  GeneralSuperintendent.length > 0 ? (
                                    GeneralSuperintendent.map((user) => (
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
                                <label
                                  htmlFor="estimatorName"
                                  className="form-label"
                                >
                                  Addendum:
                                </label>
                                <select
                                  className="form-select"
                                  id="addundumID"
                                  name="addundumID"
                                  value={ProjectStep2FormData.addendums}
                                  onChange={(e) =>
                                    setProjectStep2FormData({
                                      ...ProjectStep2FormData,
                                      addendums: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Select Addendum</option>
                                  <option value="Available">Available</option>
                                  <option value="Not Available">
                                    Not Available
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div style={{ width: "100%" }}>
                              <label
                                htmlFor="projectName"
                                className="form-label"
                              >
                                Add project address::
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="projectaddress"
                                name="projectaddress"
                                placeholder="Your project address!"
                                value={ProjectStep2FormData.project_address}
                                onChange={(e) =>
                                  setProjectStep2FormData({
                                    ...ProjectStep2FormData,
                                    project_address: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="bothDiv gap-3">
                              <div className="Oneline">
                                <label
                                  htmlFor="estimatorName"
                                  className="form-label"
                                >
                                  Spec's per our Scope:
                                </label>
                                <select
                                  className="form-select"
                                  id="SpecID"
                                  name="SpecID"
                                  value={ProjectStep2FormData.Spec}
                                  onChange={(e) =>
                                    setProjectStep2FormData({
                                      ...ProjectStep2FormData,
                                      Spec: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Select Spec's</option>
                                  <option value="Available">Available</option>
                                  <option value="Not Available">
                                    Not Available
                                  </option>
                                </select>
                              </div>
                              <div className="Oneline">
                                <label
                                  htmlFor="location"
                                  className="form-label"
                                >
                                  Bid:
                                </label>
                                <select
                                  className="form-select"
                                  id="ProjectBid"
                                  name="ProjectBid"
                                  value={ProjectStep2FormData.bid}
                                  onChange={(e) =>
                                    setProjectStep2FormData({
                                      ...ProjectStep2FormData,
                                      bid: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Select Bid</option>
                                  <option value="Available">Available</option>
                                  <option value="Not Available">
                                    Not Available
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="bothDiv gap-3">
                              <div className="Oneline">
                                <label
                                  htmlFor="location"
                                  className="form-label"
                                >
                                  Drywell Conttrol Joins:
                                </label>
                                <select
                                  className="form-select"
                                  id="Projectdrywell"
                                  name="Projectdrywell"
                                  value={ProjectStep2FormData.drywell}
                                  onChange={(e) =>
                                    setProjectStep2FormData({
                                      ...ProjectStep2FormData,
                                      drywell: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Select Choice</option>
                                  <option value="Submited">Submited</option>
                                  <option value="Working">Working</option>
                                  <option value="Pending">Pending</option>
                                </select>
                              </div>
                              <div className="Oneline">
                                <label
                                  htmlFor="location"
                                  className="form-label"
                                >
                                  WALL TYPE MAPPING:
                                </label>
                                <select
                                  className="form-select"
                                  id="Projectwall_type"
                                  name="Projectwall_type"
                                  value={ProjectStep2FormData.wall_type}
                                  onChange={(e) =>
                                    setProjectStep2FormData({
                                      ...ProjectStep2FormData,
                                      wall_type: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Select Choice</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Working">Working</option>
                                  <option value="Pending">Pending</option>
                                </select>
                              </div>
                            </div>
                          </>
                        )}
                        {projectactiveStep === 2 && (
                          <>
                            <div className="bothDiv gap-3 mt-4">
                              <div className="Oneline">
                                <label
                                  htmlFor="location"
                                  className="form-label"
                                >
                                  FINISH LEVEL MARKUPS:
                                </label>
                                <select
                                  className="form-select"
                                  id="Projectfinish"
                                  name="Projectfinish"
                                  value={ProjectStep3FormData.finish}
                                  onChange={(e) =>
                                    setProjectStep3FormData({
                                      ...ProjectStep3FormData,
                                      finish: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Select Choice</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Working">Working</option>
                                  <option value="Pending">Pending</option>
                                </select>
                              </div>
                              <div className="Oneline">
                                <label
                                  htmlFor="location"
                                  className="form-label"
                                >
                                  PROGRESS TRACKING:
                                </label>
                                <select
                                  className="form-select"
                                  id="Projectprogress"
                                  name="Projectprogress"
                                  // value={selectedPROGRESSTRACKING}
                                  // onChange={handlePROGRESSTRACKINGChange}
                                  value={ProjectStep3FormData.progress}
                                  onChange={(e) =>
                                    setProjectStep3FormData({
                                      ...ProjectStep3FormData,
                                      progress: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Select Choice</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Working">Working</option>
                                  <option value="Pending">Pending</option>
                                </select>
                              </div>
                            </div>
                            <div className="bothDiv gap-3">
                              <div className="Oneline">
                                <label
                                  htmlFor="location"
                                  className="form-label"
                                >
                                  RO-Door:
                                </label>
                                <select
                                  className="form-select"
                                  id="ProjectRo_door"
                                  name="ProjectRo_door"
                                  // value={selectedRO_Door}
                                  // onChange={handleRO_DoorChange}
                                  value={ProjectStep3FormData.ro_door}
                                  onChange={(e) =>
                                    setProjectStep3FormData({
                                      ...ProjectStep3FormData,
                                      ro_door: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Select Choice</option>
                                  <option value="Working">Working</option>
                                  <option value="Submited">Submited</option>
                                  <option value="Pending">Pending</option>
                                  <option value="Done">Done</option>
                                </select>
                              </div>
                              <div className="Oneline">
                                <label
                                  htmlFor="location"
                                  className="form-label"
                                >
                                  RO-Window:
                                </label>
                                <select
                                  className="form-select"
                                  id="ProjectRO-Window"
                                  name="ProjectRO-Window"
                                  // value={selectedRO_Window}
                                  // onChange={handleRO_WindowChange}
                                  value={ProjectStep3FormData.ro_window}
                                  onChange={(e) =>
                                    setProjectStep3FormData({
                                      ...ProjectStep3FormData,
                                      ro_window: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Select Choice</option>
                                  <option value="Working">Working</option>
                                  <option value="Submited">Submited</option>
                                  <option value="Pending">Pending</option>
                                  <option value="Done">Done</option>
                                </select>
                              </div>
                            </div>
                            <div className="bothDiv  gap-3">
                              <div className="Oneline">
                                <label
                                  htmlFor="location"
                                  className="form-label"
                                >
                                  Status:
                                </label>
                                <select
                                  className="form-select"
                                  id="ProjectEngineerID"
                                  // value={selectedProjectStatus}
                                  // onChange={handleProjectStatusChange}
                                  value={ProjectStep3FormData.status}
                                  onChange={(e) =>
                                    setProjectStep3FormData({
                                      ...ProjectStep3FormData,
                                      status: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Select Bid</option>
                                  <option value="C">C</option>
                                  <option value="P">P</option>
                                  <option value="Q">Q</option>
                                  <option value="V">V</option>
                                  <option value="X">X</option>
                                </select>
                              </div>
                              <div className="Oneline">
                                <label
                                  htmlFor="location"
                                  className="form-label"
                                >
                                  Contacts:
                                </label>
                                <select
                                  className="form-select"
                                  id="Projectcontacts"
                                  name="Projectcontacts"
                                  // value={selectedContacts}
                                  // onChange={handleContactsChange}
                                  value={ProjectStep3FormData.contacts}
                                  onChange={(e) =>
                                    setProjectStep3FormData({
                                      ...ProjectStep3FormData,
                                      contacts: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Select Bid</option>
                                  <option value="On build">On build</option>
                                  <option value="Pending">Pending</option>
                                </select>
                              </div>
                            </div>
                            <div style={{ width: "100%" }}>
                              <label
                                htmlFor="projectName"
                                className="form-label"
                              >
                                Substitution:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="projectsubstitution"
                                name="projectsubstitution"
                                placeholder="Write here!"
                                // value={selectedSubstitution}
                                // onChange={handleSubstitutionChange}
                                value={ProjectStep3FormData.substitution}
                                onChange={(e) =>
                                  setProjectStep3FormData({
                                    ...ProjectStep3FormData,
                                    substitution: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </>
                        )}
                        {projectactiveStep === 3 && (
                          <>
                            <div className="mt-4" style={{ width: "100%" }}>
                              <div>
                                <label className="form-label">
                                  <span>Contract</span>
                                </label>
                                <div id="" className="input-group">
                                  <select
                                    className="form-select"
                                    placeholder="Contract"
                                    id="contract"
                                    value={
                                      ProjectStep4FormData.contracts.contract
                                    }
                                    onChange={(e) => {
                                      setProjectStep4FormData({
                                        ...ProjectStep4FormData,
                                        contracts: { contract: e.target.value },
                                      });
                                    }}
                                  >
                                    <option value="">Select Choice</option>
                                    <option value="Fully Executed">
                                      Fully Executed
                                    </option>
                                    <option value="Pending">Pending</option>
                                  </select>
                                  <input
                                    id=""
                                    type="date"
                                    name="contract_date"
                                    className="form-control"
                                    value={
                                      ProjectStep4FormData.contracts
                                        .contract_date
                                    }
                                    onChange={(e) => {
                                      setProjectStep4FormData({
                                        ...ProjectStep4FormData,
                                        contracts: {
                                          ...ProjectStep4FormData.contracts,
                                          contract_date: e.target.value,
                                        },
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div style={{ width: "100%" }}>
                              <div>
                                <label className="form-label">
                                  <span>SCHEDULE_OF_VALUES:</span>
                                </label>
                                <div id="" className="input-group">
                                  <select
                                    className="form-select"
                                    placeholder="Schedule"
                                    id="schedule"
                                    value={
                                      ProjectStep4FormData.schedule_of_values
                                        .schedule
                                    }
                                    onChange={(e) => {
                                      setProjectStep4FormData({
                                        ...ProjectStep4FormData,
                                        schedule_of_values: {
                                          schedule: e.target.value,
                                        },
                                      });
                                    }}
                                  >
                                    <option value="">Select Choice</option>
                                    <option value="Fully Executed">
                                      Fully Executed
                                    </option>
                                    <option value="Pending">Pending</option>
                                  </select>
                                  <input
                                    id=""
                                    type="date"
                                    name="schedule_date"
                                    className="form-control"
                                    value={
                                      ProjectStep4FormData.schedule_of_values
                                        .schedule_date
                                    }
                                    onChange={(e) => {
                                      setProjectStep4FormData({
                                        ...ProjectStep4FormData,
                                        schedule_of_values: {
                                          ...ProjectStep4FormData.schedule_of_values,
                                          schedule_date: e.target.value,
                                        },
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div style={{ width: "100%" }}>
                              <div>
                                <label className="form-label">
                                  <span>INSURANCES:</span>
                                </label>
                                <div id="" className="input-group">
                                  <select
                                    className="form-select"
                                    placeholder="Insurance"
                                    id="insurance"
                                    value={
                                      ProjectStep4FormData.insurancs.insurance
                                    }
                                    onChange={(e) => {
                                      setProjectStep4FormData({
                                        ...ProjectStep4FormData,
                                        insurancs: {
                                          insurance: e.target.value,
                                        },
                                      });
                                    }}
                                  >
                                    <option value="">Select Choice</option>
                                    <option value="Fully Executed">
                                      Fully Executed
                                    </option>
                                    <option value="Pending">Pending</option>
                                  </select>
                                  <input
                                    id=""
                                    type="date"
                                    name="date"
                                    className="form-control"
                                    value={ProjectStep4FormData.insurancs.date}
                                    onChange={(e) => {
                                      setProjectStep4FormData({
                                        ...ProjectStep4FormData,
                                        insurancs: {
                                          ...ProjectStep4FormData.insurancs,
                                          date: e.target.value,
                                        },
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div style={{ width: "100%" }}>
                              <div>
                                <label className="form-label">
                                  <span>BONDS:</span>
                                </label>
                                <div id="" className="input-group">
                                  <select
                                    className="form-select"
                                    placeholder="Bond"
                                    id="bond"
                                    value={ProjectStep4FormData.bond.bond}
                                    onChange={(e) => {
                                      setProjectStep4FormData({
                                        ...ProjectStep4FormData,
                                        bond: { bond: e.target.value },
                                      });
                                    }}
                                  >
                                    <option value="">Select Choice</option>
                                    <option value="Fully Executed">
                                      Fully Executed
                                    </option>
                                    <option value="Pending">Pending</option>
                                  </select>
                                  <input
                                    id=""
                                    type="date"
                                    name="date"
                                    className="form-control"
                                    value={ProjectStep4FormData.bond.date}
                                    onChange={(e) => {
                                      setProjectStep4FormData({
                                        ...ProjectStep4FormData,
                                        bond: {
                                          ...ProjectStep4FormData.bond,
                                          date: e.target.value,
                                        },
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {projectactiveStep === 4 && (
                          <>
                            {ProjectStep5FormData.zliens.map(
                              (zlienData, index) => (
                                <div key={index}>
                                  <div
                                    className="mt-4"
                                    style={{ width: "100%" }}
                                  >
                                    <div>
                                      <label className="form-label">
                                        <span>ZLIENS:</span>
                                      </label>
                                      <div id="" className="input-group">
                                        <select
                                          className="form-select"
                                          placeholder="Contract"
                                          id="ProjectEngineerID"
                                          value={
                                            ProjectStep5FormData.zliens[index]
                                              .zlien
                                          }
                                          onChange={(e) =>
                                            handleFieldChange(
                                              "zlien",
                                              e.target.value,
                                              index,
                                              "zliens"
                                            )
                                          }
                                        >
                                          <option value="">
                                            Select Choice
                                          </option>
                                          <option value="On build">
                                            Fully Executed
                                          </option>
                                          <option value="Pending">
                                            Pending
                                          </option>
                                        </select>
                                        <input
                                          id=""
                                          type="date"
                                          name="date" // Set the name attribute to differentiate
                                          className="form-control"
                                          value={
                                            ProjectStep5FormData.zliens.date
                                          }
                                          onChange={(e) => {
                                            setProjectStep5FormData({
                                              ...ProjectStep5FormData,
                                              date: { date: e.target.value },
                                            });
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div style={{ width: "100%" }}>
                                    <label
                                      htmlFor="projectName"
                                      className="form-label mt-2"
                                    >
                                      <span>SUBMITTALSS</span>
                                    </label>
                                    <div
                                      className="wholespecificationEntry"
                                      // key={index}
                                    >
                                      <div className="ScopofWorkSectionRemove">
                                        <button
                                          type="button"
                                          className="btn btn-danger"
                                          onClick={() => {}}
                                        >
                                          <i className="far">X</i>
                                        </button>
                                      </div>

                                      <div className="mb-2 mt-4">
                                        <label className="form-label">
                                          Add Scop Work Number
                                        </label>
                                        <select
                                          className="form-select"
                                          aria-label="Select Specification"
                                          value={
                                            ProjectStep5FormData.submittals[
                                              index
                                            ].scop_work_number
                                          }
                                          onChange={(e) =>
                                            handleFieldChange(
                                              "scop_work_number",
                                              e.target.value,
                                              index,
                                              "submittals"
                                            )
                                          }
                                        >
                                          <option value="Base Bid Drywall/Framing">
                                            All scope numbers will here
                                          </option>
                                        </select>
                                      </div>
                                      <div className="bothDiv  gap-3">
                                        <div className="Oneline mb-4">
                                          <label
                                            htmlFor="location"
                                            className="form-label"
                                          >
                                            Status
                                          </label>
                                          <select
                                            className="form-select"
                                            id="ProjectEngineerID"
                                            value={
                                              ProjectStep5FormData.submittals
                                                .status
                                            }
                                            onChange={(e) => {
                                              setProjectStep5FormData({
                                                ...ProjectStep5FormData,
                                                status: {
                                                  status: e.target.value,
                                                },
                                              });
                                            }}
                                          >
                                            <option value="">
                                              Select Choice
                                            </option>
                                            <option value="On build">
                                              Approved
                                            </option>
                                            <option value="Pending">
                                              Pending
                                            </option>
                                          </select>
                                        </div>

                                        <div className="Oneline">
                                          <label
                                            htmlFor="location"
                                            className="form-label"
                                          >
                                            Date:
                                          </label>
                                          <input
                                            type="date"
                                            className="form-control"
                                            id="dueDate"
                                            value={
                                              ProjectStep5FormData.submittals
                                                .date
                                            }
                                            onChange={(e) => {
                                              setProjectStep5FormData({
                                                ...ProjectStep5FormData,
                                                date: { date: e.target.value },
                                              });
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    {/* ))} */}

                                    <button
                                      type="button"
                                      className="btn btn-success"
                                      // onClick={handleAddEntry}
                                    >
                                      Add SUBMITTALSS
                                    </button>
                                  </div>
                                </div>
                              )
                            )}
                          </>
                        )}

                        {projectactiveStep === 5 && (
                          <>
                            <div className=" mt-3" style={{ width: "100%" }}>
                              <label
                                htmlFor="projectName"
                                className="form-label mt-2"
                              >
                                <span>SHOP DRAWINGS</span>
                              </label>
                              {/* {step2FormData.map((entry, index) => ( */}
                              <div
                                className="wholespecificationEntry"
                                // key={index}
                              >
                                <div className="ScopofWorkSectionRemove">
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    // onClick={() =>
                                    //   handleRemoveWholeWorkSectionEntry(index)
                                    // }
                                  >
                                    <i className="far">X</i>
                                  </button>
                                </div>
                                <div className="mt-5">
                                  <label
                                    // htmlFor={`specificBudget-${index}`}
                                    className="form-label"
                                  >
                                    Add Proposal:
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    // id={`specificBudget-${index}`}
                                    value=""
                                    onChange={() => {}}
                                  />
                                </div>
                                <div className="mb-2 mt-2">
                                  <label
                                    // htmlFor={`specificName-${index}`}
                                    className="form-label"
                                  >
                                    Add scope of Work
                                  </label>
                                  <select
                                    className="form-select"
                                    aria-label="Select Specification"
                                    // value={entry.specific_name || ""}
                                    // onChange={(e) =>
                                    //   handleEntryChange(
                                    //     index,
                                    //     "specific_name",
                                    //     e.target.value
                                    //   )
                                    // }
                                    value=""
                                    onChange={() => {}}
                                  >
                                    <option value="Base Bid Drywall/Framing">
                                      All scope numbers wil here
                                    </option>
                                  </select>
                                </div>
                                <div className="bothDiv  gap-3">
                                  <div className="Oneline mb-4">
                                    <label
                                      htmlFor="location"
                                      className="form-label"
                                    >
                                      Submittals:
                                    </label>
                                    <select
                                      className="form-select"
                                      id="ProjectEngineerID"
                                      // value={selectedProjectEngineer}
                                      // onChange={handleProjectEngineerChange}
                                      value=""
                                      onChange={() => {}}
                                    >
                                      <option value="">Select Choice</option>
                                      <option value="On build">Approved</option>
                                      <option value="Pending">Pending</option>
                                    </select>
                                  </div>

                                  <div className="Oneline">
                                    <label
                                      htmlFor="location"
                                      className="form-label"
                                    >
                                      Status:
                                    </label>
                                    <input
                                      type="date"
                                      className="form-control"
                                      id="dueDate"
                                      value=""
                                      onChange={() => {}}
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* ))} */}

                              <button
                                type="button"
                                className="btn btn-success"
                                // onClick={handleAddEntry}
                              >
                                Add SHOP DRAWINGS
                              </button>
                            </div>
                            <div style={{ width: "100%" }}>
                              <label
                                htmlFor="projectName"
                                className="form-label mt-2"
                              >
                                <span>SAFITYS</span>
                              </label>
                              {/* {step2FormData.map((entry, index) => ( */}
                              <div
                                className="wholespecificationEntry"
                                // key={index}
                              >
                                <div className="ScopofWorkSectionRemove">
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    // onClick={() =>
                                    //   handleRemoveWholeWorkSectionEntry(index)
                                    // }
                                  >
                                    <i className="far">X</i>
                                  </button>
                                </div>
                                <div className="mt-5">
                                  <label
                                    // htmlFor={`specificBudget-${index}`}
                                    className="form-label"
                                  >
                                    Add Proposal:
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    // id={`specificBudget-${index}`}
                                    value=""
                                  />
                                </div>
                                <div className="mb-2 mt-2">
                                  <label
                                    // htmlFor={`specificName-${index}`}
                                    className="form-label"
                                  >
                                    Add scope of Work
                                  </label>
                                  <select
                                    className="form-select"
                                    aria-label="Select Specification"
                                    // value={entry.specific_name || ""}
                                    // onChange={(e) =>
                                    //   handleEntryChange(
                                    //     index,
                                    //     "specific_name",
                                    //     e.target.value
                                    //   )
                                    // }

                                    value=""
                                    onChange={() => {}}
                                  >
                                    <option value="Base Bid Drywall/Framing">
                                      All scope numbers wil here
                                    </option>
                                  </select>
                                </div>
                                <div className="bothDiv  gap-3">
                                  <div className="Oneline mb-4">
                                    <label
                                      htmlFor="location"
                                      className="form-label"
                                    >
                                      Submittals:
                                    </label>
                                    <select
                                      className="form-select"
                                      id="ProjectEngineerID"
                                      // value={selectedProjectEngineer}
                                      // onChange={handleProjectEngineerChange}
                                      value=""
                                      onChange={() => {}}
                                    >
                                      <option value="">Select Choice</option>
                                      <option value="On build">Approved</option>
                                      <option value="Pending">Pending</option>
                                    </select>
                                  </div>

                                  <div className="Oneline">
                                    <label
                                      htmlFor="location"
                                      className="form-label"
                                    >
                                      Status:
                                    </label>
                                    <input
                                      type="date"
                                      className="form-control"
                                      id="dueDate"
                                      value=""
                                      onChange={() => {}}
                                    />
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <label htmlFor="comment">Comment:</label>
                                  <textarea
                                    id="comment"
                                    style={{
                                      width: "100%",
                                      backgroundColor: "white",
                                      color: "black",
                                      padding: "10px",
                                    }}
                                    rows="2"
                                    placeholder=" Write your comment here !"
                                  ></textarea>
                                </div>
                              </div>
                              {/* ))} */}

                              <button
                                type="button"
                                className="btn btn-success"
                                // onClick={handleAddEntry}
                              >
                                Add SAFITYs
                              </button>
                            </div>
                            <div style={{ width: "100%" }}>
                              <label
                                htmlFor="projectName"
                                className="form-label mt-2"
                              >
                                <span>Schedules</span>
                              </label>
                              {/* {step2FormData.map((entry, index) => ( */}
                              <div
                                className="wholespecificationEntry"
                                // key={index}
                              >
                                <div className="mb-2 mt-3">
                                  <label
                                    // htmlFor={`specificDetails-${index}`}
                                    className="form-label"
                                  >
                                    Scope of work divisions
                                  </label>
                                  {/* {Array.isArray(entry.sefic) &&
                                      entry.sefic.map((detail, detailIndex) => ( */}
                                  <div
                                    // key={detailIndex}
                                    className="input-group myrowInputgrouup"
                                  >
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Scope Of Work Number"
                                      // value={detail.number}
                                      // onChange={(e) =>
                                      //   handleScopeDivisionInputChange(
                                      //     index,
                                      //     detailIndex,
                                      //     "number",
                                      //     e.target.value
                                      //   )
                                      // }
                                      value=""
                                      onChange={() => {}}
                                    />
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Scope Of Work Description"
                                      // value={detail.name}
                                      // onChange={(e) =>
                                      //   handleScopeDivisionInputChange(
                                      //     index,
                                      //     detailIndex,
                                      //     "name",
                                      //     e.target.value
                                      //   )
                                      // }
                                      value=""
                                      onChange={() => {}}
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      // onClick={() =>
                                      //   handleRemoveScopeDivisionEntry(
                                      //     index,
                                      //     detailIndex
                                      //   )
                                      // }
                                    >
                                      <i className="far">X</i>
                                    </button>
                                  </div>
                                  {/* ))} */}
                                  <button
                                    type="button"
                                    className="btn btn-success bk"
                                    // onClick={() =>
                                    //   handleAddScopeDivisionEntry(index)
                                    // }
                                  >
                                    <i className="fa-regular icon fa-plus"></i>
                                  </button>
                                </div>
                              </div>
                              {/* ))} */}

                              <button
                                type="button"
                                className="btn btn-success"
                                // onClick={handleAddEntry}
                              >
                                Add Schedule
                              </button>
                            </div>
                            <div style={{ width: "100%" }}>
                              <label
                                htmlFor="projectName"
                                className="form-label mt-2"
                              >
                                <span>SUB_ CONTRACTORSS</span>
                              </label>
                              {/* {step2FormData.map((entry, index) => ( */}
                              <div
                                className="wholespecificationEntry"
                                // key={index}
                              >
                                <div className="mb-2 mt-3">
                                  <label
                                    // htmlFor={`specificDetails-${index}`}
                                    className="form-label"
                                  >
                                    Scope of work divisions
                                  </label>
                                  {/* {Array.isArray(entry.sefic) &&
                                      entry.sefic.map((detail, detailIndex) => ( */}
                                  <div
                                    // key={detailIndex}
                                    className="input-group myrowInputgrouup"
                                  >
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Scope Of Work Number"
                                      // value={detail.number}
                                      // onChange={(e) =>
                                      //   handleScopeDivisionInputChange(
                                      //     index,
                                      //     detailIndex,
                                      //     "number",
                                      //     e.target.value
                                      //   )
                                      // }
                                      value=""
                                      onChange={() => {}}
                                    />
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Scope Of Work Description"
                                      // value={detail.name}
                                      // onChange={(e) =>
                                      //   handleScopeDivisionInputChange(
                                      //     index,
                                      //     detailIndex,
                                      //     "name",
                                      //     e.target.value
                                      //   )
                                      // }
                                      value=""
                                      onChange={() => {}}
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      // onClick={() =>
                                      //   handleRemoveScopeDivisionEntry(
                                      //     index,
                                      //     detailIndex
                                      //   )
                                      // }
                                    >
                                      <i className="far">X</i>
                                    </button>
                                  </div>
                                  {/* ))} */}
                                  <div className="mt-2">
                                    <label htmlFor="comment">Comment:</label>
                                    <textarea
                                      id="comment"
                                      style={{
                                        width: "100%",
                                        backgroundColor: "white",
                                        color: "black",
                                        padding: "10px",
                                      }}
                                      rows="2"
                                      placeholder=" Write your comment here !"
                                    ></textarea>
                                  </div>
                                  <button
                                    type="button"
                                    className="btn btn-success bk"
                                    // onClick={() =>
                                    //   handleAddScopeDivisionEntry(index)
                                    // }
                                  >
                                    <i className="fa-regular icon fa-plus"></i>
                                  </button>
                                </div>
                              </div>
                              {/* ))} */}
                            </div>
                          </>
                        )}
                        {projectactiveStep === 6 && (
                          <>
                            <div className="mt-4" style={{ width: "100%" }}>
                              <label
                                htmlFor="projectName"
                                className="form-label mt-2"
                              >
                                <span>LABOR RATES</span>
                              </label>
                              {/* {step2FormData.map((entry, index) => ( */}
                              <div
                                className="wholespecificationEntry"
                                // key={index}
                              >
                                <div className="mb-2 mt-3">
                                  <label
                                    // htmlFor={`specificDetails-${index}`}
                                    className="form-label"
                                  >
                                    Scope of work divisions
                                  </label>
                                  {/* {Array.isArray(entry.sefic) &&
                                      entry.sefic.map((detail, detailIndex) => ( */}
                                  <div
                                    // key={detailIndex}
                                    className="input-group myrowInputgrouup"
                                  >
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Scope Of Work Number"
                                      // value={detail.number}
                                      // onChange={(e) =>
                                      //   handleScopeDivisionInputChange(
                                      //     index,
                                      //     detailIndex,
                                      //     "number",
                                      //     e.target.value
                                      //   )
                                      // }
                                      onChange={() => {}}
                                    />
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Scope Of Work Description"
                                      // value={detail.name}
                                      // onChange={(e) =>
                                      //   handleScopeDivisionInputChange(
                                      //     index,
                                      //     detailIndex,
                                      //     "name",
                                      //     e.target.value
                                      //   )
                                      // }
                                      onChange={() => {}}
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      // onClick={() =>
                                      //   handleRemoveScopeDivisionEntry(
                                      //     index,
                                      //     detailIndex
                                      //   )
                                      // }
                                    >
                                      <i className="far">X</i>
                                    </button>
                                  </div>
                                  {/* ))} */}
                                  <div className="mt-2">
                                    <label htmlFor="comment">Comment:</label>
                                    <textarea
                                      id="comment"
                                      style={{
                                        width: "100%",
                                        backgroundColor: "white",
                                        color: "black",
                                        padding: "10px",
                                      }}
                                      rows="2"
                                      placeholder=" Write your comment here !"
                                    ></textarea>
                                  </div>
                                  <button
                                    type="button"
                                    className="btn btn-success bk"
                                    // onClick={() =>
                                    //   handleAddScopeDivisionEntry(index)
                                    // }
                                  >
                                    <i className="fa-regular icon fa-plus"></i>
                                  </button>
                                </div>
                              </div>
                              {/* ))} */}
                            </div>
                            <div style={{ width: "100%" }}>
                              <label
                                htmlFor="projectName"
                                className="form-label mt-2"
                              >
                                <span>BILLINGS</span>
                              </label>
                              {/* {step2FormData.map((entry, index) => ( */}
                              <div
                                className="wholespecificationEntry"
                                // key={index}
                              >
                                <div className="mb-2 mt-3">
                                  {/* <label
                      htmlFor={`specificDetails-${index}`}
                      className="form-label"
                    >
                      Scope of work divisions
                    </label> */}
                                  {/* {Array.isArray(entry.sefic) &&
                                      entry.sefic.map((detail, detailIndex) => ( */}
                                  <div
                                    // key={detailIndex}
                                    className="input-group myrowInputgrouup"
                                  >
                                    <input
                                      type="date"
                                      className="form-control"
                                      placeholder="Due Date"
                                      value=""
                                      onChange={() => {}}
                                    />
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Add Reduction:"
                                      value=""
                                      onChange={() => {}}
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      // onClick={() =>
                                      //   handleRemoveScopeDivisionEntry(
                                      //     index,
                                      //     detailIndex
                                      //   )
                                      // }
                                    >
                                      <i className="far">X</i>
                                    </button>
                                  </div>
                                  {/* ))} */}

                                  <button
                                    type="button"
                                    className="btn btn-success bk"
                                    // onClick={() =>
                                    //   handleAddScopeDivisionEntry(index)
                                    // }
                                  >
                                    <i className="fa-regular icon fa-plus"></i>
                                  </button>
                                </div>
                              </div>
                              {/* ))} */}
                            </div>
                            <div style={{ width: "100%" }}>
                              <label
                                htmlFor="projectName"
                                className="form-label mt-2"
                              >
                                <span>SOVS</span>
                              </label>
                              {/* {step2FormData.map((entry, index) => ( */}
                              <div
                                className="wholespecificationEntry"
                                // key={index}
                              >
                                <div className="mb-2 mt-3">
                                  {/* <label
                      htmlFor={`specificDetails-${index}`}
                      className="form-label"
                    >
                      Scope of work divisions
                    </label> */}
                                  {/* {Array.isArray(entry.sefic) &&
                                      entry.sefic.map((detail, detailIndex) => ( */}
                                  <div
                                    // key={detailIndex}
                                    className="input-group myrowInputgrouup"
                                  >
                                    <select
                                      className="form-select"
                                      aria-label="Select Specification"
                                      // value={entry.specific_name || ""}
                                      onChange={() => {}}
                                    >
                                      <option value="">Select Choice</option>
                                      <option value="Approved">Approved</option>
                                      <option value="Pending">Pending</option>
                                      <option value="Custom">Custom</option>
                                    </select>
                                    <input
                                      type="date"
                                      className="form-control"
                                      placeholder="Due Date"
                                      value=""
                                      onChange={() => {}}
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      // onClick={() =>
                                      //   handleRemoveScopeDivisionEntry(
                                      //     index,
                                      //     detailIndex
                                      //   )
                                      // }
                                    >
                                      <i className="far">X</i>
                                    </button>
                                  </div>
                                  {/* ))} */}

                                  <button
                                    type="button"
                                    className="btn btn-success bk"
                                    // onClick={() =>
                                    //   handleAddScopeDivisionEntry(index)
                                    // }
                                  >
                                    <i className="fa-regular icon fa-plus"></i>
                                  </button>
                                </div>
                              </div>
                              {/* ))} */}
                            </div>
                          </>
                        )}
                        {projectactiveStep === 7 && (
                          <div className=" mt-3">
                            <div style={{ width: "100%" }}>
                              <label
                                htmlFor="projectName"
                                className="form-label mt-2"
                              >
                                <span>HD S_SYSTEMS</span>
                              </label>
                              {/* {step2FormData.map((entry, index) => ( */}
                              <div
                                className="wholespecificationEntry"
                                // key={index}
                              >
                                <div className="mb-2 mt-3">
                                  <label
                                    // htmlFor={`specificDetails-${index}`}
                                    className="form-label"
                                  >
                                    Scope of work divisions
                                  </label>
                                  {/* {Array.isArray(entry.sefic) &&
                                      entry.sefic.map((detail, detailIndex) => ( */}
                                  <div
                                    // key={detailIndex}
                                    className="input-group myrowInputgrouup"
                                  >
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Scope Of Work Number"
                                      // value={detail.number}
                                      // onChange={(e) =>
                                      //   handleScopeDivisionInputChange(
                                      //     index,
                                      //     detailIndex,
                                      //     "number",
                                      //     e.target.value
                                      //   )
                                      // }
                                      onChange={() => {}}
                                    />
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Scope Of Work Description"
                                      // value={detail.name}
                                      // onChange={(e) =>
                                      //   handleScopeDivisionInputChange(
                                      //     index,
                                      //     detailIndex,
                                      //     "name",
                                      //     e.target.value
                                      //   )
                                      // }
                                      onChange={() => {}}
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      // onClick={() =>
                                      //   handleRemoveScopeDivisionEntry(
                                      //     index,
                                      //     detailIndex
                                      //   )
                                      // }
                                    >
                                      <i className="far">X</i>
                                    </button>
                                  </div>
                                  {/* ))} */}
                                  <div className="mt-2">
                                    <label htmlFor="comment">Comment:</label>
                                    <textarea
                                      id="comment"
                                      style={{
                                        width: "100%",
                                        backgroundColor: "white",
                                        color: "black",
                                        padding: "10px",
                                      }}
                                      rows="2"
                                      placeholder=" Write your comment here !"
                                    ></textarea>
                                  </div>
                                  <button
                                    type="button"
                                    className="btn btn-success bk"
                                    // onClick={() =>
                                    //   handleAddScopeDivisionEntry(index)
                                    // }
                                  >
                                    <i className="fa-regular icon fa-plus"></i>
                                  </button>
                                </div>
                              </div>
                              {/* ))} */}
                            </div>

                            <div style={{ width: "100%" }}>
                              <label
                                htmlFor="projectName"
                                className="form-label mt-2"
                              >
                                <span>ON BUILDS</span>
                              </label>
                              {/* {step2FormData.map((entry, index) => ( */}
                              <div
                                className="wholespecificationEntry"
                                // key={index}
                              >
                                <div className="mb-2 mt-3">
                                  <label
                                    // htmlFor={`specificDetails-${index}`}
                                    className="form-label"
                                  >
                                    Scope of work divisions
                                  </label>
                                  {/* {Array.isArray(entry.sefic) &&
                                      entry.sefic.map((detail, detailIndex) => ( */}
                                  <div
                                    // key={detailIndex}
                                    className="input-group myrowInputgrouup"
                                  >
                                    <select
                                      className="form-select"
                                      aria-label="Select Specification"
                                      // value={entry.specific_name || ""}
                                      onChange={() => {}}
                                    >
                                      <option value="">Select Choice</option>
                                      <option value="Approved">
                                        Bid Proposal
                                      </option>
                                      <option value="Pending">Specs</option>
                                      <option value="Custom">Contract</option>
                                      <option value="Approved">
                                        Submitile
                                      </option>
                                      <option value="Pending">Safety</option>
                                      <option value="Custom">
                                        Shop Drawing
                                      </option>
                                      <option value="Custom">Budget</option>
                                    </select>
                                    <select
                                      className="form-select"
                                      aria-label="Select Specification"
                                      // value={entry.specific_name || ""}
                                      onChange={() => {}}
                                    >
                                      <option value="">Select Choice</option>
                                      <option value="Approved">Upload</option>
                                      <option value="Pending">Pending</option>
                                    </select>

                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      // onClick={() =>
                                      //   handleRemoveScopeDivisionEntry(
                                      //     index,
                                      //     detailIndex
                                      //   )
                                      // }
                                    >
                                      <i className="far">X</i>
                                    </button>
                                  </div>
                                  {/* ))} */}

                                  <button
                                    type="button"
                                    className="btn btn-success bk"
                                    // onClick={() =>
                                    //   handleAddScopeDivisionEntry(index)
                                    // }
                                  >
                                    <i className="fa-regular icon fa-plus"></i>
                                  </button>
                                </div>
                              </div>
                              {/* ))} */}
                            </div>
                            <div style={{ width: "100%" }}>
                              <label
                                htmlFor="projectName"
                                className="form-label mt-2"
                              >
                                <span>BUGETS</span>
                              </label>
                              {/* {step2FormData.map((entry, index) => ( */}
                              <div
                                className="wholespecificationEntry"
                                // key={index}
                              >
                                <div className="mb-2 mt-3">
                                  <label
                                    // htmlFor={`specificDetails-${index}`}
                                    className="form-label"
                                  >
                                    Scope of work divisions
                                  </label>
                                  {/* {Array.isArray(entry.sefic) &&
                                      entry.sefic.map((detail, detailIndex) => ( */}
                                  <div
                                    // key={detailIndex}
                                    className="input-group myrowInputgrouup"
                                  >
                                    <select
                                      className="form-select"
                                      aria-label="Select Specification"
                                      // value={entry.specific_name || ""}
                                      onChange={() => {}}
                                    >
                                      <option value="">Select Choice</option>
                                      <option value="Approved">Done</option>
                                      <option value="Pending">Pending</option>
                                      <option value="Custom">Custom</option>
                                    </select>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Comment"
                                      value=""
                                      onChange={() => {}}
                                    />

                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      // onClick={() =>
                                      //   handleRemoveScopeDivisionEntry(
                                      //     index,
                                      //     detailIndex
                                      //   )
                                      // }
                                    >
                                      <i className="far">X</i>
                                    </button>
                                  </div>
                                  {/* ))} */}

                                  <button
                                    type="button"
                                    className="btn btn-success bk"
                                    // onClick={() =>
                                    //   handleAddScopeDivisionEntry(index)
                                    // }
                                  >
                                    <i className="fa-regular icon fa-plus"></i>
                                  </button>
                                </div>
                              </div>
                              {/* ))} */}
                            </div>
                          </div>
                        )}

                        <div className="mt-1">
                          {projectactiveStep < 7 ? (
                            <div className="parentbtnsdiv">
                              <div className="spacebtns">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  disabled={projectactiveStep === 0} // Disable the button when activeStep is 0
                                  onClick={handleprojectBack}
                                >
                                  Back
                                </Button>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={handleprojectNext}
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
                                  onClick={handleprojectBack}
                                >
                                  Back
                                </Button>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  type="button"
                                  onClick={handleProjectFormSubmit}
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

          <ParticlesAnimation numberOfCircles={numberOfCircles} />
          <div
            className="table-responsive proposalTable mt-2"
            data-aos="fade-up"
          >
            <table
              className="table table-bordered table-hover"
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
                      style={{ minWidth: "60px" }}
                    >
                      {item.due_date ? item.due_date : "No Date"}
                    </td>
                    <td
                      className="mytd centered-td"
                      style={{ maxWidth: "50px" }}
                    >
                      {item.time} <strong>{item.timezone}</strong>
                    </td>
                    <td className="mytd myproject centered-td">
                      {item.prjct_name ? item.prjct_name : "No Project"}
                    </td>
                    <td
                      className="mytd centered-td"
                      style={{ minWidth: "70px" }}
                    >
                      <select
                        className="dropUpdation"
                        id="estimatorName"
                        onChange={(event) => handleAreaChange(event, item.id)}
                        value={AreaChoice[item.id] || item.location}
                      >
                        <option
                          value={item.location ? item.location : "No Area"}
                        >
                          {item.location ? item.location : "No Area"}
                        </option>
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
                      style={{ minWidth: "175px" }}
                    >
                      <select
                        className="dropUpdation"
                        id="estimatorName"
                        onChange={(event) =>
                          handleEstimatorChange(event, item.id)
                        }
                        value={estimatorchoice[item.id] || item.estimator}
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
                    <td
                      className="mytd centered-td "
                      style={{ minWidth: "50px" }}
                      onChange={(event) => handleUpdationChange(event, item.id)}
                      value={statusMap[item.id] || item.status}
                    >
                      <select
                        className="dropUpdation "
                        id="estimatorName"
                        onChange={(event) => handleStatusChange(event, item.id)}
                        value={statusMap[item.id] || item.status}
                      >
                        <option value={item.status}>{item.status}</option>
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
                        <div
                          type="button"
                          className="pb-2"
                          onClick={() => {
                            setItemId(item.id);
                            setSelectedEstimatingID(item.prjct_name);
                            setSelectedEstimator(item.estimator);
                            setSelectedBidder(item.bidder);
                            setSelectedCompany(item.company);
                            setselectedStatus(item.status);
                            setSelecteddueDate(item.due_date);
                            setSelectedstart_date(item.start_date);
                            setSelectedbidder_address(item.bidder_address);
                            setSelectedTimeforUpdate(item.time);
                            setSelectedTimeZone(item.timezone);
                            setSelectedLocation(item.location);
                            setshowEstimatingEditModal(true);
                          }}
                        >
                          <i class="fa-solid fa-pen-to-square size11 edit "></i>
                        </div>

                        <div
                          type="button"
                          className="pb-2"
                          onClick={() => {
                            console.log(item.prjct_name);
                            setItemId(item.id);

                            setStep0FormData({
                              ...step0FormData,
                              estimating: item.id,
                            });
                            setSelectedEstimatingID(item.id);
                            setPurposalModal(true);
                          }}
                        >
                          <i class="fa-solid fa-square-plus size11"></i>
                        </div>
                        {/* <div
                          className="dropbtns"
                          onClick={() => {
                            console.log(item.prjct_name);
                            setItemId(item.id);
                            setStep0FormData({
                              ...step0FormData,
                              estimating: item.id,
                            });
                            setSelectedEstimatingID(item.prjct_name);
                            setshowProjectModal(true);
                          }}
                        >
                          <i class="fa-solid fa-tarp"></i>
                        </div> */}

                        <div
                          type="button"
                          onClick={() => {
                            const encodedProjectName = encodeURIComponent(
                              item.id
                            );
                            navigate(
                              `/homepage/rawproposal/${encodedProjectName}`
                            );
                          }}
                        >
                          <i class="fa-solid fa-eye size11"></i>
                        </div>
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
          <h4 className="text-center addnewtxt">Estimating</h4>
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

      {showEstimatingEditModal && (
        <div
          className={`modal-container bg-white pt-5 ps-2 ${
            showEstimatingEditModal ? "show" : ""
          }`}
        >
          <h4 className="text-center addnewtxt">Edit Estimating</h4>
          <button className="close-btn" onClick={closeModal}></button>
          <div className="modal-content px-5">
            <form className="MyForm">
              <div className="bothDiv gap-2 mt-5">
                <div className="Oneline">
                  <label htmlFor="dueDate" className="form-label">
                    Start Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    value={formattedStartDate ? formattedStartDate : "No Date"} // Update selectedstart_date
                    onChange={(e) => setSelectedstart_date(e.target.value)}
                  />
                </div>

                <div className="Oneline">
                  <label htmlFor="companyName" className="form-label">
                    Company
                  </label>
                  <select
                    className="form-select"
                    id="location"
                    value={selectedCompany} // Update location or define it in your state
                    onChange={(e) => setSelectedCompany(e.target.value)}
                  >
                    <option
                      value={selectedCompany ? selectedCompany : "No Company"}
                    >
                      {selectedCompany ? selectedCompany : "No Company"}
                    </option>
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
                  value={
                    selectedEstimatingID
                      ? selectedEstimatingID
                      : "No Project Name"
                  } // Update selectedEstimatingID
                  onChange={(e) => setSelectedEstimatingID(e.target.value)}
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
                    value={selectedEstimator} // Use the state value
                    onChange={(e) => setSelectedEstimator(e.target.value)}
                  >
                    {/* Provide an initial option with the selectedEstimator value */}
                    <option
                      value={
                        selectedEstimator ? selectedEstimator : "No Estimator"
                      }
                    >
                      {selectedEstimator ? selectedEstimator : "No Estimator"}
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
                </div>

                <div className="Oneline">
                  <label htmlFor="location" className="form-label">
                    Location:
                  </label>
                  <select
                    className="form-select"
                    id="location"
                    value={selectedLocation} // Update location or define it in your state
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option
                      value={
                        selectedLocation ? selectedLocation : "No Location"
                      }
                    >
                      {selectedLocation ? selectedLocation : "No Location"}
                    </option>
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
                    value={formattedDueDate} // Update selecteddueDate
                    onChange={(e) => setSelecteddueDate(e.target.value)}
                  />
                </div>
                <div className="Oneline timefield">
                  <label htmlFor="time" className="form-label">
                    Time:
                  </label>
                  <div className="d-flex bg-white">
                    <input
                      type="time"
                      value={formattedTimeEdit}
                      onChange={(e) => setSelectedTimeforUpdate(e.target.value)}
                    />

                    <select
                      value={SelectedTimeZone} // Update timezone or define it in your state
                      onChange={(e) => setSelectedTimeZone(e.target.value)}
                      className="selectpicker"
                    >
                      <option value={SelectedTimeZone}>
                        {SelectedTimeZone}
                      </option>
                      <option value="PDT">PDT</option>
                      <option value="CT">CT</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="bidderName" className="form-label">
                  Bidder Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="No Bidder Here !"
                  id="bidderName"
                  value={selectedBidder} // Update selectedBidder
                  onChange={(e) => setSelectedBidder(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="bidderDetails" className="form-label">
                  Bidder Details:
                </label>
                <textarea
                  name="#"
                  className="form-control"
                  id="bidderDetails"
                  placeholder="No Address Here !"
                  cols="10"
                  rows="10"
                  value={selectedbidder_address}
                  onChange={(e) => setSelectedbidder_address(e.target.value)}
                ></textarea>
              </div>

              <button
                type="button"
                onClick={(event) => handleEstimatingEditing(event, itemId)} // Pass item.id
                className="btn btn-submit mt-3 mb-4"
              >
                Update
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
                          <strong>Scope of work</strong>
                        </label>
                        {step2FormData.map((entry, index) => (
                          <div className="wholespecificationEntry" key={index}>
                            <div className="ScopofWorkSectionRemove">
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() =>
                                  handleRemoveWholeWorkSectionEntry(index)
                                }
                              >
                                <i className="far">X</i>
                              </button>
                            </div>
                            <div className="mb-2 mt-5">
                              <label
                                htmlFor={`specificName-${index}`}
                                className="form-label"
                              >
                                Scope of work name
                              </label>
                              <select
                                className="form-select"
                                aria-label="Select Specification"
                                value={entry.specific_name || ""}
                                onChange={(e) =>
                                  handleEntryChange(
                                    index,
                                    "specific_name",
                                    e.target.value
                                  )
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
                                htmlFor={`specificBudget-${index}`}
                                className="form-label"
                              >
                                Scope of work amount
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`specificBudget-${index}`}
                                value={formatNumberWithCommas(entry.budget)}
                                onChange={(e) =>
                                  handleEntryChange(
                                    index,
                                    "budget",
                                    e.target.value
                                  )
                                }
                                onBlur={(e) =>
                                  handleEntryChange(
                                    index,
                                    "budget",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="mb-2 mt-3">
                              <label
                                htmlFor={`specificDetails-${index}`}
                                className="form-label"
                              >
                                Scope of work divisions
                              </label>
                              {Array.isArray(entry.sefic) &&
                                entry.sefic.map((detail, detailIndex) => (
                                  <div
                                    key={detailIndex}
                                    className="input-group myrowInputgrouup"
                                  >
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Scope Of Work Number"
                                      value={detail.number}
                                      onChange={(e) =>
                                        handleScopeDivisionInputChange(
                                          index,
                                          detailIndex,
                                          "number",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Scope Of Work Description"
                                      value={detail.name}
                                      onChange={(e) =>
                                        handleScopeDivisionInputChange(
                                          index,
                                          detailIndex,
                                          "name",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() =>
                                        handleRemoveScopeDivisionEntry(
                                          index,
                                          detailIndex
                                        )
                                      }
                                    >
                                      <i className="far">X</i>
                                    </button>
                                  </div>
                                ))}
                              <button
                                type="button"
                                className="btn btn-success bk"
                                onClick={() =>
                                  handleAddScopeDivisionEntry(index)
                                }
                              >
                                <i className="fa-regular icon fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          className="btn btn-success"
                          // onClick={handleAddEntry}
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
