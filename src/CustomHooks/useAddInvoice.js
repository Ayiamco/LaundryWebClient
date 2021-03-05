import {useState,useCallback,useEffect} from "react";
import {searchForCustomer} from "../apis/CustomerApi";
import {getAllServices} from "../apis/ServiceApi";

export default function useAddInvoice() {
    const [customerInfo,setCustomerInfo]=useState("")
    const [isCustomerFound,setIsCustomerFound]=useState("");
    const [customer,setCustomer]=useState({});
    const [services,setServices]=useState([]);
    const [invoiceItems,setInvoiceItems]=useState([])
    const [itemCount,setItemCount]=useState(1)
    const [isAIMShown,setIsAIMShown]=useState(false);
    const [isIRMShown,setIsIRMShown]=useState(false);
    const [formData,setFormData]=useState({})
    const [invoiceTotal,setInvoiceTotal]=useState(0);
    
    
    function handleInput(e){
        e.preventDefault()
        if(e.type==="change"){
            setCustomerInfo(e.target.value)
        } 
    }

    let getData=useCallback(async()=>{
        let resp = await searchForCustomer(customerInfo)
        if(resp.statusCode==="200"){
            setCustomer(resp.data[0])
            setIsCustomerFound(true)
        }
        else{
            setCustomer({})
            setIsCustomerFound(false)
        }
    },[customerInfo])

    let getServices=useCallback( async ()=>{
        let resp = await getAllServices()
        if(resp.statusCode==="200"){
            setServices(resp.data)
        }
    },[])
    useEffect(()=>{
        //hook to find the current customer to add invoice to
        getData();
    },[getData] )

    useEffect(() => {
        //hook to get the laundry services
        getServices();
    }, [getServices])

    function handleModal(e){
        if(e.target.name==="invoice-submit"){
            isIRMShown ? setIsIRMShown(false) : setIsIRMShown(true);
            let invoiceItemArray=[]
            for(let key in formData){
                if(formData[key].isDeleted===false && key !=="undefined"){
                    invoiceItemArray.push({serviceId:key,quantity: formData[key].data.quantity});
                }
            }
            let requestData= {
                invoiceItems:invoiceItemArray,
                customerId:customer.id
            }
            
            localStorage.setItem("invoice",JSON.stringify(requestData))
        }
        else{
             isAIMShown ? setIsAIMShown(false): setIsAIMShown(true);
        }
       
    }
    return {customerInfo,setCustomerInfo,isCustomerFound,setIsCustomerFound,
        customer,setCustomer,services,setServices,
        invoiceItems,setInvoiceItems,itemCount,setItemCount,isIRMShown,setIsIRMShown,
        isAIMShown,setIsAIMShown,formData,setFormData,handleInput,handleModal,
        invoiceTotal,setInvoiceTotal}
}
