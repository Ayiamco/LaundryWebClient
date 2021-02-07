import React from 'react'
import NavBar from "../NavBar/NavBar";
export default function PageLayout({activeItem,pageName}) {
    return (
        <div>
            <h1>{pageName}</h1>
            <NavBar activeItem={activeItem}></NavBar>
        </div>
    )
}
