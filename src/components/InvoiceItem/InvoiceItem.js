import React,{useState,useEffect} from 'react';
export default function InvoiceItem({services,setFormData,id,formData,servicesObj}) {
    const [showItem,setShowItem]=useState("block")
    const [price,setPrice]=useState(0);
    const [quantity,setQuantity]=useState(0)
    const [amt,setAmt]=useState(0);
    
    function hideItem(){
        setShowItem("none");
        setFormData(prev=>{
            let current=prev[id];
            current["isDeleted"]=true
            return { ...prev,[id]:current}
        })
    }

    function updateInvoice(e){
       if(e.target.name==="service")  {
            setFormData(prev=>{
            let current=prev[id];
            current.data.serviceId=e.target.value;
            return {...prev,[id]:current}
            })
            setPrice(servicesObj[e.target.value].price)
            
       }
        else if (e.target.name==="quantity"){
            setFormData(prev=>{
            let current=prev[id];
            current.data.quantity=e.target.value;
            return {...prev,[id]:current}
            })
            setQuantity(e.target.value)
        }
        
    }
    useEffect(()=>{
        setAmt(price*quantity)
    },[price,quantity])
    return (
        <div className="IT-con" style={{display:showItem}}>
            {Array.isArray(services) && services.length===0 ? "":
                <div>
                    <select onChange={updateInvoice} name="service" >
                        <option>Select service</option>
                        {
                            services.map( (service,index) => {
                                return (
                                <option value={service.id} key={index}>
                                    {service.name}
                                </option>
                                )
                            })
                        }
                    </select>
                    <input placeholder="Enter quantity"  name="quantity" type="number" onChange={updateInvoice}></input>
                    <p>Unit Price: {price}</p>
                    <p>Amount:
                         {amt}
                    
                    </p>
                    <i className="fas fa-times" onClick={hideItem}></i>
                </div>
                 
            }
            
        </div>
    )
}
