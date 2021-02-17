import {useState,useEffect,useCallback} from 'react';
import useQuery from "../CustomHooks/useQuery";
import {useHistory} from "react-router-dom";
import {FormValidationState,EmailStateIsInvalid} from "../Utilities/helper";

const formFields={
    "customers":["username","phoneNumber","address","name"],
    "services":["name","price"]
}

export default function useFormSubmit(callBack,nextPage, id=null,onMountCallBack=null) {
    const [booleanStates,setbooleanStates]=useState(FormValidationState);
    const [errorMessage,setErrorMessage]=useState("Error: Please check your network connection");
    const [networkError,setnetworkError]=useState(false)
    const history=useHistory();
    const [formData,setFormData]=useState({
        password:"",confirmPassword:"",laundryId:useQuery().get("id"),
        username:"",phoneNumber:"",address:"",name:"",customerId:"",price:""
    })
    
    
    function AddError(resp){
        if(resp.statusCode==="500"){
            setErrorMessage(" Server Error: something went wrong ")
            setnetworkError(true)
        }
        else if(resp.statusCode==="400" && resp.message==="service already exist"){
            setErrorMessage("service already exist")
            setbooleanStates(prev=> ({...prev,isServiceAvailable:false}));
            setnetworkError(true);
        }
        else if(resp.statusCode==="400"){
            setbooleanStates(prev=>({...prev,isEmailAvailable:false,isValidEmail:false}))
            setErrorMessage("Email Error: Email already taken")
        }
        
        setbooleanStates(prev=>( {...prev,"shouldButtonDisable":false,"isRequestProcessing":false}))
    }

    function RemoveErrors(){
        setbooleanStates(FormValidationState)
        setnetworkError(false);
    }
    
    const handleForm = async(e)=>{
        e.preventDefault()
        setbooleanStates(prev=> ({...prev,"isRequestProcessing":true}))//prevent btn from being clicked while request is sent
        setnetworkError(false);
        let resp=await callBack(formData)
        console.log("update response:",resp)
        if(resp.statusCode==="201" || resp.statusCode==="200" ){
            RemoveErrors();
            history.push(`/${nextPage}`)  
        }
        else{
            AddError(resp)
        }

    }

    const handleInput=(e)=>{
        console.log("form data:",formData)
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
        //validate email feild
        if(EmailStateIsInvalid(setbooleanStates,formData.username)) { isFormDataValid= false}

        //allow request submission depending on validation state
        if(isFormDataValid){
           setbooleanStates(prev=>({...prev,"shouldButtonDisable":false,"isRequestProcessing":false}))}
        else{
           setbooleanStates(prev=>({...prev,"shouldButtonDisable":true,"isRequestProcessing":false}))}
    },[formData,nextPage])

    const setData= useCallback( async() => {
        if(onMountCallBack){
            let resp=await onMountCallBack(id)
            if(resp.statusCode==="200"){
                let formFeilds=Object.keys(resp.data);
                formFeilds.forEach(formField =>{
                    setFormData(prev =>({...prev,[formField]:resp.data[formField]}));
                })
                setbooleanStates(prev=>({...prev,"shouldButtonDisable":false,"isRequestProcessing":false}));
            }
        }},
        [onMountCallBack,id],
    ) 

    useEffect(() => {
        setData();
    }, [setData])

    return [formData,booleanStates,errorMessage,networkError,handleInput,handleForm]
}
