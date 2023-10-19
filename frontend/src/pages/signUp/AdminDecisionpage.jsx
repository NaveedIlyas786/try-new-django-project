import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./decision.css";
import axios from "axios";

const AdminDecisionpage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    console.log("User ID:", userId); // Log the userId to verify it's not undefined
    axios
      .get(`http://127.0.0.1:8000/api/user/register/${userId}`)
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
      });
  }, [userId]);

  return (
    <div className="admindecisionPage">
      <div className=" px-5 contentwait">
      <div className="newcontent">
        <h1 className="DMS fw-2 dmsh1">
          Please Take a decision and choose (<span className="span12 ss1">Approval</span>/<span className="span12 ss2">Rejection</span>) regarding
          registration Request
        </h1>
        {userData && (
          <h2 className="DMS dmsh2">
            {userData.full_Name} needs your approval for registration in  <span className="span11">DMS System</span>
           
          </h2>
        )}
        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={() => { 
              // Handle Approval, and pass the userId to the API
              axios
                .post(`http://127.0.0.1:8000/api/user/approve_user/${userId}/`)
                .then((response) => {
                  // Handle success, e.g., show a success message
                  console.log(response);
                  console.log("Approved From Admin");
                  navigate("/");
                })
                .catch((error) => {
                  // Handle error, e.g., show an error message
                  console.error("Approval failed:", error);
                });
            }}
            className="btn newbtnsuccess"
          >
            Approve
          </button>

          <button
            onClick={() => {
              // Handle Rejection, and pass the userId to the API
              axios
                .post(
                  `http://127.0.0.1:8000/api/user/disapprove_user/${userId}/`
                )
                .then((response) => {
                  // Handle success, e.g., show a success message
                  console.log(response);
                  console.log("Rejected From Admin");
                  navigate("/rejectionPage");
                })
                .catch((error) => {
                  // Handle error, e.g., show an error message
                  console.error("Rejection failed:", error);
                });
            }}
            className="btn newbtnsuccess1"
          >
            Reject
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminDecisionpage;
