import React,{useState,useEffect} from 'react';
import NavBar from "../NavBar/NavBar";
import "./PageLayout.css";

export default function PageLayout({activeItem,PageItem}) {
    const [navDisplay,setNavDisplay]=useState("PL-nav hide-nav")
    function handleNavDisplay(){
        navDisplay ==="PL-nav show-nav"? setNavDisplay("PL-nav hide-nav") : setNavDisplay("PL-nav show-nav")
        console.log("handleNavDisplay called from pageLayout")
    }
    
    return (
        <div className="PL-con" >
            <header className={`PL-header ${navDisplay? "header-gray": "header-purple"}`}>
               <i id="PL-toggle-btn" onClick={handleNavDisplay}style={{color:" #65088c"}}className="fas fa-bars"></i>
               <i className="fas fa-soap"> <p className="soln">Avone</p></i>
               
            </header>
            <section className="PL-section">
                <nav className={navDisplay}>
                    <NavBar activeItem={activeItem} display={navDisplay? "navbar-show":"navbar-hide"}
                     setNavDisplay={setNavDisplay}> </NavBar>
                </nav>
                <section className="PL-body">
                    <PageItem></PageItem>
                </section>
            </section>
            
        </div>
    )
}
