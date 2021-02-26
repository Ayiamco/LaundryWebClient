import React from 'react';
import useFormSubmit from '../../CustomHooks/useFormSubmit';
import FormBtn from "../../components/FormBtn/FormBtn";
import PopUp from "../../components/PopUp/PopUp";
import FormInput from "../../components/FormInput/FormInput";
import {addService} from "../../apis/ServiceApi"

export default function AddService() {
    const [formData,booleanStates,errorMessage,networkError,
        handleInput,handleForm]= useFormSubmit(addService,"services")
    return (
        <div className="AC-con">
            <PopUp message={errorMessage} display="failure" shouldPopUpDisplay={networkError}></PopUp>
            <h1>Add Service</h1>
            <form onSubmit={handleForm} >
                
                <FormInput type="text" placeholder=" Service Name" name="name" handleInput={handleInput}
                    value={formData.name} 
                />
                <FormInput type="number" placeholder="Price" name="price" handleInput={handleInput}
                    value={formData.price}
                />
                
                <div id="ERF-btn-con"> 
                    <FormBtn text="Add Service" isRequestProcessing={booleanStates.isRequestProcessing} shouldButtonDisable={booleanStates.shouldButtonDisable}>

                    </FormBtn>
                </div>
                
            </form>
        </div>
    )
}
