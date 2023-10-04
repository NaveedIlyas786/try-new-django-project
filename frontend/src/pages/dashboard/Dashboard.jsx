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
                <i className="fa-solid fa fs-5 fa-square-xmark mark"></i>
              </p>
              <h5>Rejected</h5>
            </div>
          </div>
        </div>
        <div className="mt-3 ">
          <div className=" container  text-center ">
            <div className=" row table-responsive table-design">
              <div className="col-md-12">
                <table class="table ">
                  <thead class="thead-dark">
                    <tr>
                      <th rowSpan={2} class="align-middle">
                        Estimator
                      </th>
                      <th rowSpan={2} class="align-middle">
                        Working
                      </th>
                      <th colSpan={3}>Pending</th>
                      <th colSpan={3}>Won</th>
                      <th colSpan={3}>Lost</th>
                      <th colSpan={2}>Ytd Total</th>
                    </tr>
                    <tr>
                      <th>#</th>
                      <th>%</th>
                      <th>Estimated$</th>
                      <th>#</th>
                      <th>%</th>
                      <th>Estimated$</th>
                      <th>#</th>
                      <th>%</th>
                      <th>Estimated$</th>
                      <th># </th>
                      <th>Estimated$</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Chris Kirby</td>
                      <td>0</td>
                      <td>2</td>
                      <td>15</td>
                      <td>$8,079,653</td>
                      <td>1</td>
                      <td>8%</td>
                      <td>$7,350,900</td>
                      <td>10</td>
                      <td>77%</td>
                      <td>$70,578,235</td>
                      <td>13</td>
                      <td>$86,008,788</td>
                    </tr>
                    <tr>
                      <td>Charlie Hamilton</td>
                      <td>0</td>
                      <td>2</td>
                      <td>15</td>
                      <td>$8,079,653</td>
                      <td>1</td>
                      <td>8%</td>
                      <td>$7,350,900</td>
                      <td>10</td>
                      <td>77%</td>
                      <td>$70,578,235</td>
                      <td>13</td>
                      <td>$86,008,788</td>
                    </tr>
                    <tr>
                      <td>Chris Kirby</td>
                      <td>0</td>
                      <td>2</td>
                      <td>15</td>
                      <td>$8,079,653</td>
                      <td>1</td>
                      <td>8%</td>
                      <td>$7,350,900</td>
                      <td>10</td>
                      <td>77%</td>
                      <td>$70,578,235</td>
                      <td>13</td>
                      <td>$86,008,788</td>
                    </tr>
                    <tr>
                      <td>Chris Kirby</td>
                      <td>0</td>
                      <td>2</td>
                      <td>15</td>
                      <td>$8,079,653</td>
                      <td>1</td>
                      <td>8%</td>
                      <td>$7,350,900</td>
                      <td>10</td>
                      <td>77%</td>
                      <td>$70,578,235</td>
                      <td>13</td>
                      <td>$86,008,788</td>
                    </tr>
                    <tr>
                      <td>Chris Kirby</td>
                      <td>0</td>
                      <td>2</td>
                      <td>15</td>
                      <td>$8,079,653</td>
                      <td>1</td>
                      <td>8%</td>
                      <td>$7,350,900</td>
                      <td>10</td>
                      <td>77%</td>
                      <td>$70,578,235</td>
                      <td>13</td>
                      <td>$86,008,788</td>
                    </tr>
                    <tr>
                      <td>Chris Kirby</td>
                      <td>0</td>
                      <td>2</td>
                      <td>15</td>
                      <td>$8,079,653</td>
                      <td>1</td>
                      <td>8%</td>
                      <td>$7,350,900</td>
                      <td>10</td>
                      <td>77%</td>
                      <td>$70,578,235</td>
                      <td>13</td>
                      <td>$86,008,788</td>
                    </tr>
                    <tr>
                      <td>Chris Kirby</td>
                      <td>0</td>
                      <td>2</td>
                      <td>15</td>
                      <td>$8,079,653</td>
                      <td>1</td>
                      <td>8%</td>
                      <td>$7,350,900</td>
                      <td>10</td>
                      <td>77%</td>
                      <td>$70,578,235</td>
                      <td>13</td>
                      <td>$86,008,788</td>
                    </tr>
                    <tr>
                      <td>Chris Kirby</td>
                      <td>0</td>
                      <td>2</td>
                      <td>15</td>
                      <td>$8,079,653</td>
                      <td>1</td>
                      <td>8%</td>
                      <td>$7,350,900</td>
                      <td>10</td>
                      <td>77%</td>
                      <td>$70,578,235</td>
                      <td>13</td>
                      <td>$86,008,788</td>
                    </tr>
                    <tr>
                      <td>Chris Kirby</td>
                      <td>0</td>
                      <td>2</td>
                      <td>15</td>
                      <td>$8,079,653</td>
                      <td>1</td>
                      <td>8%</td>
                      <td>$7,350,900</td>
                      <td>10</td>
                      <td>77%</td>
                      <td>$70,578,235</td>
                      <td>13</td>
                      <td>$86,008,788</td>
                    </tr>
                    <tr>
                      <td>Chris Kirby</td>
                      <td>0</td>
                      <td>2</td>
                      <td>15</td>
                      <td>$8,079,653</td>
                      <td>1</td>
                      <td>8%</td>
                      <td>$7,350,900</td>
                      <td>10</td>
                      <td>77%</td>
                      <td>$70,578,235</td>
                      <td>13</td>
                      <td>$86,008,788</td>
                    </tr>
                    <tr>
                      <td>Chris Kirby</td>
                      <td>0</td>
                      <td>2</td>
                      <td>15</td>
                      <td>$8,079,653</td>
                      <td>1</td>
                      <td>8%</td>
                      <td>$7,350,900</td>
                      <td>10</td>
                      <td>77%</td>
                      <td>$70,578,235</td>
                      <td>13</td>
                      <td>$86,008,788</td>
                    </tr>
                    <tr>
                      <td>Chris Kirby</td>
                      <td>0</td>
                      <td>2</td>
                      <td>15</td>
                      <td>$8,079,653</td>
                      <td>1</td>
                      <td>8%</td>
                      <td>$7,350,900</td>
                      <td>10</td>
                      <td>77%</td>
                      <td>$70,578,235</td>
                      <td>13</td>
                      <td>$86,008,788</td>
                    </tr>
                    <tr>
                      <td>Chris Kirby</td>
                      <td>0</td>
                      <td>2</td>
                      <td>15</td>
                      <td>$8,079,653</td>
                      <td>1</td>
                      <td>8%</td>
                      <td>$7,350,900</td>
                      <td>10</td>
                      <td>77%</td>
                      <td>$70,578,235</td>
                      <td>13</td>
                      <td>$86,008,788</td>
                    </tr>
                    <tr>
                      <td>Chris Kirby</td>
                      <td>0</td>
                      <td>2</td>
                      <td>15</td>
                      <td>$8,079,653</td>
                      <td>1</td>
                      <td>8%</td>
                      <td>$7,350,900</td>
                      <td>10</td>
                      <td>77%</td>
                      <td>$70,578,235</td>
                      <td>13</td>
                      <td>$86,008,788</td>
                    </tr>
                    <tr>
                      <td>Chris Kirby</td>
                      <td>0</td>
                      <td>2</td>
                      <td>15</td>
                      <td>$8,079,653</td>
                      <td>1</td>
                      <td>8%</td>
                      <td>$7,350,900</td>
                      <td>10</td>
                      <td>77%</td>
                      <td>$70,578,235</td>
                      <td>13</td>
                      <td>$86,008,788</td>
                    </tr>
                    <tr></tr>
                    <tr className="grandtotal align-middle">
                      <td rowSpan={2}>Grand Total 2022</td>
                      <td rowSpan={2}>1</td>
                      <td rowSpan={2}>50</td>
                      <td rowSpan={2}></td>
                      <td rowSpan={2}>39,031,806</td>
                      <td rowSpan={2}>13</td>
                      <td rowSpan={2}>16%</td>
                      <td rowSpan={2}>$39,199,362</td>
                      <td rowSpan={2}>52</td>
                      <td rowSpan={2}>65%</td>
                      <td rowSpan={2}>$177,784,100</td>
                      <td rowSpan={2}>80</td>
                      <td rowSpan={2}>$255,762,645</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="container mt-5 ">
            <div className="row">
              <div className="col-md-4 mt-3 table-responsive-custom">
                <table class="table table-striped text-center ">
                  <thead class="thead-dark">
                    <tr>
                      <th rowSpan={2} class="align-middle">
                        Company
                      </th>
                      <th colSpan={2}>Won</th>
                    </tr>
                    <tr>
                      <th>#</th>
                      <th>Estimated$</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>DMS - Drywall</td>
                      <td>5</td>
                      <td>$8,637,659</td>
                    </tr>
                    <tr>
                      <td>David M. Schmitt</td>
                      <td>5</td>
                      <td>$0</td>
                    </tr>
                    <tr>
                      <td>DMS - BKL</td>
                      <td>8</td>
                      <td>$30,561,703</td>
                    </tr>
                    <tr>
                      <td>DMS - STL</td>
                      <td>0</td>
                      <td>$0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className=" ms-5 col-md-7 col-sm-7 graphimg"  >
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
