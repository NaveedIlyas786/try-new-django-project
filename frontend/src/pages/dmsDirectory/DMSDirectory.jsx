import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import "./DMSDirectory.css"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DMSDirectory=()=> {
  const [usersInfo, setUsersInfo] = useState([]);
  const [DMSUserDirectory, setDMSUserDirectory] = useState([]);
  const [search, setSearch] = useState("");
  const [filterusers, setFilterUsers] = useState([]);

  const navigate = useNavigate();


  const getUsers = async () => {
    const result = await axios.get("http://127.0.0.1:8000/api/estimating/dmsDrectory/");
    try {
      setUsersInfo(result.data);
      setFilterUsers(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);



  const Columns = [
    {
      name: (
        <strong className="headersTitle" style={{ textAlign: 'center' }}>
          First Name
        </strong>
      ),
      selector: (row) => row.first_name,
      sortable: true,
      center: true,
    },
    {
      name: (
        <strong className="headersTitle" style={{ textAlign: 'center' }}>
          Last Name
        </strong>
      ),
      selector: (row) => row.last_name,
      sortable: true,
      center: true,
    },
    {
      name: (
        <strong className="headersTitle" style={{ textAlign: 'center' }}>
          Email
        </strong>
      ),
      selector: (row) => row.email,
      sortable: true,
      center: true,
    },
   
    {
      name: (
        <strong className="headersTitle" style={{ textAlign: 'center' }}>
          Job Title
        </strong>
      ),
      selector: (row) => row.job_title,
      sortable: true,
      center: true,
    },
    {
      name: (
        <strong className="headersTitle" style={{ textAlign: 'center' }}>
          Company
        </strong>
      ),
      selector: (row) => row.company,
      sortable: true,
      center: true,
    },
    {
      name: (
        <strong className="headersTitle" style={{ textAlign: 'center' }}>
          Department
        </strong>
      ),
      selector: (row) => row.department,
      sortable: true,
      center: true,
    },
    {
      name: (
        <strong className="headersTitle" style={{ textAlign: 'center' }}>
          Direct
        </strong>
      ),
      selector: (row) => row.direct_number,
      sortable: true,
      center: true,
    },
    {
      name: (
        <strong className="headersTitle" style={{ textAlign: 'center' }}>
          Location
        </strong>
      ),
      selector: (row) => row.locaton,
      sortable: true,
      center: true,
    },
    {
      name: (
        <strong className="headersTitle" style={{ textAlign: 'center' }}>
          Mobile
        </strong>
      ),
      selector: (row) => row.mobile_number,
      sortable: true,
      center: true,
    },
    
    
  ];

  useEffect(() => {
    const mysearchresult = usersInfo.filter((user) => {
      return user.first_name.toLowerCase().match(search.toLowerCase());
    });
    setFilterUsers(mysearchresult);
  }, [search]);

  return (
    <>
      <div className="datatable Parent text-center px-5 shadow table-responsive">
        <DataTable
          title="JSON Server CRUD "
          columns={Columns}
          data={filterusers}
          fixedHeader
          fixedHeaderScrollHeight="398px"
          // selectableRows
          selectableRowsHighlight
          highlightOnHover
          actions={
            <Link  className="btn btn-success">
              ADD+
            </Link>
          }
          pagination
          subHeader
          subHeaderComponent={
            <div className="d-flex">
              <input
                type="text"
                className="form-control form-control-md"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-secondary ms-2 btn-md">Search</button>
            </div>
          }
        />
      </div>
      <ToastContainer /> {/* Place ToastContainer component here */}
    </>
  );
};

export default DMSDirectory