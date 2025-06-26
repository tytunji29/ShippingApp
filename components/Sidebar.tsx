// components/Sidebar.tsx
import React from 'react';
import { FaHome, FaHistory, FaQuoteLeft, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  return (
    <div className={`h-screen bg-white shadow-lg fixed top-0 left-0 z-50 transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="flex items-center justify-between p-4">
        <span className="text-lg font-bold">{isOpen ? 'Jet Send' : 'JS'}</span>
        <button onClick={toggle} className="text-gray-500">{isOpen ? '←' : '→'}</button>
      </div>
      <ul className="space-y-4 mt-6 pl-4 pr-2 text-sm">
        <li className="flex items-center space-x-3">
          <FaHome /> {isOpen && <span>Home</span>}
        </li>
        <li className="flex items-center space-x-3">
          <FaHistory /> {isOpen && <span>Shipment History</span>}
        </li>
        <li className="flex items-center space-x-3">
          <FaQuoteLeft /> {isOpen && <span>Quotes & Bids</span>}
        </li>
        <li className="flex items-center space-x-3">
          <FaUser /> {isOpen && <span>Accepted Transporters</span>}
        </li>
        <li className="flex items-center space-x-3">
          <IoMdSettings /> {isOpen && <span>Settings</span>}
        </li>
      </ul>

      <div className="absolute bottom-4 w-full px-4">
        <div className="text-xs text-gray-600">{isOpen && "Testing Tester"}<br />tylunj2990@gmail.com</div>
        <button className="flex items-center space-x-2 text-red-500 mt-3">
          <FaSignOutAlt /> {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
