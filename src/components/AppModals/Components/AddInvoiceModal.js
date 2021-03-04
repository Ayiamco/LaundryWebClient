import React,{useState,useContext} from 'react';
import Modal from "react-modal";
import {InvoiceContext} from "../../AddInvoice/AddInvoice";
import InvoiceItem from "../../InvoiceItem/InvoiceItem"
import   "../Styles/AddInvoiceModal.css";
export default function AddInvoiceModal() {
    
     const {services,isModalShown,setIsModalShown,setInvoiceItems,
            formData,setFormData,setInvoiceTotal}=useContext(InvoiceContext)
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
                if(formData[modalData.serviceId] &&  !formData[modalData.serviceId].isDeleted){
                    setIsValidAddititon(false)
                    setErrorMessage("service already added")
                }
                else{
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
                    let serviceChoosen = services.filter(x=> x.id===modalData.serviceId)[0];
                    setInvoiceTotal(prev=>(prev + (modalData.quantity * serviceChoosen.price) ))
                    
                }
             }
             
             
             
            
         }
        
     }
     function closeModal (){
         setIsModalShown(false);
     }
    return (
        <Modal isOpen={isModalShown} shouldCloseOnOverlayClick={false} className="AIM-modal"
                overlayClassName="AIM-overlay" onRequestClose={() => {return setIsModalShown(false)}}
        >
            <div className="AIM-title">
                <h2 >Add invoice Item</h2>
            <p className="txt-danger txt-warning"style={{display:isValidAddition? "none":"block"}}>{errorMessage}</p>
            </div>
            
            <i className="fas fa-times AIM-close" onClick={closeModal}></i>
            
            <form onSubmit={handleInvoiceModal}>
                <select name="serviceId" className="AIM-FI"value={modalData.serviceId} onChange={handleInvoiceModal}>
                    <option>Select Service</option>
                {
                    services.map((element,index) => {
                        return <option value={element.id} key={index}>{element.name}</option>
                    })
                }
                </select>
                <input placeholder="Enter service quantity "className="AIM-FI" type="number" name="quantity" value={modalData.quantity} onChange={handleInvoiceModal}/>
                <button className="AIM-FI AIM-btn" >Add Item</button>
            </form>
            
                
            
            
        </Modal>
    )
}
