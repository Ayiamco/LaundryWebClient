import React,{useState,useEffect} from 'react';
import FormInput from "../FormInput/FormInput";
import FormBtn from "../FormBtn/FormBtn"
import {EmailStateIsInvalid,FormValidationState} from "../../Utilities/helper"
import {addEmployee} from "../../apis/Employee"

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
         console.log(boolenStates.isValidEmail)
            
    }

    useEffect(()=>{
        boolenStates.isEmailAvailable ? setIsValidProp(boolenStates.isValidEmail) : setIsValidProp(boolenStates.isEmailAvailable) 
    
        //validate email
        EmailStateIsInvalid(setBooleanStates,formData.username) ?
         setBooleanStates(prev=> ({...prev,shouldButtonDisable:true})) :
         setBooleanStates(prev=>({...prev,shouldButtonDisable:false}))

        if(formData.username===""){
            setBooleanStates(prev=> ({...prev,shouldButtonDisable:true}))
        }

    },[boolenStates.isEmailAvailable,boolenStates.isValidEmail,formData.username])

    async function handleForm(e){
        e.preventDefault()
        let resp=await addEmployee(formData.username)
        console.log(resp);
    }
    return (
        <div className="AE-con">
            <form className="AE-form" onSubmit={handleForm}>
                 <FormInput value={formData.email} isValid={isValidProp} placeholder="Enter Employee Email"
                    name="username" type="email" errorMessage={mailErrorMessage} handleInput={handleInput}
                 />

                <div className="AE-btn-con">
                     <FormBtn text="Add Employee" isRequestProcessing={boolenStates.isRequestProcessing}
                        shouldButtonDisable={boolenStates.shouldButtonDisable}
                     ></ FormBtn>
                </div>
                
            </form>
           
        </div>
    )
}
