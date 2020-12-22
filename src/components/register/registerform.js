import React from "react";
import {useHistory} from "react-router-dom";
import "../login/loginform.css";

function RegisterForm({username,password ,setUsername,setPassword,confirmPassword,setConfirmPassword}){
    const history=useHistory();
    const handleLoginForm =(e)=>{
     e.preventDefault()
        fetch("https://localhost:44322/api/AdminUser/register",{
            method:"POST",
            headers:{
                "Content-Type":'application/json; charset=utf-8',
                
            },
            mode:'cors',
            body: JSON.stringify({
                "username":username,
                "password":password,
                "confirmpassword":confirmPassword,
                
            })
        })
        .then( res=>{
            console.log("register status code:",res.status)
            if(res.status===201){
                
                fetch("https://localhost:44322/api/AdminUser/login",{
                method:"POST",
                headers:{
                    "Content-Type":'application/json; charset=utf-8',
                    
                },
                mode:'cors',
                body: JSON.stringify({
                    "username":username,
                    "password":password
                    
                }) 
                })
            .then(res=>{return res.json()})
            .then(res=>{
                localStorage.setItem("token",res.token)
                history.push("/home")
                })
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })


        
    }

    const handleInput=(e)=>{
         
        if (e.target.name==="username"){
            setUsername(prev => {return  e.target.value})
        }
        if(e.target.name==="password"){
            setPassword(prev => {return  e.target.value})
        }
        if(e.target.name==="confirmPassword"){
            setConfirmPassword(prev => {return  e.target.value})
        }
    }

    return (
        <div className="LF-con">
            <form onSubmit={handleLoginForm} >
                <div>
                    <input type="email" name="username"placeholder="Email Address" onChange={handleInput} value={username}></input>
                    <p></p>
                </div>
                <div>
                    <input placeholder="Password" name="password" onChange={handleInput} value={password}></input>
                    <p></p>
                </div>
                <div>
                    <input placeholder="ConfirmPassword" name="confirmPassword" onChange={handleInput} value={confirmPassword}></input>
                    <p></p>
                </div>
                <button>Create Account</button>
            </form>
        </div>
    )
}

export default RegisterForm;