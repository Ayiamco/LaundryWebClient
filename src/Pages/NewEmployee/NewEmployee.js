import React,{useState} from 'react'
import PageLayout from "../../components/PageLayout/PageLayout";
import AddEmployee from "../../components/AddEmployee/AddEmployee"

export default function NewEmployee() {
    
    return (
        <div>
             <PageLayout pageName="New Employee page" activeItem="NewEmployee" 
                PageItem={AddEmployee}
             />
        </div>
    )
}
