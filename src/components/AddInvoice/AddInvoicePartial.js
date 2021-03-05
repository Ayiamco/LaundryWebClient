import React,{useContext} from 'react';
import {InvoiceContext} from "./AddInvoice";
import FormInput from "../../components/FormInput/FormInput";
import "./AddInvoice.css";
export default function AddInvoicePartial() {
    const {customerInfo,customer,invoiceItems,handleInput,handleModal,
            isCustomerFound,invoiceTotal}=useContext(InvoiceContext)
    
    
        
    
    return (
        <div className="AIP-con">
            <div className="AIP-header-sticky">
                <form onSubmit={handleInput} className="AIP-form"> 
                <div>
                    <div className="AIP-header-sticky-top">
                        <div className="AIP-header">
                            <h1 >New Invoice {isCustomerFound? `for `:""}
                                <em style={{color:"#bc06bf",textTransform:"uppercase"}}>
                                    {isCustomerFound? `${customer.name}`:""}
                                </em>
                            </h1>
                            {isCustomerFound? <h3>total: <em style={{color:"#bc06bf"}}>&#8358;{invoiceTotal}</em></h3>: ""}  
                        </div>
                        
                    </div>
                    <FormInput value={customerInfo} type="text" name="customerInfo" handleInput={handleInput}
                    placeholder="Customer name,phone number or email" 
                > </FormInput>
                {
                    customerInfo && !isCustomerFound ?
                    <p className="txt-danger center txt-warning">customer not found</p> : ""
                }
                </div>
                
                
            </form>
            {
                isCustomerFound ?
                        <button onClick={handleModal} className="AIP-btn">Add Service Item</button>
                :   ""
            }
            </div>
            
            {
                isCustomerFound ?
                <div className="AIP-invoiceItems"  children={invoiceItems}/>
                :
                ""
            }

            {
                invoiceItems.length>0 ?
                <button onClick={handleModal} name="invoice-submit" className="AIP-btn AIP-submit">Add Invoice</button>
                : ""
            }
        </div>
    )
}
