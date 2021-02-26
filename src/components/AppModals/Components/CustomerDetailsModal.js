import React,{useState,useEffect,useCallback} from 'react';
import Modal from "react-modal";
import {toTitleCase} from "../../../Utilities/helper"
import {findCustomer} from "../../../apis/CustomerApi"

import "../Styles/EmployeeDetailsModal.css"

Modal.setAppElement("#root");
export default function CustomerDetailsModal({id,modalIsOpen,setIsModalOpen}) {
    const [customer,setCustomer]=useState({})
    const getData= useCallback( async ()=>{
        if(modalIsOpen){
            let  resp = await findCustomer(id);
            if(resp.statusCode==="200"){
                    setCustomer(resp.data)
            }
        }
    },[id,modalIsOpen]) 
    
    useEffect(()=>{
        getData();
    },[getData])
    

    return (
        <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={true} className="EDM-modal"
                overlayClassName="EDM-modal-overlay" onRequestClose={() => {return setIsModalOpen(false)}}
        >
            <h2 className="EDM-h2">Customer Details { customer ? "": "Not Found"}</h2>
            {
                Object.keys(customer).length ===0 ? "" :
                <div className="EDM-details">
                    <p><span>Name:</span> {toTitleCase(customer.name)}</p>
                    <p><span>Email:</span> {customer.username}</p>
                    <p><span>Address:</span> {customer.address}</p>
                    <p><span>Total Purchase:</span> {customer.totalPurchase} </p>
                    <p><span>Phone Number:</span> {customer.phoneNumber}</p>
                    <p><span>Date Added:</span> {new Date(customer.createdAt.slice(0,10)).toDateString()}</p>
                </div>
            }
           
        </Modal>
    )
}
