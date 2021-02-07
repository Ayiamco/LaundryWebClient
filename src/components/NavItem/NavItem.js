import React,{useState,useEffect} from 'react';
import "./NavItem.css"
const data={
    "DashBoard":"","Employees":"Employee","Customers":"Customer","Services":"Service","Invoices":"Invoice"
}
export default function NavItem({icon,text,isItemFocused,navigate}) {
    const [hideItem, setHideItem]=useState("none");
    const [className,setClassName]=useState("fas fa-angle-down")
    

    const HideItem = (e) =>{
        hideItem === "none" ? setHideItem("block") : setHideItem("none")
        e.target.className==="fas fa-angle-down"? setClassName("fas fa-angle-up"): setClassName("fas fa-angle-down")
    }

    useEffect(()=>{
        if(isItemFocused[text]===false){setHideItem("none")}
    },[isItemFocused,text])

    return (
        <li onClick={navigate} className={"nav-item nav-item-"+text} >
            <div data-navbtn={text} className="nav-item-top" id={isItemFocused[text]&&hideItem==="none" ? "nav-item-focused":""}>
                <div data-navbtn={text} className="nav-item-left">
                    <i className={icon} data-navbtn={text}></i>
                    <p data-navbtn={text}>{text}</p>
                </div>
                
                {
                    text==="DashBoard" ? <p></p> :
                        <i style={{display:isItemFocused[text] ? "inline-block":"none"}} 
                            className={className} onClick={HideItem}  data-navbtn={text}
                        />     
                }
            </div>

            <div style={{display:hideItem}} id={hideItem==="block"?"nav-item-focused":""} 
                className="nav-item-bottom" data-navbtn={text}>  
                Add {data[text]} 
            </div>
        </li>
    )
}
