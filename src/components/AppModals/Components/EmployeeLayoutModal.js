import React from 'react'
import  DeleteEmployeeModal from "./DeleteEmployeeModal"
import EmployeeDetailsModal from "./EmployeeDetailsModal"
export default function EmployeeLayoutModal({id,name,isModalOpen, setIsModalOpen, modalType}) {
    return (
        <div>
            {
                modalType==="DeleteEmployeeModal" ? 
                <DeleteEmployeeModal modalIsOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id}
                    name={name} 
                >
                </DeleteEmployeeModal>
                :
                <EmployeeDetailsModal  modalIsOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id}
                >
                </EmployeeDetailsModal>
            }
        </div>
    )
}
