import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <div className=" container dashboard ">
        <div className=" row projectStatus justify-content-around">
          <div className=" col-md-2 p-2 ProjectStatus  text-center">
            <h4 className="pt-2">7</h4>
            <p>
              <i className="fa-solid fs-5 fa fa-square-check check"></i>
            </p>
            <h5>Won</h5>
          </div>
          <div className=" col-md-2 p-2 ProjectStatus  text-center">
            <h4 className="pt-2">7</h4>
            <p>
              <i className="fa-solid  fa-question fs-5 pend"></i>
            </p>
            <h5>pending</h5>
          </div>
          <div className=" col-md-2 p-2 text-center ProjectStatus">
            <h4 className="pt-2">10</h4>
            <p>
              <i className="fa-solid fa-spinner fs-5 working"></i>
            </p>
            <h5>Working</h5>
            <p>
              <i className="fa-solid fa-square-this-way-up "></i>
            </p>
          </div>
          <div className=" col-md-2 text-center p-2 ProjectStatus">
            <h4 className="pt-2">10</h4>
            <p>
              <i
                className="fa-duotone fa fa-ban mark"
                style={{ "--fa-secondary-opacity": 0.7 }}
              ></i>
            </p>
            <h5>Lost</h5>
          </div>
        </div>
      </div>
      <div className="mt-3 ">
        <div className=" container   text-center">
          <div className=" row table-responsive">
            <div className="col-md-9">
              <table>
                <thead>
                  <tr>
                    <th>Estimator</th>
                    <th>Verbal</th>
                    <th>Won</th>
                    <th>Working</th>
                    <th>#</th>
                    <th>Pending</th>
                    <th>%</th>
                    <th>Estimated $</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Chris Kirby</td>
                    <td>0</td>
                    <td>2</td>
                    <td>0</td>
                    <td>0%</td>
                    <td>1</td>
                    <td>8%</td>
                    <td>$7,350,900</td>
                  </tr>
                  <tr>
                    <td>Charlie Hamilton</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0%</td>
                    <td>0</td>
                    <td>0%</td>
                    <td>$0</td>
                  </tr>
                  <tr>
                    <td>Ben Lomely</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0%</td>
                    <td>0</td>
                    <td>0%</td>
                    <td>$0</td>
                  </tr>
                  <tr>
                    <td>Ivan Schmitt</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0%</td>
                    <td>4</td>
                    <td>67%</td>
                    <td>$8,925,590</td>
                  </tr>
                  <tr>
                    <td>Jon Taylor</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0%</td>
                    <td>1</td>
                    <td>100%</td>
                    <td>$3,645,937</td>
                  </tr>
                  <tr>
                    <td>Mike Tinsley</td>
                    <td>10</td>
                    <td>20%</td>
                    <td>1</td>
                    <td>2%</td>
                    <td>14%</td>
                    <td>$19,276,935</td>
                  </tr>
                  <tr>
                    <td>Dean Taylor</td>
                    <td>0</td>
                    <td>1</td>
                    <td>0</td>
                    <td>0%</td>
                    <td>1</td>
                    <td>50%</td>
                    <td>$17,475,130</td>
                  </tr>
                  <tr>
                    <td>Louie Hoelscher</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0%</td>
                    <td>0</td>
                    <td>0%</td>
                    <td>$0</td>
                  </tr>
                  <tr>
                    <td>David Schmitt</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0%</td>
                    <td>0</td>
                    <td>0%</td>
                    <td>$0</td>
                  </tr>
                  <tr>
                    <td>Granger Leonard</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0%</td>
                    <td>0</td>
                    <td>0%</td>
                    <td>$0</td>
                  </tr>
                  <tr>
                    <td>Valerio</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0%</td>
                    <td>0</td>
                    <td>0%</td>
                    <td>$0</td>
                  </tr>
                  <tr>
                    <td>Un-Assigned</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0%</td>
                    <td>1</td>
                    <td>100%</td>
                    <td>$0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-md-3">
              <img
                src="../../../src/assets/graph.jpeg"
                className="mygraph"
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
