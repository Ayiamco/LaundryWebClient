import React,{useState,useEffect} from 'react';
import NavBar from "../NavBar/NavBar";
import "./PageLayout.css";

export default function PageLayout({activeItem,PageItem}) {
    const [navDisplay,setNavDisplay]=useState(false)
    const [screenSize,setScreenSize]=useState(window.innerWidth)
    function handleNavDisplay(){
        navDisplay ? setNavDisplay(false) : setNavDisplay(true)
        console.log("handleNavDisplay called from pageLayout")
    }
    useEffect(()=>{
        const resizeHandler=()=>{
            setScreenSize(window.innerWidth)
            if(window.innerWidth> 700){
                setNavDisplay(true)
            }
        }
        window.addEventListener("resize",resizeHandler)
        return ()=>{
            window.removeEventListener('resize',resizeHandler)
        }
    },[screenSize])
   
    useEffect(()=>{
        if(window.innerWidth> 700){
                setNavDisplay(true)
            }
    },[])
    return (
        <div className="PL-con" >
            <header className={`PL-header ${navDisplay? "header-gray": "header-purple"}`}>
               <i id="PL-toggle-btn" onClick={handleNavDisplay}style={{color:" #65088c"}}className="fas fa-bars"></i>
               <i className="fas fa-soap"> <p className="soln">Avone</p></i>
               <i className= "far fa-user-circle"></i>
            </header>
            <section className="PL-section">
                <nav className="PL-nav" style={{display:navDisplay?"block":"none"}}>
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
