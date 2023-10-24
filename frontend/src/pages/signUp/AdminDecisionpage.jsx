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
      <div className="newcontent d-flex flex-column gap-3">
        <h4 className="DMS ">
          Please Chose(<span className=" ss1">Approve</span>/<span className=" ss2">Reject</span>) regarding
          registration Request
        </h4>
        {userData && (
          <p className="userinfo">
            <strong className="text-primary"> {userData.full_Name} </strong>  needs your approval for registration in  <i>DMS Contact Management System</i>
           
          </p>
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
                  {alert("User request has been Approved! ")}
                  // navigate("/");
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
                  {alert("User request has been Rejected! ")}

                  // navigate("/rejectionPage");
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
