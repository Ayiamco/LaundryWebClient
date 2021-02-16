import React from 'react'
import PageLayout from "../../components/PageLayout/PageLayout";
import EditCustomerLayout from "../../components/EditCustomerLayout/EditCustomerLayout"

export default function UpdateCustomer() {
    return (
        <div>
            <PageLayout activeItem="Customer" PageItem={EditCustomerLayout}></PageLayout>
        </div>
    )
}
