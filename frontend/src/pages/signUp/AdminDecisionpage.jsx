import React from "react";
import { useNavigate } from "react-router-dom";
import "./decision.css";

const AdminDecisionpage = () => {
  const navigate = useNavigate();
  return (
    
    <div className="admindecisionPage">
      <div className="contentwaiting px-5">
        <h1>
          Please Take decision and chose ( Approval/Rejection ) regarding
          registration Request
        </h1>
        <h2>"User_Name" is sending you the request for joining the DMS System and needs your approval</h2>
        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="btn btn-success"
          >
            Approve
          </button>
          <button
            onClick={() => {
              navigate("/rejectionPage");
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
