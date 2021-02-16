import React from 'react'
import CustomerDetailsModal from './CustomerDetailsModal'
import  DeleteConfirmationModal from "./DeleteConfirmationModal"
import EmployeeDetailsModal from "./EmployeeDetailsModal"
export default function ModalSelector({id,name,isModalOpen, setIsModalOpen, modalType}) {
    return (
        <div>
            {
                modalType==="EmployeeDeleteConfirmationModal" ? 
                <DeleteConfirmationModal modalIsOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id}
                    name={name}  entityToDelete="employee"
                >
                </DeleteConfirmationModal>
                :
                modalType==="CustomerDeleteConfirmationModal" ? 
                <DeleteConfirmationModal modalIsOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id}
                    name={name}  entityToDelete="customer"
                >
                </DeleteConfirmationModal>
                ? modalType==="ServiceDeleteConfirmationModal":
                
                <DeleteConfirmationModal modalIsOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id}
                    name={name}  entityToDelete="servie"
                >
                </DeleteConfirmationModal>
                :
                modalType==="EmployeeDetailsModal" ?
                <EmployeeDetailsModal  modalIsOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id}
                >
                </EmployeeDetailsModal>
                :
                modalType === "CustomerDetailsModal" ? 
                <CustomerDetailsModal modalIsOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id}
                ></CustomerDetailsModal> 
                :
                ""
            }
        </div>
    )
}
