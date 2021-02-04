import React from 'react'
import  {Link } from "react-router-dom"
import LoginForm from "../../components/LoginForm/LoginForm"
import LoginHero from "../../components/LoginHero/LoginHero"

import "./login.css"

export default function Login() {
    

    return (
        <section className="login-con">
            <div className="login-con-top">
                
                <h1 className="login-con-top-h1">Login to</h1>
                <h2 className="login-con-top-h2">Access your Account</h2>
                <LoginForm/>
                <div>
                     <Link className="NB-link" to="/register">Register</Link>
                     <Link className="NB-link" to="/password-recovery">Forgot Password</Link>
                </div>
               
            </div>
            <div className="login-con-bottom">
                
                <LoginHero></LoginHero>
            </div>
            
            
        </section>
    )
}



