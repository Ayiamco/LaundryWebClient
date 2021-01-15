import React from "react";
import {useHistory} from "react-router-dom";
import {useState} from "react"
import "./loginform.css";

function LoginForm({username,password ,setUsername,setPassword}){
    const history=useHistory();
    const [networkError,setnetworkError]=useState("none")
    const [isDisabled,setIsDisabled]=useState(false)
    const [errorMessage,setErrorMessage]=useState("Error: Please check your network connection")
    

    const handleLoginForm =(e)=>{
     e.preventDefault()
     setIsDisabled(true);
        fetch("https://localhost:44322/api/Laundry/login",{
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
            console.log(res.statusCode)
            if(res.statusCode==="400"){
                setErrorMessage(res.Message)
                setnetworkError("block")
                setIsDisabled(false)
                console.log("got here")
            }
            else if(res.statusCode==="500"){
                setErrorMessage("Error: try later ")
                setnetworkError("block")
                setIsDisabled(false)
            }
            else{
                localStorage.setItem("token1",res.token) 
                //reset states and redirect to home page 
                setnetworkError("none")
                setIsDisabled(false)
                history.push('/home');
            }
            
        }).catch(e=>{
            if(e==="TypeError: Failed to fetch"){
               
            }
            setnetworkError("block")
            setErrorMessage("Error: Please check your network connection")
            setIsDisabled(false)
            console.log(e);
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
                <p style={{display:networkError}}>{errorMessage}</p>
                <div>
                    <input name="username"placeholder="Username" onChange={handleInput} value={username}></input>
                    <p></p>
                </div>
                <div>
                    <input placeholder="Password" name="password" onChange={handleInput} value={password}></input>
                    <p></p>
                </div>
                <button style={{display: isDisabled? "none": "block"}}  >Login</button>
                <button disabled style={{display: isDisabled? "block": "none"}}> Login</button>
            </form>
        </div>
    )
}


export default LoginForm;