import React,{useState,useEffect,useContext,useCallback} from 'react';
import {InvoiceContext} from "../AddInvoice/AddInvoice";

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
        if(e.target.className==="fas fa-minus"){
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
        <div className="IT-con" style={{display:isServiceDeleted? "none": "block",border:"1px solid black"}}>
            <p>This is invoice item for {currentService.name}</p>
            <p>unit price: <span>&#8358;</span>{currentService.price}</p>
            <p>amount:  <span>&#8358;</span>{currentService.price*quantity} </p> 
            <i className="fas fa-trash-alt" onClick={removeService} id=""></i>
            <div>
                <i className="fas fa-plus" onClick={changeQuantity}></i>
                    <p>quantity:{quantity} </p>
                <i className="fas fa-minus" onClick={changeQuantity}></i>
            </div>
        </div>
    )
}
