import React from "react";
import {useHistory} from "react-router-dom";
import "./loginform.css";

function LoginForm({username,password ,setUsername,setPassword}){
    const history=useHistory();
    const handleLoginForm =(e)=>{
     e.preventDefault()
        fetch("https://localhost:44322/api/AdminUser/login",{
            method:"POST",
            headers:{
                "Content-Type":'application/json; charset=utf-8',
                
            },
            mode:'cors',
            body: JSON.stringify({
                "username":username,
                "password":password,
                
            })
        }).then(res=> {
            return res.json()
        }).then(res=>{
            console.log(res)
            localStorage.setItem("token1",res.token) 
            //redirect to home page 
            history.push('/home');
        })


        
    }

    const handleInput=(e)=>{
         
        if (e.target.name==="username"){
            setUsername(prev => {return  e.target.value})
        }
        if(e.target.name==="password"){
            setPassword(prev => {return  e.target.value})
        }
    }

    return (
        <div className="LF-con">
            <form onSubmit={handleLoginForm} >
                <div>
                    <input name="username"placeholder="Email Address" onChange={handleInput} value={username}></input>
                    <p></p>
                </div>
                <div>
                    <input placeholder="Password" name="password" onChange={handleInput} value={password}></input>
                    <p></p>
                </div>
                <button>Login</button>
            </form>
        </div>
    )
}


export default LoginForm;