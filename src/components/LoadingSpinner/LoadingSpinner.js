import React from 'react'
import "./LoadingSpinner.css"
export default function LoadingSpinner({isNetworkError}) {
    return (
        <div >
            <p style={{display:isNetworkError?"block":"none",color:"red"}}>Network Error: Check network connection</p>
            <div className="lds-con">
                <div className="lds-dual-ring"></div>
            </div>
        </div>
        
        
    )
}
