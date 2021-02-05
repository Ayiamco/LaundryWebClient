import React,{useState,useEffect} from "react";
import {useHistory} from "react-router-dom";
import {validateEmail} from "../../Utilities/helper";
import FormInput from "../FormInput/FormInput";
import FormBtn from "../FormBtn/FormBtn";
import registerUser from "../../apis/registerUser";
import loginUser from "../../apis/LoginUser"


const startData={
        laundryName:"",
        username:"",
        password:"",
        confirmPassword:"",
        phoneNumber:"",
        address:"",
        name:""
    };
const startBoolenState={
        "isPasswordMatch":true,
        "isValidEmail":true,
        "shouldButtonDisable":true,
        "isRequestProcessing":false,
        "isEmailAvailable":true
    }
function RegisterForm(){
    const [formData,setFormData]=useState(startData)

    const [booleanStates,setbooleanStates]=useState(startBoolenState);
    
    const [errorMessage,setErrorMessage]=useState("Error: Please check your network connection")
    const [networkError,setnetworkError]=useState("none")
    const history=useHistory();

    function AddError(resp){
        if(resp.statusCode===undefined){
            setErrorMessage(" Network Error: please check your network ")
            setnetworkError("inline")
        }
        else if(resp.statusCode==="400" && resp.message==="user email already exist"){
            setbooleanStates(prev=>({...prev,isEmailAvailable:false,isValidEmail:false}))
            setErrorMessage("Email Error: Email already taken")
        }
        setbooleanStates(prev=>( {...prev,"shouldButtonDisable":false,"isRequestProcessing":false}))
    }

    function RemoveErrors(){
        setbooleanStates(startBoolenState)
        setnetworkError("none");
        setFormData(startData);
    }
    
    const handleForm = async(e)=>{
        e.preventDefault()

        //prevent btn from being clicked while request is sent
        setbooleanStates(prev=>{
            return {...prev,"isRequestProcessing":true}
        })
        
        //post user data
        let registerResp=await registerUser(formData)
        if (registerResp.statusCode!=="201"){
            AddError(registerResp) //return to page and display Errors
            return;}
        else if(registerResp.statusCode==="201"){
            console.log("registration was successful")
            //user was created successfully so login user 
            let loginResp= await loginUser(formData.username,formData.password)
            console.log("login response",loginResp)
            if (loginResp.statusCode!=="200"){
                //remove displayed validation errors and redirect to login page
                RemoveErrors();
                history.push("/")
                return;
            }

            //remove displayed validation errors, save token and redirect to homepage
            RemoveErrors();
            localStorage.setItem("token",loginResp.data)
            history.push("/home")  
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
        Object.keys(formData).forEach(key=>{
           //validate that all feilds are not empty 
            if(formData[key]===""){
                isFormDataValid=false}

            //validate that passwords matched
            if(formData.password !== formData.confirmPassword && formData.confirmPassword !=="" && key==="confirmPassword"){
                isFormDataValid=false;
                setbooleanStates(prev => ({...prev,"isPasswordMatch":false}))}
            else if(key==="confirmPassword"){
                 setbooleanStates(prev=>({...prev,"isPasswordMatch":true}))}
            
            //check email validity
            if( validateEmail(formData.username)===false && formData.username!=="" && key==="username"){
                setbooleanStates(prev=>({...prev,"isValidEmail":false,"isEmailAvailable":true}))
                isFormDataValid=false;}
            else if(validateEmail(formData.username)===true && formData.username!=="" && key==="username"){
                setbooleanStates(prev=>({...prev,"isValidEmail":true}))
            }
            else if(formData.username===""){
                setbooleanStates(prev=>({...prev,"isValidEmail":true}))
                isFormDataValid=false;
            }     
       })
       //allow request submission depending on validation state
       if(isFormDataValid){
           setbooleanStates(prev=>({...prev,"shouldButtonDisable":false}))}
       else{
           setbooleanStates(prev=>({...prev,"shouldButtonDisable":true}))}
    },[formData])


    return (
        <div className="">
            <p style={{display:networkError,color:"red",fontSize:"0.8em",paddingLeft:"2em"}}>{errorMessage}</p>
            
            <form onSubmit={handleForm} >
                <FormInput type="text" placeholder="Laundry Name" name="laundryName" handleInput={handleInput}
                 value={formData.laundryName} 
                />
                <FormInput type="text" placeholder="Laundry Owner Full Name" name="name" handleInput={handleInput}
                 value={formData.name}
                />
                <FormInput type="email" placeholder="Email Address" name="username" handleInput={handleInput}
                errorMessage={booleanStates.isEmailAvailable ? "Email is invalid": "Email already taken"} 
                isValid={booleanStates.isValidEmail} value={formData.username}
                />
                <FormInput type="password" placeholder="Enter Password" name="password" handleInput={handleInput}
                 value={formData.password}
                />
                <FormInput type="password" placeholder="Confirm Password" name="confirmPassword" handleInput={handleInput}
                errorMessage="Password do not match" isValid={booleanStates.isPasswordMatch} value={formData.confirmPassword}
                />
                <FormInput type="text" placeholder="Address *" name="address" handleInput={handleInput}
                  value={formData.address}
                />
                <FormInput type="text" placeholder="Phone Number *" name="phoneNumber" handleInput={handleInput}
                value={formData.phoneNumber}
                />
                <FormBtn text="Register" isRequestProcessing={booleanStates.isRequestProcessing} shouldButtonDisable={booleanStates.shouldButtonDisable}>

                </FormBtn>
            </form>
        </div>
    )
}

export default RegisterForm;