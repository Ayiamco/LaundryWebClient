import React from 'react';
import AddInvoiceModal from "../AppModals/Components/AddInvoiceModal";
import AddInvoicePartial from "./AddInvoicePartial";
import useAddInvoice from "../../CustomHooks/useAddInvoice"
import InvoiceRemarkModal from '../AppModals/Components/InvoiceRemarkModal';

export const InvoiceContext= React.createContext();

export default function AddInvoice() {
    const {customerInfo,setCustomerInfo,isCustomerFound,setIsCustomerFound,
        customer,setCustomer,services,setServices,
        invoiceItems,setInvoiceItems,itemCount,setItemCount,isIRMShown,setIsIRMShown,
        isAIMShown,setIsAIMShown,formData,setFormData,handleInput,handleModal,
        invoiceTotal,setInvoiceTotal}=useAddInvoice();


    return (
        <InvoiceContext.Provider 
            value={{customerInfo,setCustomerInfo,isCustomerFound,setIsCustomerFound,
        customer,setCustomer,services,setServices,
        invoiceItems,setInvoiceItems,itemCount,setItemCount,isIRMShown,setIsIRMShown,
        isAIMShown,setIsAIMShown,formData,setFormData,handleInput,handleModal,
        invoiceTotal,setInvoiceTotal}}
        >
            <AddInvoicePartial></AddInvoicePartial>
            <AddInvoiceModal></AddInvoiceModal>          
            <InvoiceRemarkModal></InvoiceRemarkModal>
        </InvoiceContext.Provider>
            
       
    )
}
