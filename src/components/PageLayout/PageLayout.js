import React,{useState} from 'react';
import NavBar from "../NavBar/NavBar";
import "./PageLayout.css";

export default function PageLayout({activeItem,PageItem}) {
    const [navDisplay,setNavDisplay]=useState(true)
  
    function handleNavDisplay(){
        navDisplay ? setNavDisplay(false) : setNavDisplay(true)
    }

    return (
        <div className="PL-con"  >
            <header className={`PL-header ${navDisplay? "header-gray": "header-purple"}`}>
               <i className="fas fa-soap"> Laundry Solution</i>
                <i id="PL-toggle-btn" onClick={handleNavDisplay}style={{color:" #65088c"}}className="fas fa-bars"></i>
            </header>
            <section className="PL-section">
                <nav className="PL-nav">
                    <NavBar activeItem={activeItem} display={navDisplay? "navbar-show":"navbar-hide"}></NavBar>
                </nav>
                <section className="PL-body">
                    <PageItem></PageItem>
                </section>
            </section>
            
        </div>
    )
}
