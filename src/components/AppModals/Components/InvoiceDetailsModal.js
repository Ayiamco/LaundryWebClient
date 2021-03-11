import React from 'react'

export default function InvoiceDetailsModal({modalData, setIsModalOpen}) {
    return (
        <div>
            <i className="fas fa-times" onClick={()=>{setIsModalOpen(false)}}>
            </i>
            this is the invoice details modal
            
        </div>
    )
}
