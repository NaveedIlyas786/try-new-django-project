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
    <div class="main">
      <div className="sidebar">
        <h6 className="bg-primary text-white mt-2 p-2">
          {data?.proposal?.estimating?.prjct_name}
        </h6>
        {sidebarData.map((item,index)=><ProjectDetailSidebar item={item} key={index} {...item}/>)}
      </div>
      <div className="main-1">
        <div className="container" >
        <h2>{data.projectName}</h2>
        <p><strong>Status:</strong> <label className="data-align">{data.status}</label></p>
        <p><strong>Addendum:</strong> <label className="data-align">{data.addendums}</label></p>
        <p><strong>Bid:</strong> <label className="data-align">{data.bid}</label></p>
        <p><strong>Spec's per our Scope:</strong><label className="data-align"> {data.Spec}</label></p>
        <p><strong>Drywell Conttrol Joins:</strong> <label className="data-align">{data.drywell}</label></p>
        <p><strong>Finish level markups:</strong><label className="data-align"> {data.finish}</label></p>
        <p><strong>Wall type Mapping:</strong><label className="data-align"> {data.wall_type}</label></p>
        <p><strong>Progress Tracking:</strong> <label className="data-align">{data.progress}</label></p>
        <p><strong>RO-Door:</strong><label className="data-align"> {data.ro_door}</label></p>
        <p><strong>RO-Window:</strong> <label className="data-align">{data.ro_window}</label></p>    
        {/* <p><strong>Substitution:</strong><label className="data-align"> {data.substitution}</label></p> */}

      </div>
      <div className="container-2" >
        <div className="container-2-1">
        <h2>{data.projectName}</h2>
        <p><strong>Contracts:</strong> <label>{(data?.contracts || []).length === 0 ? 'null' : (data.contracts.map((e) => (<span> {e.contract}</span>)))}</label></p>
        <p><strong>Schedule of value:</strong> <label>{(data?.schedule_of_values || []).length === 0 ? 'null' : (data.schedule_of_values.map((e) => (<span> {e.schedule}</span>)))}</label></p>
        <p><strong>Insurancs:</strong> <label>{(data?.insurancs || []).length === 0 ? 'null' : (data.insurancs.map((e) => (<span> {e.insurance}</span>)))}</label></p>
        <p><strong>Bond:</strong> <label>{(data?.bond || []).length === 0 ? 'null' : (data.bond.map((e) => (<span> {e.bond}</span>)))}</label></p>
        <p><strong>Zliens:</strong> <label>{(data?.zliens || []).length === 0 ? 'null' : (data.zliens.map((e) => (<span> {e.zlien}</span>)))}</label></p>
        <p><strong>Schedule:</strong> <label>{(data?.schedule || []).length === 0 ? 'null' : (data.schedule.map((e) => (<span> {e.status}</span>)))}</label></p>
        <p><strong>SOV:</strong> <label>{(data?.sov || []).length === 0 ? 'null' : (data.sov.map((e) => (<span> {e.status}</span>)))}</label></p>
        <p><strong>Billing</strong> <label>{(data?.billing || []).length === 0 ? 'null' : (data.billing.map((e) => (<span> {e.reduction}</span>)))}</label></p>

        </div>
        
        <div className="container-2-2">
        <p><label>{(data?.contracts || []).length === 0 ? 'null' : (data.contracts.map((e) => (<span> {e.contract_date}</span>)))}</label></p>
        <p><label>{(data?.schedule_of_values || []).length === 0 ? 'null' : (data.schedule_of_values.map((e) => (<span> {e.schedule}</span>)))}</label></p>
        <p><label>{(data?.insurancs || []).length === 0 ? 'null' : (data.insurancs.map((e) => (<span> {e.date}</span>)))}</label></p>
        <p><label>{(data?.bond || []).length === 0 ? 'null' : (data.bond.map((e) => (<span> {e.date}</span>)))}</label></p>
        <p><label>{(data?.zliens || []).length === 0 ? 'null' : (data.zliens.map((e) => (<span> {e.date}</span>)))}</label></p>
        <p><label>{(data?.schedule || []).length === 0 ? 'null' : (data.schedule.map((e) => (<span> {e.date}</span>)))}</label></p>
        <p><label>{(data?.sov || []).length === 0 ? 'null' : (data.sov.map((e) => (<span> {e.date}</span>)))}</label></p>
        <p><label>{(data?.billing || []).length === 0 ? 'null' : (data.billing.map((e) => (<span> {e.due_date}</span>)))}</label></p>



        </div>

      </div>
      </div>

      <div className="main-2">
        <div className="container1">
        <p><strong>Sub Contractors:</strong> <label>{(data?.sub_contractors || []).length === 0 ? 'null' : (data.sub_contractors.map((e) => (<span> {e.status}</span>)))}</label></p>
        <p><strong>Labor Rate:</strong> <label>{(data?.laborrate || []).length === 0 ? 'null' : (data.laborrate.map((e) => (<span> {e.status}</span>)))}</label></p>
        <p><strong>HDS System:</strong> <label>{(data?.hds_system || []).length === 0 ? 'null' : (data.hds_system.map((e) => (<span> {e.status}</span>)))}</label></p>
        
        <p><strong>Buget:</strong> <label>{(data?.buget || []).length === 0 ? 'null' : (data.buget.map((e) => (<span> {e.status}</span>)))}</label></p>

        </div>
        <div className="container1-1">
        <p><label>{(data?.sub_contractors || []).length === 0 ? 'null' : (data.sub_contractors.map((e) => (<span> {e.date}</span>)))}</label></p>
        <p><label>{(data?.laborrate || []).length === 0 ? 'null' : (data.laborrate.map((e) => (<span> {e.date}</span>)))}</label></p>
        <p><label>{(data?.hds_system || []).length === 0 ? 'null' : (data.hds_system.map((e) => (<span> {e.date}</span>)))}</label></p>
        <p><label>{(data?.buget || []).length === 0 ? 'null' : (data.buget.map((e) => (<span> {e.date}</span>)))}</label></p>

        </div>
        <div className="container1-2">
        <p><strong>Comment:</strong> <label>{(data?.sub_contractors || []).length === 0 ? 'null' : (data.sub_contractors.map((e) => (<span> {e.comment_box}</span>)))}</label></p>
        <p><strong>Comment:</strong> <label>{(data?.laborrate || []).length === 0 ? 'null' : (data.laborrate.map((e) => (<span> {e.comment_box}</span>)))}</label></p>
        <p><strong>Comment:</strong> <label>{(data?.hds_system || []).length === 0 ? 'null' : (data.hds_system.map((e) => (<span> {e.comment_box}</span>)))}</label></p>
        <p><strong>Comment:</strong> <label>{(data?.buget || []).length === 0 ? 'null' : (data.buget.map((e) => (<span> {e.comment_box}</span>)))}</label></p>

        </div>

      </div>





      <div className="tableSubmitls">


      </div>







      
    </div>
  );
};

export default ProjectDirectory;