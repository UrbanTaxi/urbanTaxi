// DriverDashboardLayout.jsx
import React from 'react';

const DriverDashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 text-white p-4">
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Ride Requests</li>
            <li>Earnings</li>
            <li>Account Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-6 bg-gray-100">
        {/* Header */}
        <header className="flex justify-between items-center bg-white p-4 shadow-md">
          <h1 className="text-lg font-semibold">Driver Dashboard</h1>
          {/* Add more header elements like notifications, profile, etc. */}
        </header>

        {/* Page-specific content */}
        <div className="mt-4">{children}</div>
      </main>
    </div>
  );
};

export default DriverDashboardLayout;
