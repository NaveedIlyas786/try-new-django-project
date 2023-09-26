import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProjectDirectory.css";
const ProjectDirectory = () => {
  const { Prjct_Name } = useParams();
  const AllFolders = [
    {
      id: 1,
      name: "Accounting",
      children: ["acc 1", "acc 2", "acc 3"],
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
            <span onClick={() => handleFolderClick(folder.id)}>{folder.name}<i className= "fa-light fa ms-2 fa-angle-down"></i></span>
            {folder.id === openFolderId && folder.children && (
              <ul className="mt-2">
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
          
          <img
            className="mainimg"
            src="../../../src/assets/logo1.avif"
            alt=""
          />
        </main>
      </div>
    </div>
  );
};

export default ProjectDirectory;
