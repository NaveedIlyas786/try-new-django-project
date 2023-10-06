import React, { useEffect, useState, PureComponent } from "react";
import { LineChart, Line } from "recharts";
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
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
  const [companyiesData, setcompanyiesData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/estimating/company_won_bashboard/")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setcompanyiesData(data);
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
      return "";
    }
  }
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // const amount=formatNumberWithCommas(total_won_bid_amount);

  return (
    <>
      <div className=" container dashboard ">
        <div className=" row projectStatus justify-content-around">
          <div className=" col-md-2 p-2 ProjectStatus " data-aos="fade-down">
            <h4 className="pt-3 pb-2">
              {dashData.reduce((acc, e) => acc + (e?.Won?.total || 0), 0)}
            </h4>
            <p>
              <i className="fa-solid fa-circle-check check"></i>
            </p>
            <h5>Won</h5>
          </div>
          <div className=" col-md-2 p-2  ProjectStatus" data-aos="fade-down">
            <h4 className="pt-3 pb-2">
              {dashData.reduce((acc, e) => acc + (e?.Pending?.total || 0), 0)}
            </h4>
            <p>
              <i className="fa-solid  fa-question fs-5 pend"></i>
            </p>
            <h5>pending</h5>
          </div>
          <div className=" col-md-2 p-3  ProjectStatus" data-aos="fade-up">
            <h4 className="pt-2 pb-2">
              {dashData.reduce((acc, e) => acc + (e?.Working?.total || 0), 0)}
            </h4>
            <p>
              <i className="fa-solid fa-spinner fs-5 working"></i>
            </p>
            <h5>Working</h5>
            <p>
              <i className="fa-solid fa-square-this-way-up "></i>
            </p>
          </div>
          <div className=" col-md-2 p-3  ProjectStatus" data-aos="fade-up">
            <h4 className="pt-2 pb-2">
              {dashData.reduce((acc, e) => acc + (e?.Lost?.total || 0), 0)}
            </h4>

            <p>
              <i className=" mark fa-duotone fa fa-ban"></i>
            </p>
            <h5>Lost</h5>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className=" container mytable ">
      <div className=" ms-4 mb-2  btn-group dropright">
        <button
          type="button"
          className="btn btn-success dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Filter based on year
        </button>
        <ul className="dropdown-menu text-center">
          <li>
            <a className="dropdown-item active" href="#">
              2023
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
             2022
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
             2020
            </a>
          </li>
         
        </ul>
      </div>
          <div
            className=" row table-responsive table-design jk"
            data-aos="fade-left"
          >
            <div className="col-md-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr className="jk">
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
                <tbody className="jk">
                  {dashData.map((e, index) => (
                    <tr key={index}>
                      <td className="dashtd">{e.estimator}</td>
                      <td className="dashtd">
                        {e.summary?.Working?.total || 0}
                      </td>
                      {/* <td className="dashtd">{e?.["Grand Total"]?.bid_amount || 0}</td> */}

                      <td className="dashtd">
                        {e.summary?.Pending?.total || 0}
                      </td>
                      <td className="dashtd">
                        {formatPercentage(e.summary?.Pending?.percentage || 0)}
                      </td>
                      <td className="dashtd">
                        ${" "}
                        {formatNumberWithCommas(
                          e.summary?.Pending?.bid_amount || 0
                        )}
                      </td>
                      <td className="dashtd">{e.summary?.Won?.total || 0}</td>
                      <td className="dashtd">
                        {formatPercentage(e.summary?.Won?.percentage || 0)}
                      </td>
                      <td className="dashtd">
                        ${" "}
                        {formatNumberWithCommas(
                          e.summary?.Won?.bid_amount || 0
                        )}
                      </td>
                      <td className="dashtd">{e.summary?.Lost?.total || 0}</td>
                      <td className="dashtd">
                        {formatPercentage(e.summary?.Lost?.percentage || 0)}
                      </td>
                      <td className="dashtd">
                        ${" "}
                        {formatNumberWithCommas(
                          e.summary?.Lost?.bid_amount || 0
                        )}
                      </td>
                      <td className="dashtd">{e.ytd_total || 0}</td>
                      {/* <td className="dashtd">{e?.["Grand Total"]?.bid_amount || 0}</td>
                      <td className="dashtd">{e?.["Grand Total"]?.total || 0}</td> */}

                      <td className="dashtd">
                        $ {formatNumberWithCommas(e.ytd_total_bid_amount || 0)}
                      </td>
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
                      {formatNumberWithCommas(
                        dashData.reduce(
                          (acc, e) => acc + (e?.Pending?.bid_amount || 0),
                          0
                        )
                      )}
                    </td>
                    <td className="totalsection dashtd">
                      {dashData.reduce(
                        (acc, e) => acc + (e?.Won?.total || 0),
                        0
                      )}
                    </td>
                    <td className="totalsection dashtd"></td>
                    <td className="totalsection dashtd">
                      ${" "}
                      {formatNumberWithCommas(
                        dashData.reduce(
                          (acc, e) => acc + (e?.Won?.bid_amount || 0),
                          0
                        )
                      )}
                    </td>
                    <td className="totalsection dashtd">
                      {dashData.reduce(
                        (acc, e) => acc + (e?.Lost?.total || 0),
                        0
                      )}
                    </td>
                    <td className="totalsection dashtd"></td>
                    <td className="totalsection dashtd">
                      ${" "}
                      {formatNumberWithCommas(
                        dashData.reduce(
                          (acc, e) => acc + (e?.Lost?.bid_amount || 0),
                          0
                        )
                      )}
                    </td>
                    <td className="totalsection dashtd">
                      {dashData.reduce(
                        (acc, e) => acc + (e?.["Grand Total"]?.total || 0),
                        0
                      )}
                    </td>
                    <td className="totalsection dashtd">
                      ${" "}
                      {formatNumberWithCommas(
                        dashData.reduce(
                          (acc, e) =>
                            acc + (e?.["Grand Total"]?.bid_amount || 0),
                          0
                        )
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="container mt-5 ">
          <div className="row">
            <div
              className="col-md-4 mt-3 table-responsive-custom"
              data-aos="fade-down"
            >
              <table className="table table-striped text-center ">
                <thead className="thead-dark twoTable">
                  <tr>
                    <th rowSpan={2} className="align-middle bg-danger">
                      Company
                    </th>
                    <th colSpan={2} className="align-middle bg-success">
                      Won
                    </th>
                  </tr>
                  <tr>
                    <th className="align-middle bg-warning">#</th>
                    <th>Estimated $</th>
                  </tr>
                </thead>
                <tbody>
                  {companyiesData.map((e, index) => (
                    <tr className="graphCompany" key={index}>
                      <td className="dashtd">{e.company_name}</td>
                      <td className="dashtd">{e.total_won}</td>
                      <td className="dashtd">
                        {formatNumberWithCommas(e.total_won_bid_amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <div className="ms-5 col-md-7 col-sm-7 graphimg">
              <ResponsiveContainer width="100%" height={500}>
                <BarChart
                  width={500}
                  height={500}
                  data={companyiesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="company_name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total_won" fill="#8884d8" />
                  <Bar dataKey="total_won_bid_amount" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div> */}
            {/* <div className="ms-5 col-md-7 col-sm-7 graphimg">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  width={500}
                  height={500}
                  data={companyiesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="company_name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="total_won_estimating"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="total_won_bid_amount"
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div> */}
            <div
              className="ms-5 col-md-7 col-sm-7 text-center graphimg"
              data-aos="fade-up"
            >
              <BarChart
                width={650}
                height={350}
                data={companyiesData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="company_name" />
                <YAxis />
                <Tooltip formatter={(value) => formatNumberWithCommas(value)} />
                <Bar
                  dataKey="total_won_bid_amount"
                  fill="#8884d8"
                  shape={<TriangleBar />}
                  label={{ position: "top" }}
                >
                  {companyiesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                  ))}
                </Bar>
              </BarChart>
              <div className="mt-2 d-flex totalamount">
                <h1>Total Amount: </h1>
                {companyiesData[2] && (
                  <h1>
                    {formatNumberWithCommas(
                      companyiesData[2].total_won_bid_amount
                    )}
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
