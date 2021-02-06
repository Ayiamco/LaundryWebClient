import React,{useRef,useState,useEffect} from 'react';
import NavItem from "../NavItem/NavItem";

const items=["DashBoard","Customers","Services","Invoices","Employees"]
const classes=["fas fa-th","fas fa-user","fas fa-network-wired","fas fa-file-alt","fas fa-users-cog",]
export default function NavBar() {
    const navConRef= useRef();
    const [booleanStates,setbooleanStates]=useState({
        Dashboard:false,
        Customers:false,
        Employees:false,
         Invoices:false,
        Services:false,
        
    })

    useEffect(()=>{
        console.log(booleanStates)
        console.log(booleanStates)
    })
    const handleClick = (e) => {
        let navItemCollection=navConRef.current.children;
        const val=e.target.getAttribute("data-class");
        for (let i = 0; i < navItemCollection.length; i++) {
          if(navItemCollection[i].className.includes(val)) {
               setbooleanStates(prev=> ({Dashboard:false,Customers:false,Employees:false,Invoices:false,Services:false,
                                            [val]:true}))
                break;
          }
          
           
        }
    }
    return (
        <div className="" ref={navConRef}>
            
            {
                items.map( (item,index)=> (<NavItem  text={item} 
                    icon={classes[index]} key={item} focusItem={handleClick} isItemFocused={booleanStates} />))
            }
        </div>
    )
}
