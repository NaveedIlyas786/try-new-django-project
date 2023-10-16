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
      <div className="contentwaiting px-5">
        <h1>
          Please Take a decision and choose (Approval/Rejection) regarding
          registration Request
        </h1>
        {userData && (
          <h2>
            {userData.full_Name} is sending you the request for joining the DMS
            System and needs your approval
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
            className="btn btn-success"
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
            className="btn btn-danger"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDecisionpage;
