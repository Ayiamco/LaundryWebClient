import {useState,useCallback,useEffect} from "react";
import {searchForCustomer} from "../apis/CustomerApi";

export default function useAddInvoice() {
    const [customerInfo,setCustomerInfo]=useState("")
    const [isCustomerFound,setIsCustomerFound]=useState("");
    const [customer,setCustomer]=useState({});
    const [services,setServices]=useState([]);
    const [servicesObj,setServicesObj]=useState({})
    const [invoiceItems,setInvoiceItems]=useState([])
    const [itemCount,setItemCount]=useState(1)
    const [isModalShown,setIsModalShown]=useState(false);
    const [formData,setFormData]=useState({
        "1":{
            isDeleted:false,
            data:{
                serviceId:"",
                quantity:0,
            }
        }
    })
    
    function handleInput(e){
        if(e.type==="change"){
            setCustomerInfo(e.target.value)
        } 
    }

    let getData=useCallback(async()=>{
        let resp = await searchForCustomer(customerInfo)
        if(resp.statusCode==="200"){
            setCustomer(resp.data)
        }
    },[customerInfo])

    useEffect(()=>{
        getData();
    },[getData] )

    function handleModal(){
        isModalShown ? setIsModalShown(false): setIsModalShown(true);
    }
    return {customerInfo,setCustomerInfo,isCustomerFound,setIsCustomerFound,
        customer,setCustomer,services,setServices,
        servicesObj,setServicesObj,invoiceItems,setInvoiceItems,itemCount,setItemCount,
        isModalShown,setIsModalShown,formData,setFormData,handleInput,handleModal}
}
