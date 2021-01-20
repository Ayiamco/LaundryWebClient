import React from 'react';
import "./FormBtn.css"

export default function FormBtn({text,isRequestProcessing,shouldButtonDisable}){ 
    let btnState;
    if(isRequestProcessing || shouldButtonDisable){
        btnState=true;
    }

    return (
        <div className="FB-con">
            <button id={isRequestProcessing?"btn-waiting":""} disabled={btnState} >
                {text}
            </button>
        </div>
    )
}
