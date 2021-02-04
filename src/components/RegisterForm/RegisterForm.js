import React,{useState,useEffect} from "react";
import {useHistory} from "react-router-dom";
import {validateEmail} from "../../helper";
import FormInput from "../FormInput/FormInput";
import FormBtn from "../FormBtn/FormBtn";
import registerUser from "../../apis/registerUser";
import loginUser from "../../apis/LoginUser"



function RegisterForm(){
    const [formData,setFormData]=useState({
        laundryName:"",
        username:"",
        password:"",
        confirmPassword:"",
        phoneNumber:"",
        address:""
    })

    const [booleanStates,setbooleanStates]=useState({
        "isPasswordMatch":true,
        "isValidEmail":true,
        "shouldButtonDisable":true,
        "isRequestProcessing":false
    });
    
    const [errorMessage,setErrorMessage]=useState("Error: Please check your network connection")
    const [networkError,setnetworkError]=useState("none")
    const history=useHistory();

    function AddError(){
        setErrorMessage(" Network Error: please check your network ")
        setnetworkError("block")
        setbooleanStates(prev=>{
                return {...prev,"shouldButtonDisable":false,"isRequestProcessing":false}
            })
    }

    function RemoveErrors(){
        setbooleanStates(prev=>{
                    return {...prev,"isRequestProcessing":false,"shouldButtonDisable":false}
        });
        setnetworkError("none")
    }
    
    const handleForm = async(e)=>{
        e.preventDefault()

        //prevent btn from being clicked while request is sent
        setbooleanStates(prev=>{
            return {...prev,"isRequestProcessing":true}
        })
        
        //post user data
        let registerResp=await registerUser(formData)

        if (registerResp!=="201"){
            AddError() //return to page and display Errors
            return;
        }

        else if(registerResp.statusCode==="201"){
            //user was created successfully so login user 
            let loginResp= loginUser(formData.username,formData.password)
            if (loginResp!=="200"){

                //remove displayed validation errors and redirect to login page
                RemoveErrors();
                history.push("/login") //redirect to login page
                return;
            }
            
            else if(loginResp.statusCode==="200"){

                //remove displayed validation errors, save token state and redirect to homepage
                RemoveErrors();
                localStorage.setItem("token",loginResp.token)
                history.push("/home")
            }
               
        }

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
                setbooleanStates(prev=>{
                    return {...prev,"isPasswordMatch":false}
                })
                
                
            }
            else if(key==="confirmPassword"){
                 setbooleanStates(prev=>{
                    return {...prev,"isPasswordMatch":true}
                })
            }

            //check email validity
            if( validateEmail(formData.username)===false && formData.username!=="" && key==="username"){
                setbooleanStates(prev=>{
                    return {...prev,"isValidEmail":false}
                })
                isFormDataValid=false;
            }
            else if(validateEmail(formData.username)===true && formData.username!=="" && key==="username"){
                setbooleanStates(prev=>{
                    return {...prev,"isValidEmail":true}
                })
            }
            else if(formData.username===""){
                setbooleanStates(prev=>{
                    return {...prev,"isValidEmail":true}
                })
                isFormDataValid=false;
            }
            
       })

       //allow request submission depending on validation state
       if(isFormDataValid){
           setbooleanStates(prev=>{
                    return {...prev,"shouldButtonDisable":false}
                })
        }
       else{
           setbooleanStates(prev=>{
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
                errorMessage="Email is invalid" isValid={booleanStates.isValidEmail} value={formData.username}
                />
                <FormInput type="password" placeholder="Enter Password *" name="password" handleInput={handleInput}
                 value={formData.password}
                />
                <FormInput type="password" placeholder="Confirm Password *" name="confirmPassword" handleInput={handleInput}
                errorMessage="Password do not match" isValid={booleanStates.isPasswordMatch} value={formData.confirmPassword}
                />
                <FormInput type="text" placeholder="Address *" name="address" handleInput={handleInput}
                  value={formData.address}
                />
                <FormInput type="text" placeholder="Phone Number *" name="phoneNumber" handleInput={handleInput}
                value={formData.phoneNumber}
                />
                <FormBtn text="Register" isRequestProcessing={booleanStates.isRequestProcessing} shouldButtonDisable={booleanStates.shouldButtonDisable}>

                </FormBtn>
            </form>
        </div>
    )
}

export default RegisterForm;