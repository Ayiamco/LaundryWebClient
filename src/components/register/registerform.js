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

    const [boolenStates,setBoolenStates]=useState({
        "isPasswordMatch":true,
        "isValidEmail":true,
        "shouldButtonDisable":true,
        "isRequestSent":false
    });
    
    const [errorMessage,setErrorMessage]=useState("Error: Please check your network connection")
    const [networkError,setnetworkError]=useState("none")
    const history=useHistory();

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const handleLoginForm =(e)=>{
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
                
                console.log("got here",errorMessage)
            }
            else if(res.statusCode==="500"){
                setErrorMessage(" Server Error: there seem to be an error with the server ")
                setnetworkError("block")
                setBoolenStates(prev=>{
                    return {...prev,"shouldButtonDisable":false}
                })
                
            }
            
        })
        .catch((err)=>{
            setErrorMessage(" Network Error: please check your network ")
            setnetworkError("block")
            setBoolenStates(prev=>{
                    return {...prev,"shouldButtonDisable":false}
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
        console.log(boolenStates)

    },[formData])


    return (
        <div className="LF-con">
            <p style={{display:networkError,color:"red",fontSize:"0.8em",paddingLeft:"2em"}}>{errorMessage}</p>
            <form onSubmit={handleLoginForm} >
                <div>
                    <input type="text" name="laundryName"placeholder="Laundry Name " onChange={handleInput} value={formData.laundryName}></input>
                    <p></p>
                </div>
                <div>
                     <input type="email" name="username"placeholder="Email Address" onChange={handleInput} value={formData.username}></input>
                    {boolenStates.isValidEmail ? <p></p>:<p style={{color:"red",fontSize:"0.7em", paddingLeft:"2em"}}> Enter a valid Email</p>}
                
                </div>
               
                   

                <div>
                    <input placeholder="Password" name="password" onChange={handleInput} value={formData.password}></input>
                    <p></p>
                </div>
                <div>
                    <input placeholder="ConfirmPassword" name="confirmPassword" onChange={handleInput} value={formData.confirmPassword}></input>
                    {boolenStates.isPasswordMatch ? <p></p>:<p style={{color:"red",fontSize:"0.7em", paddingLeft:"2em"}}> passwords do not match</p>}
                </div>
                <div>
                    <input placeholder="Phone Number" name="phoneNumber" onChange={handleInput} value={formData.phoneNumber}></input>
                    <p></p>
                </div>
                 <div>
                    <input placeholder="Address" name="address" onChange={handleInput} value={formData.address}></input>
                    <p></p>
                </div>
                <button id={boolenStates.isRequestSent?"btn-waiting":""} disabled={boolenStates.shouldButtonDisable} >Create Account</button>
            </form>
        </div>
    )
}

export default RegisterForm;