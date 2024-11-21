import React from 'react'
import { Outlet } from 'react-router-dom'
import RiderSidebar from '../components/RiderSidebar'
import RiderMap from '../components/RiderMap'

const RiderDashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <RiderSidebar />
      <div className="flex-1 relative">
        <RiderMap />
        <div className="absolute inset-0 pointer-events-none">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default RiderDashboardLayout
