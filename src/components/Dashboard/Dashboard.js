import React from 'react'
import DashboardCard from '../DashBoardCard/DashboardCard'

export default function Dashboard() {
    return (
        <div>
            <h3>Welcomme Admin!</h3>
            <DashboardCard text="Employees" data={2}></DashboardCard>
            <DashboardCard text="Employees" data={2}></DashboardCard>
            <DashboardCard text="Employees" data={2}></DashboardCard>
        </div>
    
    )
}
