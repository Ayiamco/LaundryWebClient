import React from 'react'
import "./FormInput.css"
export default function FormInput({isValid,errorMessage,handleInput,value,name,type,placeholder}) {
    return (
        <div className="FI-con">
            <input type={type} name={name} placeholder={placeholder} onChange={handleInput} value={value}/>
            {isValid ? <p></p>:<p style={{color:"red",fontSize:"0.7em", paddingLeft:"2em"}}> {errorMessage}</p>}
                
        </div>
    )
}
