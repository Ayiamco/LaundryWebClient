import React from 'react'
import {updateService,findService} from "../../apis/ServiceApi";
import useQuery from "../../CustomHooks/useQuery";
import FormBtn from "../../components/FormBtn/FormBtn";
import FormInput from "../../components/FormInput/FormInput";
import useFormSubmit from "../../CustomHooks/useFormSubmit";
import PopUp from "../../components/PopUp/PopUp";

export default function EditServiceLayout() {
    const [formData,booleanStates,errorMessage,networkError,
        handleInput,handleForm]= useFormSubmit(updateService,"services",useQuery().get("id"),findService)

    return (
        <div>
            <PopUp message={errorMessage} display="failure" shouldPopUpDisplay={networkError}></PopUp>
            <h1>Edit Service</h1>
            <form onSubmit={handleForm} >
                
                <FormInput type="text" placeholder="Service name" name="name" handleInput={handleInput}
                    value={formData.name}
                />
                <FormInput type="number" placeholder="Service Price" name="price" handleInput={handleInput}
                     value={formData.price}
                />
                
                <div id="ERF-btn-con"> 
                    <FormBtn text="Edit" isRequestProcessing={booleanStates.isRequestProcessing} shouldButtonDisable={booleanStates.shouldButtonDisable}>

                    </FormBtn>
                </div>
                
            </form>
            
        </div>
    )
}