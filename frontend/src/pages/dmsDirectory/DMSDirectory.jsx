import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import "./DMSDirectory.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Multiselect from "multiselect-react-dropdown";
// import "react-multiple-select-dropdown-lite/dist/index.css";
import "react-multiple-select-dropdown-lite/dist/index.css";


const DMSDirectory = () => {
  const [usersInfo, setUsersInfo] = useState([]);
  const [DMSUserDirectory, setDMSUserDirectory] = useState([]);
  const [search, setSearch] = useState("");
  const [filterusers, setFilterUsers] = useState([]);

  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const result = await axios.get(
        "http://127.0.0.1:8000/api/estimating/dmsDrectory/"
      );
      setUsersInfo(result.data);
      setFilterUsers(result.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  function formatMobileNumber(mobileNumber) {
    // Check if mobileNumber is null or undefined
    if (mobileNumber === null || mobileNumber === undefined) {
        return ""; // or some other default value or behavior
    }

    // Ensure mobileNumber is a string
    const mobileNumberToString = mobileNumber.toString();

    // Remove all non-numeric characters from the mobile number
    const numericOnly = mobileNumberToString.replace(/\D/g, "");

    // Check if the numericOnly string has at least 6 characters
    if (numericOnly.length >= 6) {
        // Use a regular expression to insert hyphens every 3 digits from the left
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

  // 0
  // : 
  // "Estimator"
  // 1
  // : 
  // "Project Engineer"
  // 2
  // : 
  // "Project Manager"
  // 3
  // : 
  // "Foreman"
  // 4
  // : 
  // "Estimating Manager"
  // 5
  // : 
  // "Manager PR"
  // 6
  // : 
  // "Scheduling Manager / Pre-Construction Engineer"
  // 7
  // : 
  // "So. Cal. General Manager"
  // 8
  // : 
  // "Taping FM"
  // 9
  // : 
  // "Driver"
  // 10
  // : 
  // "No. Cal. General Manager"
  // 11
  // : 
  // "Vice President"
  // 12
  // : 
  // "HR & Payroll Manager"
  // 13
  // : 
  // "Field Management"
  // 14
  // : 
  // "Proconstruction Manager"
  // 15
  // : 
  // "Scheduler"
  // 16
  // : 
  // "Foreman (Assistant)"
  // 17
  // : 
  // "General Superintendent"
  // 18
  // : 
  // "BIM/Manager PR"
  // 19
  // : 
  // "BIM Modeler/Trimble Operator"
  // 20
  // : 
  // "Taping Foreman"
  // 21
  // : 
  // "Journeyman"
  // 22
  // : 
  // "CFO"
  // 23
  // : 
  // "Owner"
  // 24
  // : 
  // "Hotel Reservations"
  // 25
  // : 
  // "President"
  // 26
  // : 
  // "Payroll Assistant"
  // 27
  // : 
  // "BIM"

  const [JobNames, setJobNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/estimating/jobtitle/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const jobNames = data.map((item) => item.name);
        console.log(jobNames);
        setJobNames(jobNames);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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

  const alldepartments = [
    {
      id: 1,
      dapartname: "Accounting",
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

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [myemail, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [mylocation, setLocation] = useState("");
  const [directnumber, setDirectnumber] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [mydepartment, setDepartment] = useState("");
  const [selectedJobTitles, setSelectedJobTitles] = useState([]);


  const handleDepartment = (e) => {
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

  const handleCompanyNameChange = (e) => {
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

  const handledirectorySubmit = (event) => {
    event.preventDefault();
    // Create a data object with the form values
    const formData = {
      first_name: firstname,
      last_name: lastname,
      email: myemail,
      company: company,
      department: mydepartment.toString(),
      location: mylocation,
      direct_number: directnumber,
      mobile_number: mobilenumber,
      job_title: selectedJobTitles, // Use the selectedJobTitles array
    };
    
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
                    <Multiselect
  options={JobNames.map((job, index) => ({ value: String(index + 1), label: job }))}
  isObject={false}
  showCheckbox
  onRemove={(selected) => {
    setSelectedJobTitles(selected.map((item) => String(item.value)));
  }}
  onSelect={(selected) => {
    setSelectedJobTitles(selected.map((item) => String(item.value)));
  }}
/>



                      {/* <select name="test" id="test" className="form-control">
  <option value="--">Select Option</option>
  <option value="1">Option1</option>
  <option value="2">Option2</option>
</select> */}

                      {/* <div className="preview-values">
                        {JobNames.map((job) => (
                          <div key={job.id}>{job.name}</div>
                        ))}
                      </div> */}
                      {/* <MultiSelect
                        onChange={handleJobTitle}
                        options={JobNames.map((option) => ({
                          value: option.id,
                          label: option.name,
                        }))}
                        value={jobTitles} // The selected job titles are managed in the jobTitles state
                        className="w-100"
                        placeholder="Select Job Title"
                      /> */}
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
