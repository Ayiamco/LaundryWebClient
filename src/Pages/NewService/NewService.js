import React from 'react'
import PageLayout from "../../components/PageLayout/PageLayout";
import AddService from "../../components/AddService/AddService"

export default function NewService() {
    return (
        <div>
             <PageLayout pageName="New Service page" activeItem="NewService" PageItem={AddService}></PageLayout>
        </div>
    )
}
