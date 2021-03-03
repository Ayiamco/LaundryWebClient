import React,{useEffect,useState,useCallback} from 'react'
import { useLocation,Link} from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";
import FormBtn from "../../components/FormBtn/FormBtn";
import LoginHero from "../../components/LoginHero/LoginHero";
import {saveNewPassword} from "../../apis/ResetPassword";
import {validatePassword}  from "../../Utilities/helper"

import "../../Utilities/utilities.css"


export default function PasswordChange() {
    const [data,setData]=useState({
        password:"",
        confirmPassword:"",
        id:useQuery().get("id")
    })
    const [booleanStates,setbooleanStates]=useState({
        isPasswordMatch:true,
        isRequestProcessing:false,
        shouldButtonDisable:true,
        isValidPassword:true
    })
    
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const handleForm= async (e)=>{
        e.preventDefault();
        setbooleanStates(prev=> ({...prev,isRequestProcessing:true}))
        let resp=await saveNewPassword(data);
        setbooleanStates(prev=> ({...prev,isRequestProcessing:false}))
        console.log(resp)
    }
    const handleInput = (e)=>{
        setData(prev=> ({...prev,[e.target.name]:e.target.value}))
    }
    const PasswordsAreNotValid = useCallback(()=> {
        let isPasswordValid=true;
        //check if passwords match
        if(data.password !== data.confirmPassword){
            setbooleanStates(prev=>({...prev,isPasswordMatch:false}))
            isPasswordValid=false;
        }
        else{setbooleanStates(prev=>({...prev,isPasswordMatch:true}))}
        //check that password is valid
        if(validatePassword(data.password) || data.password===""){
            setbooleanStates(prev=> ({...prev,isValidPassword:true}))
        }
        else{
            setbooleanStates(prev=> ({...prev,isValidPassword:false}));
            isPasswordValid=false;
        }
        return !isPasswordValid;
    },[data.password,data.confirmPassword])

    useEffect(()=>{
        if(PasswordsAreNotValid()){
            setbooleanStates(prev=>({...prev,shouldButtonDisable:false}))
        }
        else{
            setbooleanStates(prev=>({...prev,shouldButtonDisable:false}))
        }
    },[data.confirmPassword,data.password,PasswordsAreNotValid])
       
    return (
        <section className="pg-con">
            <div className="pg-con-top">
                
                <h2 className="pg-con-top-h1">Reset your Password</h2>
               <form onSubmit={handleForm}>
                    <FormInput placeholder="New Password" name="password" handleInput={handleInput}
                        value={data.password} type="password" isValid={booleanStates.isValidPassword}
                        errorMessage="password must be a least 8 characters and must contain at least a lower case,upper case,digit and special character."
                    /> 
                    <FormInput placeholder="Confirm New Password" name="confirmPassword" handleInput={handleInput}
                        value={data.confirmPassword} type="password" errorMessage="passwords do not match."
                        isValid={booleanStates.isPasswordMatch}
                    />   
                    <FormBtn text="Reset Password" isRequestProcessing={booleanStates.isRequestProcessing} 
                        shouldButtonDisable={booleanStates.shouldButtonDisable}/>
                </form>
                <div className="auth-link-con">
                     <Link className="auth-link" to="/">Login</Link>
                     <Link className="auth-link" to="/register">Register</Link>
                    
                </div>
               
            </div>
            <div className="pg-con-bottom">
                
                <LoginHero></LoginHero>
            </div>
            
            
        </section>
    )
}
