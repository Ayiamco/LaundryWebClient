import React,{useState,useEffect,useContext}from 'react'

import RegisterForm from "./registerform"
import LoginHero from "../login/loginhero"

import "../login/login.css"

export default function Register() {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("")

    return (
        <section className="login-con">
            <div className="login-con-top">
                
                <h1 className="login-con-top-h1">Welcome,</h1>
                <h2 className="login-con-top-h2">Create your Account</h2>
                <RegisterForm username={username} password={password} 
                            setUsername={setUsername}  setPassword={setPassword}
                            setConfirmPassword={setConfirmPassword} confirmPassword={confirmPassword}
                />
            </div>
            <div className="login-con-bottom">
                
                <LoginHero></LoginHero>
            </div>
            
            
        </section>
    )
}



