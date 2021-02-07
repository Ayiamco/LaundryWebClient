import React from 'react';
import {useHistory} from "react-router-dom";
import NavItem from "../NavItem/NavItem";
import "./NavBar.css"

const items=["DashBoard","Employees","Customers","Services","Invoices",]
const classes=["fas fa-th","fas fa-users-cog","fas fa-user","fas fa-network-wired","fas fa-file-alt",]
export default function NavBar({activeItem}) {
    const history =useHistory()
    const booleanStates={
        Dashboard:false,
        Customers:false,
        Employees:false,
        Invoices:false,
        Services:false,
        [activeItem]:true,     
    }

    const handleClick = (e) => {
        const val=e.target.getAttribute("data-navbtn");
        if(!val===activeItem){
            console.log(val)
            history.push("/"+ val.toLowerCase())
        }
    }
    return (
        <ul className="nav-bar-con">
            
            {
                items.map( (item,index)=> (<NavItem  text={item} 
                    icon={classes[index]} key={item} navigate={handleClick} isItemFocused={booleanStates}
                   />))
            }
        </ul>
    )
}
