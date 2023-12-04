import { useState, useEffect, useRef } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
// import "aos/dist/aos.css";
import ParticlesAnimation from "../../components/particleAnimation/ParticlesAnimation";
import { updateStatus } from "../../store/EstimatingSlice";

const Estimator = (props) => {
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [showEstimatingEditModal, setshowEstimatingEditModal] = useState(false); // State to control modal visibility
  const [purposalModal, setPurposalModal] = useState(false); // State to control modal visibility
  const [showProjectModal, setshowProjectModal] = useState(false); // State to control modal visibility
  const [dueDate, setDueDate] = useState("");
  const [projectName, setProjectName] = useState("");
  const [estimatorName, setEstimatorName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  // const [bidAmount, setBidAmount] = useState("");
  const [mycompany, setMyCompany] = useState(""); // Updated to store company name as a string
  const [showPopup, setShowPopup] = useState(false);

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

  const [fetchcompanyName, setFetchedCompanyName] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/estimating/company/")
      .then((response) => response.data)
      .then((data) => {
        const activeCompanies = data.filter((company) => company.is_active);
        // console.log(activeCompanies);
        setFetchedCompanyName(activeCompanies);
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

  const [selectedEstimatingID, setSelectedEstimatingID] = useState(null);

  const [selectedProposalID, setSelectedProposalID] = useState(null);
  const [selectedProposalNumbers, setSelectedProposalNumbers] = useState([]);

  const [selectedNumber, setSelectedNumber] = useState("");

  useEffect(() => {
    const fetchAndFilterProposals = async () => {
      if (selectedEstimatingID === null) {
        console.log("Estimating id null");
        return;
      }
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/estimating/proposals"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch proposals");
        }
        const proposals = await response.json();

        const filteredProposals = proposals.filter(
          (proposal) => proposal.estimating.id === selectedEstimatingID
        );

        // Check if filteredProposals is not empty
        if (filteredProposals.length > 0) {
          console.log(filteredProposals);
          const proposalAddundumNumbers = filteredProposals[0];
          console.log(proposalAddundumNumbers);
          // const seficNumbers = proposalAddundumNumbers.spcifc.map((sefic) => sefic.number);
          const seficNumbers = proposalAddundumNumbers.spcifc;
          console.log(seficNumbers);
          // const numbers = seficNumbers.map((item) => item.sefic[0].number);
          // console.log(numbers);

          const numbers = seficNumbers.map((item) =>
            item.sefic.map((e) => e.number)
          );
          console.log(numbers);

          const flatArray = [].concat(...numbers);
          console.log(flatArray);

          setSelectedProposalNumbers(flatArray);

          const proposalID = filteredProposals[0].id;
          console.log(proposalID);
          setSelectedProposalID(proposalID);
          console.log(proposalID);
        } else {
          console.log("No matching proposal found.");
        }
      } catch (error) {
        console.error("Error fetching or filtering proposals:", error);
      }
    };

    fetchAndFilterProposals();
  }, [selectedEstimatingID]);

  // ****************** Smart way to handle Nested Fields with multistep Project SUbmit form  **********

  const [ProjectStep1FormData, setProjectStep1FormData] = useState({
    proposal_id: null,
    start_date: getCurrentDate(),
    job_num: "",
    prjct_mngr: "",
    Forman: "",
    bim_oprtr: "",
    prjct_engnr: "",
  });

  useEffect(() => {
    if (selectedProposalID !== null) {
      setProjectStep1FormData((prevState) => ({
        ...prevState,
        proposal_id: selectedProposalID,
      }));
    }
  }, [selectedProposalID]);

  // console.log(ProjectStep1FormData.proposal_id);

  // ****************
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
    contract: [
      {
        contract: "",
        contract_date: "",
      },
    ],
    schedule_of_value: [
      {
        schedule: "",
        schedule_date: "",
      },
    ],
    insurance: [
      {
        insurance: "",
        date: "",
      },
    ],
    bond: [
      {
        bond: "",
        date: "",
      },
    ],
  });

  const [ProjectStep5FormData, setProjectStep5FormData] = useState({
    zlien: [
      {
        zlien: "",
        date: "",
      },
    ],

    submittals: [
      {
        status: "",
        date: "",
        scopWorkNumber: "",
      },
    ],
  });

  const [ProjectStep6FormData, setProjectStep6FormData] = useState({
    shop_drawing: [
      {
        status: "",
        date: "",
        scopWorkNumber: "",
      },
    ],
    safity: [
      {
        status: "",
        date: "",
        scopWorkNumber: "",
        comment_box: "",
      },
    ],
    schedule: [
      {
        status: "",
        date: "",
      },
    ],
    sub_contractors: [
      {
        status: "",
        date: "",
        comment_box: "",
      },
    ],
  });
  const [ProjectStep7FormData, setProjectStep7FormData] = useState({
    labor_rate: [
      {
        status: "",
        date: "",
        comment_box: "",
      },
    ],
    on_build: [
      {
        field: "",
        status: "",
      },
    ],
    buget: [
      {
        status: "",
        comment_box: "",
      },
    ],
    billing: [
      {
        due_date: "",
        reduction: "",
      },
    ],
    sov: [
      {
        status: "",
        date: "",
      },
    ],
  });
  const [ProjectStep8FormData, setProjectStep8FormData] = useState({
    hds_system: [
      {
        status: "",
        date: "",
        comment_box: "",
      },
    ],
    on_build: [
      {
        field: "",
        status: "",
      },
    ],
    buget: [
      {
        status: "",
        comment_box: "",
      },
    ],
  });

  const handleAddLaborRate = () => {
    const newLaborRate = {
      status: "",
      date: "",
      comment_box: "",
    };
    setProjectStep7FormData({
      ...ProjectStep7FormData,
      labor_rate: [...ProjectStep7FormData.labor_rate, newLaborRate],
    });
  };
  const handleAddSafety = () => {
    const newSafety = {
      status: "",
      date: "",
      scopWorkNumber: "",
      comment_box: "",
    };
    setProjectStep6FormData({
      ...ProjectStep6FormData,
      safity: [...ProjectStep6FormData.safity, newSafety],
    });
  };
  const handleRemoveSafety = (index) => {
    const updatedsafty = [...ProjectStep6FormData.safity];
    updatedsafty.splice(index, 1);
    setProjectStep6FormData({
      ...ProjectStep6FormData,
      safity: updatedsafty,
    });
  };

  const handleAddSubmittal = () => {
    const newSUbmittal = {
      status: "",
      date: "",
      scopWorkNumber: "",
    };
    setProjectStep5FormData({
      ...ProjectStep5FormData,
      submittals: [...ProjectStep5FormData.submittals, newSUbmittal],
    });
  };

  const handleRemoveSubmittal = (index) => {
    const updateSubmittals = [...ProjectStep5FormData.submittals];
    updateSubmittals.splice(index, 1);
    setProjectStep5FormData({
      ...ProjectStep5FormData,
      submittals: updateSubmittals,
    });
  };

  const handleAddShopDrawing = () => {
    const newShopDrawing = {
      status: "",
      date: "",
      scopWorkNumber: "",
    };
    setProjectStep6FormData({
      ...ProjectStep6FormData,
      shop_drawing: [...ProjectStep6FormData.shop_drawing, newShopDrawing],
    });
  };
  const handleRemoveShopDrawing = (index) => {
    const updatedshop_drawing = [...ProjectStep6FormData.shop_drawing];
    updatedshop_drawing.splice(index, 1);
    setProjectStep6FormData({
      ...ProjectStep6FormData,
      shop_drawing: updatedshop_drawing,
    });
  };
  const handleAddSubContractors = () => {
    const newSubContractor = {
      status: "",
      date: "",
      comment_box: "",
    };
    setProjectStep6FormData({
      ...ProjectStep6FormData,
      sub_contractors: [
        ...ProjectStep6FormData.sub_contractors,
        newSubContractor,
      ],
    });
  };

  const handleRemoveSubContractors = (index) => {
    const updatedSubContractors = [...ProjectStep6FormData.sub_contractors];
    updatedSubContractors.splice(index, 1);
    setProjectStep6FormData({
      ...ProjectStep6FormData,
      sub_contractors: updatedSubContractors,
    });
  };
  const handleRemoveLaborRate = (index) => {
    const updatedLaborRates = [...ProjectStep7FormData.labor_rate];
    updatedLaborRates.splice(index, 1);
    setProjectStep7FormData({
      ...ProjectStep7FormData,
      labor_rate: updatedLaborRates,
    });
  };

  const handleLaborRateChange = (index, field, value) => {
    const updatedLaborRate = [...ProjectStep7FormData.labor_rate];
    updatedLaborRate[index][field] = value;
    setProjectStep7FormData({
      ...ProjectStep7FormData,
      labor_rate: updatedLaborRate,
    });
  };

  // ******************

  const handleAddBilling = () => {
    const newBilling = {
      due_date: "",
      reduction: "",
    };
    setProjectStep7FormData({
      ...ProjectStep7FormData,
      billing: [...ProjectStep7FormData.billing, newBilling],
    });
  };

  const handleRemoveBilling = (index) => {
    const updatedBilling = [...ProjectStep7FormData.billing];
    updatedBilling.splice(index, 1);
    setProjectStep7FormData({
      ...ProjectStep7FormData,
      billing: updatedBilling,
    });
  };

  // Function to handle changes for the "BILLINGS" section
  const handleBillingChange = (index, field, value) => {
    const updatedBilling = [...ProjectStep7FormData.billing];
    updatedBilling[index][field] = value;
    setProjectStep7FormData({
      ...ProjectStep7FormData,
      billing: updatedBilling,
    });
  };

  // *******************

  const handleAddSov = () => {
    const newSov = {
      status: "",
      date: "",
    };
    setProjectStep7FormData({
      ...ProjectStep7FormData,
      sov: [...ProjectStep7FormData.sov, newSov],
    });
  };

  const handleRemoveSov = (index) => {
    const updatedSov = [...ProjectStep7FormData.sov];
    updatedSov.splice(index, 1);
    setProjectStep7FormData({
      ...ProjectStep7FormData,
      sov: updatedSov,
    });
  };

  // Function to handle changes for the "SOVS" section
  const handleSovChange = (index, field, value) => {
    const updatedSov = [...ProjectStep7FormData.sov];
    updatedSov[index][field] = value;
    setProjectStep7FormData({
      ...ProjectStep7FormData,
      sov: updatedSov,
    });
  };

  // *******************

  // Function to add a new "HD S_SYSTEMS" entry
  const handleAddHDSSystem = () => {
    const newHDSSystem = {
      status: "Pending", // You can set default values here
      date: "",
      comment_box: "",
    };
    setProjectStep8FormData((prevData) => ({
      ...prevData,
      hds_system: [...prevData.hds_system, newHDSSystem],
    }));
  };
  const handleRemoveHDSSystem = (index) => {
    setProjectStep8FormData((prevData) => ({
      ...prevData,
      hds_system: prevData.hds_system.filter((_, i) => i !== index),
    }));
  };

  const handleHDSChange = (index, field, value) => {

    if (field === "date" && value === "") {
      value = null;  // If the date is empty, set the value to null
  }
    setProjectStep8FormData((prevData) => {
      const updatedHDS = [...prevData.hds_system];
      updatedHDS[index] = {
        ...updatedHDS[index],
        [field]: value,
      };
      return { ...prevData, hds_system: updatedHDS };
    });
  };

  const handleAddOnBuild = () => {
    const newOnBuild = {
      field: "",
      status: "",
    };
    setProjectStep8FormData({
      ...ProjectStep8FormData,
      on_build: [...ProjectStep8FormData.on_build, newOnBuild],

      

    });
  };
 
  const handleRemoveOnBuild = (index) => {
    const updatedOnBuild = [...ProjectStep8FormData.on_build];
    updatedOnBuild.splice(index, 1);
    setProjectStep8FormData({
      ...ProjectStep8FormData,
      on_build: updatedOnBuild,
    });
  };
  // Function to handle changes for the "ON UPLOADED" section
  const handleOnBuildChange = (index, field, value) => {
    const updatedOnBuild = [...ProjectStep8FormData.on_build];
    updatedOnBuild[index][field] = value;
    setProjectStep8FormData({
      ...ProjectStep8FormData,
      on_build: updatedOnBuild,
    });
  };
  const handleAddBudget = () => {
    const newBudget = {
      status: "",
      comment_box: "",
    };
    setProjectStep8FormData({
      ...ProjectStep8FormData,
      buget: [...ProjectStep8FormData.buget, newBudget],
    });
  };

  const handleRemoveBudget = (index) => {
    const updatedBudget = [...ProjectStep8FormData.buget];
    updatedBudget.splice(index, 1);
    setProjectStep8FormData({
      ...ProjectStep8FormData,
      buget: updatedBudget,
    });
  };
  // Function to handle changes for the "BUGETS" section
  const handleBudgetChange = (index, field, value) => {
    const updatedBudget = [...ProjectStep8FormData.buget];
    updatedBudget[index][field] = value;
    setProjectStep8FormData({
      ...ProjectStep8FormData,
      buget: updatedBudget,
    });
  };
  // *****************

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

  // *********************Fetch Purposal Addendum Scope of Work Number End*************************

  const handleprojectBack = () => {
    setprojectActiveStep((prevStep) => prevStep - 1);
  };
  const handleprojectNext = () => {
    setprojectActiveStep((prevStep) => prevStep + 1);
    console.log(projectactiveStep);
  };

  const handleShopDrawingChange = (index, field, value) => {
    const updatedShopDrawings = [...ProjectStep6FormData.shop_drawing];
    updatedShopDrawings[index][field] = value;
    setProjectStep6FormData({
      ...ProjectStep6FormData,
      shop_drawing: updatedShopDrawings,
    });
  };

  // Function to update the SAFETY section of the form data
  const handleSafetyChange = (index, field, value) => {
    const updatedSafety = [...ProjectStep6FormData.safity];
    updatedSafety[index][field] = value;
    setProjectStep6FormData({
      ...ProjectStep6FormData,
      safity: updatedSafety,
    });
  };

  // Function to update the SCHEDULES section of the form data

  const handleScheduleChange = (index, field, value) => {
    // Create a copy of the current state
    const updatedFormData = { ...ProjectStep6FormData };

    // Find the schedule object at the specified index
    const scheduleToUpdate = updatedFormData.schedule[index];

    // Update the specified field with the new value
    scheduleToUpdate[field] = value;

    // Update the state with the modified data
    setProjectStep6FormData(updatedFormData);
  };

  const handleRemoveSchedule = (index) => {
    // Create a copy of the current state
    const updatedFormData = { ...ProjectStep6FormData };

    // Remove the schedule object at the specified index
    updatedFormData.schedule.splice(index, 1);

    // Update the state with the modified data
    setProjectStep6FormData(updatedFormData);
  };

  const handleAddSchedule = () => {
    // Create a copy of the current state
    const updatedFormData = { ...ProjectStep6FormData };

    // Add a new schedule object with default values
    updatedFormData.schedule.push({
      status: "",
      date: "",
    });

    // Update the state with the modified data
    setProjectStep6FormData(updatedFormData);
  };

  // Function to update the SUB_CONTRACTORSS section of the form data
  const handleSubContractorChange = (index, field, value) => {
    const updatedSubContractors = [...ProjectStep6FormData.sub_contractors];
    updatedSubContractors[index][field] = value;
    setProjectStep6FormData({
      ...ProjectStep6FormData,
      sub_contractors: updatedSubContractors,
    });
  };

  const handleSubmittalsChange = (index, field, value) => {
    // Create a copy of the current state
    const updatedFormData = { ...ProjectStep5FormData };

    // Find the submittals object at the specified index
    const submittalsToUpdate = updatedFormData.submittals[index];

    // Update the specified field with the new value
    submittalsToUpdate[field] = value;

    // Update the state with the modified data
    setProjectStep5FormData(updatedFormData);
  };

  const handleProjectFormSubmit = (e) => {
    e.preventDefault();
    console.log(ProjectStep1FormData.proposal_id);
    const formData = {
      // *****step 01
      start_date: ProjectStep1FormData.start_date,
      job_num: ProjectStep1FormData.job_num,
      proposal_id: ProjectStep1FormData.proposal_id,
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

      contract: ProjectStep4FormData.contract.map((mycontract) => ({
        contract: mycontract.contract,
        contract_date: mycontract.contract_date,
      })),
      schedule_of_value: ProjectStep4FormData.schedule_of_value.map(
        (myschedule) => ({
          schedule: myschedule.schedule,
          schedule_date: myschedule.schedule_date,
        })
      ),
      insurance: ProjectStep4FormData.insurance.map((myinsurance) => ({
        insurance: myinsurance.insurance,
        date: myinsurance.date,
      })),
      bond: ProjectStep4FormData.bond.map((mybond) => ({
        bond: mybond.bond,
        date: mybond.date,
      })),

      // *****step 05

      zlien: ProjectStep5FormData.zlien.map((myzliens) => ({
        zlien: myzliens.zlien,
        date: myzliens.date,
      })),
      submittals: ProjectStep5FormData.submittals.map((mysubmittals) => ({
        status: mysubmittals.status,
        date: mysubmittals.date,
        scopWorkNumber: parseInt(mysubmittals.scopWorkNumber, 10),
      })),

      // *****step 06

      shop_drawing: ProjectStep6FormData.shop_drawing.map((myshopdrawing) => ({
        status: myshopdrawing.status,
        date: myshopdrawing.date,
        scopWorkNumber: myshopdrawing.scopWorkNumber,
      })),

      safity: ProjectStep6FormData.safity.map((mysafity) => ({
        status: mysafity.status,
        date: mysafity.date,
        scopWorkNumber: mysafity.scopWorkNumber,
        comment_box: mysafity.comment_box,
      })),

      sub_contractors: ProjectStep6FormData.sub_contractors.map(
        (mysub_contractors) => ({
          status: mysub_contractors.status,
          date: mysub_contractors.date,
          comment_box: mysub_contractors.comment_box,
        })
      ),

      schedule: ProjectStep6FormData.schedule.map((myschedule) => ({
        status: myschedule.status,
        date: myschedule.date,
      })),

      // *****step 07

      labor_rate: ProjectStep7FormData.labor_rate.map((mylabor_rate) => ({
        status: mylabor_rate.status,
        date: mylabor_rate.date,
        comment_box: mylabor_rate.comment_box,
      })),
      billing: ProjectStep7FormData.billing.map((mybilling) => ({
        due_date: mybilling.due_date,
        reduction: mybilling.reduction,
      })),
      sov: ProjectStep7FormData.sov.map((mysov) => ({
        status: mysov.status,
        date: mysov.date,
      })),

      // *****step 08

      hds_system: ProjectStep8FormData.hds_system.map((myhds_system) => ({
        status: myhds_system.status,
        date: myhds_system.date,
        comment_box: myhds_system.comment_box,
      })),
      on_build: ProjectStep8FormData.on_build.map((myon_build) => ({
        field: myon_build.field,
        status: myon_build.status,
      })),
      buget: ProjectStep8FormData.buget.map((mybuget) => ({
        status: mybuget.status,
        comment_box: mybuget.comment_box,
      })),
    };
    // console.log(proposal_id);
    console.log('Sending data:', formData);


    // console.log("formData to be sent", formData);

    // Send a POST request using Axios
    axios
      .post("http://127.0.0.1:8000/api/project/Project/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Data successfully submitted", response.data);

        setshowProjectModal(false);

        // Clear the form fields by resetting the state variables
        setStartDate("");
        setJobNo("");
        setSelectedProjectID("");

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

  // ************************projectManager positions Roles Seleted **********
  // Custom function to check if a role is a projectmanager role
  function isManagerRole(roles) {
    const allowedRoles = [
      "Proconstruction Manager",
      "Project Manager",
      "Vice President",
      "No. Cal. General Manager",
    ];
    for (const role of roles) {
      if (allowedRoles.includes(role)) {
        return true;
      }
    }
    return false;
  }

  const [projectManager, setProjectManager] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/user/register/")
      .then((response) => response.data)
      .then((data) => {
        const managerUsers = data.filter((user) => isManagerRole(user.roles));
        // console.log(managerUsers);
        setProjectManager(managerUsers);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // ************************General Superintendent Role Seleted **********

  const [GeneralSuperintendent, setGeneralSuperintendent] = useState([]);

  // General Superintendent
  function isGeneralSuperintendentRole(roles) {
    const allowedRoles = [
      "General Superintendent",
      "So. Cal. General Manager",
      "No. Cal. General Manager",
      "President",
    ];
    for (const role of roles) {
      if (allowedRoles.includes(role)) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/user/register/")
      .then((response) => response.data)
      .then((data) => {
        const gensupridentUsers = data.filter((user) =>
          isGeneralSuperintendentRole(user.roles)
        );
        // console.log(gensupridentUsers);
        setGeneralSuperintendent(gensupridentUsers);
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
        // console.log(formanUser);
        setFormanName(formanUser);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // ************************BimOperator Role Seleted **********

  function isBimOperatorRole(roles) {
    const allowedRoles = [
      "BIM Modeler/Trimble Operator",
      "BIM/Manager PR",
      "BIM",
    ];
    for (const role of roles) {
      if (allowedRoles.includes(role)) {
        return true;
      }
    }
    return false;
  }
  const [BimOperator, setBimOperator] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/user/register/")
      .then((response) => response.data)
      .then((data) => {
        const bimUsers = data.filter((user) => isBimOperatorRole(user.roles));
        // console.log(bimUsers);
        setBimOperator(bimUsers);
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
  const [bidderEmail, setBidderEmail] = useState("");
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

    // Validate and format the selectedTime
    const formattedTime = validateAndFormatTime(selectedTime);
    console.log("Formatted Time: ", formattedTime);

    if (!formattedTime) {
      // Handle invalid time format here, display an error message or prevent form submission
      console.error("Invalid time format");
      return;
    }

    const formData = {
      due_date: dueDate,
      start_date: startDate,
      time: formattedTime,
      timezone: timezone,
      prjct_name: projectName,
      company_id: companyName,
      estimator_id: estimatorName,
      location: location,
      bidder: bidderName,
      bidder_mail: bidderEmail,
      bidder_deatil: bidder_detail,
    };

    console.log("Data is sending before the posting", formData); // Create a data object with the form values
    // Send a POST request to the API
    axios
      .post("http://127.0.0.1:8000/api/estimating/estimating/", formData)
      .then((response) => {
        console.log("Data After successfully  Posting:", response.data);

        dispatch(addEstimating(response.data));

        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          // navigate("/")
        }, 1000);

        // You can also reset the form fields here if needed
        setDueDate("");
        setSelectedTime("");
        setStartDate("");
        settimezone("");
        setProjectName("");
        setCompanyName("");
        setEstimatorName("");
        setLocation("");
        setbidderName("");
        setBidder_detail("");
        setBidderEmail("");
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

  //************* Define the handleEstimatingEditing function

  const [selectedEstimator, setSelectedEstimator] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  console.log(selectedCompany);
  const [selectedBidder, setSelectedBidder] = useState();
  const [selectedLocation, setSelectedLocation] = useState("");
  console.log(selectedLocation);
  const [selectedStatus, setselectedStatus] = useState("");
  const [selecteddueDate, setSelecteddueDate] = useState("");
  const [SelectedTimeforUpdate, setSelectedTimeforUpdate] = useState("");
  const [SelectedTimeZone, setSelectedTimeZone] = useState("");
  const [selectedstart_date, setSelectedstart_date] = useState("");
  const [selectedbidder_address, setSelectedbidder_address] = useState("");
  const [selectedbidder_detail, setSelectedbidder_detail] = useState("");
  const [selectedbidder_email, setSelectedbidder_email] = useState("");
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

  const [itemId, setItemId] = useState();

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
      estimator_id: parseInt(selectedEstimator, 10),
      bidder: selectedBidder,
      bidder_address: selectedbidder_address,
      bidder_detail: selectedbidder_detail,
      bidder_mail: selectedbidder_email,
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
  const [step2FormData, setStep2FormData] = useState([{
    specific_name: "Base Bid Drywall/Framing",
    budget: null,
    sefic: [],
  }]);

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
            estimating_id: step0FormData.estimating,
            architect_name: step0FormData.architect_name,
            architect_firm: step0FormData.architect_firm,
            Addendums: step1FormData.Addendums.map((addendum) => ({
              addendum_number: addendum.addendum_number,
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
              service_type: service.service_type === "IN" ? "IN" : "EX",
            })),
          }),
        }
      );
      // console.log("Data For Posting ",response);
      if (response.ok) {
        const responseData = await response.json();
        // console.log("Response data:", responseData);
        console.log("Data Successfully Submitted !", responseData);

        // Clear form fields after successful submission

        setTimeout(() => {
          closeModal();
        }, 500);
        return;
      } else {
        console.error("Error submitting proposal data");
        const errorResponse = await response.text();
        console.error("Error response:", errorResponse);
        return;
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  // update status whn i clock on the project close button

  const closeModal = () => {
    setShowModal(false);
    setPurposalModal(false);
    setshowProjectModal(false);
    setshowEstimatingEditModal(false);
    // **********purposalModal
    // update_status_when_close=1;

    setStep0FormData({
      date: getCurrentDate(),
      estimating_id: "",
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

    // **************ShowModal Estimating

    setDueDate("");
    setSelectedTime("");
    setStartDate("");
    settimezone("");
    setProjectName("");
    setCompanyName("");
    setEstimatorName("");
    setLocation("");
    // setBidAmount("");
    setbidderName("");
    setBidder_detail("");
    // Remove the 'modal-active' class when the modal is closed
    document.body.classList.remove("modal-active");
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
          customer.estimator.full_Name.toUpperCase().includes(filter.toUpperCase())) ||
          (customer.gc_name &&
          customer.gc_name.toUpperCase().includes(filter.toUpperCase()))
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

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleEstimatorNameChange = (e) => {
    setEstimatorName(e.target.value);
  };

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
    console.log(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleBidderChange = (e) => {
    setbidderName(e.target.value);
  };
  const handleBidderEmailChange = (e) => {
    setBidderEmail(e.target.value);
  };

  const handleBidderDetailChange = (e) => {
    setBidder_detail(e.target.value);
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

      // console.log("API Response:", response);

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
            estimator_id: updatedEstimatorId, // Only update the estimator
          }),
        }
      );

      // console.log("API Response:", response);

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

  const handleStatusChange = async (event = null, itemId) => {
    const updatedStatus = event.target.value;
    console.log("Updated Status:", updatedStatus);

    try {
      // Fetch the estimator value based on the estimating ID
      const response = await fetch(
        `http://127.0.0.1:8000/api/estimating/estimating/${itemId}/`
      );

      if (response.ok) {
        const estimatingData = await response.json();
        const estimatorValue = estimatingData.estimator; // Replace 'estimator' with the actual field name

        // Check if the estimator value is valid
        if (estimatorValue === null || estimatorValue === "") {
          // Handle the case where the estimator is not selected
          alert("Estimator is not selected. Log will not display");
          // Status update is prevented by not having it outside the conditional block
        } else {
          // Continue with the status update
          const responseStatus = await fetch(
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

          // console.log("API Response:", responseStatus);

          if (responseStatus.ok) {
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
              // useEffect(() => {
              // fetchAndFilterProposals();
              // }, [selectedEstimatingID]);
            }

            // Check if the updated status is "Won" and open the project modal

            if (updatedStatus === "Won") {
              setshowProjectModal(true);
            }

            if (updatedStatus === "Pending") {
              setPurposalModal(true);
            }
            // Log a success message to the console
            console.log(
              `Status updated successfully for item with ID ${itemId}`
            );
            // You may need to refresh the UI or update the specific row accordingly
          } else {
            if (responseStatus.status === 404) {
              // Handle the case where the resource was not found (404 error)
              console.error("Resource not found.");
            } else {
              // Handle other non-success responses
              const responseData = await responseStatus.text();
              console.error("Failed to update! Server response:", responseData);
            }
          }
        }
      } else {
        // Handle API response errors
        console.error(
          "Failed to fetch estimator data for estimating ID:",
          itemId
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const MovetoURLpage = () => {
    navigate("/homepage/urlpage");
  };

  filteredData.sort((a, b) => {
    if (a.due_date && b.due_date) {
      const dateA = new Date(a.due_date);
      const dateB = new Date(b.due_date);

      // Compare due dates in descending order (newest to oldest)
      if (dateA > dateB) {
        return -1; // b comes before a
      } else if (dateA < dateB) {
        return 1; // a comes before b
      }
      return 0; // Due dates are equal
    } else if (a.due_date && !b.due_date) {
      return -1; // a comes before b
    } else if (!a.due_date && b.due_date) {
      return 1; // b comes before a
    }
    return 0; // No change in order if both have no due date
  });

  const [readMoreState, setReadMoreState] = useState({});
  const [showBidderDetails, setShowBidderDetails] = useState(false);
  const [selectedBidderDetails, setSelectedBidderDetails] = useState("");

  return (
    <div className="ParentAllDiv">
      <div className={`estimator ${showModal ? "modal-active" : ""}`}>
        <div className="AllbackDivs">
          <div className="backDiv1"></div>
          <div className="backDiv2"></div>
        </div>

        <div className="estimatingTable px-5">
          <div className="both d-flex flex-column">
            <div className="inputbtn d-flex gap-2 px-5 " data-aos="fade-down">
              <input
                type="text"
                placeholder="Search"
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
            <div className="d-flex mt-5  justify-content-between align-items-center  ">
              <div>
                <h3
                  className=" text-primary textestimating  "
                  data-aos="fade-left"
                >
                  Estimating Summary
                </h3>
              </div>
              <div
                className="btn-group btn-group-md  wonloseDiv"
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
          {/* <!-- Button trigger modal --> */}
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button>

{/* <!-- Modal --> */}
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>
          <ParticlesAnimation numberOfCircles={numberOfCircles} />
          {/* //here was project Modal before */}
          <div className="table-responsive proposalTable " data-aos="fade-up">
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
                        value={
                          AreaChoice[item.id] || item.location
                            ? AreaChoice[item.id] || item.location
                            : "No aArea"
                        }
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
                        value={estimatorchoice[item.id] || item.estimator }
                      >
                        <option value={item?.estimator?.full_Name}>
                          {item?.estimator?.full_Name ? item?.estimator?.full_Name: "No Estimator"}
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
                      className="mytd centered-td"
                      style={{ minWidth: "50px" }}
                      onChange={(event) => handleUpdationChange(event, item.id)}
                      value={statusMap[item.id] || item.status}
                    >
                      <select
                        className="dropUpdation"
                        id="estimatorName"
                        onChange={(event) => handleStatusChange(event, item.id)}
                        value={statusMap[item.id] || item.status}
                      >
                        {/* <option value={item.status}>{item.status}</option> */}
                        {/* <option value="Won" disabled={statusMap[item.id] === "Working" || item.status === "Working"}>Won</option>
                        <option value="Pending">Pending</option>
                        <option value="Working">Working</option>
                        <option value="Lost">Lost</option> */}

                        <option
                          value="Won"
                          disabled={
                            statusMap[item.id] === "Working" ||
                            item.status === "Working"
                          }
                          className={
                            statusMap[item.id] === "Won" ||
                            item.status === "Won"
                              ? "active-option"
                              : ""
                          }
                        >
                          Won
                        </option>
                        <option
                          value="Pending"
                          className={
                            statusMap[item.id] === "Pending" ||
                            item.status === "Pending"
                              ? "active-option"
                              : ""
                          }
                        >
                          Pending
                        </option>
                        <option
                          value="Working"
                          disabled={
                            statusMap[item.id] === "Pending" ||
                            item.status === "Pending"
                          }
                          className={
                            statusMap[item.id] === "Working" ||
                            item.status === "Working"
                              ? "active-option"
                              : ""
                          }
                        >
                          Working
                        </option>
                        <option
                          value="Lost"
                          className={
                            statusMap[item.id] === "Lost" ||
                            item.status === "Lost"
                              ? "active-option"
                              : ""
                          }
                        >
                          Lost
                        </option>
                      </select>
                    </td>
                    <td className="mytdbidder centered-td">
                      {item.bidder || item.bidder_detail || item.bidder_mail ? (
                        <>
                          <p
                            className={
                              readMoreState[item.id] ? "" : "two-lines"
                            }
                          >
                            {item.bidder ? item.bidder + " " : ""}
                            {item.bidder_detail ? item.bidder_detail + " " : ""}
                            {item.bidder_mail ? item.bidder_mail : ""}
                          </p>
                          {
                            // Check if any of the fields exist and are longer than a set threshold
                            (item.bidder && item.bidder.length > 20) ||
                            (item.bidder_detail &&
                              item.bidder_detail.length > 20) ||
                            (item.bidder_mail &&
                              item.bidder_mail.length > 20) ? (
                              <label
                                onClick={() => {
                                  setSelectedBidderDetails(
                                    (item.bidder ? item.bidder + " " : "") +
                                      (item.bidder_detail
                                        ? item.bidder_detail + " "
                                        : "") +
                                      (item.bidder_mail ? item.bidder_mail : "")
                                  );
                                  setShowBidderDetails(true);
                                  setReadMoreState((prev) => ({
                                    ...prev,
                                    [item.id]: !prev[item.id],
                                  }));
                                }}
                              >
                                {readMoreState[item.id] ? (
                                  <p className="read_more">Read less...</p>
                                ) : (
                                  <p className="read_more">Read more...</p>
                                )}
                              </label>
                            ) : null
                          }

                          {showBidderDetails && (
                            <div className="modal">
                              <div className="modal-content">
                                <span
                                  onClick={() => setShowBidderDetails(false)}
                                >
                                  Close
                                </span>
                                {selectedBidderDetails}
                              </div>
                            </div>
                          )}
                        </>
                      ) : null}
                    </td>

                    <td className="mytd centered-td actionTD">
                      <div className="relative-container loop">
                        {/* <button
                          onClick={() => {
                            // console.log(item.prjct_name);
                            const test = typeof item.id;
                            console.log(test);

                            setshowProjectModal(true);
                            setSelectedEstimatingID(item.id);
                          }}
                        >
                          Project
                        </button> */}
                        <div
                          type="button"
                          className="pb-2"
                          onClick={() => {
                            setItemId(item.id);
                            setSelectedEstimatingID(item.prjct_name);
                            setSelectedEstimator(item.estimator);
                            setSelectedBidder(item.bidder);
                            setSelectedCompany(item.company?.Cmpny_Name);
                            setselectedStatus(item.status);
                            setSelecteddueDate(item.due_date);
                            setSelectedstart_date(item.start_date);
                            setSelectedbidder_address(item.bidder_address);
                            setSelectedbidder_email(item.bidder_mail);
                            setSelectedbidder_detail(item.bidder_detail);
                            setSelectedTimeforUpdate(item.time);
                            setSelectedTimeZone(item.timezone);
                            setSelectedLocation(item.location);
                            setshowEstimatingEditModal(true);
                          }}
                        >
                          <i className="fa-solid fa-pen-to-square size11 edit "></i>
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
                            setSelectedEstimatingID(item.prjct_name);
                            setPurposalModal(true);
                          }}
                        >
                          <i className="fa-solid fa-square-plus size11"></i>
                        </div>

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
                          <i className="fa-solid fa-eye size11"></i>
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
                <h4 className="text-center addnewtxt">Add Project Entries</h4>{" "}
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
                          <label htmlFor="projectName" className="form-label">
                            
                            <storng>Estimating/Project Name</storng>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="projectName"
                            name="projectName"
                            placeholder="AutoPopulate not shown on frontend"
                            defaultValue={selectedEstimatingID}
                          />
                        </div>
                        <div
                          className="projName mt-3"
                          style={{ width: "100%" }}
                        >
                          <label htmlFor="projectName" className="form-label">
                            Proposal ID:
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="projectName"
                            name="projectName"
                            value={selectedProposalID || ""}
                            placeholder="ID should be shown here"
                            readOnly
                          />
                        </div>

                        <div className="bothDiv gap-3">
                          <div className="projName Oneline">
                            <label htmlFor="projectName" className="form-label">
                              
                              <strong>Start Date</strong>
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
                            <label htmlFor="projectName" className="form-label">
                              <strong>Job Number</strong>
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
                              <strong>Project Manager</strong>
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
                              <strong>Foreman</strong>
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
                              <strong>BIM Modeler</strong>
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
                              <option value="">Select Bim Modeler</option>
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
                              <strong>Project Engineer</strong>
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
                      </>
                    )}
                    {projectactiveStep === 1 && (
                      <>
                        <div className="bothDiv gap-3 mt-4">
                          <div className="Oneline">
                            <label htmlFor="location" className="form-label">
                              <strong>Genral Superintendent</strong>
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
                                Select General Superintendent
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
                              <strong>Addendum</strong>
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
                          <label htmlFor="projectName" className="form-label">
                            <strong>Project address</strong>
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
                              <strong>Spec's per our Scope</strong>
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
                            <label htmlFor="location" className="form-label">
                              <strong>Bid</strong>
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
                            <label htmlFor="location" className="form-label">
                              <strong>Drywell Conttrol Joins</strong>
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
                            <label htmlFor="location" className="form-label">
                              <strong>Wall type Mapping</strong>
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
                            <label htmlFor="location" className="form-label">
                            <strong
                            >
                              Finish level markups
                            </strong>
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
                            <label htmlFor="location" className="form-label">
                              <strong>
                              Progress Tracking</strong>
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
                            <label htmlFor="location" className="form-label">
                              <strong>RO-Door</strong>
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
                            <label htmlFor="location" className="form-label">
                              <strong>RO-Window</strong>
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
                            <label htmlFor="location" className="form-label">
                              
                              <storng
                            ><strong>Status</strong></storng>
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
                              <option value="Pre-Construction">
                                Pre-Construction
                              </option>
                              <option value="Construction Phase">
                                Construction Phase
                              </option>
                              <option value="Close out phase">
                                Close out phase
                              </option>
                              <option value="Upcoming/Estimating phase">
                                Upcoming/Estimating phase
                              </option>
                              <option value="Complete">Complete</option>
                            </select>
                          </div>
                          <div className="Oneline">
                            <label htmlFor="location" className="form-label">
                              <strong>Contacts</strong>
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
                              <option value="">Select Contacts</option>
                              <option value="On build">On build</option>
                              <option value="Pending">Pending</option>
                            </select>
                          </div>
                        </div>
                        <div style={{ width: "100%" }}>
                          <label htmlFor="projectName" className="form-label">
                            <strong>Substitution</strong>
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
                              <span> <strong>Contract</strong></span>
                            </label>
                            <div id="" className="input-group">
                              <select
                                className="form-select"
                                placeholder="Contract"
                                id="contract"
                                value={
                                  ProjectStep4FormData.contract[0].contract
                                }
                                onChange={(e) => {
                                  const isFullyExecuted =
                                    e.target.value === "Fully Executed";
                                  setProjectStep4FormData({
                                    ...ProjectStep4FormData,
                                    contract: [
                                      {
                                        ...ProjectStep4FormData.contract[0],
                                        contract: e.target.value,
                                        // If it's not fully executed, set the date to null
                                        contract_date: isFullyExecuted
                                          ? ProjectStep4FormData.contract[0]
                                              .contract_date
                                          : null,
                                      },
                                    ],
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
                                  ProjectStep4FormData.contract[0]
                                    .contract_date || ""
                                } // If it's null, set value to an empty string to prevent React warning
                                disabled={
                                  ProjectStep4FormData.contract[0].contract !==
                                  "Fully Executed"
                                }
                                onChange={(e) =>
                                  setProjectStep4FormData({
                                    ...ProjectStep4FormData,
                                    contract: [
                                      {
                                        ...ProjectStep4FormData.contract[0],
                                        contract_date: e.target.value,
                                      },
                                    ],
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div style={{ width: "100%" }}>
                          <div>
                            <label className="form-label">
                              <span> <strong>Schedule of values</strong></span>
                            </label>
                            <div id="" className="input-group">
                              <select
                                className="form-select"
                                placeholder="Schedule"
                                id="schedule"
                                value={
                                  ProjectStep4FormData.schedule_of_value[0]
                                    .schedule
                                }
                                onChange={(e) => {
                                  const isApproved =
                                    e.target.value === "Approved";
                                  setProjectStep4FormData({
                                    ...ProjectStep4FormData,
                                    schedule_of_value: [
                                      {
                                        ...ProjectStep4FormData
                                          .schedule_of_value[0],
                                        schedule: e.target.value,
                                        // If it's not approved, set the date to null
                                        schedule_date: isApproved
                                          ? ProjectStep4FormData
                                              .schedule_of_value[0]
                                              .schedule_date
                                          : null,
                                      },
                                    ],
                                  });
                                }}
                              >
                                <option value="">Select Choice</option>
                                <option value="Approved">Approved</option>
                                <option value="Pending">Pending</option>
                              </select>
                              <input
                                id=""
                                type="date"
                                name="schedule_date"
                                className="form-control"
                                value={
                                  ProjectStep4FormData.schedule_of_value[0]
                                    .schedule_date || ""
                                } // If it's null, set value to an empty string to prevent React warning
                                disabled={
                                  ProjectStep4FormData.schedule_of_value[0]
                                    .schedule !== "Approved"
                                }
                                onChange={(e) =>
                                  setProjectStep4FormData({
                                    ...ProjectStep4FormData,
                                    schedule_of_value: [
                                      {
                                        ...ProjectStep4FormData
                                          .schedule_of_value[0],
                                        schedule_date: e.target.value,
                                      },
                                    ],
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div style={{ width: "100%" }}>
                          <div>
                            <label className="form-label">
                              <span><strong>Insurances</strong></span>
                            </label>
                            <div id="" className="input-group">
                              <select
                                className="form-select"
                                placeholder="Insurance"
                                id="insurance"
                                value={
                                  ProjectStep4FormData.insurance[0].insurance
                                }
                                onChange={(e) => {
                                  const isSendOrComplete =
                                    e.target.value === "Sent" ||
                                    e.target.value === "Complete";
                                  setProjectStep4FormData({
                                    ...ProjectStep4FormData,
                                    insurance: [
                                      {
                                        ...ProjectStep4FormData.insurance[0],
                                        insurance: e.target.value,
                                        // If it's not Sent or Complete, set the date to null
                                        date: isSendOrComplete
                                          ? ProjectStep4FormData.insurance[0]
                                              .date
                                          : null,
                                      },
                                    ],
                                  });
                                }}
                              >
                                <option value="">Select Choice</option>
                                <option value="CCIP">CCIP</option>
                                <option value="Sent">Sent</option>
                                <option value="Received">Received</option>
                                <option value="Complete">Complete</option>
                              </select>
                              <input
                                id=""
                                type="date"
                                name="date"
                                className="form-control"
                                value={
                                  ProjectStep4FormData.insurance[0].date || ""
                                } // If it's null, set value to an empty string to prevent React warning
                                disabled={
                                  ProjectStep4FormData.insurance[0]
                                    .insurance !== "Sent" &&
                                  ProjectStep4FormData.insurance[0]
                                    .insurance !== "Complete"
                                }
                                onChange={(e) =>
                                  setProjectStep4FormData({
                                    ...ProjectStep4FormData,
                                    insurance: [
                                      {
                                        ...ProjectStep4FormData.insurance[0],
                                        date: e.target.value,
                                      },
                                    ],
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div style={{ width: "100%" }}>
                          <div>
                            <label className="form-label">
                              <span><strong>Bonds</strong></span>
                            </label>
                            <div id="" className="input-group">
                              <select
                                className="form-select"
                                placeholder="Bond"
                                id="bond"
                                value={ProjectStep4FormData.bond[0].bond}
                                onChange={(e) => {
                                  const isAllowedStatus = [
                                    "Sent",
                                    "Complete",
                                  ].includes(e.target.value);
                                  setProjectStep4FormData({
                                    ...ProjectStep4FormData,
                                    bond: [
                                      {
                                        ...ProjectStep4FormData.bond[0],
                                        bond: e.target.value,
                                        // If it's not an allowed status, set the date to null
                                        date: isAllowedStatus
                                          ? ProjectStep4FormData.bond[0].date
                                          : null,
                                      },
                                    ],
                                  });
                                }}
                              >
                                <option value="">Select Choice</option>
                                <option value="Sent">Sent</option>
                                <option value="Received">Received</option>
                                <option value="Complete">Complete</option>
                              </select>
                              <input
                                id=""
                                type="date"
                                name="date"
                                className="form-control"
                                value={ProjectStep4FormData.bond[0].date || ""} // If it's null, set value to an empty string to prevent React warning
                                disabled={
                                  !["Sent", "Complete"].includes(
                                    ProjectStep4FormData.bond[0].bond
                                  )
                                }
                                onChange={(e) =>
                                  setProjectStep4FormData({
                                    ...ProjectStep4FormData,
                                    bond: [
                                      {
                                        ...ProjectStep4FormData.bond[0],
                                        date: e.target.value,
                                      },
                                    ],
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {projectactiveStep === 4 && (
                      <>
                        <div style={{ width: "100%" }}>
                          <div>
                            <label className="form-label">
                              <span>
                                <strong>Zliens</strong>
                              </span>
                            </label>
                            <div id="" className="input-group">
                              <select
                                className="form-select"
                                placeholder="zlien"
                                id="zlien"
                                value={ProjectStep5FormData.zlien[0].zlien}
                                onChange={(e) => {
                                  const isSubmitted =
                                    e.target.value === "Submitted";
                                  setProjectStep5FormData({
                                    ...ProjectStep5FormData,
                                    zlien: [
                                      {
                                        ...ProjectStep5FormData.zlien[0],
                                        zlien: e.target.value,
                                        // If it's not submitted, set the date to null
                                        date: isSubmitted
                                          ? ProjectStep5FormData.zlien[0].date
                                          : null,
                                      },
                                    ],
                                  });
                                }}
                              >
                                <option value="">Select Choice</option>
                                <option value="Submitted">Submitted</option>
                                <option value="Pending">Pending</option>
                              </select>
                              <input
                                id=""
                                type="date"
                                name="date"
                                className="form-control"
                                value={ProjectStep5FormData.zlien[0].date || ""} // If it's null, set value to an empty string to prevent React warning
                                disabled={
                                  ProjectStep5FormData.zlien[0].zlien !==
                                  "Submitted"
                                }
                                onChange={(e) =>
                                  setProjectStep5FormData({
                                    ...ProjectStep5FormData,
                                    zlien: [
                                      {
                                        ...ProjectStep5FormData.zlien[0],
                                        date: e.target.value,
                                      },
                                    ],
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-3" style={{ width: "100%" }}>
                          <label
                            htmlFor="projectName"
                            className="form-label mt-2"
                          >
                            <span>
                              <strong>Submittals</strong>
                            </span>
                          </label>
                          {ProjectStep5FormData.submittals.map(
                            (mysubmittals, index) => (
                              <div
                                key={index}
                                className="wholespecificationEntry"
                              >
                                <div className="ScopofWorkSectionRemove">
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleRemoveSubmittal}
                                  >
                                    <i className="far">X</i>
                                  </button>
                                </div>

                                <div className="mb-2 mt-4">
                                  <label className="form-label">
                                    Scope of work divisions number
                                  </label>
                                  <select
                                    className="form-select"
                                    aria-label="Select Specification"
                                    value={mysubmittals.selectedNumber}
                                    onChange={(e) =>
                                      handleSubmittalsChange(
                                        index,
                                        "number",
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="">Select Choice</option>
                                    {selectedProposalNumbers.map(
                                      (number, index) => (
                                        <option key={index} value={number}>
                                          {number}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>

                                <div className="bothDiv gap-3">
                                  <div className="Oneline mb-4">
                                    <label
                                      htmlFor="location"
                                      className="form-label"
                                    >
                                      Status
                                    </label>
                                    <select
                                      className="form-select"
                                      value={mysubmittals.status}
                                      onChange={(e) => {
                                        handleSubmittalsChange(
                                          index,
                                          "status",
                                          e.target.value
                                        );

                                        // If the new status is not "Approved", set the date to null
                                        if (e.target.value !== "Approved") {
                                          handleSubmittalsChange(
                                            index,
                                            "date",
                                            null
                                          );
                                        }
                                      }}
                                    >
                                      <option value="">Select Choice</option>
                                      <option value="Approved">Approved</option>
                                      <option value="Pending">Pending</option>
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
                                      value={mysubmittals.date || ""}
                                      disabled={
                                        mysubmittals.status !== "Approved"
                                      }
                                      onChange={(e) =>
                                        handleSubmittalsChange(
                                          index,
                                          "date",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                          <button
                            type="button"
                            onClick={handleAddSubmittal}
                            className="btn btn-success"
                          >
                            Add Submittals
                          </button>
                        </div>
                      </>
                    )}

                    {projectactiveStep === 5 && (
                      <>
                        <div className="mt-3" style={{ width: "100%" }}>
                          <label
                            htmlFor="projectName"
                            className="form-label mt-2"
                          >
                            <span>
                              <strong>Shop Drawings</strong>
                            </span>
                          </label>
                          {ProjectStep6FormData.shop_drawing.map(
                            (shopdrawing, index) => (
                              <div
                                key={index}
                                className="wholespecificationEntry"
                              >
                                <div className="ScopofWorkSectionRemove">
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleRemoveShopDrawing}
                                  >
                                    <i className="far">X</i>
                                  </button>
                                </div>

                                <div className="mb-2 mt-4">
                                  <label className="form-label">
                                    Scope of work divisions number
                                  </label>
                                  <select
                                    className="form-select"
                                    aria-label="Select Specification"
                                    value={shopdrawing.scopWorkNumber}
                                    onChange={(e) =>
                                      handleShopDrawingChange(
                                        index,
                                        "scopWorkNumber",
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="">Select Choice</option>
                                    {selectedProposalNumbers.map(
                                      (number, index) => (
                                        <option key={index} value={number}>
                                          {number}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>
                                <div className="bothDiv gap-3">
                                  <div className="Oneline mb-4">
                                    <label
                                      htmlFor="location"
                                      className="form-label"
                                    >
                                      Status:
                                    </label>
                                    <select
                                      className="form-select"
                                      value={shopdrawing.status}
                                      onChange={(e) => {
                                        const newStatus = e.target.value;
                                        handleShopDrawingChange(
                                          index,
                                          "status",
                                          newStatus
                                        );
                                        // If the status is not "Approved", set the date to null
                                        if (newStatus !== "Approved") {
                                          handleShopDrawingChange(
                                            index,
                                            "date",
                                            null
                                          );
                                        }
                                      }}
                                    >
                                      <option value="">Select Choice</option>
                                      <option value="Approved">Approved</option>
                                      <option value="Pending">Pending</option>
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
                                      value={shopdrawing.date || ""} // If it's null, set value to an empty string
                                      disabled={
                                        shopdrawing.status !== "Approved"
                                      } // Only enable when the status is "Approved"
                                      onChange={(e) =>
                                        handleShopDrawingChange(
                                          index,
                                          "date",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                          <button
                            type="button"
                            onClick={handleAddShopDrawing}
                            className="btn btn-success"
                          >
                            Add SHOP DRAWINGS
                          </button>
                        </div>
                        <div style={{ width: "100%" }}>
                          <label
                            htmlFor="projectName"
                            className="form-label mt-2"
                          >
                            <span>
                              <strong> Safety</strong>
                            </span>
                          </label>
                          {ProjectStep6FormData.safity.map((safety, index) => (
                            <div
                              key={index}
                              className="wholespecificationEntry"
                            >
                              <div className="ScopofWorkSectionRemove">
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={handleRemoveSafety}
                                >
                                  <i className="far">X</i>
                                </button>
                              </div>
                              <div className="mb-2 mt-4">
                                <label className="form-label">
                                  Scope of work divisions number
                                </label>
                                <select
                                  className="form-select"
                                  aria-label="Select Specification"
                                  value={safety.scopWorkNumber}
                                  onChange={(e) =>
                                    handleSafetyChange(
                                      index,
                                      "scopWorkNumber",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="">Select Choice</option>
                                  {selectedProposalNumbers.map(
                                    (number, index) => (
                                      <option key={index} value={number}>
                                        {number}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>
                              <div className="bothDiv gap-3">
                                <div className="Oneline mb-4">
                                  <label
                                    htmlFor="location"
                                    className="form-label"
                                  >
                                    Status
                                  </label>
                                  <select
                                    className="form-select"
                                    onChange={(e) => {
                                      handleSafetyChange(
                                        index,
                                        "status",
                                        e.target.value
                                      );
                                      // If the selected status is not "Approved", set the date to null
                                      if (e.target.value !== "Approved") {
                                        handleSafetyChange(index, "date", null);
                                      }
                                    }}
                                    value={safety.status}
                                  >
                                    <option value="">Select Choice</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Pending">Pending</option>
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
                                    // Disable the input if the status is not "Approved"
                                    disabled={safety.status !== "Approved"}
                                    onChange={(e) =>
                                      handleSafetyChange(
                                        index,
                                        "date",
                                        e.target.value
                                      )
                                    }
                                    // If the date is null, set the value to an empty string
                                    value={safety.date || ""}
                                  />
                                </div>
                              </div>

                              <div className="mt-2">
                                <label htmlFor="comment">Comment:</label>
                                <textarea
                                  style={{
                                    width: "100%",
                                    backgroundColor: "white",
                                    color: "black",
                                    padding: "10px",
                                  }}
                                  rows="2"
                                  placeholder="Write your comment here!"
                                  value={safety.comment_box}
                                  onChange={(e) =>
                                    handleSafetyChange(
                                      index,
                                      "comment_box",
                                      e.target.value
                                    )
                                  }
                                ></textarea>
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={handleAddSafety}
                            className="btn btn-success"
                          >
                            Add SAFETY
                          </button>
                        </div>

                        <div style={{ width: "100%" }}>
                          <label
                            htmlFor="projectName"
                            className="form-label mt-2"
                          >
                            <span>
                              <strong>Schedules</strong>
                            </span>
                          </label>
                          <div className="wholespecificationEntry">
                            <div className="mb-2 mt-3">
                              {ProjectStep6FormData.schedule.map(
                                (myschedule, index) => (
                                  <div
                                    key={index}
                                    className="input-group myrowInputgrouup"
                                  >
                                    <select
                                      className="form-select"
                                      aria-label="Select Specification"
                                      value={myschedule.status}
                                      onChange={(e) => {
                                        handleScheduleChange(
                                          index,
                                          "status",
                                          e.target.value
                                        );
                                        // If the selected status is not "Available", set the date to an empty string
                                        if (e.target.value !== "Available") {
                                          handleScheduleChange(
                                            index,
                                            "date",
                                            ""
                                          );
                                        }
                                      }}
                                    >
                                      <option value="">Select Choice</option>
                                      <option value="Available">
                                        Available
                                      </option>
                                      <option value="Not Available">
                                        Not Available
                                      </option>
                                    </select>

                                    <input
                                      type="date"
                                      className="form-control"
                                      placeholder="Due Date"
                                      // Disable the input if the status is not "Available"
                                      disabled={
                                        myschedule.status !== "Available"
                                      }
                                      value={myschedule.date || ""}
                                      onChange={(e) =>
                                        handleScheduleChange(
                                          index,
                                          "date",
                                          e.target.value
                                        )
                                      }
                                    />

                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() =>
                                        handleRemoveSchedule(index)
                                      }
                                    >
                                      <i className="far">X</i>
                                    </button>
                                  </div>
                                )
                              )}
                            </div>
                            <button
                              type="button"
                              className="btn btn-success bk"
                              onClick={handleAddSchedule}
                            >
                              <i className="fa-regular icon fa-plus"></i>
                            </button>
                          </div>
                        </div>

                        <div style={{ width: "100%" }}>
                          <label
                            htmlFor="projectName"
                            className="form-label mt-2"
                          >
                            <span>
                              <strong>Sub Contractors</strong>
                            </span>
                          </label>
                          {ProjectStep6FormData.sub_contractors.map(
                            (subContractor, index) => (
                              <div
                                key={index}
                                className="wholespecificationEntry"
                              >
                                <div className="ScopofWorkSectionRemove">
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleRemoveSubContractors}
                                  >
                                    <i className="far">X</i>
                                  </button>
                                </div>
                                <div
                                  className="mb-2 mt-4"
                                  style={{ width: "100%" }}
                                >
                                  <div>
                                    <label className="form-label">
                                      <span>Sub Contractors:</span>
                                    </label>
                                    <div className="input-group">
                                      <select
                                        className="form-select"
                                        placeholder="Contract"
                                        value={subContractor.contract}
                                        onChange={(e) => {
                                          handleSubContractorChange(
                                            index,
                                            "contract",
                                            e.target.value
                                          );
                                          // If the selected contract is neither "Capable" nor "Custom", set the date to null
                                          if (
                                            e.target.value !== "Capable" &&
                                            e.target.value !== "Custom"
                                          ) {
                                            handleSubContractorChange(
                                              index,
                                              "date",
                                              null
                                            );
                                          }
                                        }}
                                      >
                                        <option value="">Select Choice</option>
                                        <option value="Capable">Capable</option>
                                        <option value="Not Capable">
                                          Not Capable
                                        </option>
                                        <option value="Custom">Custom</option>
                                        {/* Add more options here */}
                                      </select>
                                      <input
                                        type="date"
                                        name={`subContractorDate-${index}`} // Use a unique name
                                        className="form-control"
                                        // Disable the input if the contract is neither "Capable" nor "Custom"
                                        disabled={
                                          subContractor.contract !==
                                            "Capable" &&
                                          subContractor.contract !== "Custom"
                                        }
                                        onChange={(e) =>
                                          handleSubContractorChange(
                                            index,
                                            "date",
                                            e.target.value
                                          )
                                        }
                                        // If the date is null, set the value to an empty string
                                        value={subContractor.date || ""}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <label htmlFor="comment">Comment:</label>
                                  <textarea
                                    style={{
                                      width: "100%",
                                      backgroundColor: "white",
                                      color: "black",
                                      padding: "10px",
                                    }}
                                    rows="2"
                                    placeholder="Write your comment here!"
                                    value={subContractor.comment}
                                    onChange={(e) =>
                                      handleSubContractorChange(
                                        index,
                                        "comment",
                                        e.target.value
                                      )
                                    }
                                  ></textarea>
                                </div>
                              </div>
                            )
                          )}
                          <button
                            type="button"
                            onClick={handleAddSubContractors}
                            className="btn btn-success"
                          >
                            Add SUB_CONTRACTOR
                          </button>
                        </div>
                      </>
                    )}

                    {projectactiveStep === 6 && (
                      <>
                        <div className="mt-3">
                          <div style={{ width: "100%" }}>
                            <label
                              htmlFor="projectName"
                              className="form-label mt-2"
                            >
                              <span>
                                <strong>Labor Rates</strong>
                              </span>
                            </label>
                            {ProjectStep7FormData.labor_rate.map(
                              (laborRate, index) => (
                                <div
                                  key={index}
                                  className="wholespecificationEntry"
                                >
                                  <div className="ScopofWorkSectionRemove">
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() =>
                                        handleRemoveLaborRate(index)
                                      }
                                    >
                                      <i className="far">X</i>
                                    </button>
                                  </div>

                                  <div className="mb-2 mt-4">
                                    <div style={{ width: "100%" }}>
                                      <label className="form-label">
                                        <span>Labor Rate:</span>
                                      </label>
                                      <div className="input-group">
                                        <select
                                          className="form-select"
                                          placeholder="Contract"
                                          value={laborRate.status}
                                          onChange={(e) => {
                                            handleLaborRateChange(
                                              index,
                                              "status",
                                              e.target.value
                                            );

                                            // If the selected status is neither "Approved" nor "Custom", set the date to null
                                            if (
                                              e.target.value !== "Approved" &&
                                              e.target.value !== "Custom"
                                            ) {
                                              handleLaborRateChange(
                                                index,
                                                "date",
                                                null
                                              );
                                            }
                                          }}
                                        >
                                          <option value="">
                                            Select Choice
                                          </option>
                                          <option value="Pending">
                                            Pending
                                          </option>
                                          <option value="Approved">
                                            Approved
                                          </option>
                                          <option value="Custom">Custom</option>
                                        </select>
                                        <input
                                          type="date"
                                          name={`laborRateDate-${index}`}
                                          className="form-control"
                                          // Disable the input if the status is neither "Approved" nor "Custom"
                                          disabled={
                                            laborRate.status !== "Approved" &&
                                            laborRate.status !== "Custom"
                                          }
                                          onChange={(e) =>
                                            handleLaborRateChange(
                                              index,
                                              "date",
                                              e.target.value
                                            )
                                          }
                                          // If the date is null, set the value to an empty string
                                          value={laborRate.date || ""}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mt-2">
                                    <label htmlFor="comment">Comment:</label>
                                    <textarea
                                      style={{
                                        width: "100%",
                                        backgroundColor: "white",
                                        color: "black",
                                        padding: "10px",
                                      }}
                                      rows="2"
                                      value={laborRate.comment_box}
                                      onChange={(e) =>
                                        handleLaborRateChange(
                                          index,
                                          "comment_box",
                                          e.target.value
                                        )
                                      }
                                      placeholder="Write your comment here!"
                                    ></textarea>
                                  </div>
                                </div>
                              )
                            )}

                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={handleAddLaborRate}
                            >
                              Add Labor Rate
                            </button>
                          </div>

                          <div style={{ width: "100%" }}>
                            <label
                              htmlFor="projectName"
                              className="form-label mt-2"
                            >
                              <span>
                                <strong>Billings</strong>
                              </span>
                            </label>
                            <div className="wholespecificationEntry">
                              {ProjectStep7FormData.billing.map(
                                (mybilling, index) => (
                                  <div key={index} className="mb-2 mt-3">
                                    <div className="input-group myrowInputgrouup">
                                      <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Due Date"
                                        value={mybilling.due_date}
                                        onChange={(e) =>
                                          handleBillingChange(
                                            index,
                                            "due_date",
                                            e.target.value
                                          )
                                        }
                                      />
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Add Reduction"
                                        value={mybilling.reduction}
                                        onChange={(e) =>
                                          handleBillingChange(
                                            index,
                                            "reduction",
                                            e.target.value
                                          )
                                        }
                                      />
                                      <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() =>
                                          handleRemoveBilling(index)
                                        }
                                      >
                                        <i className="far">X</i>
                                      </button>
                                    </div>
                                  </div>
                                )
                              )}
                              <button
                                type="button"
                                className="btn btn-success bk"
                                onClick={handleAddBilling}
                              >
                                <i className="fa-regular icon fa-plus"></i>
                              </button>
                            </div>
                          </div>
                          <div style={{ width: "100%" }}>
                            <label
                              htmlFor="projectName"
                              className="form-label mt-2"
                            >
                              <span>
                                <strong>Sovs</strong>
                              </span>
                            </label>
                            <div className="wholespecificationEntry">
                              {ProjectStep7FormData.sov.map((mysov, index) => (
                                <div key={index} className="mb-2 mt-3">
                                  <div className="input-group myrowInputgrouup">
                                    <select
                                      className="form-select"
                                      aria-label="Select Specification"
                                      value={mysov.status}
                                      onChange={(e) => {
                                        handleSovChange(
                                          index,
                                          "status",
                                          e.target.value
                                        );

                                        // If the selected status is not "Approved" or "Custom", set the date to null
                                        if (
                                          e.target.value !== "Approved" &&
                                          e.target.value !== "Custom"
                                        ) {
                                          handleSovChange(index, "date", null);
                                        }
                                      }}
                                    >
                                      <option value="">Select Choice</option>
                                      <option value="Approved">Approved</option>
                                      <option value="Pending">Pending</option>
                                      <option value="Custom">
                                        Custom
                                      </option>{" "}
                                      {/* Assuming you want to add a "Custom" option */}
                                    </select>
                                    <input
                                      type="date"
                                      className="form-control"
                                      placeholder="Due Date"
                                      // Disable the input if the status is not "Approved" or "Custom"
                                      disabled={
                                        mysov.status !== "Approved" &&
                                        mysov.status !== "Custom"
                                      }
                                      // If the date is null, set the value to an empty string
                                      value={mysov.date || ""}
                                      onChange={(e) =>
                                        handleSovChange(
                                          index,
                                          "date",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() => handleRemoveSov(index)}
                                    >
                                      <i className="far">X</i>
                                    </button>
                                  </div>
                                </div>
                              ))}
                              <button
                                type="button"
                                className="btn btn-success bk"
                                onClick={handleAddSov}
                              >
                                <i className="fa-regular icon fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {projectactiveStep === 7 && (
                      <div className="mt-3">
                        <div style={{ width: "100%" }}>
                          <label
                            htmlFor="projectName"
                            className="form-label mt-2"
                          >
                            <span>
                              <strong>HDS Systems</strong>
                            </span>
                          </label>
                          {ProjectStep8FormData.hds_system.map(
                            (myhdsSystem, index) => (
                              <div
                                key={index}
                                className="wholespecificationEntry"
                              >
                                <div className="ScopofWorkSectionRemove">
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleRemoveHDSSystem(index)}
                                  >
                                    <i className="far">X</i>
                                  </button>
                                </div>
                                <div className="mb-2 mt-4">
                                  <div
                                    className="mt-4"
                                    style={{ width: "100%" }}
                                  >
                                    <div>
                                      <label className="form-label">
                                        <span>HDS System</span>
                                      </label>
                                      <div id="" className="input-group">
                                        <select
                                          className="form-select"
                                          placeholder="Contract"
                                          id="ProjectEngineerID"
                                          value={myhdsSystem.status}
                                          onChange={(e) => {
                                            handleHDSChange(
                                              index,
                                              "status",
                                              e.target.value
                                            );

                                            // If the selected status is not "Aproved" or "Custom", set the date to null
                                            if (
                                              e.target.value !== "Aproved" &&
                                              e.target.value !== "Custom"
                                            ) {
                                              handleHDSChange(
                                                index,
                                                "date",
                                                null
                                              );
                                            }
                                          }}
                                        >
                                          <option value="Pending">
                                            Pending
                                          </option>
                                          <option value="Aproved">
                                            Aproved
                                          </option>
                                          <option value="Custom">Custom</option>
                                          <option value="Not Required">
                                            Not Required
                                          </option>
                                        </select>
                                        <input
                                          id=""
                                          type="date"
                                          name="date"
                                          className="form-control"
                                          // Disable the input if the status is neither "Aproved" nor "Custom"
                                          disabled={
                                            myhdsSystem.status !== "Aproved" &&
                                            myhdsSystem.status !== "Custom"
                                          }
                                          onChange={(e) =>
                                            handleHDSChange(
                                              index,
                                              "date",
                                              e.target.value
                                            )
                                          }
                                          // If the date is null, set the value to an empty string
                                          value={myhdsSystem.date || ""}
                                        />
                                      </div>
                                    </div>
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
                                    value={myhdsSystem.comment_box}
                                    onChange={(e) =>
                                      handleHDSChange(
                                        index,
                                        "comment_box",
                                        e.target.value
                                      )
                                    }
                                  ></textarea>
                                </div>
                              </div>
                            )
                          )}
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={handleAddHDSSystem}
                          >
                            Add HDS Systems
                          </button>
                        </div>

                        <div style={{ width: "100%" }}>
                          <label
                            htmlFor="projectName"
                            className="form-label mt-2"
                          >
                            <span><strong>On Uploaded</strong></span>
                          </label>
                          <div className="wholespecificationEntry">
                            <div className="mb-2 mt-3">
                              <label className="form-label">
                                On Uploaded Choice:
                              </label>

                              {ProjectStep8FormData.on_build.map(
                                (ONbuild, index) => (
                                  <div
                                    key={index}
                                    className="input-group myrowInputgrouup"
                                  >
                                    <select
                                      className="form-select"
                                      aria-label="Select Specification"
                                      value={ONbuild.field}
                                      onChange={(e) =>
                                        handleOnBuildChange(
                                          index,
                                          "field",
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option value="">Select Choice</option>
                                      <option value="Addendum">Addendum</option>
                                      <option value="Bid Proposal">
                                        Bid Proposal
                                      </option>
                                      <option value="Specs">Specs</option>
                                      <option value="Contract">Contract</option>
                                      <option value="Submitile">
                                        Submitile
                                      </option>
                                      <option value="Safety">Safety</option>
                                      <option value="Shop Drawing">
                                        Shop Drawing
                                      </option>
                                      <option value="Budget">Budget</option>
                                    </select>
                                    <select
                                      className="form-select"
                                      aria-label="Select Specification"
                                      value={ONbuild.status}
                                      onChange={(e) =>
                                        handleOnBuildChange(
                                          index,
                                          "status",
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option value="">Select Choice</option>
                                      <option value="Upload">Upload</option>
                                      <option value="Pending">Pending</option>
                                    </select>
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() => handleRemoveOnBuild(index)}
                                    >
                                      <i className="far">X</i>
                                    </button>
                                  </div>
                                )
                              )}
                            </div>
                            <button
                              type="button"
                              className="btn btn-success bk"
                              onClick={handleAddOnBuild}
                            >
                              <i className="fa-regular icon fa-plus"></i>
                            </button>
                          </div>
                        </div>
                        <div style={{ width: "100%" }}>
                          <label
                            htmlFor="projectName"
                            className="form-label mt-2"
                          >
                            <span><strong>Bugets</strong></span>
                          </label>
                          <div className="wholespecificationEntry">
                            <div className="mb-2 mt-3">
                              <label className="form-label">Labor Rate:</label>

                              {ProjectStep8FormData.buget.map(
                                (mybudget, index) => (
                                  <div
                                    key={index}
                                    className="input-group myrowInputgrouup"
                                  >
                                    <select
                                      className="form-select"
                                      aria-label="Select Specification"
                                      value={mybudget.status}
                                      onChange={(e) =>
                                        handleBudgetChange(
                                          index,
                                          "status",
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option value="">Select Choice</option>
                                      <option value="Done">Done</option>
                                      <option value="Pending">Pending</option>
                                      <option value="Custom">Custom</option>
                                    </select>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Comment"
                                      value={mybudget.comment_box}
                                      onChange={(e) =>
                                        handleBudgetChange(
                                          index,
                                          "comment_box",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() => handleRemoveBudget(index)}
                                    >
                                      <i className="far">X</i>
                                    </button>
                                  </div>
                                )
                              )}
                            </div>
                            <button
                              type="button"
                              className="btn btn-success bk"
                              onClick={handleAddBudget}
                            >
                              <i className="fa-regular icon fa-plus"></i>
                            </button>
                          </div>
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

      {/* New Estimating Entry Posting-Code */}
      {showModal && (
        <div
          className={`modal-container bg-white pt-5 ps-2 ${
            showModal ? "show" : ""
          }`}
        >
          <h4 className="text-center addnewtxt text-primary textestimatinghead">
            Estimating
          </h4>
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
                    value={companyName}
                    onChange={handleCompanyNameChange}
                  >
                    <option value="">Select Company</option>
                    {fetchcompanyName && fetchcompanyName.length > 0 ? (
                      fetchcompanyName.map((companyItem) => (
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
                  <div className="d-flex">
                    <input
                      type="time"
                      className="form-control createTime"
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
                      <option value="">TimeZone</option>
                      <option value="PDT">PDT</option>
                      <option value="CT">CT</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="bothDiv">
                <div>
                  <label htmlFor="bidderName" className="Oneline form-label">
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
                <div>
                  <label htmlFor="bidderName" className="Oneline form-label">
                    Bidder Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="bidderName"
                    value={bidderEmail}
                    onChange={handleBidderEmailChange}
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
              {showPopup && (
                <div className="modal-overlay">
                  <div id="popup" className="popup">
                    <p>
                      Congratulations! You Add the Estimating Successfully.{" "}
                    </p>
                  </div>
                </div>
              )}
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
                    value={formattedStartDate ? formattedStartDate : "No Date"}
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
                    value={selectedCompany ? selectedCompany : "No Company"}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                  >
                    <option value="No Company">No Company</option>
                    {fetchcompanyName && fetchcompanyName.length > 0 ? (
                      fetchcompanyName.map((companyItem) => (
                        <option
                          value={companyItem.Cmpny_Name}
                          key={companyItem.id}
                        >
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
                  }
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
                    value={selectedEstimator}
                    onChange={(e) => setSelectedEstimator(e.target.value)}
                  >
                    <option value="No Estimator">No Estimator</option>
                    {EstimatorName && EstimatorName.length > 0 ? (
                      EstimatorName.map((user) => (
                        <option value={user.full_Name} key={user.id}>
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
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="No Location">No Location</option>
                    {userLocation && userLocation.length > 0 ? (
                      userLocation.map((place) => (
                        <option value={place.name} key={place.id}>
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
                    value={formattedDueDate}
                    onChange={(e) => setSelecteddueDate(e.target.value)}
                  />
                </div>
                <div className="Oneline timefield">
                  <label htmlFor="time" className="form-label">
                    Time:
                  </label>
                  <div className="d-flex ">
                    <input
                      type="time"
                      className="form-control edittime"
                      value={SelectedTimeforUpdate}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    />

                    <select value={SelectedTimeZone} className="selectpicker">
                      <option value={SelectedTimeZone}>
                        {SelectedTimeZone}
                      </option>
                      <option value="PDT">PDT</option>
                      <option value="CT">CT</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bothDiv">
                <div className="Oneline">
                  <label htmlFor="bidderName" className="form-label">
                    Bidder Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="No Bidder Here !"
                    id="bidderName"
                    value={selectedBidder}
                    onChange={(e) => setSelectedBidder(e.target.value)}
                  />
                </div>
                <div className="Oneline">
                  <label htmlFor="bidderEmail" className="form-label">
                    Bidder Email:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bidder Email !"
                    id="bidderEmail"
                    value={selectedbidder_email}
                    onChange={(e) => setSelectedbidder_email(e.target.value)}
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
                  placeholder="No Address Here !"
                  cols="10"
                  rows="10"
                  value={selectedbidder_detail}
                  onChange={(e) => setSelectedbidder_detail(e.target.value)}
                ></textarea>
              </div>

              <button
                type="button"
                onClick={(event) => handleEstimatingEditing(event, itemId)}
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
              BackdropProps={{ onClick: null }}
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
                                estimating_id: e.target.value,
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
                                name="addendum_number" // Set the name attribute to differentiate
                                className="form-control"
                                value={
                                  step1FormData.Addendums?.[index]
                                    ?.addendum_number || ""
                                }
                                onChange={(e) => {
                                  const { name, value } = e.target;
                                  setStep1FormData((prevState) => {
                                    const newAddendumEntries = [
                                      ...(prevState.Addendums || []), // Ensure Addendums is an array
                                    ];
                                    const updatedAddendum = {
                                      ...(newAddendumEntries[index] || {}), // Get the existing Addendum or an empty object
                                      [name]: value, // Dynamically set the field (addendum_number)
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
                                // value={formatNumberWithCommas(entry.budget)}
                                value={entry.budget}
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
                                      type="number"
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
                              >kkk
                                <i className="fa-regular icon fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={handleAddEntry}
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