import React from 'react';
import useFormSubmit from "../../CustomHooks/useFormSubmit";
import FormInput from "../../components/FormInput/FormInput"
import {updateCustomer,findCustomer} from "../../apis/CustomerApi";
import useQuery from "../../CustomHooks/useQuery";
import PopUp from "../../components/PopUp/PopUp";
import FormBtn from "../../components/FormBtn/FormBtn"
export default function EditCustomerLayout() {
    const [formData,booleanStates,errorMessage,networkError,
        handleInput,handleForm]= useFormSubmit(updateCustomer,"customers",useQuery().get("id"),findCustomer)

    return (
        <div className="ESCL-edit-con">
            <PopUp message={errorMessage} display="failure" shouldPopUpDisplay={networkError}></PopUp>
            <h1 >Edit Customer</h1>
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
                    <FormBtn text="Edit" isRequestProcessing={booleanStates.isRequestProcessing} shouldButtonDisable={booleanStates.shouldButtonDisable}>

                    </FormBtn>
                </div>
                
            </form>
            
        </div>
    )
}
