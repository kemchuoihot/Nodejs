import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "./styles.css";

import { infinity } from 'ldrs'

infinity.register()

// Default values shown


const Employee = () => {
    const [employee, setEmployee] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => { 
        fetchData();
    },[]);

    const fetchData = () => {
        axios.get('http://localhost:5000/auth/employee')
        .then(result =>{
            if(result.data.Status){
                setEmployee(result.data.employee);
            }else{
                alert(result.data.Error);
            }
        }).catch(error =>{ console.log(error)});
    };

    const handleRefresh = () => {
        setLoading(true);
        fetchData();
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };


    return(
        <>
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3 className='title'>Employee List</h3>
            </div>
            <div className="d-flex justify-content-between">
                <Link to="/dashboard/add_employee" className="btn btn-info btn-add">
                    Add Employee
                </Link>
                {loading ? ( <l-infinity
                    size="55"
                    stroke="4"
                    stroke-length="0.15"
                    bg-opacity="0.1"
                    speed="1.3" 
                    color="#93B1A6" 
                    ></l-infinity> )
                    : <button className="btn text-white ml-2 btn-refresh" onClick={handleRefresh}>Refresh</button>}
            </div>
            <div className="mt-3">
                <table className='table table-striped table-hover align-middle mb-0 bg-white'>
                    <thead className='text-white bg-head border'>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        employee.map((e, index) =>(
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>
                                    {e.status === "inactive" && <span className="badge badge-primary rounded-pill d-inline">Inactive</span>}
                                    {e.status === "active" && <span className="badge badge-success rounded-pill d-inline">Active</span>}
                                    {e.status === "block" && <span className="badge badge-danger rounded-pill d-inline">Block</span>}
                                </td>
                                <td>
                                    <Button 
                                        type="button"
                                        className ="btn btn-outline-secondary btn-rounded btn-green btn-sm mr-2"
                                        data-mdb-ripple-color="dark"
                                        onClick={handleShow}
                                        >
                                    Edit
                                    </Button>
                                    <Button 
                                        type="button"
                                        className ="btn btn-outline-danger btn-rounded btn-sm"
                                        data-mdb-ripple-color="dark"
                                        >
                                    Block
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    )
};
export default Employee;
