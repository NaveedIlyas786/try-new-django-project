import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const ProjectDirectory = () => {
    const { id } = useParams();
    const [projectData, setProjectData] = useState({});
  
    useEffect(() => {
      // Fetch project data based on the 'id' from your API or data source
      // For this example, we'll simulate fetching data
      const fetchData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/project/ProjectList/${id}`);
          if (response.ok) {
            const data = await response.json();
            setProjectData(data);
          } else {
            throw new Error("Failed to fetch project data");
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, [id]);
  return (
    <div>
      <h1>ProjectDirectory page</h1>
      <h1>ProjectDirectory page</h1>
      <h1>ProjectDirectory page</h1>
      <h1>ProjectDirectory page</h1>
      <h1>Project Directory Page</h1>
      <p>Project ID: {id}</p>
      <p>{projectData.prjct_mngr}</p>
      <h1>ProjectDirectory page</h1>
      <h1>ProjectDirectory page</h1>
      <h1>ProjectDirectory page</h1>
      <h1>ProjectDirectory page</h1>
    </div>
  );
};

export default ProjectDirectory;
