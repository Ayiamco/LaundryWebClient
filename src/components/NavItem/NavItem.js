import React,{useState,useEffect} from 'react';
import "./NavItem.css"
const data={
    "Employee":"Add New","Customer":"Register","Service":"Add New","Invoice":"Generate"
}
export default function NavItem({icon,text,isItemFocused,navigate}) {
    const [hideItem, setHideItem]=useState("none"); 
    const [className,setClassName]=useState("fas fa-angle-down")
    

    const HideItem = (e) =>{
        hideItem === "none" ? setHideItem("block") : setHideItem("none")
        e.target.className==="fas fa-angle-down"? setClassName("fas fa-angle-up"): setClassName("fas fa-angle-down")
    }

    useEffect(()=>{
        if(isItemFocused["New"+text]===true){
            setClassName("fas fa-angle-up");
            setHideItem("block")
        }
    },[isItemFocused,text])

    return (
        <li onClick={navigate} className={"nav-item nav-item-"+text} >
            <div data-navbtn={text} className="nav-item-top" id={isItemFocused[text]&&hideItem==="none" ? "nav-item-focused":""}>
                <div data-navbtn={text} className="nav-item-left">
                    <i className={icon} data-navbtn={text}></i>
                    <p data-navbtn={text}>
                        { text==="Dasboard"|| text==="Profile" ? text : `${text}s`}
                    </p>
                </div>
                
                {
                    text==="DashBoard" ? <p></p> :
                        <i style={{display:isItemFocused[text] ? "inline-block":"none"}} 
                            className={className} onClick={HideItem}  data-navbtn={text}
                        />     
                }
            </div>
            
            {/* section to add new item (customer,invoice etc) */}
            <div style={{display:hideItem}} id={hideItem==="block" ? "nav-item-focused":""} 
                className="nav-item-bottom" data-navbtn={"New"+text}>  
                 <p data-navbtn={"New"+text} onClick={navigate}>{ `${data[text]} ${text}`} </p>
            </div>
        </li>
    )
}
