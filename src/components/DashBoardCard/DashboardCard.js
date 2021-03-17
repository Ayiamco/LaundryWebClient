import React from 'react'
import "./DashboardCard.css"
const ICONS={
    'Employees':'fa fa-users-cog',
    'Invoices' : 'fa fa-diamond',
    'Revenue' : 'fa fa-dollar'
}
export default function DashboardCard({text,data}) {
    return (
        <div className="dash-card-body">
                <span className="dash-widget-icon">
                    <i className={ICONS[text]}></i>
                </span>
                <div className="dash-widget-info">
                    <h3>{data}</h3>
                    <span>{text}</span>
                </div>
            </div>
    )
}
