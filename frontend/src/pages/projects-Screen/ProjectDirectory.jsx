import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProjectDirectory.css";
import axios from "axios";
const ProjectDirectory = () => {
  const { Prjct_Name } = useParams();
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
      children: ["Addendums", "Bid", "Plans","Pre Bid RFIs","Quotes","Specs"],
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
      .get("http://127.0.0.1:8000/api/project/Project/")
      .then((response) => response.data)
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filteredData = data.filter((customer) => {
    return (
      (customer.estimating &&
        customer.estimating.toUpperCase().includes(filter.toUpperCase())) ||
      (customer.job_num &&
        customer.job_num
          .toString()
          .toUpperCase()
          .includes(filter.toUpperCase())) ||
      (customer.prjct_engnr &&
        customer.prjct_engnr.toUpperCase().includes(filter.toUpperCase())) ||
      (customer.bim_oprtr &&
        customer.bim_oprtr.toUpperCase().includes(filter.toUpperCase())) ||
      (customer.Forman &&
        customer.Forman.toUpperCase().includes(filter.toUpperCase()))
    );
  });

  const formatBidAmount = (amount) => {
    if (amount === null) return ""; // Return an empty string if the amount is null
    return amount.toLocaleString("en-US");
  };
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
            <span className="spanParent" onClick={() => handleFolderClick(folder.id)}>{folder.name}<i className="fa-light fa  fa-angle-down"></i></span>
            {folder.id === openFolderId && folder.children && (
              <ul className="mt-2 subSection">
                {folder.children.map((child, index) => (
                  <li className="sublist" key={index}>{child}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
            </div>
          </div>
        </aside>
        <main className="main">
          
          {/* <img
            className="mainimg"
            src="../../../src/assets/logo1.avif"
            alt=""
          /> */}
          <div className="parentDiv px-5">
      <div className="titleWithSearch">
        <h3 className="text-black">Projects Summary</h3>
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

      <div className="table-responsive projectTable mt-4">
        <table className="table table-striped   table-bordered table-hover text-center">
          <thead className="projectHeader">
            <tr>
              <th>Start Date</th>
              <th>Project Name</th>
              <th>Job Number</th>
              <th>Project Manager</th>
              <th>Project Engineer</th>
              <th>Bim Operator</th>
              <th>Foreman</th>
            </tr>
          </thead>
          <tbody className="bg-info jloop">
            {filteredData.map((item) => (
              <tr
                key={item.id}
                className="mytr"
                onClick={() => navigateToLink(item.id)}
                value={item.Prjct_Name}
              >
                <td className="mytd">{item.start_date}</td>
                <td className="mytd">{item.estimating}</td>
                <td className="mytd">{item.job_num}</td>

                <td className="mytd">{item.prjct_mngr}</td>

                <td className="mytd">{item.prjct_engnr}</td>
                <td className="mytd">{item.bim_oprtr}</td>
                <td className="mytd">{item.Forman}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectDirectory;
