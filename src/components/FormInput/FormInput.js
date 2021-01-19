import React,{useState,useEffect} from 'react'
import "./FormInput.css"
export default function FormInput({isValid,errorMessage,handleInput,value,name,type,placeholder}) {

    const [isPassword,setIsPassword]=useState(false);
    const [eyeClass,setEyeClass]=useState("far fa-eye")
    const [inputType, setInputType]=useState(type);

    useEffect(() => {
        
        if( type==="password"){
            setIsPassword(true)
        }
        
    }, [type])

    function changeEye(e){
        if(e.target.className==="far fa-eye"){
            setEyeClass("far fa-eye-slash")
            setInputType("text");
        }
        if(e.target.className==="far fa-eye-slash"){
            setEyeClass("far fa-eye")
            setInputType("password");
        }
    }
    return (
        <div className="FI-con">
            {isPassword?
            <div className="FI-password">
                <input type={inputType} name={name} placeholder={placeholder} onChange={handleInput} value={value}/>
                <span className="FI-i"><i className={eyeClass} onClick={changeEye}></i></span>
            </div>
            :
                <input type={type} name={name} placeholder={placeholder} onChange={handleInput} value={value}/>
            }
            
            {isValid ? <p></p>:<p style={{color:"red",fontSize:"0.7em", paddingLeft:"2em"}}> {errorMessage}</p>}
                
        </div>
    )
}
