import React from 'react'
import PageLayout from "../../components/PageLayout/PageLayout";
import AddInvoice from "../../components/AddInvoice/AddInvoice";

export default function NewEmployee() {
    return (
        <div>
             <PageLayout activeItem="NewInvoice" PageItem={AddInvoice}></PageLayout>
        </div>
    )
}
