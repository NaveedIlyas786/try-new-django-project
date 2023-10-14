import React from "react";
import "./decision.css";
const Waiting = () => {
  return (
    <div id="waitingpage">
      <div className="contentwaiting px-5">
        <p>
          Your request to join the DMS Management System is <strong className="pending">Pending</strong> wait untill
          the request is Approved from Admin Side !
        </p>
      </div>
    </div>
  );
};

export default Waiting;
