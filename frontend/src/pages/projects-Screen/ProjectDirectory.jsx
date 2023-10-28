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
  const formatBidAmount = (amount) => {
    if (amount === null) return ""; // Return an empty string if the amount is null
    return amount.toLocaleString("en-US");
  };
  const handleFolderClick = (folderId) => {
    setOpenFolderId(folderId === openFolderId ? null : folderId);
  };
// *****************Project Details getting

const [data, setData] = useState([]);

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

// ***************** Project Sidebar Folder Structure fetching

  const [sidebarData, setSidebarData] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/project/projectDrctory/`)
      .then((response) => response.data)
      .then((data) => {
        setSidebarData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);





  
  return (
    <div>
      <div className="projectDirectoryParent">
        


          <div className="projectdetailscreen">
          <h1 className="mt-5 " style={{"color":"red"}}>Project Screen</h1>
          <div className="projectdetailscreen">
  <h1 className="mt-5" style={{ color: "red" }}>Project Screen</h1>
  <div className="project-card">
    <h2>{data.projectName}</h2>
    <p>Project Engineer: {data.prjct_engnr}</p>
    <p>Project Name: {data.proposal_id}</p>
    {/* Add more properties you want to display */}
  </div>
</div>

          </div>
      </div>
    </div>
  );
};

export default ProjectDirectory;
