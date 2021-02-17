import React from 'react'
import CustomerDetailsModal from './CustomerDetailsModal'
import DeleteConfirmationModal from "./DeleteConfirmationModal"
import EmployeeDetailsModal from "./EmployeeDetailsModal"
import ServiceDetailsModal from "./ServiceDetailsModal"
export default function ModalSelector({id,name,isModalOpen, setIsModalOpen, modalType}) {
    return (
        <div>
            {
                modalType==="EmployeeDeleteConfirmationModal" ? 
                <DeleteConfirmationModal modalIsOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id}
                name={name}  entityToDelete="employee"/>
                :
                modalType==="CustomerDeleteConfirmationModal" ? 
                <DeleteConfirmationModal modalIsOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id}
                name={name}  entityToDelete="customer"/>
                :
                modalType==="ServiceDeleteConfirmationModal" ?
                <DeleteConfirmationModal modalIsOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id}
                name={name}  entityToDelete="service"/>
                :
                modalType==="EmployeeDetailsModal" ?
                <EmployeeDetailsModal  modalIsOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id}/>
                :
                modalType === "CustomerDetailsModal" ? 
                <CustomerDetailsModal modalIsOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id}/>
                :
                modalType === "ServiceDetailsModal" ?
                <ServiceDetailsModal modalIsOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id}/>
                :
                ""
            }
        </div>
    )
}
