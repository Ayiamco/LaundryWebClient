import React from 'react'
import  DeleteConfirmationModal from "./DeleteConfirmationModal"
import EmployeeDetailsModal from "./EmployeeDetailsModal"
export default function EmployeeLayoutModal({id,name,isModalOpen, setIsModalOpen, modalType}) {
    return (
        <div>
            {
                modalType==="DeleteConfirmationModal" ? 
                <DeleteConfirmationModal modalIsOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id}
                    name={name}  entityToDelete="employee"
                >
                </DeleteConfirmationModal>
                :
                <EmployeeDetailsModal  modalIsOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id}
                >
                </EmployeeDetailsModal>
            }
        </div>
    )
}
