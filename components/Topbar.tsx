// components/Topbar.tsx
import React from 'react';

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <button onClick={toggleSidebar} className="text-xl font-bold">☰</button>
      <button className="bg-blue-700 text-white px-4 py-2 rounded">+ Post a New Job</button>
    </div>
  );
};

export default Topbar;
