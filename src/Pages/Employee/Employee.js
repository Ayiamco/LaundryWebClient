import React from 'react'
import PageLayout from "../../components/PageLayout/PageLayout"
import EmployeeLayout from "../../components/EmployeeLayout/EmployeeLayout"
export default function Employee() {
    return (
        <div>
            <PageLayout  activeItem="Employee" PageItem={EmployeeLayout}></PageLayout>
        </div>
    )
}
