import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

function Sidebar() {
  const location = useLocation();
  const { signOut } = useAuthenticator();
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/backend', label: 'Backend CMS' },
    { path: '/2025/form', label: '2025 Form' },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 space-y-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`block px-4 py-2 rounded hover:bg-gray-700 ${
            location.pathname === item.path ? 'bg-gray-700' : ''
          }`}
        >
          {item.label}
        </Link>
      ))}
      <button
        onClick={signOut}
        className="block w-full mt-8 px-4 py-2 rounded bg-red-600 hover:bg-red-700"
      >
        Sign Out
      </button>
    </div>
  );
}

const BackendLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default BackendLayout; 