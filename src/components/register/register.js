import React,{}from 'react'

import RegisterForm from "./registerform"
import LoginHero from "../login/loginhero"

import "../login/login.css"

export default function Register() {

    return (
        <section className="login-con">
            <div className="login-con-top">
                
                <h1 className="login-con-top-h1">Welcome,</h1>
                <h2 className="login-con-top-h2">Create your Account</h2>
                <RegisterForm/>
            </div>
            <div className="login-con-bottom">
                
                <LoginHero></LoginHero>
            </div>
            
            
        </section>
    )
}



