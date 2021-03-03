import React,{useContext} from 'react';
import {InvoiceContext} from "./AddInvoice";
import FormInput from "../../components/FormInput/FormInput";

export default function AddInvoicePartial() {
    const {customerInfo,customer,invoiceItems,handleInput,handleModal,
            isCustomerFound,formData,invoiceTotal}=useContext(InvoiceContext)
    
    function submitInvoice(){
        let invoiceItemArray=[]
        for(let key in formData){
            if(formData[key].isDeleted===false && key !==undefined){
                invoiceItemArray.push({serviceId:key,quantity: formData[key].data.quantity});
            }
        }
         
        
        console.log(invoiceItemArray)
        console.table(formData)
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
                        <h3>total: {invoiceTotal}</h3>
                        <button onClick={submitInvoice}>submit</button>
                    </div>
                :   ""
            }
            
        </div>
    )
}
