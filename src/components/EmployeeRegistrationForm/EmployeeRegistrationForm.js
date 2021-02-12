import React,{useState,useEffect} from "react";
import { useLocation} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {PasswordsAreNotValid,EmailStateIsInvalid,FormValidationState} from "../../Utilities/helper";
import FormInput from "../FormInput/FormInput";
import FormBtn from "../FormBtn/FormBtn";
import loginUser from "../../apis/LoginUser"

import "./EmployeeRegistrationForm.css"
import { registerEmployee } from "../../apis/Employee";
import PopUp from "../PopUp/PopUp";

export default function EmployeeRegistrationForm(){
    const [booleanStates,setbooleanStates]=useState(FormValidationState);
    const [errorMessage,setErrorMessage]=useState("Error: Please check your network connection");
    const [networkError,setnetworkError]=useState(false)
    const history=useHistory();
    const [formData,setFormData]=useState({
        password:"",confirmPassword:"",laundryId:useQuery().get("id"),
        username:"",phoneNumber:"",address:"",name:""
    })
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    
    function AddError(resp){
        if(resp.statusCode==="500"){
            setErrorMessage(" Network Error: please check your network ")
            setnetworkError(true)
        }
        else if(resp.statusCode==="400" && resp.message==="user email already exist"){
            setbooleanStates(prev=>({...prev,isEmailAvailable:false,isValidEmail:false}))
            setErrorMessage("Email Error: Email already taken")
        }
        setbooleanStates(prev=>( {...prev,"shouldButtonDisable":false,"isRequestProcessing":false}))
    }

    function RemoveErrors(){
        setbooleanStates(FormValidationState)
        setnetworkError(false);
        setFormData({password:"",confirmPassword:"",laundryId:"",
        username:"",phoneNumber:"",address:"",name:""});
    }
    
    const handleForm = async(e)=>{
        e.preventDefault()
        setbooleanStates(prev=> ({...prev,"isRequestProcessing":true}))//prevent btn from being clicked while request is sent
        setnetworkError(false);
        let registerResp=await registerEmployee(formData)
        if (registerResp.statusCode!=="201"){
            AddError(registerResp)} //return to page and display Errors}
        else if(registerResp.statusCode==="201"){
            //user was created successfully so login user 
            let loginResp= await loginUser(formData.username,formData.password)
            if (loginResp.statusCode!=="200"){
                //remove displayed validation errors and redirect to login page
                RemoveErrors();
                history.push("/")
            }

            //remove displayed validation errors, save token and redirect to homepage
            RemoveErrors();
            localStorage.setItem("FrlTg4E21TdBpXb5vnFQj6dLLKVas1dhy7Nu22",loginResp.data)
            history.push("/dashboard")  
        }

    }

    const handleInput=(e)=>{
        setFormData(prev=>{
           return {
               ...prev, [e.target.name]: e.target.value
           }
    })}

    
    useEffect( () =>{
        let isFormDataValid=true;
        //validate that all feilds are not empty
        Object.keys(formData).forEach(key=>{
            if(formData[key]==="") { isFormDataValid=false }
        })
        //validate that passwords match and is a valid password
        if(PasswordsAreNotValid(setbooleanStates,formData.password,formData.confirmPassword)) 
        { isFormDataValid= false }
        //check email validity
        if(EmailStateIsInvalid(setbooleanStates,formData.username)) { isFormDataValid= false}

        //allow request submission depending on validation state
        if(isFormDataValid){
           setbooleanStates(prev=>({...prev,"shouldButtonDisable":false}))}
        else{
           setbooleanStates(prev=>({...prev,"shouldButtonDisable":true}))}
    },[formData])


    return (
        <div className="">
            <PopUp message={errorMessage} display="failure" shouldPopUpDisplay={networkError}></PopUp>
            {/* <p style={{display:networkError,color:"red",fontSize:"0.8em",paddingLeft:"2em"}}>{errorMessage}</p> */}
            
            <form onSubmit={handleForm} >
                
                <FormInput type="text" placeholder=" Full Name" name="name" handleInput={handleInput}
                    value={formData.name}
                />
                <FormInput type="email" placeholder="Email Address" name="username" handleInput={handleInput}
                    errorMessage={booleanStates.isEmailAvailable ? "Email is invalid": "Email already taken"} 
                    isValid={booleanStates.isValidEmail} value={formData.username}
                />
                <FormInput type="password" placeholder="Enter Password" name="password" handleInput={handleInput}
                    value={formData.password} isValid={booleanStates.isValidPassword}
                    errorMessage="Password must be at least 8 characters and contain a lower case,upper case and special character."
                />
                <FormInput type="password" placeholder="Confirm Password" name="confirmPassword" handleInput={handleInput}
                    errorMessage="Password do not match" isValid={booleanStates.isPasswordMatch} value={formData.confirmPassword}
                />
                <FormInput type="text" placeholder="Address" name="address" handleInput={handleInput}
                    value={formData.address}
                />
                <FormInput type="text" placeholder="Phone Number *" name="phoneNumber" handleInput={handleInput}
                    value={formData.phoneNumber}
                />
                
                <div id="ERF-btn-con"> 
                    <FormBtn text="Register" isRequestProcessing={booleanStates.isRequestProcessing} shouldButtonDisable={booleanStates.shouldButtonDisable}>

                    </FormBtn>
                </div>
                
            </form>
        </div>
    )
}

