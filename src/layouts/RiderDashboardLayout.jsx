import React from 'react'
import { Outlet } from 'react-router-dom'
import RiderSidebar from '../components/RiderSidebar'

const RiderDashboardLayout = () => {
  return (
    <div>
        <RiderSidebar />
      <Outlet />
    </div>
  )
}

export default RiderDashboardLayout
