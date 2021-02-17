import React from 'react';
import PageLayout from "../../components/PageLayout/PageLayout";
import EditServiceLayout from "../../components/EditServiceLayout/EditServiceLayout"

export default function EditService() {
    return (
        <div>
            <PageLayout activeItem="Service" PageItem={EditServiceLayout}></PageLayout>
        </div>
    )
}
