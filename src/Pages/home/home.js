import React from 'react';
import PageLayout from "../../components/PageLayout/PageLayout"
import Dashboard from "../../components/Dashboard/Dashboard"

export default function Customers() {
    return (
        <div>
            <PageLayout activeItem="DashBoard"  PageItem={Dashboard}></PageLayout>
        </div>
    )
}