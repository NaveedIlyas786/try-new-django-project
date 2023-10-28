import { useState,useEffect } from "react";

export default function ProjectDetailSidebar({item}){
    const [open, setOpen] = useState(false);

      // ************Project folder directory sidebar

//   const [sidebarData, setSidebarData] = useState([]);
//   // Fetch data from the API
//   useEffect(() => {
//     axios
//       .get(`http://127.0.0.1:8000/api/project/projectDrctory/`)
//       .then((response) => response.data)
//       .then((data) => {
//         setSidebarData(data);
//         console.log(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

 if(item.children){
    return(
        <div className={open ? "sidebaritem open" : "sidebaritem"}>
          <div className="sidebarTitle">
            <span>
              
              {/* {item.icon && <i class={item.icon}></i>} if item has icons then show, if not then not show */}
              {item.drctry_Name}
            </span>
            <i
              class="bi bi-chevron-down togglebtn"
              onClick={() => setOpen(!open)}
            ></i>
          </div>
          <div className="sidebarContent">
            {item.children.map((child,index)=><ProjectDetailSidebar key={index} item={child} />)}
          </div>
        </div>
    )
 }
 else{
    return(
        <a href={item.path || "#"} className= "sidebaritem">
            <span>
              {/* {item.icon && <i class={item.icon}></i>} */}
              {item.drctry_Name}
            </span>
          
        </a>
    )
 }
}

