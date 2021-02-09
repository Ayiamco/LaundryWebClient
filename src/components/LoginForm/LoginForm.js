import React,{useState,useEffect} from "react";
import {useHistory} from "react-router-dom";
import FormInput from "../FormInput/FormInput";
import FormBtn from "../FormBtn/FormBtn";
import loginUser from  "../../apis/LoginUser";
import {validateEmail} from "../../Utilities/helper";

const boolStatesKeys={
    isValidEmail:"isValidEmail",
    shouldButtonDisable:"shouldButtonDisable",
    isRequestProcessing:"isRequestProcessing",
    isPasswordCorrect:"isPasswordCorrect"
}

function LoginForm(){
    const history=useHistory();
    const [formData,setFormData]=useState({
        username:"",
        password:"",
    });
    const [boolStates,setboolStates]=useState({
        [boolStatesKeys.isValidEmail]:true,
        [boolStatesKeys.shouldButtonDisable]:true,
        [boolStatesKeys.isRequestProcessing]:false,
        [boolStatesKeys.isPasswordCorrect]:true
    });
    const [errorMessage,setErrorMessage]=useState("Error: Please check your network connection");
    const [networkError,setnetworkError]=useState("none");
    
    
    const handleLoginForm = async(e)=>{
        e.preventDefault();
        
        //prevent user from resubmitting form while request is being  processed
        setboolStates(prevState => {
            return{...prevState, [boolStatesKeys.isRequestProcessing]:true}
        });
        
        //authenticate user
        let res =  await loginUser(formData.username,formData.password)
        //Reset states based on server response
        if(res.statusCode==="400"){
            setErrorMessage(()=> {return res.message})
            setnetworkError( "block")
            setboolStates(prev=>{
                return {...prev,[boolStatesKeys.shouldButtonDisable]:false,
                    [boolStatesKeys.isPasswordCorrect]:false,
                    [boolStatesKeys.isRequestProcessing]:false
                }
            })
        }
        else if(res.statusCode==="500"){
            setErrorMessage("Error: Something went wrong.")
            setnetworkError("block")
            setboolStates(prev=>{
                return {...prev,[boolStatesKeys.shouldButtonDisable]:false,
                    [boolStatesKeys.isRequestProcessing]:false
                }
            })
               
        }
        else if (res.statusCode==="200"){
            console.log(res)
            localStorage.setItem("FrlTg4E21TdBpXb5vnFQj6dLLKVas1dhy7Nu22",res.data) 
            //reset states and redirect to home page 
             setboolStates(prev=>{
                return {...prev,[boolStatesKeys.shouldButtonDisable]:false,
                    [boolStatesKeys.isPasswordCorrect]:true,
                    [boolStatesKeys.isRequestProcessing]:false
                }
            })
            setnetworkError("none")
            history.push('/dashboard');
        }
        
        
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
                setboolStates(prev=>{
                    return {...prev,[boolStatesKeys.isValidEmail]:false}
                })
                isFormDataValid=false;
            }
            else if(validateEmail(formData.username)===true && formData.username!=="" && key==="username"){
                setboolStates(prev=>{
                    return {...prev,[boolStatesKeys.isValidEmail]:true}
                })
            }
            else if(formData.username===""){
                setboolStates(prev=>{
                    return {...prev,[boolStatesKeys.isValidEmail]:true}
                })
                isFormDataValid=false;
            }
            
       })

       //allow request submission depending on validation state
       if(isFormDataValid){
           setboolStates(prev=>{
                return {...prev,[boolStatesKeys.shouldButtonDisable]:false,
                    [boolStatesKeys.isRequestProcessing]:false
                }
            })
        }
       else{
           setboolStates(prev=>{
                return {...prev,[boolStatesKeys.shouldButtonDisable]:true,
                    [boolStatesKeys.isRequestProcessing]:false
                }
            })
        }
        

    },[formData])

    return (
        <div className="LF-con">
            <p style={{display:networkError,color:"red",fontSize:"0.8em",paddingLeft:"2em"}}>{errorMessage}</p>
            <form onSubmit={handleLoginForm} >

                <FormInput placeholder="Email" name="username" handleInput={handleInput}
                     value={formData.username} type="email" errorMessage="Please Enter a valid mail" isValid={boolStates.isValidEmail}/>   
                
                <FormInput placeholder="Password" name="password" handleInput={handleInput} isValid={boolStates.isPasswordCorrect}
                     value={formData.password} type="password" errorMessage="Password is Incorrect"/>
                    
                <FormBtn isRequestProcessing={boolStates.isRequestProcessing} shouldButtonDisable={boolStates.shouldButtonDisable}
                    text="Login"
                />          
            </form>
        </div>
    )
}


export default LoginForm;