import React from 'react'
import  {Link } from "react-router-dom"
import LoginForm from "../../components/LoginForm/LoginForm"
import LoginHero from "../../components/LoginHero/LoginHero"

import "./Login.css";
import "../../Utilities/utilities.css"

export default function Login() {
    

    return (
        <section className="pg-con">
            <div className="pg-con-top">
                
                <h1 className="pg-con-top-h1">Login to</h1>
                <h2 className="pg-con-top-h2">Access your Account</h2>
                <LoginForm/>
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



