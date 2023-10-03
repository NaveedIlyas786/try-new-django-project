import React from "react";
import "./Dashboard.css";
import React from "react";
import "./Dashboard.css";
const Dashboard = () => {
  return (
    <>
      <div className=" container dashboard ">
        <div className=" row projectStatus justify-content-around">
          <div className=" col-md-2 p-2 ProjectStatus  text-center">
            <p>
              <i className="fa-solid fs-5 fa fa-square-check"></i>
            </p>
            <h4>7</h4>
            <h5>Won</h5>
          </div>
          <div className=" col-md-2 p-2 ProjectStatus  text-center">
            <p>
            <i className="fa-solid  fa-question fs-5"></i>
            </p>
            <h4>7</h4>
            <h5>pending</h5>
          </div>
          <div className=" col-md-2 p-2 text-center ProjectStatus">
          <p><i className="fa-solid fa-spinner fs-5 "></i></p>
          <h4>10</h4>
            <h5>Working</h5>
            <p>
              <i className="fa-solid fa-square-this-way-up"></i>
            </p>
          </div>
          <div className=" col-md-2 text-center p-2 ProjectStatus">
            <p>
              <i className="fa-solid fa fs-5 fa-square-xmark"></i>
            </p>
          <h4>10</h4>
            <h5>Rejected</h5>
          </div>
          <div className=" col-md-2 p-4 text-center ProjectStatus">
            <h1>07:45</h1>
            <p>NewYork</p>
          </div>
        </div>

        <div className="middlePortion mt-5">
          <div className="table-responsive  ">
            <table className="table  table-stripedtable-bordered table-hover">
              <thead className="">
                <tr>
                  <th>Start Date</th>
                  <th>Time</th>
                  <th>Project Name</th>
                  <th>Area</th>
                  <th>Estimator</th>
                  <th>Status</th>
                  <th>Bidders</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="cursor-pointer text-center ">
                <tr>
                  <td className="mytd">1</td>
                  <td className="mytd">1</td>
                  <td className="mytd">3</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                </tr>
                <tr>
                  <td className="mytd">1</td>
                  <td className="mytd">1</td>
                  <td className="mytd">3</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                </tr>
                <tr>
                  <td className="mytd">1</td>
                  <td className="mytd">1</td>
                  <td className="mytd">3</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                </tr>
                <tr>
                  <td className="mytd">1</td>
                  <td className="mytd">1</td>
                  <td className="mytd">3</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                </tr>
                <tr>
                  <td className="mytd">1</td>
                  <td className="mytd">1</td>
                  <td className="mytd">3</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                </tr>
                <tr>
                  <td className="mytd">1</td>
                  <td className="mytd">1</td>
                  <td className="mytd">3</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                  <td className="mytd">5</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="graphPortion bk">
            <img src="../../../src/assets/graph.jpeg" className="mygraph" alt="My Graph" />
          </div>
        </div>
      </div>
    </>
  );
};
    <>
      <div className=" container dashboard ">
        <div className=" row projectStatus justify-content-around">
          <div className=" col-md-2 p-2 ProjectStatus  text-center">
            <p>
              <i class="fa-solid fs-5 fa fa-square-check"></i>
            </p>
            <h4>7</h4>
            <h5>Won</h5>
          </div>
          <div className=" col-md-2 p-2 ProjectStatus  text-center">
            <p>
            <i class="fa-solid  fa-question fs-5"></i>
            </p>
            <h4>7</h4>
            <h5>pending</h5>
          </div>
          <div className=" col-md-2 p- text-center ProjectStatus">
          <p><i class="fa-solid fa-spinner fs-5 "></i></p>
          <h4>10</h4>
            <h5>Working</h5>
            <p>
              <i class="fa-solid fa-square-this-way-up"></i>
            </p>
          </div>
          <div className=" col-md-2 p-4 ProjectStatus">
            <h5>Rejected</h5>
            <p>
              <i class="fa-solid fa fs-5 fa-square-xmark"></i>
            </p>
          </div>
          <div className=" col-md-2 p-4 ProjectStatus">
          
        </div>
        </div>

        <div className="middlePortion ">
          <div className="table-responsive bk ">
            <table className="table table-striped  table-bordered table-hover">
              <thead className="proposalHeader">
                <tr>
                  <th>Start Date</th>
                  <th>Time</th>
                  <th>Project Name</th>
                  <th>Area</th>
                  <th>Estimator</th>
                  <th>Status</th>
                  <th>Bidders</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="cursor-pointer jktable bg-info jloop">
                <tr>
                  <td className="mytd centered-td">1</td>
                  <td className="mytd centered-td">1</td>
                  <td className="mytd myproject centered-td">3</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                </tr>
                <tr>
                  <td className="mytd centered-td">1</td>
                  <td className="mytd centered-td">1</td>
                  <td className="mytd myproject centered-td">3</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                </tr>
                <tr>
                  <td className="mytd centered-td">1</td>
                  <td className="mytd centered-td">1</td>
                  <td className="mytd myproject centered-td">3</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                </tr>
                <tr>
                  <td className="mytd centered-td">1</td>
                  <td className="mytd centered-td">1</td>
                  <td className="mytd myproject centered-td">3</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                </tr>
                <tr>
                  <td className="mytd centered-td">1</td>
                  <td className="mytd centered-td">1</td>
                  <td className="mytd myproject centered-td">3</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                </tr>
                <tr>
                  <td className="mytd centered-td">1</td>
                  <td className="mytd centered-td">1</td>
                  <td className="mytd myproject centered-td">3</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                  <td className="mytd centered-td">5</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="graphPortion bk">
            <p>Here Graph will be Displayed !</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;