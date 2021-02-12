import React,{useState,useEffect} from 'react';
import FormInput from "../FormInput/FormInput";
import FormBtn from "../FormBtn/FormBtn"
import {EmailStateIsInvalid,FormValidationState} from "../../Utilities/helper"
import {addEmployee} from "../../apis/EmployeeApi"
import PopUp from "../PopUp/PopUp";
import "./AddEmployee.css";

export default function AddEmployee() {
    const [boolenStates,setBooleanStates]=useState(FormValidationState)
    const [formData,setFormData]=useState({
        username:""
    })
    const [popUpMessage,setPopUpMessage]=useState("");
    const [shouldPopUpDisplay,setShouldPopUpDisplay]=useState(false)
    const [isValidProp,setIsValidProp]=useState(boolenStates.isValidEmail)
    const [requestStatus,setRequestStatus]=useState("success")
   

    function handleInput(e){
         setFormData(prev => {return {...prev,  [e.target.name]:e.target.value}})
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
        setBooleanStates(prev=>({...prev,isRequestProcessing:true}))
        let resp=await addEmployee(formData.username); 
        setBooleanStates(prev=>({...prev,isRequestProcessing:false}))
        setShouldPopUpDisplay(true)
        if(resp.statusCode==="200"){
            setPopUpMessage(`Employee Registration Link has being sent to ${formData.username}`)
            setRequestStatus("success");
            
        }
        else{
            setPopUpMessage(`Registration Link failed to send. Check network connection `)
            setRequestStatus("failure");
        }
    }

    
    return (
        <div className="AE-con">
            <PopUp shouldPopUpDisplay={shouldPopUpDisplay} message={popUpMessage} display={requestStatus}/>
            <form className="AE-form" onSubmit={handleForm}>
                 <FormInput value={formData.email} isValid={isValidProp} placeholder="Enter Employee Email"
                    name="username" type="email" errorMessage="Email is Invalid" handleInput={handleInput}
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
