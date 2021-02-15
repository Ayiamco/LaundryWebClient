import React,{useState,useEffect} from "react";
import { useLocation} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {EmailStateIsInvalid,FormValidationState} from "../../Utilities/helper";
import FormInput from "../FormInput/FormInput";
import FormBtn from "../FormBtn/FormBtn";
import {addCustomer} from "../../apis/CustomerApi"
import PopUp from "../PopUp/PopUp";
import "./AddCustomer.css"

export default function AddCustomer(){
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
        let registerResp=await addCustomer(formData)
        if (registerResp.statusCode!=="201"){
            AddError(registerResp)} //return to page and display Errors}
        else if(registerResp.statusCode==="201"){
            //remove displayed validation errors, save token and redirect to homepage
            RemoveErrors();
            history.push("/Customers")  
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
            if(formData[key]==="" && key!=="password" && key!=="confirmPassword" && key !=="laundryId"){
                 isFormDataValid=false 
            }
        })
        //check email validity
        if(EmailStateIsInvalid(setbooleanStates,formData.username)) { isFormDataValid= false}
        //allow request submission depending on validation state
        if(isFormDataValid){
           setbooleanStates(prev=>({...prev,"shouldButtonDisable":false}))}
        else{
           setbooleanStates(prev=>({...prev,"shouldButtonDisable":true}))}
    },[formData])


    return (
        <div className="AC-con">
            <PopUp message={errorMessage} display="failure" shouldPopUpDisplay={networkError}></PopUp>
            <h1>Add Customer</h1>
            <form onSubmit={handleForm} >
                
                <FormInput type="text" placeholder=" Full Name" name="name" handleInput={handleInput}
                    value={formData.name}
                />
                <FormInput type="email" placeholder="Email Address" name="username" handleInput={handleInput}
                    errorMessage={booleanStates.isEmailAvailable ? "Email is invalid": "Email already taken"} 
                    isValid={booleanStates.isValidEmail} value={formData.username}
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

