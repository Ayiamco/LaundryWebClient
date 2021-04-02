import React from 'react';
import {useHistory} from "react-router-dom";
import NavItem from "../NavItem/NavItem";
import "./NavBar.css"

const items=["DashBoard", "Profile","Employee","Customer","Service","Invoice"]
const classes=["fas fa-th","fas fa-address-card","fas fa-users-cog","fas fa-user","fas fa-network-wired","fas fa-file-alt",]
export default function NavBar({activeItem,display,setNavClassName}) {
    const history =useHistory()
    //Boolean states are used to set the active nav item
    const booleanStates={
        Dashboard:false,Customer:false,Employee:false,Invoice:false,Service:false,
        NewCustomer:false,NewEmployee:false,NewInvoice:false,NewService:false,
        [activeItem]:true,     
    }
    

    const handleClick = (e) => {
        const navItemClicked=e.target.getAttribute("data-navbtn");
        if(window.innerWidth> 700){
                setNavClassName("PL-nav show-nav")
            }
        if(navItemClicked.includes("New")){
            history.push(`/${navItemClicked.split("New")[1].toLowerCase()}/new`)
        }
        else if(navItemClicked==="DashBoard"){
            history.push(`/${navItemClicked.toLowerCase()}`)
        }

        if(navItemClicked!==activeItem)
        {
            console.log(navItemClicked,activeItem)
            history.push(`/${navItemClicked.toLowerCase()}s`)
        } 
    }

    function logout(){
        localStorage.removeItem("FrlTg4E21TdBpXb5vnFQj6dLLKVas1dhy7Nu22")
        history.push("/")
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
             <li  className="nav-item" onClick={logout}> 
                <div  className="nav-item-top btn btn-secondary"  
                style={{marginLeft:"2em", display:"inline-block"}}
                >Logout</div> 
             </li>
        </ul>
    )
}
