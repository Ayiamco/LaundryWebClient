import React from 'react';
import PageLayout from "../../components/PageLayout/PageLayout"
import InvoiceLayout from "../../components/InvoiceLayout/InvoiceLayout";


export default function Invoice() {
    return (
        <div>
            <PageLayout activeItem="Invoice"  PageItem={InvoiceLayout}></PageLayout>
        </div>
    )
}
