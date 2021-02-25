import React,{useCallback,useEffect,useState} from 'react';
import InvoiceItem from "../InvoiceItem/InvoiceItem";
import {getAllServices} from "../../apis/ServiceApi"

export default function AddInvoice() {
    const [services,setServices]=useState([]);
    const [servicesObj,setServicesObj]=useState({})
    const [invoiceItems,setInvoiceItems]=useState([])
    const [itemCount,setItemCount]=useState(1)
    const [formData,setFormData]=useState({
        "1":{
            isDeleted:false,
            data:{
                serviceId:"",
                quantity:0,
            }
        }
    })
    
    console.log(formData,itemCount)

    let getServices=useCallback( async ()=>{
        let resp = await getAllServices()
        let dataObj= {}
        if(resp.statusCode==="200"){
            setServices(resp.data)
            for(let item in resp.data){
                dataObj[resp.data[item].id]= resp.data[item]
            }
        }
        setServicesObj(dataObj)
    },[])

    function addItem(e){
        setItemCount(count=>(count + 1));
        setInvoiceItems(prev=>(
            [...prev,<InvoiceItem services={services} id={`${itemCount +1}`} 
                setFormData={setFormData} formData={formData}  key={`${itemCount +1}`} 
                servicesObj={servicesObj}/>]))
        setFormData(prev=>({...prev,
                    [`${itemCount + 1}`]:{
                            isDeleted:false,
                            data:{
                                serviceId:"",
                                quantity:0,
                               
                            }
                        }
                    }
            ))
    }

    useEffect(()=>{
        getServices();
    },[getServices])
    return (
        <div>
            <form>
                <InvoiceItem services={services} id="1"  setFormData={setFormData}
                 formData={formData} servicesObj={servicesObj}/>
                <div className="AI-items-con"  children={invoiceItems}/>
            </form>
            
             
           
            <button onClick={addItem}>Add InvoiceItem</button>
        </div>
    )
}
