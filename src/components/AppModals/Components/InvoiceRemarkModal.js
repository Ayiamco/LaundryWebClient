import React,{useContext,useState} from 'react';
import {InvoiceContext} from "../../AddInvoice/AddInvoice";
import Modal from "react-modal";
import {addInvoice} from "../../../apis/InvoiceApi"
import "../Styles/InvoiceRemarkModal.css"
export default function InvoiceRemarkModal() {
     const {isIRMShown,setIsIRMShown}=useContext(InvoiceContext);
     const [IRMFormData,setIRMFormData]=useState({
         "IRM-input":"",
         "IRM-textArea":""
     });

     const handleInput =(e)=>{
         setIRMFormData(prev=> ({...prev,[e.target.name]:e.target.value}))
     }
     const handleSubmit= async (e)=>{
         e.preventDefault();
        let invoiceData=JSON.parse(localStorage.getItem("invoice"))
        invoiceData.remark=IRMFormData['IRM-textArea'];
        invoiceData.amountPaid=IRMFormData['IRM-input'];

        let resp=await addInvoice(invoiceData)
        console.log(resp)
     }
    return (
        <Modal isOpen={isIRMShown} shouldCloseOnOverlayClick={false} className="AIM-modal"
                overlayClassName="AIM-overlay" onRequestClose={() => {return setIsIRMShown(false)}}
        >
            <div className="IRM-con">
                <i className="fas fa-times IRM-close" onClick={ ()=>(setIsIRMShown(false))}></i>
                <form onSubmit={handleSubmit} method="POST">
                    <div style={{marginBottom:"0.5em"}}>
                        <label htmlFor="IRM-input">Amount Paid(&#8358;):</label>
                        <input name="IRM-input" type="number" value={IRMFormData["IRM-input"]} onChange={handleInput}/>
                    </div>
                    <div>
                        <label htmlFor="IRM-textArea">Remark:</label>
                        <textarea name="IRM-textArea" value={IRMFormData["IRM-textArea"]} onChange={handleInput}></textarea>
                    </div>
                    <div>
                        <input type="submit" value="Save Invoice" />
                    </div>
                </form>
                
                
                
            </div>
        </Modal>
        
    )
}
