import React from 'react'
import "./AuthModal.css"
export default function AuthModal({title,body,setIsModalOpen}) {
    return (
        <div className={title.includes("Account")? "modal-red": "modal-green"}>
            <p className="modal-title">{title}</p>
            <p className="modal-body">{body}</p>            
        </div>
    )
}
