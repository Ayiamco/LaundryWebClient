import React from 'react';
import Modal from "react-modal";
import {deleteEmployee} from "../../../apis/EmployeeApi"
import {deleteCustomer} from "../../../apis/CustomerApi"
import {deleteService} from "../../../apis/ServiceApi"
import "../Styles/DeleteConfirmationModal.css";
const Api={
    "employee":deleteEmployee,
    "customer":deleteCustomer,
    "service": deleteService
}
Modal.setAppElement("#root");
export default function DeleteConfirmationModal({modalIsOpen,setIsModalOpen,id,name,entityToDelete}) {

    async function confirmDelete(e){
        if (e.target.name === "delete-no") {
            setIsModalOpen(false);
        } 
        else if (e.target.name === "delete-yes") {
            let deleteFunction=Api[entityToDelete]
            await deleteFunction(id);
            setIsModalOpen(false);
        }
    }
    return (
        <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={false} className="DCM-modal"
                overlayClassName="DCM-modal-overlay" onRequestClose={() => {return setIsModalOpen(false)}}
        >
            <div id="DCM-popup">
                <p >Warning: This action cannot be reversed</p>
                <p >Do you still want to delete {name} {entityToDelete} account?</p>
                <div className="DCM-popup-btm">
                    <button className="DCM-btn DCM-btn-del" id={"delete//"+id} onClick={confirmDelete} name="delete-yes">
                        Yes
                    </button>
                    <button onClick={confirmDelete} name="delete-no" className="DCM-btn DEM-btn-no">
                        No
                    </button>
                </div>
            </div>
        </Modal>
    )
}
