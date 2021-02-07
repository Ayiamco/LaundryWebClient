import React from 'react'
import NavBar from "../NavBar/NavBar";
import "./PageLayout.css";
export default function PageLayout({activeItem,pageName}) {
    return (
        <div className="PL-con"  >
            <header className="PL-header">
                <p>Laundry Solution</p>
            </header>
            <section className="PL-section">
                <nav className="PL-nav">
                    <NavBar activeItem={activeItem}></NavBar>
                </nav>
                <section className="PL-body">
                    This is the {pageName}
                </section>
            </section>
            
        </div>
    )
}
