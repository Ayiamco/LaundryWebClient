import React,{useEffect,useState} from 'react';
import {Link} from "react-router-dom";
import FormBtn from "../../components/FormBtn/FormBtn";
import FormInput from "../../components/FormInput/FormInput";
import {validateEmail} from "../../Utilities/helper";
import sendPassowordResetMail from "../../apis/SendResetEmail"
import LoginHero from "../../components/LoginHero/LoginHero";
import "../../Utilities/utilities.css";

export default function ForgotPassword() {
    const [email,setEmail]=useState("");
    const [isValidEmail,setIsValidEmail]=useState(true);
    const [isRequestProcessing,setIsRequestProcessing]=useState(false)
    const [shouldButtonDisable,setShouldButtonDisable]=useState(true)


    function handleInput(e){
        setEmail(e.target.value);
        
    }

    useEffect(()=>{
        console.log("is email valid:",isValidEmail)
        if(email===""){
            setIsValidEmail(true)
            setShouldButtonDisable(true)
        }
        else if(!validateEmail(email)){
            setIsValidEmail(false)
            setShouldButtonDisable(true)
            console.log("email is invalid")
        }
        
        else{
            setShouldButtonDisable(false);
            setIsValidEmail(true);
        }
    },[email,isValidEmail])

    async function handleForm(e){
        e.preventDefault()

        //prevent btn from being clicked while request is sent
        setIsRequestProcessing(true)
        
        //post user data
        let resp=await sendPassowordResetMail(email)
        
    }
    return (
        <section className="pg-con">
            <div className="pg-con-top">
                
                <h2 className="pg-con-top-h1">Recover your Password</h2>
               <form onSubmit={handleForm}>
                    <FormInput placeholder="Email" name="username" handleInput={handleInput}
                     value={email} type="email" errorMessage="Please Enter a valid mail"
                      isValid={isValidEmail}
                    />   
                    <FormBtn text="Reset Password" isRequestProcessing={isRequestProcessing} shouldButtonDisable={shouldButtonDisable}/>
                </form>
                <div className="auth-link-con">
                     <Link className="auth-link" to="/login">Login</Link>
                     <Link className="auth-link" to="/register">Register</Link>
                    
                </div>
               
            </div>
            <div className="pg-con-bottom">
                
                <LoginHero></LoginHero>
            </div>
            
            
        </section>
        
    )
}
