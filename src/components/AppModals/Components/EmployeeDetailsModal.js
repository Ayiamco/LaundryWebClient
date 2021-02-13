import React,{useState,useEffect} from 'react';
import Modal from "react-modal";
import {toTitleCase} from "../../../Utilities/helper"
import {findEmployee} from "../../../apis/EmployeeApi"

import "../Styles/EmployeeDetailsModal.css"

Modal.setAppElement("#root");
export default function EmployeeDetailsModal({id,modalIsOpen,setIsModalOpen}) {
    const [employee,setEmployee]=useState({})

    const getData= async ()=>{
        if(modalIsOpen){
            let  resp = await findEmployee(id);
            console.log(resp)
            if(resp.statusCode==="200"){
                    setEmployee(resp.data)
            }
            
        }
    }
    useEffect(()=>{
        getData();
    },[id])
    

    return (
        <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={true} className="EDM-modal"
                overlayClassName="EDM-modal-overlay" onRequestClose={() => {return setIsModalOpen(false)}}
        >
            <h2 className="EDM-h2">Employee Details {Object.keys(employee).length ===0 ?"Not Found": ""}</h2>
            {
                Object.keys(employee).length ===0 ? "" :
                <div className="EDM-details">
                    <p><span>Name:</span> {toTitleCase(employee.name)}</p>
                    <p><span>Email:</span> {employee.username}</p>
                    <p><span>Address:</span> {employee.address}</p>
                    <p><span>Customers Registered:</span>  {employee.noOfCustomers}</p>
                    <p><span>Revenue From Customers Registerd:</span> {employee.revenue} </p>
                    <p><span>Phone Number:</span> {employee.phoneNumber}</p>
                </div>
            }
           
        </Modal>
    )
}
