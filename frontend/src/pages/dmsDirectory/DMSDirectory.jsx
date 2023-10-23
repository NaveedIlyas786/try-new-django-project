import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import "./DMSDirectory.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";

const DMSDirectory = () => {
  const [usersInfo, setUsersInfo] = useState([]);
  const [DMSUserDirectory, setDMSUserDirectory] = useState([]);
  const [search, setSearch] = useState("");
  const [filterusers, setFilterUsers] = useState([]);

  const navigate = useNavigate();

  const getUsers = async () => {
    const result = await axios.get(
      "http://127.0.0.1:8000/api/estimating/dmsDrectory/"
    );
    try {
      setUsersInfo(result.data);
      setFilterUsers(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  function formatMobileNumber(mobileNumber) {
    // Ensure mobileNumber is a string
    const mobileNumbertoString = mobileNumber + "";

    // Remove all non-numeric characters from the mobile number
    const numericOnly = mobileNumbertoString.replace(/\D/g, "");

    // Check if the numericOnly string has at least 6 characters
    if (numericOnly.length >= 6) {
      // Use regular expression to insert hyphens every 3 digits from the left
      return numericOnly.replace(/(\d{3})(?=\d{3})/g, "$1-");
    } else {
      // If the string is less than 6 characters, return it as is
      return numericOnly;
    }
  }

  const Columns = [
    {
      name: (
        <strong
          className="headersTitle"
          style={{ textAlign: "center", width: "80px" }}
        >
          Last Name
        </strong>
      ),
      selector: (row) => row.last_name,
      sortable: true,
      center: true,
    },
    {
      name: (
        <strong className="headersTitle" style={{ textAlign: "center" }}>
          First Name
        </strong>
      ),
      selector: (row) => row.first_name,
      sortable: true,
      center: true,
    },
    {
      name: (
        <strong className="headersTitle" style={{ textAlign: "center" }}>
          Job Title
        </strong>
      ),
      selector: (row) => row.job_title,
      sortable: true,
      center: true,
    },

    {
      name: (
        <strong
          className="headersTitle"
          style={{ textAlign: "center", width: "250px" }}
        >
          Company
        </strong>
      ),
      selector: (row) => <p className="companyTD">{row.company}</p>,
      sortable: true,
      center: true,
    },
    {
      name: (
        <strong className="headersTitle" style={{ textAlign: "center" }}>
          Location
        </strong>
      ),
      selector: (row) => row.locaton,
      sortable: true,
      center: true,
    },
    {
      name: (
        <strong className="headersTitle" style={{ textAlign: "center" }}>
          Department
        </strong>
      ),
      selector: (row) => row.department,
      sortable: true,
      center: true,
    },

    {
      name: (
        <strong className="headersTitle" style={{ textAlign: "center" }}>
          Mobile
        </strong>
      ),
      selector: (row) => formatMobileNumber(row.mobile_number),
      sortable: true,
      center: true,
    },
    {
      name: (
        <strong className="headersTitle" style={{ textAlign: "center" }}>
          Direct
        </strong>
      ),
      selector: (row) => formatMobileNumber(row.direct_number),
      sortable: true,
      center: true,
    },
    {
      name: (
        <strong
          className="headersTitle"
          style={{ textAlign: "center", width: "300px" }}
        >
          Email
        </strong>
      ),
      selector: (row) => <p className="emailTD">{row.email}</p>,
      sortable: true,
      center: true,
    },
  ];

  useEffect(() => {
    const mysearchresult = usersInfo.filter((user) => {
      const alldetails = `${user.first_name} ${user.last_name} ${user.locaton} ${user.job_title} ${user.company} ${user.department} ${user.mobile_number} ${user.direct_number} ${user.email}`;
      return alldetails.toLowerCase().includes(search.toLowerCase());
    });
    setFilterUsers(mysearchresult);
  }, [search]);



  // *******************************To show Job Title Names in dropdown***************

  const [JobNames, setJobNames] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/estimating/jobtitle/")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setJobNames(data);
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
        console.log(data);
        setCompanyName(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [value, setvalue] = useState("");

  const handleOnchange = (val) => {
    setvalue(val);
  };

  const alldepartments = [
    {
      id: 1,
      dapartname: "Acounting",
    },
    {
      id: 2,
      dapartname: "BIM",
    },
    {
      id: 3,
      dapartname: "Estimating",
    },
    {
      id: 4,
      dapartname: "Field",
    },
    {
      id: 5,
      dapartname: "Hotel Reservations",
    },
    {
      id: 6,
      dapartname: "Management",
    },
    {
      id: 7,
      dapartname: "Payroll",
    },
    {
      id: 8,
      dapartname: "Precon",
    },
    {
      id: 9,
      dapartname: "Project Management",
    },
    {
      id: 10,
      dapartname: "Scheduling",
    },
  ];

  // const options = [
  //   { label: "BIM", value: "BIM" },
  //   { label: "Owner", value: "Owner" },
  //   { label: "Foreman", value: "Foreman" },
  //   { label: "Estimator", value: "Estimator" },

  //   { label: "President", value: "President" },
  //   { label: "Vice President", value: "Vice President" },
  //   { label: "BIM/Manager PR", value: "BIM/Manager PR" },
  //   { label: "Project Manager", value: "Project Manager" },
  //   { label: "Field Management", value: "Field Management" },
  //   { label: "Project Engineer", value: "Project Engineer" },
  //   { label: "Estimating Manager", value: "Estimating Manager" },
  //   { label: "General Superintendent", value: "General Superintendent" },
  //   { label: "Proconstruction Manager", value: "Proconstruction Manager" },
  //   { label: "No. Cal. General Manager", value: "No. Cal. General Manager" },
  //   { label: "So. Cal. General Manager", value: "So. Cal. General Manager" },
  //   {
  //     label: "BIM Modeler/Trimble Operator",
  //     value: "BIM Modeler/Trimble Operator",
  //   },
  //   {
  //     label: "Scheduling Manager / Pre-Construction Engineer",
  //     value: "Scheduling Manager / Pre-Construction Engineer",
  //   },
  // ];
  const [firstname, setFirstName] = useState("");
  // const [jobTitles, setJobTitles] = useState([]);
  const [lastname, setLastName] = useState("");
  const [myemail, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [mylocation, setLocation] = useState("");
  const [directnumber, setDirectnumber] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");

  const [mydepartment, setDepartment] = useState("");

  const handleDepartment = (e) => {
    console.log(e.target.value);
    setDepartment(e.target.value);
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // const handleJobTitle = (e) => {
  //   const selectedOptions = Array.from(jobTitles).map((option) =>
  //     parseInt(option.value, 10)
  //   );
  //   setJobTitles(selectedOptions);
  // };

  // const handleJobTitle = (selectedJobTitle) => {
  //   // Check if the selected job title is already in jobTitles
  //   const isSelected = jobTitles.some((job) => job.id === selectedJobTitle.id);
  
  //   if (isSelected) {
  //     // If selected job title is already in jobTitles, remove it
  //     const updatedJobTitles = jobTitles.filter((job) => job.id !== selectedJobTitle.id);
  //     setJobTitles(updatedJobTitles);
  //   } else {
  //     // If selected job title is not in jobTitles, add it
  //     setJobTitles([...jobTitles, selectedJobTitle]);
  //   }
  // };

  

  const handleCompanyNameChange = (e) => {
    console.log(e.target.value);

    setCompany(e.target.value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };
  const handleDirectnumber = (e) => {
    setDirectnumber(e.target.value);
  };
  const handleMobileNumber = (e) => {
    setMobilenumber(e.target.value);
  };
  
  const [jobTitles, setJobTitles] = useState([]);

  const handleJobTitle = (selectedJobTitle) => {
    const isSelected = jobTitles.some((job) => job.id === selectedJobTitle.id);
  
    if (isSelected) {
      const updatedJobTitles = jobTitles.filter((job) => job.id !== selectedJobTitle.id);
      setJobTitles(updatedJobTitles);
    } else {
      setJobTitles([...jobTitles, selectedJobTitle]);
    }
  };
  
  
  
  
  
  const handledirectorySubmit = (event) => {
    event.preventDefault();
    
// Create a data object with the form values
const formData = {
  first_name: firstname,
  last_name: lastname,
  email: myemail,
  company: company,
  department: mydepartment.toString(),
  locaton: mylocation,
  direct_number: directnumber,
  mobile_number: mobilenumber,
};

// Map the selected job titles to get their IDs
const selectedJobTitleIDs = jobTitles.map((jobTitle) => jobTitle.id);

// Set the job_title field in formData with the selected job title IDs
formData.job_title = selectedJobTitleIDs;
  
    console.log("formData before sending the POST request:", formData);
    // Send a POST request to the API
    axios
      .post("http://127.0.0.1:8000/api/estimating/dmsDrectory/", formData)
      .then((response) => {
        // Handle the response if needed
        console.log("Data successfully submitted:", response.data);
        // You can also reset the form fields here if needed
        setFirstName("");
        setLastName("");
        setCompany("");
        setDepartment("");
        setDirectnumber("");
        setMobilenumber("");
        setJobTitles([]);
        setEmail("");
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

  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const closeModal = () => {
    setShowModal(false);
    setFirstName("");
    setLastName("");
    setCompany("");
    setDepartment("");
    setDirectnumber("");
    setMobilenumber("");
    setJobTitles([]);
    setEmail("");
    // Remove the 'modal-active' class when the modal is closed
    document.body.classList.remove("modal-active");
  };
  
  const movetoEstimatingPage = () => {
    navigate("/homepage/estimating/");
  };
  return (
    <>
      <div className="container dmsmain">
        <div className="row">
          <div className="col">
            <h3 className="text-primary bg-danger">DMS Directory</h3>
          </div>
        </div>
      </div>
      <div className="datatable Parent px-5 table-responsive">
        <div className="custom-data-table">
          <DataTable
            // title="DMS Directory"
            className="px-2"
            columns={Columns}
            data={filterusers}
            fixedHeader
            fixedHeaderScrollHeight="365px"
            selectableRowsHighlight
            highlightOnHover
            pagination // Enable pagination
            paginationPerPage={10} // Set the number of rows per page
            subHeader
            subHeaderComponent={
              <div className="d-flex mb-3 w-100  justify-content-between">
                {/* <div className="d-flex  "> */}
                <div className="my1">
                  <button
                    type="button"
                    onClick={movetoEstimatingPage}
                    className="btn btn-outline-primary backbtn"
                  >
                    <i className="fa-duotone me-2 fa fa-angles-left icons backicon"></i>{" "}
                    Back
                  </button>
                </div>
                <div className="my2  d-flex justify-content-between">
                  {" "}
                  <input
                    type="text"
                    style={{ width: "400px" }}
                    className="form-control form-control-md"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    className="btn btn-primary ms-2 btn-md"
                    onClick={() => setShowModal(true)}
                  >
                    New
                  </button>
                </div>
              </div>
              // </div>
            }
          />
        </div>

        {showModal && (
          <div
            className={`modal-container bg-white pt-5 ps-2 ${
              showModal ? "show" : ""
            }`}
          >
            <h4 className="text-center addnewtxt">DMS Directory</h4>
            <button className="close-btn" onClick={closeModal}></button>
            <div className="modal-content px-5">
              <form onSubmit={handledirectorySubmit} className="MyForm">
                <div className="bothDiv gap-2 mt-5">
                  <div className="Oneline">
                    <label htmlFor="first_name" className="form-label">
                      First Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="first_name"
                      value={firstname}
                      onChange={handleFirstName}
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
                      value={lastname}
                      onChange={handleLastName}
                    />
                  </div>
                  <div className="Oneline">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={myemail}
                      onChange={handleEmail}
                    />
                  </div>
                </div>
                <div className="bothDiv gap-2 mt-2">
                  <div className="Oneline">
                    <label htmlFor="jobname" className="form-label">
                      Job Title
                    </label>
                    <div className="custom-dropdown">
                      {/* <div className="preview-values">
                        {JobNames.map((job) => (
                          <div key={job.id}>{job.name}</div>
                        ))}
                      </div> */}
                      <MultiSelect
                        onChange={handleJobTitle}
                        options={JobNames.map((option) => ({
                          value: option.id,
                          label: option.name,
                        }))}
                        value={jobTitles} // The selected job titles are managed in the jobTitles state
                        className="w-100"
                        placeholder="Select Job Title"
                      />
                    </div>
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
                          {companyName
                            ? "No companies available"
                            : "Loading..."}
                        </option>
                      )}
                    </select>
                  </div>
                </div>
                <div className="bothDiv mt-2">
                  <div className="Oneline">
                    <label htmlFor="email" className="form-label">
                      Department:
                    </label>
                    <select
                      className="form-select"
                      id="email"
                      value={mydepartment} // Make sure mydepartment is a string
                      onChange={handleDepartment}
                    >
                      <option value="">Select Department</option>
                      {alldepartments.map((department) => (
                        <option key={department.id} value={department.id}>
                          {department.dapartname}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="Oneline">
                    <label htmlFor="location" className="form-label">
                      Location:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="location"
                      value={mylocation}
                      onChange={handleLocation}
                    />
                  </div>
                </div>
                <div className="bothDiv mt-2">
                  <div className="Oneline">
                    <label htmlFor="email" className="form-label">
                      Direct:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="direct"
                      value={directnumber}
                      onChange={handleDirectnumber}
                    />
                  </div>

                  <div className="Oneline">
                    <label htmlFor="location" className="form-label">
                      Mobile:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="mobile"
                      value={mobilenumber}
                      onChange={handleMobileNumber}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-submit mt-3 mb-4">
                  Add
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default DMSDirectory;
