import React, { useState, useEffect } from 'react';
import "./Estimating.css"
import { Link } from 'react-router-dom';
const Estimator = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Fetch data from the API
    fetch('http://127.0.0.1:8000/api/estimating/estimating/')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filteredData = data.filter((customer) =>
  customer.Prjct_Name.toUpperCase().includes(filter.toUpperCase())||
  // customer.bid_amount.toUpperCase().includes(filter.toUpperCase())||
  // customer.location.toUpperCase().includes(filter.toUpperCase())||
  // customer.Estimator.toUpperCase().includes(filter.toUpperCase())||
  // customer.bidder.toUpperCase().includes(filter.toUpperCase())||
  // customer.Company.toUpperCase().includes(filter.toUpperCase()) ||
  customer.status.toUpperCase().includes(filter.toUpperCase())||
  customer.due_date.toUpperCase().includes(filter.toUpperCase())
);

  return (
    <div className='estimator'>
      <h3>Estimating Summary</h3>
      <div className="inputbtn d-flex gap-2">
      <input
        type="text"
        placeholder="Filter by Project Name"
        value={filter}
        className='myinput p-2 rounded'
        onChange={(e) => setFilter(e.target.value)}
      />
      <Link className='btn btn-success' to="/homepage/postEstimating">New</Link>
      </div>
      <div className="table-responsive pt-3">
      <table className='table table-striped  table-bordered table-hover text-center'>
        <thead>
          <tr>
            <th>ID</th>
            {/* <th>Company</th> */}
            <th>Due_Date</th>
            <th>Project_Name</th>
            <th>Estimator</th>
            <th>Bidder</th>
            <th>Bid_Amount</th>
            {/* <th>Location</th>
            <th>Start_Date</th>
            <th>Status</th> */}
          </tr>
        </thead>
        <tbody className='cursor-pointer'>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.due_date}</td>
              {/* <td>{item.Company}</td> */}
              <td>{item.Prjct_Name}</td>
              <td>{item.estimator}</td>
              <td>{item.bidder}</td>
              <td>{item.bid_amount}</td>
              {/* <td>{item.location}</td>
              <td>{item.start_date}</td>
              <td>{item.status}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Estimator;
