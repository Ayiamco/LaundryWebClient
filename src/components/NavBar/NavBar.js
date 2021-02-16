import React from 'react';
import {useHistory} from "react-router-dom";
import NavItem from "../NavItem/NavItem";
import "./NavBar.css"

const items=["DashBoard","Employee","Customer","Service","Invoice",]
const classes=["fas fa-th","fas fa-users-cog","fas fa-user","fas fa-network-wired","fas fa-file-alt",]
export default function NavBar({activeItem,display}) {
    const history =useHistory()
    const booleanStates={
        Dashboard:false,Customer:false,Employee:false,Invoice:false,Service:false,
        NewCustomer:false,NewEmployee:false,NewInvoice:false,NewService:false,
        [activeItem]:true,     
    }
    

    const handleClick = (e) => {
        const navItemClicked=e.target.getAttribute("data-navbtn");
        if(navItemClicked.includes("New")){
            history.push(`/${navItemClicked.split("New")[1].toLowerCase()}/new`)
        }
        else if(navItemClicked==="DashBoard"){
            history.push(`/${navItemClicked.toLowerCase()}`)
        }
        else{history.push(`/${navItemClicked.toLowerCase()}s`)}
            
        
    }
    return (
        <ul className="nav-bar-con" id={display}>
            
            {
                items.map( (item,index)=> (
                    <NavItem  text={item} 
                        icon={classes[index]} key={item} navigate={handleClick} 
                        isItemFocused={booleanStates}
                    />
                    )
                )
            }
        </ul>
    )
}
