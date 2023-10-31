import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Won_Lost_UI.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchEstimatingData } from "../../store/EstimatingSlice";
import { createSelector } from "reselect";

const LostProjects = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [readMoreState, setReadMoreState] = useState({}); // Added readMoreState


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEstimatingData());
  }, [dispatch]);

  const navigate = useNavigate();

  const navigateToLink = (itemId) => {
    navigate(`/homepage/LostProjects/${itemId}`);
  };

  const selectEstimatingData = (state) => state.estimating.data;

  const selectFilteredData = createSelector([selectEstimatingData], (data) => {
    return data.filter((customer) => {
      return (
        (customer.prjct_name &&
          customer.prjct_name.toUpperCase().includes(filter.toUpperCase())) ||
        (customer.status &&
          customer.status.trim().toUpperCase().includes(filter.trim().toUpperCase())) ||
        (customer.estimator &&
          customer.estimator.toUpperCase().includes(filter.toUpperCase())) ||
        (customer.bidder &&
          customer.bidder.toUpperCase().includes(filter.toUpperCase()))
      ) && customer.status === 'Lost';
    });
  });

  const filteredData = useSelector(selectFilteredData);

  const movetoEstimatingPage = () => {
    navigate("/homepage/estimating/");
  };

  return (
    <div className="parentDiv px-5">
      <div className="titleWithSearch">
        <h3 className="text-primary texth">Lost Projects</h3>
        <div className="inputSearchDiv">
          <input
            type="text"
            placeholder="Filter by Project Name,Area, Estimator, Status, Bidders"
            value={filter}
            className="myinput"
            onChange={(e) => setFilter(e.target.value)}
          />
          <button className="btn btn-primary searchbtn">Search</button>
        </div>
      </div>
      <button
        type="button"
        onClick={movetoEstimatingPage}
        className="btn btn-outline-primary backbtn"
      >
       <i className="fa-duotone me-2 fa fa-angles-left icons backicon"></i> Back
      </button>

      <div className="table-responsive proposalTable mt-2">
        <table className="table table-striped table-bordered table-hover" style={{ tableLayout: "auto" }}>
          <thead className="proposalHeader">
            <tr>
              <th className="lostredColor">Due Date</th>
              <th className="lostredColor">Due Time</th>
              <th className="lostredColor">Project Name</th>
              <th className="lostredColor">Area</th>
              <th className="lostredColor">Estimator</th>
              <th className="lostredColor">Status</th>
              <th className="lostredColor">Bidders</th>
            </tr>
          </thead>
          <tbody className="cursor-pointer jktable bg-info jloop">
            {filteredData.map((item) => (
              <tr  key={item.id}>
                <td className="mytd centered-td">{item.due_date}</td>
                <td className="mytd centered-td">
                  {item.time} <strong>{item.timezone}</strong>
                </td>
                <td className="mytd myproject centered-td">
                  {item.prjct_name}
                </td>
                <td className="mytd centered-td">{item.location}</td>
                <td className="mytdbidder centered-td">
                  {item.estimator}
                </td>
                <td className="mytdbidder centered-td">
                  {item.status}
                </td>

                <td className="mytd centered-td">
                  <p className={readMoreState[item.id] ? "" : "two-lines"}>
                    {item.bidder ? item.bidder + " " : ""}
                    {item.bidder_detail ? item.bidder_detail + " " : ""}
                    {item.bidder_mail ? item.bidder_mail : ""}
                  </p>
                  {(item.bidder && item.bidder.length > 20) ||
                  (item.bidder_detail && item.bidder_detail.length > 20) ||
                  (item.bidder_mail && item.bidder_mail.length > 20) ? (
                    <label
                      onClick={() => {
                        setReadMoreState((prev) => ({
                          ...prev,
                          [item.id]: !prev[item.id],
                        }));
                      }}
                    >
                      {readMoreState[item.id] ? (
                        <p className="read_more">Read less...</p>
                      ) : (
                        <p className="read_more">Read more...</p>
                      )}
                    </label>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LostProjects;
