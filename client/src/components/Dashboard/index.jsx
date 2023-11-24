import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "./styles.css";


const Dashboard = () => {
//   const anvigate = useNavigate()
//   axios.defaults.withCredentials = true
//   const handleLogout = () => {
//     axios.get('http://localhost:3000/auth/logout')
//     .then(result => {
//       if(result.data.Status) { 
//         localStorage.removeItem("valid")
//         anvigate('/')
//       }
//     })
//   }

const [isOpen,setIsOpen] = React.useState(false)
const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="container-fluid" >
      <div className="row flex-nowrap">
        <div style={{width: isOpen ? "250px" : "60px"}} className="bg-dark">
          <div  className={isOpen ? "d-flex flex-column align-items-center align-items-sm-start text-white p-3 min-vh-100" : "d-flex flex-column align-items-center align-items-sm-start text-white min-vh-100"}>
            <div className="w-100 row justify-content-between">
                <div  style={{display: isOpen ? "block" : "none"}} className="">
                <Link
                to="/dashboard"
                className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none col-9"
                
                >
                <span  className="col-6 fs-5 fw-bolder d-none d-sm-inline">
                    POS System
                </span>
                </Link>
                </div>
                <i onClick={toggle} class="col-1 p-3 m-auto bi bi-list"></i>
            </div>
            <ul
              className="w-100 nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100 p-2 align-items-center">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 mr-2" ></i>
                  <span className="mask  ms-2" style={{display: isOpen ? "inline" : "none"}}>Dashboard</span>
                </Link>
              </li>
              <li className="w-100 p-2">
                <Link
                  to="/dashboard/employee"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people mr-2"></i>
                  <span className="ms-2 " style={{display: isOpen ? "inline" : "none"}}>
                    Manage Employees
                  </span>
                </Link>
              </li>
              <li className="w-100 p-2">
                <Link
                  to="/dashboard/category"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-columns mr-2"></i>
                  <span className="ms-2" style={{display: isOpen ? "inline" : "none"}}>Category</span>
                </Link>
              </li>
              <li className="w-100 p-2">
                <Link
                  to="/dashboard/profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person ms-2 mr-2"></i>
                  <span className="ms-2" style={{display: isOpen ? "inline" : "none"}}>Profile</span>
                </Link>
              </li>
              <li className="w-100 pt-2" 
            //   onClick={handleLogout}
              >
              <Link
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-power p-2"></i>
                  <span className="ms-2" style={{display: isOpen ? "inline" : "none"}}>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
            <div className="p-2 d-flex justify-content-center shadow">
                <h4>Emoployee Management System</h4>
            </div>
            <Outlet />
        </div>
      </div>
    </div>
    
  );
};

export default Dashboard;