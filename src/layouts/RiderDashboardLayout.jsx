import React from 'react'
import { Outlet } from 'react-router-dom'
import RiderSidebar from '../components/RiderSidebar'
// import Map from '../components/RiderMap'
import Map from '../components/Map'

const RiderDashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <RiderSidebar />
      <div className="flex-1 relative">
        <Map />
        <div className="absolute inset-0 pointer-events-none">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default RiderDashboardLayout
