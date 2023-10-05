import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
// import ApexCharts from 'apexcharts'

const Dashboard = () => {
  const [dashData, setDashData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/estimating/api/estimators/summary/")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setDashData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const formatNumberWithCommas = (value) => {
    if (value === null) return ""; // Return an empty string if the value is null
    return value.toLocaleString("en-US");
  };

  function formatPercentage(value) {
    // Parse the input value as a float
    const floatValue = parseFloat(value);
  
    // Check if it's a valid number
    if (!isNaN(floatValue)) {
      // Round the value to two decimal places
      const roundedValue = Math.round(floatValue * 100) / 100;
  
      // Convert the rounded value to a string with '%' symbol
      const formattedValue = `${roundedValue.toFixed(0)}%`;
  
      return formattedValue;
    } else {
      // If the input is not a valid number, return an empty string or handle it accordingly
      return '';
    }
  }

  return (
    <>
      <div className=" container dashboard ">
        <div className=" row projectStatus justify-content-around">
          <div className=" col-md-2 p-2 ProjectStatus  text-center">
            <h4 className="pt-2 pb-2">{dashData.reduce((acc, e) => acc + (e?.Won?.total || 0), 0)}</h4>
            <p>
              {/* <i className="fa-solid fa-circle-check"></i> */}
              <i className="fa-solid fa-circle-check check"></i>
            </p>
            <h5>Won</h5>
          </div>
          <div className=" col-md-2 p-2 text-center ProjectStatus">
            <h4 className="pt-2 pb-2">{dashData.reduce(
                        (acc, e) => acc + (e?.Pending?.total || 0),
                        0
                      )}</h4>
            <p>
              <i className="fa-solid  fa-question fs-5 pend"></i>
            </p>
            <h5>pending</h5>
          </div>
          <div className=" col-md-2 p-2 text-center ProjectStatus">
            <h4 className="pt-2 pb-2">{dashData.reduce(
                        (acc, e) => acc + (e?.Working?.total || 0),
                        0
                      )}</h4>
            <p>
              <i className="fa-solid fa-spinner fs-5 working"></i>
            </p>
            <h5>Working</h5>
            <p>
              <i className="fa-solid fa-square-this-way-up "></i>
            </p>
          </div>
          <div className=" col-md-2 p-2 text-center ProjectStatus">
            <h4 className="pt-2 pb-2">{dashData.reduce(
                        (acc, e) => acc + (e?.Lost?.total || 0),
                        0
                      )}</h4>

            <p>
              <i className=" mark fa-duotone fa fa-ban"></i>
            </p>
            <h5>Lost</h5>
          </div>
        </div>
      </div>
      <div className="mt-3 ">
        <div className=" container text-center">
          <div className=" row table-responsive m-0 table-design">
            <div className="col-md-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th rowSpan={2} className="align-middle">
                      Estimator
                    </th>
                    <th rowSpan={2} className="align-middle">
                      Working
                    </th>
                    <th colSpan={3}>Pending</th>
                    <th colSpan={3}>Won</th>
                    <th colSpan={3}>Lost</th>
                    <th colSpan={2}>Ytd Total</th>
                  </tr>
                  <tr>
                    <th className="thBackgroundpend">#</th>
                    <th className="thBackgroundpend">%</th>
                    <th className="thBackgroundpend">Estimated $</th>
                    <th className="thBackgroundWon">#</th>
                    <th className="thBackgroundWon">%</th>
                    <th className="thBackgroundWon">Estimated $</th>
                    <th className="thBackgroundLost">#</th>
                    <th className="thBackgroundLost">%</th>
                    <th className="thBackgroundLost">Estimated $</th>
                    <th># </th>
                    <th>Estimated $</th>
                  </tr>
                </thead>
                <tbody>
                  {dashData.map((e, index) => (
                    <tr key={index}>
                      <td className="dashtd">{e.estimator}</td>
                      <td className="dashtd">{e.summary?.Working?.total || 0}</td>
                      <td className="dashtd">{e.summary?.Pending?.total || 0}</td>
                      <td className="dashtd">{ formatPercentage(e.summary?.Pending?.percentage || 0)}</td>
                      <td className="dashtd">$ {formatNumberWithCommas(e.summary?.Pending?.bid_amount || 0)}</td>
                      <td className="dashtd">{e.summary?.Won?.total || 0}</td>
                      <td className="dashtd">{formatPercentage(e.summary?.Won?.percentage || 0)}</td>
                      <td className="dashtd">$ {formatNumberWithCommas(e.summary?.Won?.bid_amount || 0)}</td>
                      <td className="dashtd">{e.summary?.Lost?.total || 0}</td>
                      <td className="dashtd">{formatPercentage(e.summary?.Lost?.percentage || 0)}</td>
                      <td className="dashtd">$ {formatNumberWithCommas(e.summary?.Lost?.bid_amount || 0)}</td>
                      <td className="dashtd">{e.ytd_total || 0}</td>
                      <td className="dashtd">$ {formatNumberWithCommas(e.ytd_total_bid_amount || 0)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="totalsection dashtd">Grand Total</td>
                    <td className="totalsection dashtd">
                      {dashData.reduce(
                        (acc, e) => acc + (e?.Working?.total || 0),
                        0
                      )}
                    </td>
                    <td className="totalsection dashtd">
                      {dashData.reduce(
                        (acc, e) => acc + (e?.Pending?.total || 0),
                        0
                      )}
                    </td>
                    <td className="totalsection dashtd"></td>
                    <td className="totalsection dashtd">
                      { formatNumberWithCommas(dashData.reduce(
                        (acc, e) => acc + (e?.Pending?.bid_amount || 0),
                        0
                      ))}
                    </td>
                    <td className="totalsection dashtd">
                      {dashData.reduce(
                        (acc, e) => acc + (e?.Won?.total || 0),
                        0
                      )}
                    </td>
                    <td className="totalsection dashtd"></td>
                    <td className="totalsection dashtd">
                      $ {formatNumberWithCommas(dashData.reduce(
                        (acc, e) => acc + (e?.Won?.bid_amount || 0),
                        0
                      ))}
                    </td>
                    <td className="totalsection dashtd">
                      {dashData.reduce(
                        (acc, e) => acc + (e?.Lost?.total || 0),
                        0
                      )}
                    </td>
                    <td className="totalsection dashtd"></td>
                    <td className="totalsection dashtd">
                      $ {formatNumberWithCommas(dashData.reduce(
                        (acc, e) => acc + (e?.Lost?.bid_amount || 0),
                        0
                      ))}
                    </td>
                    <td className="totalsection dashtd">
                      {dashData.reduce(
                        (acc, e) => acc + (e?.["Grand Total"]?.total || 0),
                        0
                      )}
                    </td>
                    <td className="totalsection dashtd">
                      $ {formatNumberWithCommas(dashData.reduce(
                        (acc, e) => acc + (e?.["Grand Total"]?.bid_amount || 0),
                        0
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="container mt-5 ">
          <div className="row">
            <div className="col-md-4 mt-3 table-responsive-custom">
              <table className="table table-striped text-center ">
                <thead className="thead-dark">
                  <tr>
                    <th rowSpan={2} className="align-middle">
                      Company
                    </th>
                    <th colSpan={2}>Won</th>
                  </tr>
                  <tr>
                    <th>#</th>
                    <th>Estimated $</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="dashtd">
                    <td>DMS - Drywall</td>
                    <td>5</td>
                    <td>$8,637,659</td>
                  </tr>
                  <tr className="dashtd">
                    <td>David M. Schmitt</td>
                    <td>5</td>
                    <td>$0</td>
                  </tr>
                  <tr className="dashtd">
                    <td>DMS - BKL</td>
                    <td>8</td>
                    <td>$30,561,703</td>
                  </tr>
                  <tr className="dashtd">
                    <td>DMS - STL</td>
                    <td>0</td>
                    <td>$0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className=" ms-5 col-md-7 col-sm-7 graphimg">
              <img
                src="../../../src/assets/graph.jpeg"
                className="img-responsive"
                alt="My Graph"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
