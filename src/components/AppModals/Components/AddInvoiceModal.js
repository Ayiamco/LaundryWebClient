import React,{useState,useContext} from 'react';
import Modal from "react-modal";
import {InvoiceContext} from "../../AddInvoice/AddInvoice";
import InvoiceItem from "../../InvoiceItem/InvoiceItem"

export default function AddInvoiceModal() {
    
     const {services,isModalShown,setIsModalShown,setInvoiceItems,formData,setFormData}=useContext(InvoiceContext)
     const [modalData,setModalData]=useState({quantity:"",serviceId:""});
     const [isValidAddition,setIsValidAddititon]=useState(true);
     const [errorMessage,setErrorMessage]=useState("");
     
    
     function handleInvoiceModal(e){
         e.preventDefault();
         if(e.type==="change"){
            setModalData(prev=> ({...prev,[e.target.name]:e.target.value}))
            setErrorMessage("");
            setIsValidAddititon(true);
         }
         else{
             
             if( !modalData.quantity || !modalData.serviceId){
                setErrorMessage("Please select service and add quantity")
                setIsValidAddititon(false);
             }
             else{
                 console.log(modalData)
                if(formData[modalData.serviceId] &&  !formData[modalData.serviceId].isDeleted){
                    setIsValidAddititon(false)
                    setErrorMessage("service already added")
                }
                else{
                    console.log("reached here")
                    closeModal();
                    setInvoiceItems(prev=>([...prev,<InvoiceItem data={modalData}key={modalData.serviceId+Date.now()} ></InvoiceItem>]))
                    setFormData(prev=>({...prev,
                    [`${modalData.serviceId}`]:{
                        isDeleted:false,
                        data:{
                            serviceId:modalData.serviceId,
                            quantity:modalData.quantity,
                        }
                    }}))
                    
                }
             }
             
             
             
            
         }
        
     }
     function closeModal (){
         setIsModalShown(false);
     }
    return (
        <Modal isOpen={isModalShown} shouldCloseOnOverlayClick={true} className="EDM-modal"
                overlayClassName="EDM-modal-overlay" onRequestClose={() => {return setIsModalShown(false)}}
        >
            <p style={{display:isValidAddition? "none":"block"}}>{errorMessage}</p>
            <h2 className="EDM-h2">Add invoice Item</h2>
            <i className="fas fa-times" onClick={closeModal}></i>
            
            <form onSubmit={handleInvoiceModal}>
                <select name="serviceId" value={modalData.serviceId} onChange={handleInvoiceModal}>
                    <option>Select Service</option>
                {
                    services.map((element,index) => {
                        return <option value={element.id} key={index}>{element.name}</option>
                    })
                }
                </select>
                <input type="number" name="quantity" value={modalData.quantity} onChange={handleInvoiceModal}/>
                <button>Add Item</button>
            </form>
            
                
            
            
        </Modal>
    )
}
