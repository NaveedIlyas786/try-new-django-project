import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProjectDirectory.css";
const ProjectDirectory = () => {
  const { Prjct_Name } = useParams();
  const AllFolders=[
    {
      id: 1,
      name: "Accounting",
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
  ]
  return (
    <div>
      <div className="projectDirectoryParent">
        <aside className="aside">
          <div className="asideData ">
            <h6 className="Projtitle">CCC Applied Technology Bldg</h6>
          <div className="folders">

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
