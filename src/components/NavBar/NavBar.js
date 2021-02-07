import React from 'react';
import {useHistory} from "react-router-dom";
import NavItem from "../NavItem/NavItem";
import "./NavBar.css"

const items=["DashBoard","Employee","Customer","Service","Invoice",]
const classes=["fas fa-th","fas fa-users-cog","fas fa-user","fas fa-network-wired","fas fa-file-alt",]
export default function NavBar({activeItem}) {
    const history =useHistory()
    const booleanStates={
        Dashboard:false,Customer:false,Employee:false,Invoice:false,Service:false,
        NewCustomer:false,NewEmployee:false,NewInvoice:false,NewService:false,
        [activeItem]:true,     
    }

    const handleClick = (e) => {
        const navItemClicked=e.target.getAttribute("data-navbtn");
        if(navItemClicked!==activeItem){
            if(navItemClicked.includes("New")){
                history.push(`/${navItemClicked.split("New")[1].toLowerCase()}/new`)
            }
            else{history.push("/"+ navItemClicked.toLowerCase())}
            
        }
    }
    return (
        <ul className="nav-bar-con">
            
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
