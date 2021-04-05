import React from 'react'
import CustomerDetailsModal from './CustomerDetailsModal'
import DeleteConfirmationModal from "./DeleteConfirmationModal"
import EmployeeDetailsModal from "./EmployeeDetailsModal"
import ServiceDetailsModal from "./ServiceDetailsModal";
import AddPaymentModal from "./AddPaymentModal";

export default function ModalSelector({id,name,isModalOpen, setIsModalOpen, modalType, setItemList}) {

    return (
        <div>
            {
                modalType==="EmployeeDeleteConfirmationModal" ? 
                <DeleteConfirmationModal modalIsOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id}
                name={name}  entityToDelete="employee" setItemList={setItemList}/>
                :
                modalType==="CustomerDeleteConfirmationModal" ? 
                <DeleteConfirmationModal modalIsOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id}
                name={name}  entityToDelete="customer" setItemList={setItemList}/>
                :
                modalType==="ServiceDeleteConfirmationModal" ?
                <DeleteConfirmationModal modalIsOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id}
                name={name}  entityToDelete="service" setItemList={setItemList}/>
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
                modalType === "AddPaymentModal" ?
                <AddPaymentModal modalIsOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id}/>
                :
                ""
            }
        </div>
    )
}
