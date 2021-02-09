import React from 'react';
import PageLayout from "../../components/PageLayout/PageLayout"
import CustomerLayout from "../../components/CustomerLayout/CustomerLayout";

export default function Customer() {
    return (
        <div>
            <PageLayout activeItem="Customer" PageItem={CustomerLayout}></PageLayout>
        </div>
    )
}
