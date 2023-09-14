import React, { useState, useEffect } from "react";
import "./Estimating.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Estimator = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [dueDate, setDueDate] = useState("");
  const [projectName, setProjectName] = useState("");
  const [estimatorName, setEstimatorName] = useState("");
  // const [Eststatus, setEstStatus] = useState("");
  const [location, setLocation] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [BidderName, setBidderName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();

  //************ To show data in Estimating List
  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/estimating/estimating/")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
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
        console.log(data);
        setUserLocation(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //************ To show Company Names in dropdown in estimating post field

  const [userCompany, setuserCompany] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/project/company/")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setuserCompany(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //************ To show Estimator full_Names in dropdown in estimating post field

  const [EstimatorName, setestimatorName] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/user/Userapi/")
      .then((response) => response.data)
      .then((data) => {
        const bidUser = data.filter((user) =>
          user.roles.includes("Estimator")
        );
        setestimatorName(bidUser);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

   

  //************ To show bidder Names in dropdown in estimating post field

  const [bidderName, setbidderName] = useState([]);

  useEffect(() => {
    // Fetch data from the API
  axios
  .get("http://127.0.0.1:8000/api/user/Userapi/")
  .then((response) => response.data)
  .then((data) => {
    const bidUser = data.filter((user) =>
      user.roles.includes("Bidder")
    );
    setbidderName(bidUser);
    console.log(bidUser);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
}, []);
  //************* Define the handleSubmit function
    const handleSubmit = (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
  
      // Create a data object with the form values
      const formData = {
        due_date: dueDate,
        Prjct_Name: projectName,
        company: companyName,
        estimator: estimatorName,
        location: location,
        bid_amount: bidAmount,
        bidder: BidderName, // Use BidderName here, not bidder
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
          setCompanyName("");
          setEstimatorName("");
          setLocation("");
          setBidAmount("");
          setBidderName("");
          // Close the modal
          closeModal();
        })
        .catch((error) => {
          // Handle any errors that occurred during the POST request
          console.error("Error submitting data:", error);
          // Log the response data for more details
          console.log("Response data:", error.response.data);
        });
    };

  const filteredData = data.filter(
    (customer) =>
      customer.Prjct_Name.toUpperCase().includes(filter.toUpperCase()) ||
      customer.status.toUpperCase().includes(filter.toUpperCase()) ||
      customer.due_date.toUpperCase().includes(filter.toUpperCase())
  );

  // Define a function to handle modal close
  const closeModal = () => {
    setShowModal(false);
    // Remove the 'modal-active' class when the modal is closed
    document.body.classList.remove("modal-active");
  };

  const movetoPurposalPage = () => {
    navigate("/homepage/purposal");
  };
  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

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
    setBidderName(e.target.value);
  };
  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  return (
    <>
      <div className={`estimator px-5 ${showModal ? "modal-active" : ""}`}>
        <h3>Estimating Summary</h3>
        <div className="inputbtn d-flex gap-2 px-5">
          <input
            type="text"
            placeholder="Filter by Project Name"
            value={filter}
            className="myinput p-2 rounded"
            onChange={(e) => setFilter(e.target.value)}
          />
          <button
            className="btn btn-success"
            onClick={() => setShowModal(true)}
          >
            New
          </button>
        </div>
        <div className="table-responsive pt-3">
          <table className="table table-striped  table-bordered table-hover text-center">
            <thead>
              <tr>
                <th>Due Date</th>
                <th>Project Name</th>
                <th>Status</th>
                <th>Estimator</th>
                <th>Bidder</th>
                <th>Bid Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="cursor-pointer">
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.due_date}</td>
                  <td>{item.Prjct_Name}</td>
                  <td>{item.status}</td>
                  <td>{item.estimator}</td>
                  <td>{item.bidder}</td>
                  <td>{item.bid_amount}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={movetoPurposalPage}
                    >
                      Purposal
                    </button>
                    <button className="btn ms-3 btn-success">Project</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal Code */}
      {showModal && (
        <div className={`modal-container pt-5 ps-2 ${showModal ? "show" : ""}`}>
          <h4 className="text-center addnewtxt">Add New Estimating Entry</h4>
          <button className="close-btn" onClick={closeModal}></button>
          <div className="modal-content px-5">
            <form onSubmit={handleSubmit} className="d-flex flex-column">
              <div className="mb-3">
                <label htmlFor="dueDate" className="form-label">
                  Due_Date:
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dueDate"
                  value={dueDate}
                  onChange={handleDueDateChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="projectName" className="form-label">
                  Project_Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="projectName"
                  value={projectName}
                  onChange={handleProjectNameChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="companyName" className="form-label">
                  Company_Name:
                </label>
                <select
                  className="form-select"
                  id="companyName"
                  value={companyName}
                  onChange={handleCompanyNameChange}
                >
                  {userCompany.map((user) => (
                    <option value={user.id} key={user.id}>
                      {user.Cmpny_Name}
                    </option>
                  ))}
                  {/* <option value="DMS">DMS</option> */}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="estimatorName" className="form-label">
                  Estimator_Name:
                </label>
                <select
                  className="form-select"
                  id="estimatorName"
                  value={estimatorName}
                  onChange={handleEstimatorNameChange}
                >
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

              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Location:
                </label>
                <select
                  className="form-select"
                  id="location"
                  value={location}
                  onChange={handleLocationChange}
                >
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
              <div className="mb-3">
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

              <div className="mb-3">
                <label htmlFor="bidder" className="form-label">
                  Bidder_Name:
                </label>
                <select
                  className="form-select"
                  id="bidder"
                  value={BidderName}
                  onChange={handleBidderChange}
                >
                  {bidderName.length > 0 ? (
                    bidderName.map((bidder) => (
                      <option value={bidder.id} key={bidder.id}>
                        {bidder.full_Name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      Loading...
                    </option>
                  )}
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-submit mt-3 mb-4"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Estimator;
