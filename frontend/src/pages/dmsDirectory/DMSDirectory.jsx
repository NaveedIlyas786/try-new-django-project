import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import "./DMSDirectory.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const closeModal = () => {
    setShowModal(false);

    // Remove the 'modal-active' class when the modal is closed
    document.body.classList.remove("modal-active");
  };

  // *******************************For New Entry Creation***************

  //************ To show Company Names in dropdown in estimating post field

  const [companyName, setCompanyName] = useState([]);

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

  const [firstname, setFirstName] = useState("");
  const [jobtitle, setJobTitle] = useState("");
  const [lastname, setLastName] = useState("");
  const [myemail, setEmail] = useState("");
  const [mycompany, setCompany] = useState("");
  const [mylocation, setLocation] = useState("");
  const [mydepartment, setDepartment] = useState("");
  const [directnumber, setDirectnumber] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleIJobTitle = (e) => {
    setJobTitle(e.target.value);
  };
  const handleCompany = (e) => {
    setCompany(e.target.value);
  };
  const handleDepartment = (e) => {
    setDepartment(e.target.value);
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
    event.preventDefault(); // Prevent the default form submission behavior

    // Create a data object with the form values
    const formData = {
      first_name: firstname,
      last_name: lastname,
      email: myemail,
      job_title: [jobtitle],
      company: parseInt(mycompany, 10),
      locaton: mylocation,
      department: parseInt(mydepartment, 10),
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
        setFirstName(""),
          setLastName(""),
          setCompany(""),
          setDepartment(""),
          setDirectnumber(""),
          setMobilenumber(""),
          setJobTitle(""),
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

  return (
    <>
      <div className="datatable Parent px-5 table-responsive">
        <div className="custom-data-table">
          <DataTable
            title="DMS Directory"
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
              <div className="d-flex mb-3">
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
                    <select
                      className="form-select"
                      id="jobname"
                      value={jobtitle}
                      onChange={handleIJobTitle}
                    >
                      <option value="">Select Job</option>
                      <option value="BIM">BIM</option>
                      <option value="Owner">Owner</option>
                      <option value="Foreman">Foreman</option>
                      <option value="Estimator">Estimator</option>
                      <option value="President">President</option>
                      <option value="Vice President">Vice President</option>
                      <option value="BIM/Manager PR">BIM/Manager PR</option>
                      <option value="Project Manager">Project Manager</option>
                      <option value="Field Management">Field Management</option>
                      <option value="Project Engineer">Project Engineer</option>
                      <option value="Estimating Manager">
                        Estimating Manager
                      </option>
                      <option value="General Superintendent">
                        General Superintendent
                      </option>
                      <option value="Proconstruction Manager">
                        Proconstruction Manager
                      </option>
                      <option value="No. Cal. General Manager">
                        No. Cal. General Manager
                      </option>
                      <option value="So. Cal. General Manager">
                        So. Cal. General Manager
                      </option>
                      <option value="BIM Modeler/Trimble Operator">
                        BIM Modeler/Trimble Operator
                      </option>
                      <option value="Scheduling Manager / Pre-Construction Engineer">
                        Scheduling Manager / Pre-Construction Engineer
                      </option>
                    </select>
                  </div>
                  <div className="Oneline">
                    <label htmlFor="companyName" className="form-label">
                      Company
                    </label>
                    <select
                      className="form-select"
                      id="companyName"
                      value={mycompany}
                      onChange={handleCompany}
                    >
                      <option value="">Select Company Name</option>
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
                      value={mydepartment}
                      onChange={handleDepartment}
                    >
                      <option value="">Select Department</option>
                      <option value="BIM">BIM</option>
                      <option value="Field">Field</option>
                      <option value="Precon">Precon</option>
                      <option value="Management">Management</option>
                      <option value="Estimating">Estimating</option>
                      <option value="Project Management">
                        Project Management
                      </option>
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
