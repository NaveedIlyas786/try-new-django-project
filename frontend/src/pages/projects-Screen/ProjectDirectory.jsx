import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProjectDirectory.css";
import axios from "axios";
import ProjectDetailSidebar from "./ProjectDetailSidebar";
const ProjectDirectory = () => {
  const { id } = useParams();

  // ******Project Details Data regarding specific Id
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

  // ******Project folder directory sidebar

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
    <div id="main">
      <div className="sidebar ">
        <h6 className="bg-primary text-white p-2">
          {data?.proposal?.estimating?.prjct_name}
        </h6>
        {sidebarData.map((item,index)=><ProjectDetailSidebar item={item} key={index} {...item}/>)}
      </div>
      <div className="container">
        <h2>{data.projectName}</h2>
        <p>Project Engineer: {data.prjct_engnr}</p>
        <p>Project Name: {data.proposal?.estimating?.prjct_name}</p>
      </div>
    </div>
  );
};

export default ProjectDirectory;