import React, { useState, useEffect } from "react";
import "./DMSDirectory.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DMSDirectory = () => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [filter, setFilter] = useState("");
  const [DMSUserDirectory, setDMSUserDirectory] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const [isAlphabetical, setIsAlphabetical] = useState(false);
  const [sortState, setSortState] = useState("original");
  const [isRotated, setIsRotated] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/estimating/dmsDrectory/")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setDMSUserDirectory(data);
        setOriginalData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const navigate = useNavigate();

  const filteredData = DMSUserDirectory.filter((customer) => {
    return (
      (customer.first_name &&
        customer.first_name.toUpperCase().includes(filter.toUpperCase())) ||
      (customer.email &&
        customer.email
          .trim()
          .toUpperCase()
          .includes(filter.trim().toUpperCase())) ||
      (customer.mobile_number &&
        customer.mobile_number.toUpperCase().includes(filter.toUpperCase()))
    );
  });

  // *******************************To show Job Title Names in dropdown***************
  const allJobTitles = [
    {
      id: 1,
      jobName: "Estimator",
    },
    {
      id: 2,
      jobName: "Project Engineer",
    },
    {
      id: 4,
      jobName: "Project Manager",
    },
    {
      id: 5,
      jobName: "Foreman",
    },
    {
      id: 6,
      jobName: "Estimating Manager",
    },
    {
      id: 7,
      jobName: "Manager PR",
    },
    {
      id: 8,
      jobName: "Scheduling Manager / Pre-Construction Engineer",
    },
    {
      id: 9,
      jobName: "So. Cal. General Manager",
    },
    {
      id: 10,
      jobName: "Taping FM",
    },
    {
      id: 11,
      jobName: "Driver",
    },
    {
      id: 12,
      jobName: "No. Cal. General Manager",
    },
    {
      id: 13,
      jobName: "Vice President",
    },
    {
      id: 14,
      jobName: "HR & Payroll Manager",
    },
    {
      id: 15,
      jobName: "Field Management",
    },
    {
      id: 16,
      jobName: "Proconstruction Manager",
    },
    {
      id: 17,
      jobName: "Scheduler",
    },
    {
      id: 18,
      jobName: "Foreman (Assistant)",
    },
    {
      id: 19,
      jobName: "General Superintendent",
    },
    {
      id: 20,
      jobName: "BIM/Manager PR",
    },
    {
      id: 21,
      jobName: "BIM Modeler/Trimble Operator",
    },
    {
      id: 22,
      jobName: "Taping Foreman",
    },
    {
      id: 23,
      jobName: "Journeyman",
    },
    {
      id: 24,
      jobName: "CFO",
    },
    {
      id: 25,
      jobName: "Owner",
    },
    {
      id: 26,
      jobName: "Hotel Reservations",
    },
    {
      id: 27,
      jobName: "President",
    },
    {
      id: 28,
      jobName: "Payroll Assistant",
    },
    {
      id: 29,
      jobName: "BIM",
    },
  ];
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
      job_title: parseInt(myjobTitle, 10),
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
  // const [showModal, setShowModal] = useState(false); // State to control modal visibility
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

  const toggleRotation = () => {
    setIsRotated(!isRotated);
  };

  const sortDatajob_title = () => {
    if (isAlphabetical) {
      // Return to the original order
      setDMSUserDirectory(originalData);
    } else {
      // Sort in alphabetical order
      const sortedData = [...DMSUserDirectory].sort((a, b) => {
        const titleA = a.job_title || ""; // Fallback to an empty string if null
        const titleB = b.job_title || ""; // Fallback to an empty string if null
        return titleA.localeCompare(titleB);
      });
      setDMSUserDirectory(sortedData);
    }
    setIsAlphabetical(!isAlphabetical);
  };

  const sortDataFirstName = () => {
    if (isAlphabetical) {
      // Return to the original order
      setDMSUserDirectory(originalData);
    } else {
      // Sort in alphabetical order
      const sortedData = [...DMSUserDirectory].sort((a, b) => {
        const titleA = a.first_name || ""; // Fallback to an empty string if null
        const titleB = b.first_name || ""; // Fallback to an empty string if null
        return titleA.localeCompare(titleB);
      });
      setDMSUserDirectory(sortedData);
    }
    setIsAlphabetical(!isAlphabetical);
  };

  const sortDataLasteName = () => {
    if (isAlphabetical) {
      // Return to the original order
      setDMSUserDirectory(originalData);
    } else {
      // Sort in alphabetical order
      const sortedData = [...DMSUserDirectory].sort((a, b) => {
        const titleA = a.last_name || ""; // Fallback to an empty string if null
        const titleB = b.last_name || ""; // Fallback to an empty string if null
        return titleA.localeCompare(titleB);
      });
      setDMSUserDirectory(sortedData);
    }
    setIsAlphabetical(!isAlphabetical);
  };

  const sortDataCompany = () => {
    if (isAlphabetical) {
      // Return to the original order
      setDMSUserDirectory(originalData);
    } else {
      // Sort in alphabetical order
      const sortedData = [...DMSUserDirectory].sort((a, b) => {
        const titleA = a.company || ""; // Fallback to an empty string if null
        const titleB = b.company || ""; // Fallback to an empty string if null
        return titleA.localeCompare(titleB);
      });
      setDMSUserDirectory(sortedData);
    }
    setIsAlphabetical(!isAlphabetical);
  };

  const sortDataLocation = () => {
    if (isAlphabetical) {
      // Return to the original order
      setDMSUserDirectory(originalData);
    } else {
      // Sort in alphabetical order
      const sortedData = [...DMSUserDirectory].sort((a, b) => {
        const titleA = a.locaton || ""; // Fallback to an empty string if null
        const titleB = b.locaton || ""; // Fallback to an empty string if null
        return titleA.localeCompare(titleB);
      });
      setDMSUserDirectory(sortedData);
    }
    setIsAlphabetical(!isAlphabetical);
  };

  const sortDataDepartment = () => {
    if (isAlphabetical) {
      // Return to the original order
      setDMSUserDirectory(originalData);
    } else {
      // Sort in alphabetical order
      const sortedData = [...DMSUserDirectory].sort((a, b) => {
        const titleA = a.department || ""; // Fallback to an empty string if null
        const titleB = b.department || ""; // Fallback to an empty string if null
        return titleA.localeCompare(titleB);
      });
      setDMSUserDirectory(sortedData);
    }
    setIsAlphabetical(!isAlphabetical);
  };
  const sortDataEmail = () => {
    if (isAlphabetical) {
      // Return to the original order
      setDMSUserDirectory(originalData);
    } else {
      // Sort in alphabetical order
      const sortedData = [...DMSUserDirectory].sort((a, b) => {
        const titleA = a.email || "";
        const titleB = b.email || "";
        return titleA.localeCompare(titleB);
      });
      setDMSUserDirectory(sortedData);
    }
    setIsAlphabetical(!isAlphabetical);
  };

  const sortDataBynumber = () => {
    if (isAlphabetical) {
      // Return to the original order
      setDMSUserDirectory(originalData);
    } else {
      // Sort in ascending numerical order
      const sortedData = [...DMSUserDirectory].sort((a, b) => {
        return a.mobile_number - b.mobile_number;  // Assuming numeric_column contains numbers
      });
      setDMSUserDirectory(sortedData);
    }
    setIsAlphabetical(!isAlphabetical);
  };

  const sortDataByDirectory = () => {
    if (isAlphabetical) {
      setDMSUserDirectory(originalData);
    } else {
      const sortedData = [...DMSUserDirectory].sort((a, b) => {
        return a.direct_number - b.direct_number;  
      });
      setDMSUserDirectory(sortedData);
    }
    setIsAlphabetical(!isAlphabetical);
  };

  return (
    <div className="parentDiv px-5">
      <div className="titleWithSearch">
        <h3 className="text-primary">DMS Directory</h3>
        <div className="inputSearchDiv">
          <input
            type="text"
            placeholder="Search"
            style={{ width: "400px" }}
            className="form-control form-control-md"
            // value={search}
            //         onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn btn-primary ms-2  btn-md"
            onClick={(e) => {
              setShowModal(true);
            }}
          >
            New
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={movetoEstimatingPage}
        className="btn btn-outline-primary backbtn"
      >
        <i className="fa-duotone me-2 fa fa-angles-left icons backicon"></i>
        Back
      </button>

      <div className="table-responsive proposalTable mt-2">
        <table
          className="table table-striped table-bordered table-hover"
          style={{ tableLayout: "auto" }}
        >
          <thead className="proposalHeader">
            <tr>
              <th className="successgreenColor">
                Last Name
                <i
                  class={`fa-solid fa-caret-down ${
                    isRotated ? "fa-caret-up" : "fa-caret-down"
                  }`}
                  onClick={() => {
                    sortDataLasteName();
                    toggleRotation();
                  }}
                  // style={{ color: isAlphabetical ? 'blue' : 'initial' }}
                ></i>
              </th>
              <th className="successgreenColor">
                First Name
                <i
                  class={`fa-solid fa-caret-down ${
                    isRotated ? "fa-caret-up" : "fa-caret-down"
                  }`}
                  onClick={() => {
                    toggleRotation();
                    sortDataFirstName();
                  }}
                  // style={{ color: isAlphabetical ? 'blue' : 'initial' }}
                ></i>
              </th>
              <th className="successgreenColor">
                Job Title
                <i
                  class={`fa-solid fa-caret-down ${
                    isRotated ? "fa-caret-up" : "fa-caret-down"
                  }`}
                  onClick={() => {
                    toggleRotation();
                    sortDatajob_title();
                  }}
                  // style={{ color: isAlphabetical ? 'blue' : 'initial' }}
                ></i>{" "}
              </th>
              <th className="successgreenColor">
                Company
                <i
                  class={`fa-solid fa-caret-down ${
                    isRotated ? "fa-caret-up" : "fa-caret-down"
                  }`}
                  onClick={() => {
                    toggleRotation();
                    sortDataCompany();
                  }}
                  // style={{ color: isAlphabetical ? 'blue' : 'initial' }}
                ></i>
              </th>
              <th className="successgreenColor">
                Location
                <i
                  class={`fa-solid fa-caret-down ${
                    isRotated ? "fa-caret-up" : "fa-caret-down"
                  }`}
                  onClick={() => {
                    toggleRotation();
                    sortDataLocation()}}
                  // style={{ color: isAlphabetical ? 'blue' : 'initial' }}
                ></i>
              </th>
              <th className="successgreenColor">
                Department
                <i
                  class={`fa-solid fa-caret-down ${
                    isRotated ? "fa-caret-up" : "fa-caret-down"
                  }`}
                  onClick={() => {
                    toggleRotation();
                    sortDataDepartment()}}
                  // style={{ color: isAlphabetical ? 'blue' : 'initial' }}
                ></i>{" "}
              </th>
              <th className="successgreenColor">
                Mobile
                <i
                  class={`fa-solid fa-caret-down ${
                    isRotated ? "fa-caret-up" : "fa-caret-down"
                  }`}
                  onClick={() => {
                    toggleRotation();
                    sortDataBynumber()}}
                  // style={{ color: isAlphabetical ? 'blue' : 'initial' }}
                ></i>
              </th>
              <th className="successgreenColor">
                Direct
                <i
                  class={`fa-solid fa-caret-down ${
                    isRotated ? "fa-caret-up" : "fa-caret-down"
                  }`}
                  onClick={() => {
                    toggleRotation();
                    sortDataByDirectory()}}
                  // style={{ color: isAlphabetical ? 'blue' : 'initial' }}
                ></i>
              </th>
              <th className="successgreenColor">
                Email
                <i
                  class={`fa-solid fa-caret-down ${
                    isRotated ? "fa-caret-up" : "fa-caret-down"
                  }`}
                  onClick={() => {
                    toggleRotation();
                    sortDataEmail()}}
                  // style={{ color: isAlphabetical ? 'blue' : 'initial' }}
                ></i>
              </th>
            </tr>
          </thead>
          <tbody className="cursor-pointer jktable bg-info jloop">
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td className=" dmsTD centered-td">{item.last_name}</td>
                <td className=" dmsTD centered-td">{item.first_name}</td>
                <td className=" dmsTD centered-td">{item.job_title}</td>
                <td className=" dmsTD  centered-td">{item.company}</td>
                <td className=" dmsTD centered-td">{item.locaton}</td>
                <td className=" dmsTD centered-td">{item.department}</td>
                <td className=" dmsTD centered-td">{item.mobile_number}</td>
                <td className=" dmsTD centered-td">{item.direct_number}</td>
                <td className=" dmsTD centered-td">{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

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
    </div>
  );
};

export default DMSDirectory;
