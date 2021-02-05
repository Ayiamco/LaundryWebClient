import React,{useEffect,useState,useRef} from 'react';
import {Link} from "react-router-dom";
import Modal from "react-modal"
import FormBtn from "../../components/FormBtn/FormBtn";
import FormInput from "../../components/FormInput/FormInput";
import {validateEmail} from "../../Utilities/helper";
import {sendPassowordResetMail} from "../../apis/ResetPassword"
import LoginHero from "../../components/LoginHero/LoginHero";
import "../../Utilities/utilities.css";
import "./ForgotPassword.css";
import AuthModal from "../../components/AuthModal/AuthModal"
Modal.setAppElement("#root")

export default function ForgotPassword() {
    const [email,setEmail]=useState("");
    const [isValidEmail,setIsValidEmail]=useState(true);
    const [isRequestProcessing,setIsRequestProcessing]=useState(false)
    const [shouldButtonDisable,setShouldButtonDisable]=useState(true)
    const [networkError,setnetworkError]=useState("none");
    const [modalIsOpen,setIsModalOpen]=useState(false);
    const [modalMessage,setModalMessage]=useState({head:"",body:""});
    const [hasDuplicate,setHasDuplicate]=useState(false);
    const roleRef= useRef();


    function handleInput(e){
        setEmail(e.target.value); 
    }

    useEffect(()=>{
        if(email===""){
            setIsValidEmail(true)
            setShouldButtonDisable(true)
        }
        else if(!validateEmail(email)){
            setIsValidEmail(false)
            setShouldButtonDisable(true)
        }
        else{
            setShouldButtonDisable(false);
            setIsValidEmail(true);
        }
    },[email,isValidEmail])

    async function handleForm(e){
        e.preventDefault()

        //prevent btn from being clicked while request is sent
        setIsRequestProcessing(true)
        
        //post user data
        let val;
        try{val=roleRef.current.value}
        catch{val=""}
        let resp= await sendPassowordResetMail(email,val)
        console.log(resp);
        if(resp.statusCode==="500"){
            setnetworkError("block");
        }
        else if (resp.statusCode==="400" && resp.message.includes("registered email")){
            setModalMessage({head:"Account not Found",body:resp.message})
            //open modal
            setIsModalOpen(true);
            setIsRequestProcessing(false);
        }
        else if (resp.statusCode==="400" && resp.message.includes("two roles")){
            setHasDuplicate(true);

        }
        else if(resp.statusCode==="200"){
            setModalMessage({head:"Password Reset Link Sent",body:resp.message})
            setIsModalOpen(true);
            setIsRequestProcessing(false);
        }
        else{ setnetworkError("block")}
        
        
    }
    return (
        <section className="pg-con">
            {/* Request status modal */}
            <Modal isOpen={modalIsOpen} onRequestClose={()=>(setIsModalOpen(false))} shouldCloseOnOverlayClick={true}
                className="modal" overlayClassName="modal-overlay" >
                    <AuthModal title={modalMessage.head} body={modalMessage.body} setIsModalOpen={setIsModalOpen}/>
            </Modal>
            <div className="pg-con-top">                
                <h2 className="pg-con-top-h1">Recover your Password</h2>
                <p style={{display:networkError,color:"red",fontSize:"0.8em",paddingLeft:"2em"}}>Some Error occurred</p>
               <form onSubmit={handleForm}>
                   {
                       hasDuplicate     ?
                       //user email is tied to more than one role  
                        <select ref={roleRef} name="roles" className="FP-select">
                            <option>Select Account Type</option>
                            <option value="1">Laundry Owner</option>
                            <option value="2">Laundry Employee</option>
                        </select>       :
                        //user is tied to just one role
                        <FormInput placeholder="Email" name="username" handleInput={handleInput}
                            value={email} type="email" errorMessage="Please Enter a valid mail"
                            isValid={isValidEmail}> 
                        </FormInput>
                     
                   }
                    <FormBtn text="Reset Password" isRequestProcessing={isRequestProcessing} shouldButtonDisable={shouldButtonDisable}/>  
                </form>
                <div className="auth-link-con">
                     <Link className="auth-link" to="/">Login</Link>
                     <Link className="auth-link" to="/register">Register</Link>
                    
                </div>
               
            </div>
            <div className="pg-con-bottom">
                
                <LoginHero></LoginHero>
            </div>
            
            
        </section>
        
    )
}
