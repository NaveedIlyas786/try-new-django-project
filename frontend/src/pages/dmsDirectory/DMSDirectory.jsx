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

  // const [search, setSearch] = useState("");
  useEffect(() => {
    const mysearchresult = usersInfo.filter((user) => {
      const alldetails = `${user.first_name} ${user.last_name} ${user.locaton} ${user.job_title} ${user.company} ${user.department} ${user.mobile_number} ${user.direct_number} ${user.email}`;
      return alldetails.toLowerCase().includes(search.toLowerCase());
    });
    setFilterUsers(mysearchresult);
  }, [search]);

  // *******************************To show Job Title Names in dropdown***************

  const allJobTitles=[
{
      id:1,
  jobName:"Estimator"
},
{
  id:2,
  jobName:"Project Engineer"
},
{
  id:4,
  jobName:"Project Manager"
},
{
  id:5,
  jobName:"Foreman"
},
{
  id:6,
  jobName:"Estimating Manager"
},
{
  id:7,
  jobName:"Manager PR"
},
{
  id:8,
  jobName:"Scheduling Manager / Pre-Construction Engineer"
},
{
  id:9,
  jobName:"So. Cal. General Manager"
},
{
  id:10,
  jobName:"Taping FM"
},
{
  id:11,
  jobName:"Driver"
},
{
  id:12,
  jobName:"No. Cal. General Manager"
},
{
  id:13,
  jobName:"Vice President"
},
{
  id:14,
  jobName:"HR & Payroll Manager"
},
{
  id:15,
  jobName:"Field Management"
},
{
  id:16,
  jobName:"Proconstruction Manager"
},
{
  id:17,
  jobName:"Scheduler"
},
{
  id:18,
  jobName:"Foreman (Assistant)"
},
{
  id:19,
  jobName:"General Superintendent"
},
{
  id:20,
  jobName:"BIM/Manager PR"
},
{
  id:21,
  jobName:"BIM Modeler/Trimble Operator"
},
{
  id:22,
  jobName:"Taping Foreman"
},
{
  id:23,
  jobName:"Journeyman"
},
{
  id:24,
  jobName:"CFO"
},
{
  id:25,
  jobName:"Owner"
},
{
  id:26,
  jobName:"Hotel Reservations"
},
{
  id:27,
  jobName:"President"
},
{
  id:28,
  jobName:"Payroll Assistant"
},
{
  id:29,
  jobName:"BIM"
},
  ]

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
  const [myjobTitle, setjobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [mylocation, setLocation] = useState("");
  const [directnumber, setDirectnumber] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [mydepartment, setDepartment] = useState("");


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

   const handlejobTitleChange = (e) => {
     setjobTitle(e.target.value);
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
      job_title: parseInt(myjobTitle,10),
      company: company,
      department: mydepartment.toString(),
      location: mylocation,
      direct_number: directnumber,
      mobile_number: mobilenumber,
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
        setLocation("");
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
                    <select
                      className="form-select"
                      id="companyName"
                      value={myjobTitle}
                      onChange={handlejobTitleChange}
                    >
                      <option value="">Select Job</option>
                      {allJobTitles.map((myjobs) => (
                        <option key={myjobs.id} value={myjobs.id}>
                          {myjobs.jobName}
                        </option>
                      ))}

                      {/* <option value="">Select Job Title</option>
                      <option value="Estimator">Estimator</option>
                      <option value="Project Engineer">Project Engineer</option>
                      <option value="Project Manager "> Project Manager  </option>
                      <option value="Foreman "> Foreman  </option>
                      <option value="Estimating Manager "> Estimating Manager  </option>
                      <option value="Manager PR "> Manager PR </option>
                      <option value="Scheduling Manager / Pre-Construction Engineer ">Scheduling Manager / Pre-Construction Engineer   </option>
                      <option value="So. Cal. General Manager "> So. Cal. General Manager  </option>
                      <option value="Taping FM "> Taping FM  </option>
                      <option value="Driver "> Driver  </option>
                      <option value="No. Cal. General Manager "> No. Cal. General Manager  </option>
                      <option value="Vice President ">Vice President   </option>
                      <option value="HR & Payroll Manager "> HR & Payroll Manager  </option>
                      <option value="Field Management "> Field Management  </option>
                      <option value="Proconstruction Manager ">Proconstruction Manager   </option>
                      <option value="Scheduler "> Scheduler  </option>
                      <option value="Foreman (Assistant) "> Foreman (Assistant)  </option>
                      <option value="General Superintendent "> General Superintendent  </option>
                      <option value=" BIM/Manager PR"> BIM/Manager PR  </option>
                      <option value="BIM Modeler/Trimble Operator "> BIM Modeler/Trimble Operator  </option>
                      <option value="Taping Foreman "> Taping Foreman  </option>
                      <option value="Journeyman "> Journeyman  </option>
                      <option value="CFO "> CFO  </option>
                      <option value="Owner "> Owner  </option>
                      <option value="Hotel Reservations "> Hotel Reservations  </option>
                      <option value="President ">President</option>
                      <option value="Payroll Assistant "> Payroll Assistant </option>
                      <option value="BIM"> BIM </option> */}
                      
                    </select>



                      
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
