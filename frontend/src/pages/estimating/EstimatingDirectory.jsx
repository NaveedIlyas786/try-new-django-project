import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./EstimatingDirectory.css";

const EstimatingDirectory = () => {
  const { Prjct_Name } = useParams();

  const AllFolders = [
    {
      id: 1,
      name: "Addendums",
      children: [
        {
          name: "Add.3",
          children: [
            { name: "SubChild1" }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Bid",
      children: [
        { name: "Bid" },
        { name: "Bidders" },
        { name: "Scope" }
      ]
    },
    {
      id: 3,
      name: "Plans",
      children: [
        { name: "Plans" },
        { name: "Takeoff" }
      ]
    },
    {
      id: 4,
      name: "Pre Bid RFIs"
    },
    {
      id: 5,
      name: "Quotes",
      children: [
        { name: "00 Quotes Request" },
        { name: "00A - MC Request Form" },
        { name: "00B - Price Comparison" },
        { name: "Material Quotes" },
        { name: "Plaster" },
        { name: "Scaffold" }
      ]
    },
    {
      id: 6,
      name: "Specs",
      children: [
        { name: "Bidding Specs" },
        { name: "Specs" }
      ]
    }
  ];

  const [openFolderId, setOpenFolderId] = useState(null);

  const handleFolderClick = (folderId) => {
    setOpenFolderId(folderId === openFolderId ? null : folderId);
  };

  const renderChild = (child) => (
    <li className="sublist" key={child.name}>
      {child.name}
      {child.children && (
        <ul className="mt-4">
          {child.children.map(renderChild)}
        </ul>
      )}
    </li>
  );

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

export default EstimatingDirectory;
