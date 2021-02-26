import React from 'react';
import AddInvoiceModal from "../AppModals/Components/AddInvoiceModal";
import AddInvoicePartial from "./AddInvoicePartial";
import useAddInvoice from "../../CustomHooks/useAddInvoice"

export const InvoiceContext= React.createContext();

export default function AddInvoice() {
    const {customerInfo,setCustomerInfo,isCustomerFound,setIsCustomerFound,
        customer,setCustomer,services,setServices,
        servicesObj,setServicesObj,invoiceItems,setInvoiceItems,itemCount,setItemCount,
        isModalShown,setIsModalShown,formData,setFormData,handleInput,handleModal}=useAddInvoice();

    return (
        <InvoiceContext.Provider 
            value={{customerInfo,setCustomerInfo,isCustomerFound,setIsCustomerFound,
                    customer,setCustomer,services,setServices,servicesObj,setServicesObj,
                    invoiceItems,setInvoiceItems,itemCount,setItemCount,isModalShown,
                    setIsModalShown,formData,setFormData,handleInput,handleModal}}
        >

            <AddInvoiceModal modalIsOpen={isModalShown} setIsModalOpen={setIsModalShown}
                services={services}  setFormData={setFormData} formData={formData} serviceObj={servicesObj}
            />          
            <AddInvoicePartial></AddInvoicePartial>
        </InvoiceContext.Provider>
            
       
    )
}
