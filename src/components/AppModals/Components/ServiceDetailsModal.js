import React,{useState,useEffect,useCallback} from 'react';
import Modal from "react-modal";
import {toTitleCase} from "../../../Utilities/helper"
import {findService} from "../../../apis/ServiceApi"

import "../Styles/EmployeeDetailsModal.css"

Modal.setAppElement("#root");
export default function EmployeeDetailsModal({id,modalIsOpen,setIsModalOpen}) {
    const [service,setEmployee]=useState({})
    const getData= useCallback(
        async ()=>{
        let  resp = await findService(id);
        if(resp.statusCode==="200"){
                setEmployee(resp.data)
        }
    },[id])

    useEffect(()=>{
        getData();
    },[id,getData])
    

    return (
        <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={true} className="EDM-modal"
                overlayClassName="EDM-modal-overlay" onRequestClose={() => {return setIsModalOpen(false)}}
        >
            <h2 className="EDM-h2">Service Details {Object.keys(service).length ===0 ?"Not Found": ""}</h2>
            {
                Object.keys(service).length ===0 ? "" :
                <div className="EDM-details">
                    <p><span>Name:</span> {toTitleCase(service.name)}</p>
                    <p><span>Price:</span> &#8358;{service.price}</p>
                    <p><span>Date Added:</span> {service.createdAt.slice(0,10)}</p>
                    <p><span>Revenue Generated:</span> &#8358;{service.revenue}</p>
                </div>
            }
           
        </Modal>
    )
}
