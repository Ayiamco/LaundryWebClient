import React from 'react'
import {Link} from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm"
import LoginHero from "../../components/LoginHero/LoginHero"

import "../../Utilities/utilities.css";
import "./register.css";

export default function Register() {

    return (
        <section className="pg-con">
            <div className="pg-con-top">
                
                <h1 className="pg-con-top-h1">Welcome,</h1>
                <h2 className="pg-con-top-h2">Create your Account</h2>
                <RegisterForm/>
                <div className="auth-link-con">
                     <Link className="auth-link auth-link-left" to="/">Login</Link>
                     <Link className="auth-link auth-link-rigth" to="/forgot-password">Forgot Password</Link>
                </div>
            </div>
            <div className="pg-con-bottom">
                
                <LoginHero></LoginHero>
            </div>
            
            
        </section>
    )
}



