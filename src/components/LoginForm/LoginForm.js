import React,{useState,useEffect} from "react";
import {useHistory} from "react-router-dom";
import FormInput from "../FormInput/FormInput";
import FormBtn from "../FormBtn/FormBtn"


import {validateEmail} from "../RegisterForm/RegisterForm"

function LoginForm(){
    const history=useHistory();
    const [formData,setFormData]=useState({
        username:"",
        password:"",
    });
    const [boolenStates,setBoolenStates]=useState({
        "isValidEmail":true,
        "shouldButtonDisable":true,
        "isRequestSent":false,
        "isWrongPassword":false
    });
    const [errorMessage,setErrorMessage]=useState("Error: Please check your network connection");
    const [networkError,setnetworkError]=useState("none");
    

    const handleLoginForm =(e)=>{
        e.preventDefault()

        //prevent request from being sent while request is being processed
        setBoolenStates(prev=>{
            return {...prev,"isRequestSent":true}
        })
        fetch("https://localhost:44322/api/Laundry/login",{
            method:"POST",
            headers:{
                "Content-Type":'application/json; charset=utf-8',
            },
            mode:'cors',
            body: JSON.stringify({
                "username":formData.username,
                "password":formData.password,
                
            })
        }).then(res=> {
            
            return res.json()
        }).then(res=>{
            console.log(res.statusCode)
            if(res.statusCode==="400"){
                setErrorMessage(()=> {return res.message})
                setnetworkError( "block")
                setBoolenStates(prev=>{
                    return {...prev,"shouldButtonDisable":false}
                })
                 setBoolenStates(prev=>{
                    return {...prev,"isRequestSent":false}
                })
                // setBoolenStates(prev=>{
                //     return {...prev,"isWrongPassword":true}
                // })
            }
            else if(res.statusCode==="500"){
                setErrorMessage("Error: try later ")
                setnetworkError("block")
                setBoolenStates(prev=>{
                    return {...prev,"shouldButtonDisable":false}
                })
                 setBoolenStates(prev=>{
                    return {...prev,"isRequestSent":false}
                })
            }
            else{
                localStorage.setItem("token1",res.token) 
                //reset states and redirect to home page 
                setnetworkError("none")
                // setIsDisabled(false)
                history.push('/home');
            }
            
        }).catch(e=>{
            if(e==="TypeError: Failed to fetch"){
               
            }
            setnetworkError("block")
            setErrorMessage("Error: Please check your network connection")
            // setIsDisabled(false)
           
        })
        
    }

    const handleInput=(e)=>{
        setFormData(prev => {return {...prev,  [e.target.name]:e.target.value}})

    }

    useEffect( () =>{
        
        let isFormDataValid=true;
        Object.keys(formData).forEach(key=>{

           //validate that all feilds are not empty 
            if(formData[key]===""){
                isFormDataValid=false;
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
        <div className="LF-con">
            <p style={{display:networkError,color:"red",fontSize:"0.8em",paddingLeft:"2em"}}>{errorMessage}</p>
            <form onSubmit={handleLoginForm} >

                <FormInput placeholder="Email" name="username" handleInput={handleInput}
                     value={formData.password} type="email" errorMessage="Please Enter a valid mail" isValid={boolenStates.isValidEmail}/>   
                
                <FormInput placeholder="Password" name="password" handleInput={handleInput} isValid={boolenStates.isWrongPassword}
                     value={formData.password} type="password" errorMessage="Password is Incorrect"/>
                    
                <FormBtn isRequestSent={boolenStates.isRequestSent} shouldButtonDisable={boolenStates.shouldButtonDisable}
                    text="Login"
                />
                
            </form>
        </div>
    )
}


export default LoginForm;