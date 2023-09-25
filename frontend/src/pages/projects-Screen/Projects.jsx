import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Projects.css";
const Projects = () => {
  // const AllUsers=[
  //   {
  //     "id": 1,
  //     "name": "Leanne Graham",
  //     "username": "Bret",
  //     "email": "Sincere@april.biz",
  //     "address": {
  //       "street": "Kulas Light",
  //       "suite": "Apt. 556",
  //       "city": "Gwenborough",
  //       "zipcode": "92998-3874",
  //       "geo": {
  //         "lat": "-37.3159",
  //         "lng": "81.1496"
  //       }
  //     },
  //     "phone": "1-770-736-8031 x56442",
  //     "website": "hildegard.org",
  //     "company": {
  //       "name": "Romaguera-Crona",
  //       "catchPhrase": "Multi-layered client-server neural-net",
  //       "bs": "harness real-time e-markets"
  //     }
  //   },
  //   {
  //     "id": 2,
  //     "name": "Ervin Howell",
  //     "username": "Antonette",
  //     "email": "Shanna@melissa.tv",
  //     "address": {
  //       "street": "Victor Plains",
  //       "suite": "Suite 879",
  //       "city": "Wisokyburgh",
  //       "zipcode": "90566-7771",
  //       "geo": {
  //         "lat": "-43.9509",
  //         "lng": "-34.4618"
  //       }
  //     },
  //     "phone": "010-692-6593 x09125",
  //     "website": "anastasia.net",
  //     "company": {
  //       "name": "Deckow-Crist",
  //       "catchPhrase": "Proactive didactic contingency",
  //       "bs": "synergize scalable supply-chains"
  //     }
  //   },
  //   {
  //     "id": 3,
  //     "name": "Clementine Bauch",
  //     "username": "Samantha",
  //     "email": "Nathan@yesenia.net",
  //     "address": {
  //       "street": "Douglas Extension",
  //       "suite": "Suite 847",
  //       "city": "McKenziehaven",
  //       "zipcode": "59590-4157",
  //       "geo": {
  //         "lat": "-68.6102",
  //         "lng": "-47.0653"
  //       }
  //     },
  //     "phone": "1-463-123-4447",
  //     "website": "ramiro.info",
  //     "company": {
  //       "name": "Romaguera-Jacobson",
  //       "catchPhrase": "Face to face bifurcated interface",
  //       "bs": "e-enable strategic applications"
  //     }
  //   },
  //   {
  //     "id": 4,
  //     "name": "Patricia Lebsack",
  //     "username": "Karianne",
  //     "email": "Julianne.OConner@kory.org",
  //     "address": {
  //       "street": "Hoeger Mall",
  //       "suite": "Apt. 692",
  //       "city": "South Elvis",
  //       "zipcode": "53919-4257",
  //       "geo": {
  //         "lat": "29.4572",
  //         "lng": "-164.2990"
  //       }
  //     },
  //     "phone": "493-170-9623 x156",
  //     "website": "kale.biz",
  //     "company": {
  //       "name": "Robel-Corkery",
  //       "catchPhrase": "Multi-tiered zero tolerance productivity",
  //       "bs": "transition cutting-edge web services"
  //     }
  //   },
  //   {
  //     "id": 5,
  //     "name": "Chelsey Dietrich",
  //     "username": "Kamren",
  //     "email": "Lucio_Hettinger@annie.ca",
  //     "address": {
  //       "street": "Skiles Walks",
  //       "suite": "Suite 351",
  //       "city": "Roscoeview",
  //       "zipcode": "33263",
  //       "geo": {
  //         "lat": "-31.8129",
  //         "lng": "62.5342"
  //       }
  //     },
  //     "phone": "(254)954-1289",
  //     "website": "demarco.info",
  //     "company": {
  //       "name": "Keebler LLC",
  //       "catchPhrase": "User-centric fault-tolerant solution",
  //       "bs": "revolutionize end-to-end systems"
  //     }
  //   },
  //   {
  //     "id": 6,
  //     "name": "Mrs. Dennis Schulist",
  //     "username": "Leopoldo_Corkery",
  //     "email": "Karley_Dach@jasper.info",
  //     "address": {
  //       "street": "Norberto Crossing",
  //       "suite": "Apt. 950",
  //       "city": "South Christy",
  //       "zipcode": "23505-1337",
  //       "geo": {
  //         "lat": "-71.4197",
  //         "lng": "71.7478"
  //       }
  //     },
  //     "phone": "1-477-935-8478 x6430",
  //     "website": "ola.org",
  //     "company": {
  //       "name": "Considine-Lockman",
  //       "catchPhrase": "Synchronised bottom-line interface",
  //       "bs": "e-enable innovative applications"
  //     }
  //   },
  //   {
  //     "id": 7,
  //     "name": "Kurtis Weissnat",
  //     "username": "Elwyn.Skiles",
  //     "email": "Telly.Hoeger@billy.biz",
  //     "address": {
  //       "street": "Rex Trail",
  //       "suite": "Suite 280",
  //       "city": "Howemouth",
  //       "zipcode": "58804-1099",
  //       "geo": {
  //         "lat": "24.8918",
  //         "lng": "21.8984"
  //       }
  //     },
  //     "phone": "210.067.6132",
  //     "website": "elvis.io",
  //     "company": {
  //       "name": "Johns Group",
  //       "catchPhrase": "Configurable multimedia task-force",
  //       "bs": "generate enterprise e-tailers"
  //     }
  //   },
  //   {
  //     "id": 8,
  //     "name": "Nicholas Runolfsdottir V",
  //     "username": "Maxime_Nienow",
  //     "email": "Sherwood@rosamond.me",
  //     "address": {
  //       "street": "Ellsworth Summit",
  //       "suite": "Suite 729",
  //       "city": "Aliyaview",
  //       "zipcode": "45169",
  //       "geo": {
  //         "lat": "-14.3990",
  //         "lng": "-120.7677"
  //       }
  //     },
  //     "phone": "586.493.6943 x140",
  //     "website": "jacynthe.com",
  //     "company": {
  //       "name": "Abernathy Group",
  //       "catchPhrase": "Implemented secondary concept",
  //       "bs": "e-enable extensible e-tailers"
  //     }
  //   },
  //   {
  //     "id": 9,
  //     "name": "Glenna Reichert",
  //     "username": "Delphine",
  //     "email": "Chaim_McDermott@dana.io",
  //     "address": {
  //       "street": "Dayna Park",
  //       "suite": "Suite 449",
  //       "city": "Bartholomebury",
  //       "zipcode": "76495-3109",
  //       "geo": {
  //         "lat": "24.6463",
  //         "lng": "-168.8889"
  //       }
  //     },
  //     "phone": "(775)976-6794 x41206",
  //     "website": "conrad.com",
  //     "company": {
  //       "name": "Yost and Sons",
  //       "catchPhrase": "Switchable contextually-based project",
  //       "bs": "aggregate real-time technologies"
  //     }
  //   },
  //   {
  //     "id": 10,
  //     "name": "Clementina DuBuque",
  //     "username": "Moriah.Stanton",
  //     "email": "Rey.Padberg@karina.biz",
  //     "address": {
  //       "street": "Kattie Turnpike",
  //       "suite": "Suite 198",
  //       "city": "Lebsackbury",
  //       "zipcode": "31428-2261",
  //       "geo": {
  //         "lat": "-38.2386",
  //         "lng": "57.2232"
  //       }
  //     },
  //     "phone": "024-648-3804",
  //     "website": "ambrose.net",
  //     "company": {
  //       "name": "Hoeger LLC",
  //       "catchPhrase": "Centralized empowering task-force",
  //       "bs": "target end-to-end models"
  //     }
  //   }
  // ]
  // const [selectedUser, setSelectedUser] = useState(null);

  // const handleUserClick = (username) => {
  //   const user = AllUsers.find((user) => user.username === username);
  //   if (user) {
  //     setSelectedUser(user);
  //   }
  // };
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [purposalModal, setPurposalModal] = useState(false); // State to control modal visibility
  const [dueDate, setDueDate] = useState("");
  const [projectName, setProjectName] = useState("");
  const [estimatorName, setEstimatorName] = useState("");
  const [location, setLocation] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [company, setCompany] = useState(1); // Updated to store company name as a string
  // const navigate = useNavigate();
  // ***********************************
  const [openRow, setOpenRow] = useState(null);

  const toggleDropdown = (rowId) => {
    if (openRow === rowId) {
      setOpenRow(null); // Close the dropdown if it's already open
    } else {
      setOpenRow(rowId); // Open the dropdown for the clicked row
    }
  };

  //************ To show data in Estimating List
  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/estimating/estimating/")
      .then((response) => response.data)
      .then((data) => {
        // console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //************ To show locations in dropdown in estimating post field

  const [userLocation, setUserLocation] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/estimating/location/")
      .then((response) => response.data)
      .then((data) => {
        // console.log(data);
        setUserLocation(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //************ To show Company Names in dropdown in estimating post field

  const [companyName, setCompanyName] = useState([]);

  useEffect(() => {
    // Make the API request using Axios
    axios
      .get("http://127.0.0.1:8000/api/project/company/")
      .then((response) => {
        // Check if the response status is OK (200)
        if (response.status === 200) {
          // Parse the response JSON
          const data = response.data;

          // Assuming the data is an array of objects with a "Cmpny_Name" property
          const companyNames = data.map((item) => item.Cmpny_Name);
          setCompanyName(companyNames);
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // ****************************Getting Services Entries from Api End
  const [EstimatorName, setestimatorName] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/user/Userapi/")
      .then((response) => response.data)
      .then((data) => {
        const bidUser = data.filter((user) => user.roles.includes("Estimator"));
        // console.log(bidUser);
        setestimatorName(bidUser);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filteredData = data.filter((customer) => {
    console.log("Filter:", filter);
    console.log("Status:", customer.status);
    return (
      (customer.Prjct_Name &&
        customer.Prjct_Name.toUpperCase().includes(filter.toUpperCase())) ||
      (customer.status &&
        customer.status
          .trim()
          .toUpperCase()
          .includes(filter.trim().toUpperCase())) ||
      (customer.estimator &&
        customer.estimator.toUpperCase().includes(filter.toUpperCase())) ||
      (customer.bidder &&
        customer.bidder.toUpperCase().includes(filter.toUpperCase())) ||
      (customer.bid_amount &&
        customer.bid_amount
          .toString()
          .toUpperCase()
          .includes(filter.toUpperCase()))
    );
  });

  const formatBidAmount = (amount) => {
    if (amount === null) return ""; // Return an empty string if the amount is null
    return amount.toLocaleString("en-US");
  };
  return (
    <div className={`estimator  px-5 ${showModal ? "modal-active" : ""}`}>
      <h3>Project Summary</h3>

      <div className="inputbtn d-flex  px-5">
        <input
          type="text"
          placeholder="Filter by Project Name, Estimator Name, Bidders, Bid Amount, Status"
          value={filter}
          className="myinput p-2 "
          onChange={(e) => setFilter(e.target.value)}
        />
        <button className="btn btn-success searchbtn">Search</button>
      </div>
      <div className="table-responsive mt-4">
        <table className="table table-striped  table-bordered table-hover text-center">
          {/* <thead> */}
          <tr>
            <th>Start Date</th>
            <th>Project Name</th>
            <th>Project Manager</th>
            <th>Project Engineer</th>
            <th>Company Name</th>
            <th>Bim Operator</th>
            <th>Bidders</th>
            <th>Foreman</th>
            <th>Job No#</th>
            {/* <th>Actions</th> */}
          </tr>
          {/* </thead> */}
          {/* <tbody className="cursor-pointer  bg-info jloop"> */}
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td className="mytd">{item.due_date}</td>
              <td className="mytd myproject">{item.Prjct_Name}</td>
              <td className="mytd">{item.location}</td>
              <td className="mytd">{item.estimator}</td>
              <td className="mytd">{item.status}</td>
              <td className="mytdbidder">{item.bidder}</td>
              <td className="mytd">$ {formatBidAmount(item.bid_amount)}</td>
              <td className="mytd">
                <div className="relative-container">
                  <i
                    onClick={() => toggleDropdown(item.id)}
                    style={{ cursor: "pointer" }}
                    className="fa-solid threeDotIcon fa-ellipsis-vertical"
                  ></i>
                  <div
                    className={`mydiv ${openRow === item.id ? "open" : " "}`}
                  >
                    <button
                      className="btn dropbtns"
                      onClick={() => {
                        console.log(item.id);
                        setStep0FormData({
                          ...step0FormData,
                          estimating: item.id,
                        });
                        setSelectedEstimatingID(item.id); // Set the selected estimating ID
                        setPurposalModal(true);
                      }}
                      // onClick={movetoPurposalPage}
                    >
                      Proposal
                    </button>

                    <button
                      type="button"
                      className="btn dropbtns"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      Projects
                    </button>
                    <button className="btn dropbtns">Status</button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
          {/* </tbody> */}
        </table>
      </div>
    </div>
    // <div className='projects'>
    //   <aside className='myaside'>
    //     <ul>
    //       {AllUsers.map((user, index) => (
    //         <li
    //           className={`aside_li ${user.username === selectedUser?.username ? 'active' : ''}`}
    //           key={index}
    //           onClick={() => handleUserClick(user.username)}
    //         >
    //           {user.username}
    //         </li>
    //       ))}
    //     </ul>
    //   </aside>
    //   <main className='main-content'>
    //     {selectedUser && (
    //       <div>
    //         <h2>{selectedUser.name}</h2>
    //         <p>Street: {selectedUser.address.street}</p>
    //         {/* Display other user information here */}
    //       </div>
    //     )}
    //   </main>
    // </div>
  );
};

export default Projects;
