import React,{}from 'react'

import RegisterForm from "../../components/RegisterForm/RegisterForm"
import LoginHero from "../../components/LoginHero/LoginHero"

import "./register.css"

export default function Register() {

    return (
        <section className="register-con">
            <div className="register-con-top">
                
                <h1 className="register-con-top-h1">Welcome,</h1>
                <h2 className="register-con-top-h2">Create your Account</h2>
                <RegisterForm/>
            </div>
            <div className="register-con-bottom">
                
                <LoginHero></LoginHero>
            </div>
            
            
        </section>
    )
}



