import React, { useState, useEffect } from "react";
import axios from "axios";
import "./URLPage.css";
import { useNavigate, Link } from "react-router-dom";
const URLPage = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");

  // Fetch data from the API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/estimating/Urllist/")
      .then((response) => response.data)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filteredData = data.filter((customer) => {
    return (
      (customer.web_name &&
        customer.web_name.toUpperCase().includes(filter.toUpperCase())) ||
      (customer.territory &&
        customer.territory
          .toString()
          .toUpperCase()
          .includes(filter.toUpperCase())) ||
      (customer.url &&
        customer.url.toUpperCase().includes(filter.toUpperCase())) ||
      (customer.ps && customer.ps.toUpperCase().includes(filter.toUpperCase()))
    );
  });

  const formatBidAmount = (amount) => {
    if (amount === null) return ""; // Return an empty string if the amount is null
    return amount.toLocaleString("en-US");
  };

  const navigate = useNavigate(); // Initialize the useHistory hook

  const navigateToLink = (itemId) => {
    navigate(`/homepage/URLPage/${itemId}`);
  };
  const [showModal, setShowModal] = useState(false);
  const [WebName, setWebName] = useState("");
  const [TerritoryName, setTerritoryName] = useState("");
  const [URLlink, setURLlink] = useState("");
  const [PS, setPS] = useState("");

  const handleURLChange = (e) => {
    setURLlink(e.target.value);
  };
  const handleWebNameChange = (e) => {
    setWebName(e.target.value);
  };
  const handleTerritoryNameChange = (e) => {
    setTerritoryName(e.target.value);
  };
  const handleIDorPSChange = (e) => {
    setPS(e.target.value);
  };

  const handleURLSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Create a data object with the form values
    const formData = {
      web_name: WebName,
      territory: TerritoryName,
      url: URLlink,
      ps: PS,
    };

    // Send a POST request to the API
    axios
      .post("http://127.0.0.1:8000/api/estimating/Urllist/", formData)
      .then((response) => {
        // Handle the response if needed
        console.log("Data successfully submitted:", response.data);
        // You can also reset the form fields here if needed
        setWebName("");
        setTerritoryName("");
        setURLlink("");
        setPS("");
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
  const closeModal = () => {
    setShowModal(false);
    // Remove the 'modal-active' class when the modal is closed
    document.body.classList.remove("modal-active");
  };

  const movetoEstimatingPage=()=>{
    navigate("/homepage/estimating/")
  }
  return (
    <div className="parentDiv px-5">
      <div className="titleWithSearch">
        <h3 className="text-black">URLPage Summary</h3>
          
        <div className="inputSearchDiv">
          <input
            type="text"
            placeholder="Filter by Project Name, prjct_engnr Name, bim_oprtrs, job_num"
            value={filter}
            className="myinput"
            onChange={(e) => setFilter(e.target.value)}
          />
          <button
            className="btn btn-success ms-2"
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
       <i class="fa-duotone me-2 fa fa-angles-left icons backicon"></i> Back
      </button>

      {showModal && (
        <div
          className={`modal-container bg-white pt-5 ps-2 ${
            showModal ? "show" : ""
          }`}
        >
          <h4 className="text-center addnewtxt">Add New URL Entry</h4>
          <button className="close-btn" onClick={closeModal}></button>
          <div className="modal-content px-5">
            <form onSubmit={handleURLSubmit} className="MyForm">
              <div className="bothDiv gap-2 mt-5">
                <div className="Oneline">
                  <label htmlFor="webname" className="form-label">
                    Website Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="webname"
                    value={WebName}
                    onChange={handleWebNameChange}
                  />
                </div>
                <div className="Oneline">
                  <label htmlFor="Territory" className="form-label">
                    Enter Territory/Invo:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Territory"
                    value={TerritoryName}
                    onChange={handleTerritoryNameChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="URLId" className="form-label">
                  Enter URL:
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="URLId"
                  value={URLlink}
                  onChange={handleURLChange}
                />
              </div>
              <div>
                <label htmlFor="IDPS" className="form-label">
                  Enter ID/PS:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="IDPS"
                  value={PS}
                  onChange={handleIDorPSChange}
                />
              </div>

              <button type="submit" className="btn btn-submit mt-3 mb-4">
                Add
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="table-responsive UrlTable mt-1">
        <table className="table table-striped   table-bordered table-hover text-center">
          <thead className="projectHeader">
            <tr>
              <th className="urlTH">Website name</th>
              <th className="urlTH">Territory/Invo</th>
              <th className="urlTH">URL</th>
              <th className="urlTH">ID/PS</th>
            </tr>
          </thead>
          <tbody className="cursor-pointer  bg-info jloop">
            {filteredData.map((item) => (
              <tr key={item.id} className="mytr">
                <td className="mytd webName">{item.web_name}</td>
                <td className="mytd">{item.territory}</td>
                <td className="mytd">
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.url}
                  </a>
                </td>
                <td className="mytd">{item.ps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default URLPage;
