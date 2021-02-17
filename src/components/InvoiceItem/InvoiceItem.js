import React,{useState} from 'react';
export default function InvoiceItem({services,setFormData,id,formData}) {
    const [showItem,setShowItem]=useState("block")
    
    function hideItem(){
        setShowItem("none");
        setFormData(prev=>{
            let current=prev[id];
            current["isDeleted"]=true
            return { ...prev,[id]:current}
        })
    }

    function updateInvoice(e){
        e.target.name==="service" ?
        setFormData(prev=>{
        let current=prev[id];
        current.data.serviceId=e.target.value;
        return {...prev,[id]:current}
        }) :
        setFormData(prev=>{
        let current=prev[id];
        current.data.quantity=e.target.value;
        return {...prev,[id]:current}
        })
    }
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
                    <input placeholder="Enter quantity" name="quantity" type="number" onChange={updateInvoice}></input>
                    
                    <i className="fas fa-times" onClick={hideItem}></i>
                </div>
                 
            }
            
        </div>
    )
}
