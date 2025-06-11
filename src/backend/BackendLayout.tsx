import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import '../assets/styles/backend/backend.css';

function Sidebar() {
  const location = useLocation();
  const { signOut } = useAuthenticator();
  const navItems = [
    { path: '/backend', label: 'Dashboard' },
  ];

  return (
    <div className="backend-sidebar">
      <h2>Backend CMS</h2>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`backend-nav-link ${
            location.pathname === item.path ? 'active' : ''
          }`}
        >
          {item.label}
        </Link>
      ))}
      <button onClick={signOut} className="backend-signout-btn">
        Sign Out
      </button>
    </div>
  );
}

function BackendContent() {
  return (
    <div className="backend-layout">
      <Sidebar />
      <div className="backend-main">
        <Outlet />
      </div>
    </div>
  );
}

const BackendLayout: React.FC = () => {
  return (
    <Authenticator>
      <BackendContent />
    </Authenticator>
  );
};

export default BackendLayout; 