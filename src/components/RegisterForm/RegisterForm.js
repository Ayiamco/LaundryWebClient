import React,{useState,useEffect} from "react";
import {useHistory} from "react-router-dom";

import FormInput from "../FormInput/FormInput";
import FormBtn from "../FormBtn/FormBtn"

export function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
}

function RegisterForm(){
    const [formData,setFormData]=useState({
        laundryName:"",
        username:"",
        password:"",
        confirmPassword:"",
        phoneNumber:"",
        address:""
    })

    const [boolenStates,setBoolenStates]=useState({
        "isPasswordMatch":true,
        "isValidEmail":true,
        "shouldButtonDisable":true,
        "isRequestSent":false
    });
    
    const [errorMessage,setErrorMessage]=useState("Error: Please check your network connection")
    const [networkError,setnetworkError]=useState("none")
    const history=useHistory();

    
    const handleForm =(e)=>{
        e.preventDefault()

        //prevent btn from being clicked while request is sent
        setBoolenStates(prev=>{
            return {...prev,"isRequestSent":true}
        })
        
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

                //request cycle has ended 
                setBoolenStates(prev=>{
                    return {...prev,"isRequestSent":false}
                    });
                })
            }
            else if(res.statusCode==="400"){
                setErrorMessage(()=> {return res.message})
                setnetworkError( "block")
                setBoolenStates(prev=>{
                    return {...prev,"shouldButtonDisable":false}
                })
                 setBoolenStates(prev=>{
                    return {...prev,"isRequestSent":false}
                })
                
            
            }
            else if(res.statusCode==="500"){
                setErrorMessage(" Server Error: there seem to be an error with the server ")
                setnetworkError("block")
                setBoolenStates(prev=>{
                    return {...prev,"shouldButtonDisable":false}
                })
                setBoolenStates(prev=>{
                    return {...prev,"isRequestSent":false}
                })
                
            }
            
        })
        .catch((err)=>{
            setErrorMessage(" Network Error: please check your network ")
            setnetworkError("block")
            setBoolenStates(prev=>{
                    return {...prev,"shouldButtonDisable":false}
                })
            setBoolenStates(prev=>{
                    return {...prev,"isRequestSent":false}
                })
            
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
        
        let isFormDataValid=true;
        Object.keys(formData).forEach(key=>{

           //validate that all feilds are not empty 
            if(formData[key]===""){
                isFormDataValid=false;
            }

            //validate that passwords matched
            if(formData.password !== formData.confirmPassword && formData.confirmPassword !=="" && key==="confirmPassword"){
                isFormDataValid=false;
                setBoolenStates(prev=>{
                    return {...prev,"isPasswordMatch":false}
                })
                
                
            }
            else if(key==="confirmPassword"){
                 setBoolenStates(prev=>{
                    return {...prev,"isPasswordMatch":true}
                })
            }

            //check email validity
            if( validateEmail(formData.username)===false && formData.username!=="" && key==="username"){
                setBoolenStates(prev=>{
                    return {...prev,"isValidEmail":false}
                })
                isFormDataValid=false;
            }
            else if(validateEmail(formData.username)===true && formData.username!=="" && key==="username"){
                setBoolenStates(prev=>{
                    return {...prev,"isValidEmail":true}
                })
            }
            else if(formData.username===""){
                setBoolenStates(prev=>{
                    return {...prev,"isValidEmail":true}
                })
                isFormDataValid=false;
            }
            
       })

       //allow request submission depending on validation state
       if(isFormDataValid){
           setBoolenStates(prev=>{
                    return {...prev,"shouldButtonDisable":false}
                })
        }
       else{
           setBoolenStates(prev=>{
                    return {...prev,"shouldButtonDisable":true}
                })
        }
        

    },[formData])


    return (
        <div className="RF-con">
            <p style={{display:networkError,color:"red",fontSize:"0.8em",paddingLeft:"2em"}}>{errorMessage}</p>
            
            <form onSubmit={handleForm} >
                <FormInput type="text" placeholder="Laundry Name *" name="laundryName" handleInput={handleInput}
                 value={formData.laundryName}
                />
                <FormInput type="email" placeholder="Email Address *" name="username" handleInput={handleInput}
                errorMessage="Email is invalid" isValid={boolenStates.isValidEmail} value={formData.username}
                />
                <FormInput type="password" placeholder="Enter Password *" name="password" handleInput={handleInput}
                 value={formData.password}
                />
                <FormInput type="password" placeholder="Confirm Password *" name="confirmPassword" handleInput={handleInput}
                errorMessage="Password do not match" isValid={boolenStates.isPasswordMatch} value={formData.confirmPassword}
                />
                <FormInput type="text" placeholder="Address *" name="address" handleInput={handleInput}
                  value={formData.address}
                />
                <FormInput type="text" placeholder="Phone Number *" name="phoneNumber" handleInput={handleInput}
                value={formData.phoneNumber}
                />
                <FormBtn text="Register" isRequestSent={boolenStates.isRequestSent} shouldButtonDisable={boolenStates.shouldButtonDisable}>

                </FormBtn>
            </form>
        </div>
    )
}

export default RegisterForm;