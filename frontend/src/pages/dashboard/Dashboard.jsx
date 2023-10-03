import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <div className=" container dashboard ">
        <div className=" row projectStatus justify-content-around">
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
          <div className=" col-md-2 p-2 ProjectStatus  text-center">
            <h4 className="pt-2" >7</h4>
            <p>
              <i className="fa-solid  fa-question fs-5 pend"></i>
            </p>
            <h5>pending</h5>
          </div>
          <div className=" col-md-2 p-2 ProjectStatus  text-center">
            <h4 className="pt-2">7</h4>
            <p>
              <i className="fa-solid fs-5 fa fa-square-check check"></i>
            </p>
            <h5>Won</h5>
          </div>
          <div className=" col-md-2 text-center p-2 ProjectStatus">
            <h4 className="pt-2">10</h4>
            <p>
              <i className="fa-solid fa fs-5 fa-square-xmark mark"></i>
            </p>
            <h5>Lost</h5>
          </div>
        </div>
      </div>
      <div className="mt-3 ">
        <div className=" container   text-center">
          <div className=" row table-responsive">
            <div className="col-md-9">
              {/* <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Estimator</th>
                    <th scope="col">Working</th>
                    <th scope="col">Pending</th>
                    <th scope="col"> Won</th>
                    <th scope="col"> Lost</th>
                    <th scope="col"> Ytd</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Chris Kirby</th>
                    <td>0</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">Charlie Hamilton </th>
                    <td>0</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>@fat</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">Ben Lomely</th>
                    <td>0</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th scope="row">Ivan Schmitt</th>
                    <td>0</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th scope="row">jhon Tylor</th>
                    <td>0</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th scope="row">Mike Tinsley</th>
                    <td>0</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th scope="row">Deen Tylor</th>
                    <td>0</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th scope="row">louie hoelscher</th>
                    <td>0</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table> */}
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