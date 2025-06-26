// components/Layout.tsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`flex-1 min-h-screen ml-${isSidebarOpen ? '64' : '16'} transition-all`}>
        <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
