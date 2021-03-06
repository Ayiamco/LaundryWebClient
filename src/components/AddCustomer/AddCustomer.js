import React from "react";
import FormInput from "../FormInput/FormInput";
import FormBtn from "../FormBtn/FormBtn";
import {addCustomer} from "../../apis/CustomerApi"
import useFormSubmit from "../../CustomHooks/useFormSubmit"
import PopUp from "../PopUp/PopUp";
import "./AddCustomer.css"

export default function AddCustomer(){
    const [formData,booleanStates,errorMessage,networkError
        ,handleInput,handleForm]=useFormSubmit(addCustomer,"customers")

    return (
        <div className="AC-con">
            <PopUp message={errorMessage} display="failure" shouldPopUpDisplay={networkError}></PopUp>
            <h1>Add Customer</h1>
            <form onSubmit={handleForm} >
                
                <FormInput type="text" placeholder=" Full Name" name="name" handleInput={handleInput}
                    value={formData.name}
                />
                <FormInput type="email" placeholder="Email Address" name="username" handleInput={handleInput}
                    errorMessage={booleanStates.isEmailAvailable ? "Email is invalid": "Email already taken"} 
                    isValid={booleanStates.isValidEmail} value={formData.username}
                />
                <FormInput type="text" placeholder="Address" name="address" handleInput={handleInput}
                    value={formData.address}
                />
                <FormInput type="text" placeholder="Phone Number *" name="phoneNumber" handleInput={handleInput}
                    value={formData.phoneNumber}
                />
                
                <div id="ERF-btn-con"> 
                    <FormBtn text="Register" isRequestProcessing={booleanStates.isRequestProcessing} shouldButtonDisable={booleanStates.shouldButtonDisable}>

                    </FormBtn>
                </div>
                
            </form>
        </div>
    )
}

