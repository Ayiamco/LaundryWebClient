import React,{useState,useEffect,useContext,useCallback} from 'react';
import {InvoiceContext} from "../AddInvoice/AddInvoice";
import "./InvoiceItem.css"
export default function InvoiceItem({data}) {
    const {services,setFormData,setInvoiceTotal}=useContext(InvoiceContext);
    const [currentService,setCurrentService]=useState({name:""})
    const [isServiceDeleted,setIsServiceDeleted]=useState(false);
    const [quantity,setQuantity]=useState(parseInt(data.quantity))
    
    const getServiceData= useCallback(()=>{
         let filteredService=services.filter(ele=> ( ele.id === data.serviceId ))
         setCurrentService(filteredService[0])
    },[data,services])

    
    useEffect(()=>{
        getServiceData()
    },[getServiceData])

    function changeQuantity(e){
        if(e.target.className.includes("fas fa-minus")){
            if(quantity>1){
                setQuantity(prev=> (prev-1));
                setInvoiceTotal(prev=> (prev-currentService.price))
            }
        }
        else{
            setQuantity(prev=> (prev+1))
            setInvoiceTotal(prev=> (prev + currentService.price))
        }
    }
    function removeService(e) {
        setIsServiceDeleted(true);
        setFormData(prev=> ({...prev,[currentService.id]:{isDeleted:true}}))
        setInvoiceTotal(prev=>(prev- (currentService.price*quantity)))
    }

    useEffect(()=>{
        setFormData(prev=>({...prev,[currentService.id]:{
                            isDeleted:false,
                            data:{
                                serviceId:currentService.id,
                                quantity:quantity,
                            }
                        }
                    }))
}, [quantity,currentService.id,setFormData])



    return (
        <div className="IIT-con" style={{display:isServiceDeleted? "none": "flex",border:"1px solid black"}}>
            <div className="IIT-flex IIT-flex-1">
                <p>Service: {currentService.name}</p>
                <p>Unit price: <span>&#8358;</span>{currentService.price}</p>
                <p>Amount:  <span>&#8358;</span>{currentService.price*quantity} </p> 
            </div>
            <div className="IIT-flex IIT-flex-2">
                <i className="fas fa-plus IIT-quant" onClick={changeQuantity}></i>
                    <p>&#215;<span style={{fontWeight:"bold"}}>{quantity}</span> </p>
                <i className="fas fa-minus IIT-quant" onClick={changeQuantity}></i>
            </div>
            <div className="IIT-flex IIT-flex-3">
                <i className="fas fa-trash-alt txt-danger" onClick={removeService} id=""></i>
            </div>
            
            
        </div>
    )
}
