import React from 'react'
import PageLayout from "../../components/PageLayout/PageLayout";
import AddCustomer from "../../components/AddCustomer/AddCustomer"
import "./NewCustomer.css"
export default function NewCustomer() {
    return (
        <div>
             <PageLayout pageName="New Customer page" activeItem="NewCustomer" PageItem={AddCustomer}></PageLayout>
        </div>
    )
}
