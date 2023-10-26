import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProjectDirectory.css";
import axios from "axios";
const ProjectDirectory = () => {
  const { id } = useParams();
  const AllFolders = [
    {
      id: 1,
      name: "Accounting",
      children: ["Billing 1", "Billing 2", "Billing 3"],
    },
    {
      id: 2,
      name: "Certified PayRoll",
    },
    {
      id: 3,
      name: "Change Order",
    },
    {
      id: 4,
      name: "Contract",
    },
    {
      id: 5,
      name: "Estimating",
      children: [
        "Addendums",
        "Bid",
        "Plans",
        "Pre Bid RFIs",
        "Quotes",
        "Specs",
      ],
    },

    {
      id: 6,
      name: "Insurance",
    },
    {
      id: 7,
      name: "PM",
    },
    {
      id: 8,
      name: "Safety",
    },
  ];

  const [openFolderId, setOpenFolderId] = useState(null);

  const handleFolderClick = (folderId) => {
    setOpenFolderId(folderId === openFolderId ? null : folderId);
  };

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");

  // Fetch data from the API
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/project/Project/${id}`)
      .then((response) => response.data)
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  // const filteredData = data.filter((customer) => {
  //   return (
  //     (customer.estimating &&
  //       customer.estimating.toUpperCase().includes(filter.toUpperCase())) ||
  //     (customer.job_num &&
  //       customer.job_num
  //         .toString()
  //         .toUpperCase()
  //         .includes(filter.toUpperCase())) ||
  //     (customer.prjct_engnr &&
  //       customer.prjct_engnr.toUpperCase().includes(filter.toUpperCase())) ||
  //     (customer.bim_oprtr &&
  //       customer.bim_oprtr.toUpperCase().includes(filter.toUpperCase())) ||
  //     (customer.Forman &&
  //       customer.Forman.toUpperCase().includes(filter.toUpperCase()))
  //   );
  // });

  // const formatBidAmount = (amount) => {
  //   if (amount === null) return ""; // Return an empty string if the amount is null
  //   return amount.toLocaleString("en-US");
  // };
  return (
    <div>
      <div className="projectDirectoryParent">
        <aside className="aside">
          <div className="asideData ">
            <h6 className="Projtitle">CCC Applied Technology Bldg</h6>
            <div className="folders mt-4">
              <ul>
                {AllFolders.map((folder) => (
                  <li className="mylist" key={folder.id}>
                    <span
                      className="spanParent"
                      onClick={() => handleFolderClick(folder.id)}
                    >
                      {folder.name}
                      <i className="fa-light fa  fa-angle-down"></i>
                    </span>
                    {folder.id === openFolderId && folder.children && (
                      <ul className="mt-2 subSection">
                        {folder.children.map((child, index) => (
                          <li className="sublist" key={index}>
                            {child}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <main className="projectdirectorymain">
          <div className="parentDiv px-5">
            <div className="titleWithSearch">
              <h3 className=" heading-summary text-primary">
                Projects Summary
              </h3>
            </div>
          </div>
          <div className=" projectfiledshow mt-4">
            {data.map((item) => {
              return (
                <>
                  <div className="container px-5" key={item.id}>
                    <div className="ms-3 row">
                      <div className="col-md-3 borderleft">
                        <div className="d-flex">
                          <p className="phead">Status:</p>
                          <p className="borderdown ms-3">{item.status}</p>
                        </div>

                        <div className="d-flex">
                          <p className="phead">Scope:</p>
                          <p className="borderdown ms-3">{item.scope}</p>
                        </div>

                        <div className="d-flex">
                          <p className="phead">Addendums:</p>
                          <p className="borderdown ms-3">{item.addendums}</p>
                        </div>
                        <div className="d-flex">
                          <p className="phead">Specification:</p>
                          <p className="borderdown ms-3">{item.Spec}</p>
                        </div>
                        <div className="d-flex">
                          <p className="phead">Contacts:</p>
                          <p className="borderdown ms-3">{item.contacts}</p>
                        </div>
                        <div className="d-flex">
                          <p className="phead">Drywell:</p>
                          <p className="borderdown ms-3">{item.drywell}</p>
                        </div>
                        <div className="d-flex">
                          <p className="phead">Wall-Type:</p>
                          <p className="borderdown ms-3">{item.wall_type}</p>
                        </div>
                        <div className="d-flex">
                          <p className="phead">progress:</p>
                          <p className="borderdown ms-3">{item.progress}</p>
                        </div>
                        <div className="d-flex">
                          <p className="phead">ro_door:</p>
                          <p className="borderdown ms-3">{item.ro_door}</p>
                        </div>
                        <div className="d-flex">
                          <p className="phead">ro_window:</p>
                          <p className="borderdown ms-3">{item.ro_window}</p>
                        </div>

                        <div className="d-flex">
                          <p className="phead">substitution:</p>
                          <p className="borderdown ms-3">{item.substitution}</p>
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="ms-3 row">
                          <div className="col-md-5">
                            <div className="d-flex">
                              <p className="phead">Contracts:</p>
                              <p className="borderdown ms-3">
                                {item.contracts[0].contract}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="d-flex">
                              <p className="phead">Contract_Date:</p>
                              <p className="borderdown ms-3">
                                {item.contracts[0].contract_date}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="ms-3 row">
                          <div className="col-md-5">
                            <div className="d-flex">
                              <p className="phead">Schedule_of_values:</p>
                              <p className="borderdown ms-3">
                                {item.schedule_of_values[0].schedule}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="d-flex">
                              <p className="phead">Schedule_Date:</p>
                              <p className="borderdown ms-3">
                                {item.schedule_of_values[0].schedule_date}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="ms-3 row">
                          <div className="col-md-5">
                            <div className="d-flex">
                              <p className="phead">Insurance:</p>
                              <p className="borderdown ms-3">
                                {item.insurancs[0].insurance}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="d-flex">
                              <p className="phead">Insurance_Date:</p>
                              <p className="borderdown ms-3">
                                {item.insurancs[0].date}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="ms-3 row">
                          <div className="col-md-5">
                            <div className="d-flex">
                              <p className="phead">Bond:</p>
                              <p className="borderdown ms-3">
                                {item.bond[0].bond}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="d-flex">
                              <p className="phead">Bond_Date:</p>
                              <p className="borderdown ms-3">
                                {item.bond[0].date}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="ms-3 row">
                          <div className="col-md-5">
                            <div className="d-flex">
                              <p className="phead">Zliens:</p>
                              <p className="borderdown ms-3">
                                {item.zliens[0].zlien}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="d-flex">
                              <p className="phead">Zliens_Date:</p>
                              <p className="borderdown ms-3">
                                {item.zliens[0].date}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="ms-3 row">
                          <div className="col-md-5">
                            <div className="d-flex">
                              <p className="phead">Schedule_Status</p>
                              <p className="borderdown ms-3">
                                {item.schedule[0].status}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="d-flex">
                              <p className="phead">Schedule_Date:</p>
                              <p className="borderdown ms-3">
                                {item.schedule[0].date}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="ms-3 row">
                          <div className="col-md-5">
                            <div className="d-flex">
                              <p className="phead">Billing_Reduction:</p>
                              <p className="borderdown ms-3">
                                {item.billing[0].reduction}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="d-flex">
                              <p className="phead">Billing_Date:</p>
                              <p className="borderdown ms-3">
                                {item.billing[0].due_date}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="ms-3 row">
                          <div className="col-md-5">
                            <div className="d-flex">
                              <p className="phead">Sov_Status:</p>
                              <p className="borderdown ms-3">
                                {item.sov[0].status}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="d-flex">
                              <p className="phead">Sov_Date:</p>
                              <p className="borderdown ms-3">
                                {item.sov[0].date}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="ms-3 row">
                          <div className="col-md-5">
                            <div className="d-flex">
                              <p className="phead">Onbuild_filed:</p>
                              <p className="borderdown ms-3">
                                {item.onbuild[0].field}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="d-flex">
                              <p className="phead">Onbuild_status:</p>
                              <p className="borderdown ms-3">
                                {item.onbuild[0].status}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="ms-3 row">
                          <div className="col-md-5">
                            <div className="d-flex">
                              <p className="phead">Buget_Status:</p>
                              <p className="borderdown ms-3">
                                {item.buget[0].status}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="d-flex">
                              <p className="phead">Buget_Comment:</p>
                              <p className="borderdown budgethide ms-3">
                                {item.buget[0].comment_box}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="container px-5">
                    <div className="ms-3 row">
                      <div className="col-md-4 ">
                        <div className="d-flex">
                          <p className="phead">Hds_system Status:</p>
                          <p className="borderdown ms-3">
                            {item.hds_system[0].status}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4 ">
                        <div className="d-flex">
                          <p className="phead">Date:</p>
                          <p className="borderdown ms-3">
                            {item.hds_system[0].date}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4 ">
                        <div className="d-flex">
                          <p className="phead">Comment:</p>
                          <p className="borderdown ms-3">
                            {item.hds_system[0].comment_box}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="ms-3 row">
                      <div className="col-md-4 ">
                        <div className="d-flex">
                          <p className="phead">Laborrate_Status:</p>
                          <p className="borderdown ms-3">
                            {item.laborrate[0].status}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4 ">
                        <div className="d-flex">
                          <p className="phead">Date:</p>
                          <p className="borderdown ms-3">
                            {item.laborrate[0].date}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4 ">
                        <div className="d-flex">
                          <p className="phead">Comment:</p>
                          <p className="borderdown ms-3">
                            {item.laborrate[0].comment_box}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="ms-3 row">
                      <div className="col-md-4 ">
                        <div className="d-flex">
                          <p className="phead">Sub_Contractors Status:</p>
                          <p className="borderdown ms-3">
                            {item.sub_contractors[0].status}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4 ">
                        <div className="d-flex">
                          <p className="phead">Date:</p>
                          <p className="borderdown ms-3">
                            {item.sub_contractors[0].date}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4 ">
                        <div className="d-flex">
                          <p className="phead">Comment:</p>
                          <p className="borderdown ms-3">
                            {item.sub_contractors[0].comment_box}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div
                    className="container px-5"
                    
                  >
                    <div className="ms-3 row">
                      <div className="col-md-3 ">
                        <div className="d-flex">
                          <p className="phead">Submittals:</p>
                          <p className="borderdown ms-3">
                            {item.submittals[0].status}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-3 ">
                        <div className="d-flex">
                          <p className="phead">Date:</p>
                          <p className="borderdown ms-3">
                            {item.submittals[0].date}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-3 ">
                        <div className="d-flex">
                          <p className="phead">Proposal:</p>
                          <p className="borderdown ms-3">
                            {item.submittals[0].proposal}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-3 ">
                        <div className="d-flex">
                          <p className="phead">Scope Work No.:</p>
                          <p className="borderdown ms-3">
                            {item.submittals[0].scop_work_number}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="ms-3 row">
                      <div className="col-md-3 ">
                        <div className="d-flex">
                          <p className="phead">shopdrawing:</p>
                          <p className="borderdown ms-3">
                            {item.shopdrawing[0].status}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-3 ">
                        <div className="d-flex">
                          <p className="phead">Date:</p>
                          <p className="borderdown ms-3">
                            {item.shopdrawing[0].date}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-3 ">
                        <div className="d-flex">
                          <p className="phead">Propsal:</p>
                          <p className="borderdown ms-3">
                            {item.shopdrawing[0].proposal}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-3 ">
                        <div className="d-flex">
                          <p className="phead">Scope Work No.:</p>
                          <p className="borderdown ms-3">
                            {item.shopdrawing[0].scop_work_number}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="ms-3 row">
                      <div className="col-md-3 ">
                        <div className="d-flex">
                          <p className="phead">Safity:</p>
                          <p className="borderdown ms-3">
                            {item.safity[0].status}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-3 ">
                        <div className="d-flex">
                          <p className="phead">Date:</p>
                          <p className="borderdown ms-3">
                            {item.safity[0].date}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-3 ">
                        <div className="d-flex">
                          <p className="phead">Proposal:</p>
                          <p className="borderdown ms-3">
                            {item.safity[0].proposal}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-3 ">
                        <div className="d-flex">
                          <p className="phead">Scope Work No.:</p>
                          <p className="borderdown ms-3">
                            {item.safity[0].scop_work_number}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectDirectory;
