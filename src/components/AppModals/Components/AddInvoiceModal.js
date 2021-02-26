import React from 'react';
import Modal from "react-modal";
import InvoiceItem from "../../InvoiceItem/InvoiceItem";

export default function AddInvoiceModal({modalIsOpen,setIsModalOpen,services,setFormData,formData,servicesObj}) {
    return (
        <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={true} className="EDM-modal"
                overlayClassName="EDM-modal-overlay" onRequestClose={() => {return setIsModalOpen(false)}}
        >
            <h2 className="EDM-h2">Add invoice Item</h2>
            <InvoiceItem services={services} id="1"  setFormData={setFormData}
                 formData={formData} servicesObj={servicesObj}/>
        </Modal>
    )
}
