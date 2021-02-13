import React from 'react';
import Modal from "react-modal";
import {deleteEmployee} from "../../../apis/EmployeeApi"
import "../Styles/DeleteEmployeeModal.css";

Modal.setAppElement("#root");
export default function DeleteEmployeeModal({modalIsOpen,setIsModalOpen,id,name}) {

    async function confirmDelete(e){
        if (e.target.name === "delete-no") {
            setIsModalOpen(false);
        } 
        else if (e.target.name === "delete-yes") {
            await deleteEmployee(id);
            setIsModalOpen(false);
        }
    }
    return (
        <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={false} className="DEM-modal"
                overlayClassName="DEM-modal-overlay" onRequestClose={() => {return setIsModalOpen(false)}}
        >
            <div id="DEM-popup">
                <p >Warning: This action cannot be reversed</p>
                <p >Do you still want to delete {name} employee account?</p>
                <div className="DEM-popup-btm">
                    <button className="DEM-btn DEM-btn-del" id={"delete//"+id} onClick={confirmDelete} name="delete-yes">
                        Yes
                    </button>
                    <button onClick={confirmDelete} name="delete-no" className="DEM-btn DEM-btn-no">
                        No
                    </button>
                </div>
            </div>
        </Modal>
    )
}
