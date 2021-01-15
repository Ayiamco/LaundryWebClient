import React,{useState,useEffect} from "react";
import {useHistory} from "react-router-dom";
import "../login/loginform.css";

function RegisterForm(){
    const [formData,setFormData]=useState({
        laundryName:"",
        username:"",
        password:"",
        confirmPassword:"",
        phoneNumber:"",
        address:""
    })
    const [isbuttonDisabled,setIsButtonDisabled]=useState(true);
    const [showMessage,setShowMessage]=useState(false);
    const history=useHistory();

    const handleLoginForm =(e)=>{
     e.preventDefault()
     
        fetch("https://localhost:44322/api/laundry/register",{
            method:"POST",
            headers:{
                "Content-Type":'application/json; charset=utf-8',
            },
            mode:'cors',
            body: JSON.stringify({
                "username":formData.username,
                "password":formData.password,
                "confirmPassword":formData.confirmPassword,
                "address":formData.address,
                "phoneNumber":formData.phoneNumber,
                "laundryName":formData.laundryName
            })
        })
        .then( res=>{
            console.log("register status code:",res.status)
            if(res.status===201){
                
                fetch("https://localhost:44322/api/laundry/login",{
                method:"POST",
                headers:{
                    "Content-Type":'application/json; charset=utf-8',
                    
                },
                mode:'cors',
                body: JSON.stringify({
                    "username":formData.username,
                    "password":formData.password
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
        setFormData(prev=>{
           return {
               ...prev, [e.target.name]: e.target.value
           }
       })

       
       
       

       
    }

    useEffect( () =>{
        console.log(formData.password.length,formData.confirmPassword.length)
        let isFormDataValid=true;
       Object.keys(formData).forEach(key=>{
           //validate all feilds are not empty 
            if(formData[key]===""){
                isFormDataValid=false;
            }
            //validate that passwords matched
            if(formData.password !== formData.confirmPassword && formData.confirmPassword !==""){
                isFormDataValid=false;
                setShowMessage(true);
            }
            else{
                 setShowMessage(false);
            }
       })
       if(isFormDataValid){setIsButtonDisabled(false)}
       else{setIsButtonDisabled(true)}
    },[formData])


    return (
        <div className="LF-con">
            
            <form onSubmit={handleLoginForm} >
                <div>
                    <input type="text" name="laundryName"placeholder="Laundry Name " onChange={handleInput} value={formData.laundryName}></input>
                    <p></p>
                </div>
                <div>
                    <input type="email" name="username"placeholder="Email Address" onChange={handleInput} value={formData.username}></input>
                    <p></p>
                </div>
                <div>
                    <input placeholder="Password" name="password" onChange={handleInput} value={formData.password}></input>
                    <p></p>
                </div>
                <div>
                    <input placeholder="ConfirmPassword" name="confirmPassword" onChange={handleInput} value={formData.confirmPassword}></input>
                    {showMessage ? <p style={{color:"red",fontSize:"0.7em", paddingLeft:"2em"}}> passwords do not match</p>:<p></p>}
                </div>
                <div>
                    <input placeholder="Phone Number" name="phoneNumber" onChange={handleInput} value={formData.phoneNumber}></input>
                    <p></p>
                </div>
                 <div>
                    <input placeholder="Address" name="address" onChange={handleInput} value={formData.address}></input>
                    <p></p>
                </div>
                <button disabled={isbuttonDisabled} >Create Account</button>
            </form>
        </div>
    )
}

export default RegisterForm;