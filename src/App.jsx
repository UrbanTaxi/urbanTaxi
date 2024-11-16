import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import RiderDashboardLayout from './layouts/RiderDashboardLayout'
import RiderProfile from './pages/dashboard/rider/RiderProfile'
import RiderDashboard from './pages/dashboard/rider'
import DriverDashboardLayout from './layouts/DriverDashboardLayout'
import DriverProfile from './pages/dashboard/driver/DriverProfile'
import DriverDashboard from './pages/dashboard/driver'
import DriverSidebar from './components/DriverSidebar'
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card


const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [{
        index: true,
        element: <Home />
      }, 
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'driversidebar',
        element: <DriverSidebar/>
      }
      ]
    },


    {
      path: "/dashboard/rider",
      element: <RiderDashboardLayout />,
      children: [
        {
          index: true,
          element: <RiderDashboard />,

        },
        {
          path:"profile",
          element:<RiderProfile />
        }
      ],
    },
    {
      path: "/dashboard/driver",
      element: <DriverDashboardLayout/>,
      children: [
        {
          index: true,
          element: <DriverDashboard/>,

        },
        {
          path:"profile",
          element:<DriverProfile />
        }
      ],
    }
  ])

  return <RouterProvider router={router} />
}

export default App
