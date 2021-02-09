import React from 'react'
import EmployeeRegistrationForm from "../../components/EmployeeRegistrationForm/EmployeeRegistrationForm"
import {Link} from "react-router-dom";
import LoginHero from "../../components/LoginHero/LoginHero";

import "../../Utilities/utilities.css";

export default function Register() {

    return (
        <section className="pg-con">
            <div className="pg-con-top">
                
                <h1 className="pg-con-top-h1">Welcome,</h1>
                <h2 className="pg-con-top-h2">Create your Account</h2>
                <EmployeeRegistrationForm/>
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





