import React,{useContext} from 'react';
import {InvoiceContext} from "./AddInvoice";
import FormInput from "../../components/FormInput/FormInput";

export default function AddInvoicePartial() {
    const {customerInfo,customer,invoiceItems,handleInput,handleModal,isCustomerFound,formData}=useContext(InvoiceContext)
    
    function submitInvoice(){
        console.log(formData)
        console.log(invoiceItems)
    }
    return (
        <div>
            <form onSubmit={handleInput}> 
                <FormInput value={customerInfo} type="text" name="customerInfo" handleInput={handleInput}
                    placeholder="Enter Customer name,phone number or email" 
                > </FormInput>
                {
                    customerInfo && !isCustomerFound ?
                    <p className="txt-danger center">customer not found</p> : ""
                }
                
            </form>
            {
                isCustomerFound ?
                    <div >
                        <h1>Invoice for {customer.name}</h1>
                        <button onClick={handleModal}>Add Item</button>
                        <div className="AI-items-con"  children={invoiceItems}/>
                        <button onClick={submitInvoice}>submit</button>
                    </div>
                :   ""
            }
            
        </div>
    )
}
