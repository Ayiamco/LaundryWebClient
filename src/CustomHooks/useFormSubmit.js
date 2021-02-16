import {useState,useEffect,useCallback} from 'react';
import useQuery from "../CustomHooks/useQuery";
import {useHistory} from "react-router-dom";
import {FormValidationState,EmailStateIsInvalid} from "../Utilities/helper";

const formFields={
    "customers":["username","phoneNumber","address","name"]
}

export default function useFormSubmit(callBack,nextPage, id=null,onMountCallBack=null) {
    const [booleanStates,setbooleanStates]=useState(FormValidationState);
    const [errorMessage,setErrorMessage]=useState("Error: Please check your network connection");
    const [networkError,setnetworkError]=useState(false)
    const history=useHistory();
    const [formData,setFormData]=useState({
        password:"",confirmPassword:"",laundryId:useQuery().get("id"),
        username:"",phoneNumber:"",address:"",name:"",customerId:""
    })
    
    
    function AddError(resp){
        console.log(resp)
        if(resp.statusCode==="500"){
            setErrorMessage(" Network Error: please check your network ")
            setnetworkError(true)
        }
        else if(resp.statusCode==="400"){
            console.log("hjkhjk")
            setbooleanStates(prev=>({...prev,isEmailAvailable:false,isValidEmail:false}))
            setErrorMessage("Email Error: Email already taken")
        }
        setbooleanStates(prev=>( {...prev,"shouldButtonDisable":false,"isRequestProcessing":false}))
    }

    function RemoveErrors(){
        setbooleanStates(FormValidationState)
        setnetworkError(false);
        setFormData({password:"",confirmPassword:"",laundryId:"",
        username:"",phoneNumber:"",address:"",name:"",customerId:""});
    }
    
    const handleForm = async(e)=>{
        e.preventDefault()
        setbooleanStates(prev=> ({...prev,"isRequestProcessing":true}))//prevent btn from being clicked while request is sent
        setnetworkError(false);
        let resp=await callBack(formData)
    
        if(resp.statusCode==="201" || resp.statusCode==="200" ){
            console.log("succeful")
            RemoveErrors();
            history.push(`/${nextPage}`)  
        }
        else{
            AddError(resp)
        }

    }

    const handleInput=(e)=>{
        setFormData(prev=>{
           return {
               ...prev, [e.target.name]: e.target.value
           }
    })}

    
    useEffect( () =>{
        let isFormDataValid=true;
        //validate that all feilds are not empty
        formFields[nextPage].forEach(key=>{
            if( !formData[key]){
                 isFormDataValid=false 
            }
        })
        //check email validity
        if(EmailStateIsInvalid(setbooleanStates,formData.username)) { isFormDataValid= false}
        //allow request submission depending on validation state
        if(isFormDataValid){
           setbooleanStates(prev=>({...prev,"shouldButtonDisable":false}))}
        else{
           setbooleanStates(prev=>({...prev,"shouldButtonDisable":true}))}
    },[formData,nextPage])

    const setData= useCallback( async() => {
        console.log("setData...");
        if(onMountCallBack){
            let resp=await onMountCallBack(id)
            if(resp.statusCode==="200"){
                setFormData(resp.data) 
            }
        }},
        [onMountCallBack,id],
    ) 

    useEffect(() => {
        setData();
    }, [setData])

    return [formData,booleanStates,errorMessage,networkError,handleInput,handleForm]
}
