import React,{useEffect,useState} from 'react';
import FormBtn from "../../components/FormBtn/FormBtn";
import FormInput from "../../components/FormInput/FormInput";
import {validateEmail} from "../../helper";
import sendPassowordResetMail from "../../apis/SendResetEmail"

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
    },[email])

    async function handleForm(e){
        e.preventDefault()

        //prevent btn from being clicked while request is sent
        setIsRequestProcessing(true)
        
        //post user data
        let resp=await sendPassowordResetMail(email)
        
    }
    return (
        <div>
            <section>
                <form onSubmit={handleForm}>
                    <FormInput placeholder="Email" name="username" handleInput={handleInput}
                     value={email} type="email" errorMessage="Please Enter a valid mail"
                      isValid={isValidEmail}
                    />   
                    <FormBtn text="Reset Password" isRequestProcessing={isRequestProcessing} shouldButtonDisable={shouldButtonDisable}/>
                </form>
                
                
            </section>
        </div>
    )
}
