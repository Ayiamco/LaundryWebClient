import React,{useState,useEffect} from 'react';
import FormInput from "../FormInput/FormInput";
import FormBtn from "../FormBtn/FormBtn"
import {EmailIsNotValid,FormValidationState} from "../../Utilities/helper"

import "./AddEmployee.css"

export default function AddEmployee() {
    const [boolenStates,setBooleanStates]=useState(FormValidationState)
    const [formData,setFormData]=useState({
        username:""
    })
    const [isValidProp,setIsValidProp]=useState(boolenStates.isValidEmail)
    const [mailErrorMessage,setMailErrorMessage]=useState("Email is invalid")

    //REMEMBER TO CHANGE THE ERROR MESSAGE STATE
    function handleInput(e){
         setFormData(prev => {return {...prev,  [e.target.name]:e.target.value}})
         if(EmailIsNotValid){
             setBooleanStates(prev=>({...prev,isValidEmail:false}))
         }
    }

    useEffect(()=>{
        boolenStates.isEmailAvailable ? setIsValidProp(boolenStates.isEmailAvailable) 
        : setIsValidProp(boolenStates.isValidEmail)
    },[boolenStates.isEmailAvailable,boolenStates.isValidEmail])

    return (
        <div className="AE-con">
            <form className="AE-form">
                 <FormInput value={formData.email} isValid={isValidProp} placeholder="Enter Employee Email"
                    name="username" type="email" errorMessage={mailErrorMessage} handleInput={handleInput}
                 />

                <div className="AE-btn-con">
                     <FormBtn text="Add Employee"></FormBtn>
                </div>
                
            </form>
           
        </div>
    )
}
