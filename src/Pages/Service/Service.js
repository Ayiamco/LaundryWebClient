import React from 'react';
import PageLayout from "../../components/PageLayout/PageLayout";
import ServiceLayout from "../../components/ServiceLayout/ServiceLayout";

export default function Services() {
    return (
        <div>
            <PageLayout PageItem={ServiceLayout} activeItem="Service"></PageLayout>
        </div>
    )
}
