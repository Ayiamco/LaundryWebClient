import React,{useState} from 'react';

export default function NavItem({icon,text,isItemFocused,focusItem}) {
    const [hideItem, setHideItem]=useState("none");
    

    const HideItem = () =>{
        hideItem === "none" ? setHideItem("block") : setHideItem("none")  
    }

    return (
        <div onClick={focusItem} className={"nav-item-"+text}>
            <div data-class={text}>
                <div data-class={text}>
                    <i className={icon} data-class={text}></i>
                    <p data-class={text}>{text}</p>
                </div>
                
               {text==="DashBoard" ? <p></p> : <i style={{display:isItemFocused[text] ? "inline-block":"none"}}className="fas fa-angle-down" onClick={HideItem}></i>}
            </div>

            <div style={{display:hideItem}}> New {text}</div>
        </div>
    )
}
