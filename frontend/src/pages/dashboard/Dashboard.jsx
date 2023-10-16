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

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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

  // Assuming your data is stored in a variable called 'dashData'
  const chartData = dashData.map((e) => ({
    name: e.estimator,
    Working: e.summary?.Working?.total || 0,
    Pending: e.summary?.Pending?.total || 0,
    Won: e.summary?.Won?.total || 0,
    Lost: e.summary?.Lost?.total || 0,
  }));


    const [selectedYear, setSelectedYear] = useState(2023);
  // const [dashData, setDashData] = useState([]); // Initialize with an empty array

  // Fetch data based on the selected year
  useEffect(() => {
    // Create a function to fetch data based on the selected year
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/estimating/api/estimators/summary/?year=${selectedYear}`);
        if (response.ok) {
          const data = await response.json();
          setDashData(data); // Update the state with fetched data
        } else {
          console.error('Error fetching data');
        }
      } catch (error) {
        console.error('An error occurred:', error.message);
      }
    };

    // Call the fetchData function when selectedYear changes
    fetchData();
  }, [selectedYear]);

  // Event handler for changing the selected year
  const handleYearChange = (year) => {
    setSelectedYear(year);
  };


  return (
    <>
      <div className=" container dashboard ">
        <div className=" row projectStatus justify-content-around">
          <div className=" col-md-2 p-2 ProjectStatus pendinggreen ">
            <h4 className="pt-3 pb-2">
              {dashData.reduce((acc, e) => acc + (e?.Won?.total || 0), 0)}
            </h4>
            <p>
              <i className="fa-solid fa-circle-check check"></i>
            </p>
            <h5>Won</h5>
          </div>
          <div className=" col-md-2 p-2  ProjectStatus pendingyellow">
            <h4 className="pt-3 pb-2">
              {dashData.reduce((acc, e) => acc + (e?.Pending?.total || 0), 0)}
            </h4>
            <p>
              <i className="fa-solid  fa-question fs-5 pend"></i>
            </p>
            <h5>pending</h5>
          </div>
          <div className=" col-md-2 p-3  ProjectStatus pendingWorking" >
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
          <div className=" col-md-2 p-3  ProjectStatus pendingLost" >
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
         
        <div>
      {/* Dropdown for selecting the year */}
      <div className="ms-4 mb-2 btn-group dropright">
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
            <a
              className={`dropdown-item ${selectedYear === 2023 ? 'active' : ''}`}
              href="#"
              onClick={() => handleYearChange(2023)}
            >
              2023
            </a>
          </li>
          <li>
            <a
              className={`dropdown-item ${selectedYear === 2022 ? 'active' : ''}`}
              href="#"
              onClick={() => handleYearChange(2022)}
            >
              2022
            </a>
          </li>
          <li>
            <a
              className={`dropdown-item ${selectedYear === 2020 ? 'active' : ''}`}
              href="#"
              onClick={() => handleYearChange(2020)}
            >
              2020
            </a>
          </li>
        </ul>
        <h4 className="myh4">{selectedYear}</h4>
      </div>
      </div>


          <div
            className=" row table-responsive table-design pk"
            data-aos="fade-left"
          >
            <div className="col-md-12">
              <table className="table jk">
                <thead className="thead-dark myhead text-center">
                  <tr className="pk">
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
                </tbody>
                <tfoot className="mytfoot">
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
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row ">
            <div
              className="col-md-4 twoTable  mt-3 table-responsive-custom"
            >
              <table className="table twoTable table-striped text-center ">
                <thead className="thead-dark ">
                  <tr>
                    <th rowSpan={2} className="align-middle ">
                      Company
                    </th>
                    <th colSpan={2} className="align-middle ">
                      Won
                    </th>
                  </tr>
                  <tr>
                    <th className="align-middle">#</th>
                    <th className="align-middle">Estimated $</th>
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
            {/* <div
              className="ms-5 col-md-7 col-sm-7 text-center graphimg"
              
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
            </div> */}
            <div
              className="ms-5 col-md-7 col-sm-7 text-center graphimg"
              
            >
              <BarChart
                width={800}
                height={400}
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar dataKey="Working" stackId="a" fill="#8884d8" />
                <Bar dataKey="Pending" stackId="a" fill="#82ca9d" />
                <Bar dataKey="Won" stackId="a" fill="#ffc658" />
                <Bar dataKey="Lost" stackId="a" fill="#ff7f7f" />
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
