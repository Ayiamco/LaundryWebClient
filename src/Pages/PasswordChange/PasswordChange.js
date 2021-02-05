import React,{useEffect,useState} from 'react'
import { useLocation,Link} from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";
import FormBtn from "../../components/FormBtn/FormBtn";
import LoginHero from "../../components/LoginHero/LoginHero";
import {saveNewPassword} from "../../apis/ResetPassword";

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

    useEffect(()=>{
        if(data.password==="" || data.password!==data.confirmPassword ){
            setbooleanStates(prev=>({...prev,isPasswordMatch:false,shouldButtonDisable:true}))
        }
        else if(data.password===data.confirmPassword){
            setbooleanStates(prev=>({...prev,isPasswordMatch:true,shouldButtonDisable:false}))
        }
    },[data.confirmPassword,data.password])
       
    return (
        <section className="pg-con">
            <div className="pg-con-top">
                
                <h2 className="pg-con-top-h1">Reset your Password</h2>
               <form onSubmit={handleForm}>
                    <FormInput placeholder="New Password" name="password" handleInput={handleInput}
                     value={data.password} type="password"
                    /> 
                    <FormInput placeholder="Confirm New Password" name="confirmPassword" handleInput={handleInput}
                        value={data.confirmPassword} type="password" 
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
