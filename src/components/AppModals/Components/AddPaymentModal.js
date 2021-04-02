import React,{useState,useEffect,useCallback} from 'react';
import Modal from "react-modal";
import {useHistory} from "react-router-dom";
import {findCustomer, makePayment} from "../../../apis/CustomerApi"

import "../Styles/EmployeeDetailsModal.css"

Modal.setAppElement("#root");
export default function AddPaymentModal({id,modalIsOpen,setIsModalOpen}) {
    const [amount,setAmount]=useState(0)
    const [customer,setCustomer]=useState({});
    const [displayError,setDisplayError]=useState(false)
    const history= useHistory();

    async function handlePayment(e){
        e.preventDefault();
        if(amount ===0){
            setDisplayError(true);
            return;
        } 
             
       
    }
    
    function handleChange(e){
        setAmount(e.target.value)
    }
   
    const getData= useCallback( async ()=>{
        let  resp = await findCustomer(id);
        if(resp.status===401){
            localStorage.setItem("returnUrl","/customers")
            history.push('/'); return;
        } 
        if(resp.statusCode==="200") setCustomer(resp.data);  
    },[id,history]) 

    useEffect(()=>{
        getData();
    },[getData])

    return (
        <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={true} className="EDM-modal"
                overlayClassName="EDM-modal-overlay" onRequestClose={() => {return setIsModalOpen(false)}}
        >
            <h2 className="EDM-h2">
                { customer!=={} ? 
                <p>Add Payment For <span  className="title-case">{customer.name}</span></p>: "Not Found"}
            </h2>
            {
                <form onSubmit={handlePayment}>
                    <input required placeholder="Enter Amount" value={amount} type="number"
                        onChange={handleChange}></input>
                    {displayError ? <p>Amount cannot be zero</p> : ""}
                    <button> Save Payment</button>
                </form>
                
            }
           
        </Modal>
    )
}
