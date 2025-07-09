// components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children, showSidebar = true}) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar />

      {/* Sidebar + Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {showSidebar && <Sidebar />}

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-auto bg-base-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
