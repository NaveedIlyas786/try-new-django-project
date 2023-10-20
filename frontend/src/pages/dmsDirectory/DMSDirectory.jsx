import React, { useState, useEffect } from "react";
import "./DMSDirectory.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DMSDirectory = () => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [filter, setFilter] = useState("");
  const [DMSUserDirectory, setDMSUserDirectory] = useState([]);
  const closeModal = () => {
    setShowModal(false);

    // Remove the 'modal-active' class when the modal is closed
    document.body.classList.remove("modal-active");
  };
  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/estimating/dmsDrectory/")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setDMSUserDirectory(data);
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
      job_title:[jobtitle], 
      company: parseInt(mycompany, 10), 
      locaton: mylocation, 
      department: parseInt(mydepartment,10), 
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

  const movetoEstimatingPage = () => {
    navigate("/homepage/estimating/");
  };

  return (
    <div className="parentDiv px-5">
      <div className="titleWithSearch">
        <h3 className="text-primary">DMS Directory</h3>
        <div className="inputSearchDiv">
          <input
            type="text"
            placeholder="Filter by Project Name, prjct_engnr Name, bim_oprtrs, job_num"
            value={filter}
            className="directoryinputsearch p-2"
            onChange={(e) => setFilter(e.target.value)}
          />
          <button
            className="btn ms-2 btn-primary"
            onClick={() => setShowModal(true)}
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
        Back
      </button>

      <div className="table-responsive proposalTable mt-2">
        <table
          className="table table-striped table-bordered table-hover"
          style={{ tableLayout: "auto" }}
        >
          <thead className="proposalHeader">
            <tr>
              <th className="successgreenColor">Last Name</th>
              <th className="successgreenColor">First Name</th>
              <th className="successgreenColor">Job Title</th>
              <th className="successgreenColor">Company</th>
              <th className="successgreenColor">Location</th>
              <th className="successgreenColor">Department</th>
              <th className="successgreenColor">Mobile</th>
              <th className="successgreenColor">Direct</th>
              <th className="successgreenColor">Email</th>
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
                      <option value="Estimating Manager">Estimating Manager</option>
                      <option value="General Superintendent">General Superintendent</option>
                      <option value="Proconstruction Manager">Proconstruction Manager</option>
                      <option value="No. Cal. General Manager">No. Cal. General Manager</option>
                      <option value="So. Cal. General Manager">So. Cal. General Manager</option>
                      <option value="BIM Modeler/Trimble Operator">BIM Modeler/Trimble Operator</option>
                      <option value="Scheduling Manager / Pre-Construction Engineer">Scheduling Manager / Pre-Construction Engineer</option>
                     
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
                      <option value="Project Management">Project Management</option>
                    </select>
                  </div>

                  <div className="Oneline">
                    <label htmlFor="location" className="form-label">
                      Location:
                    </label>
                    <select
                      className="form-select"
                      id="location"
                      value={mylocation}
                      onChange={handleLocation}
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
