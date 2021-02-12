import React,{useRef,useState} from 'react'
import  {Link,useHistory } from "react-router-dom"
import LoginHero from "../../components/LoginHero/LoginHero"
import loginUser from "../../apis/LoginUser"
import PopUp from "../../components/PopUp/PopUp";
import "./SelectAccount.css"

import "../../Utilities/utilities.css"

export default function Login() {
    let accountType= useRef()
    let history =useHistory();
    const [errorMessage,setErrorMessage]=useState("");
    const [shouldErrorDisplay,setShouldErrorDisplay]=useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        let data={
            role:accountType.current.value,
            username:localStorage.getItem("username"),
            password:localStorage.getItem("password")
        };
       let resp= await loginUser(data)
       console.log(resp)
       if(resp.statusCode==="200"){
            localStorage.removeItem("username");
            localStorage.removeItem("password");
            history.push("/dashboard");
            setErrorMessage("");
            setShouldErrorDisplay(false);
       }
       else if(resp.statusCode==="400"){
            setErrorMessage("Login details are incorrect try logging in with correct details.");
            setShouldErrorDisplay(true);
       }
       else{
           setErrorMessage("some error occurred try logging in with correct details.");
           setShouldErrorDisplay(true);
       }

          
        
    }
    return (
        <section className="pg-con">
            <div className="pg-con-top">
                <div>
                    <PopUp message={errorMessage} display="failure" shouldPopUpDisplay={shouldErrorDisplay}></PopUp>
                </div>
                <h2 className="pg-con-top-h2">Select your Account</h2>
                <form onSubmit={handleSubmit} className="SA-form">
                     <select ref={accountType}>
                         <option>Select Account</option>
                        <option value="LaundryOwner">Laundry Account</option>
                        <option value="LaundryEmployee">Employee Account</option>
                    </select>
                    <button>Submit</button>
                </form>
               
                <div className="auth-link-con">
                     <Link className="auth-link auth-link-left" to="/register">Register</Link>
                     <Link className="auth-link auth-link-rigth" to="/forgot-password">Forgot Password</Link>
                </div>
               
            </div>
            <div className="pg-con-bottom">
                
                <LoginHero></LoginHero>
            </div>
            
            
        </section>
    )
}



