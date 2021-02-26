import React,{useState,useEffect} from 'react'
import "./FormInput.css"
export default function FormInput({isValid,errorMessage,handleInput,value,name,type,placeholder}) {

    const [isPassword,setIsPassword]=useState(false);
    const [eyeClass,setEyeClass]=useState("far fa-eye")
    const [inputType, setInputType]=useState(type);
    const [passwordClassName,setPasswordClassName]=useState("")

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
    function highlight(e){
        passwordClassName==="" ? 
        setPasswordClassName("FI-password-active") :setPasswordClassName("")
    }
    return (
        <div className="FI-con">
            {isPassword?
            <div className="FI-con-md">
                <label></label>
                <div className={`FI-password ${passwordClassName}`}>
                    <input onFocus={highlight} onBlur={highlight} type={inputType} name={name} placeholder={placeholder} onChange={handleInput} value={value}/>
                    <span className="FI-i"><i className={eyeClass} onClick={changeEye}></i></span>
                </div>
            </div>
            
            :
                <div className="FI-con-md">
                    <label></label>
                    <div className="FI-other">
                        <input type={type} name={name} placeholder={ placeholder} onChange={handleInput} value={value}/>
                    </div>  
                </div>
                
            }
            
            {isValid ? <p></p>:<p style={{color:"red",fontSize:"0.7em", paddingLeft:"2em"}}> {errorMessage}</p>}
                
        </div>
    )
}
