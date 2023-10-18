import React, { useState, useEffect } from "react";
import "./Won_Lost_UI.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchEstimatingData } from "../../store/EstimatingSlice";
import { createSelector } from "reselect";

const WonProjects = () => {
  const [filter, setFilter] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEstimatingData());
  }, [dispatch]);

  const navigate = useNavigate();

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
      ) && customer.status === 'Won';
    });
  });

  const filteredData = useSelector(selectFilteredData);

  const movetoEstimatingPage = () => {
    navigate("/homepage/estimating/");
  };

  return (
    <div className="parentDiv px-5">
      <div className="titleWithSearch">
        <h3 className="text-primary texth">Won Projects</h3>
        <div className="inputSearchDiv">
          <input
            type="text"
            placeholder="Filter by Project Name, prjct_engnr Name, bim_oprtrs, job_num"
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
              <th className="successgreenColor">Due Date</th>
              <th className="successgreenColor">Due Time</th>
              <th className="successgreenColor">Project Name</th>
              <th className="successgreenColor">Area</th>
              <th className="successgreenColor">Estimator</th>
              <th className="successgreenColor">Status</th>
              <th className="successgreenColor">Bidders</th>
            </tr>
          </thead>
          <tbody className="cursor-pointer jktable bg-info jloop">
            {filteredData.map((item) => (
              <tr key={item.id}>
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
                  {item.bidder + " " + item.bidder_deatil}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WonProjects;
