import React from 'react'
import "./DashboardCard.css";
import {toTitleCase} from "../../Utilities/helper"
const ICONS={
    'noOfEmployees':'fa fa-users-cog',
    'revenue' : 'fa fa-dollar',
    'invoiceAmount':'fa fa-dollar',
    'topCustomer':'fas fa-user-shield',
    'topService':'fas fa-lightbulb',
    'invoiceCount':'fas fa-globe',
    'customerCount':'fas fa-user-shield'
}
const DisplayNames={
    'noOfEmployees':'No of Customers',
    'revenue' : 'Total Revenue',
    'invoiceAmount':'Total Sales',
    'topCustomer':'Top Customer',
    'topService':'Service with max sales',
    'invoiceCount':'Sales Count',
    'customerCount':'Customer Count'
}
 
export default function DashboardCard({text,data}) {
    return (
        <div className="dash-card-body">
                <span className="dash-widget-icon">
                    <i className={ICONS[text]}></i>
                </span>
                <div className="dash-widget-info">
                    {text==="revenue" || text==="invoiceAmount"?
                         <h3 className="title-case">&#8358;{data} </h3> :
                          <h3 className="title-case">{data} </h3>
                    }
                   
                    <span>{DisplayNames[text]}</span>
                </div>
            </div>
    )
}
