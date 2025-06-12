import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuthenticator, withAuthenticator } from '@aws-amplify/ui-react';
import { Button, Flex, Heading, View, Text } from '@aws-amplify/ui-react';
import PasswordChangeModal from './PasswordChangeModal';
import '../assets/styles/backend/backend.css';

function BreadcrumbNavigation() {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.breadcrumb-dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);
  
  const getBreadcrumbItems = () => {
    const items: Array<{ label: string; path: string; isActive: boolean; isDropdown?: boolean }> = [
      { label: 'CMS', path: '/backend', isActive: false }
    ];
    
    // Always show Applications as the current section (will be dropdown)
    items.push({ label: 'Applications', path: '/backend', isActive: true, isDropdown: true });
    
    return items;
  };

  const navMenuItems = [
    { path: '/backend', label: 'Applications', icon: '📋', description: 'Manage application submissions' },
    { path: '/backend/users', label: 'Users', icon: '👥', description: 'User management' },
    { path: '/backend/settings', label: 'Settings', icon: '⚙️', description: 'System settings' },
    { path: '/backend/reports', label: 'Reports', icon: '📊', description: 'Analytics and reports' },
  ];

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <View className="breadcrumb-navigation-container">
      <Flex alignItems="center" gap="0.5rem">
        {/* Breadcrumb Items */}
        {breadcrumbItems.map((item, index) => (
          <Flex key={item.path} alignItems="center" gap="0.5rem">
            {index > 0 && (
              <Text fontSize="0.875rem" color="#6b7280">
                /
              </Text>
            )}
            {item.isDropdown ? (
              <View className="breadcrumb-dropdown-container">
                <Button
                  variation="link"
                  size="small"
                  className="breadcrumb-dropdown-toggle"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {item.label} ▼
                </Button>
                
                {isDropdownOpen && (
                  <View className="breadcrumb-dropdown-menu">
                    {navMenuItems.map((navItem) => (
                      <Link
                        key={navItem.path}
                        to={navItem.path}
                        className={`breadcrumb-dropdown-item ${
                          location.pathname === navItem.path ? 'active' : ''
                        }`}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Flex alignItems="center" gap="0.75rem">
                          <span className="dropdown-icon">{navItem.icon}</span>
                          <View>
                            <Text fontSize="0.875rem" fontWeight="500">
                              {navItem.label}
                            </Text>
                            <Text fontSize="0.75rem" color="#6b7280">
                              {navItem.description}
                            </Text>
                          </View>
                        </Flex>
                      </Link>
                    ))}
                  </View>
                )}
              </View>
            ) : item.isActive ? (
              <Text fontSize="0.875rem" fontWeight="600" color="#374151">
                {item.label}
              </Text>
            ) : (
              <Link to={item.path} className="breadcrumb-link">
                {item.label}
              </Link>
            )}
          </Flex>
        ))}
      </Flex>
    </View>
  );
}

function TopNavigation() {
  const { signOut, user } = useAuthenticator();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const location = useLocation();

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const navItems = [
    { path: '/backend', label: 'Applications', icon: '📋' },
  ];

  return (
    <View className="backend-top-nav">
      <Flex justifyContent="space-between" alignItems="center" padding="1rem" className="nav-container">
        <Heading level={4} color="white" margin="0" className="nav-title">
          Backend CMS
        </Heading>

        {/* Desktop Navigation */}
        <Flex gap="0.5rem" alignItems="center" className="desktop-nav">
          <Text color="white" fontSize="0.875rem" className="welcome-text">
            Welcome, {user?.signInDetails?.loginId || user?.username}
          </Text>
          <Button
            variation="link"
            size="small"
            onClick={toggleDarkMode}
            className="nav-button theme-toggle"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </Button>
          <Button
            variation="primary"
            size="small"
            onClick={() => setShowPasswordModal(true)}
            className="nav-button"
          >
            Change Password
          </Button>
          <Button
            variation="destructive"
            size="small"
            onClick={signOut}
            className="nav-button"
          >
            Logout
          </Button>
        </Flex>

        {/* Mobile Menu Toggle - Moved to right side */}
        <Button
          variation="link"
          size="small"
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </Button>

        {/* Mobile Navigation Menu - Positioned from top right */}
        {isMobileMenuOpen && (
          <View className="mobile-nav-menu">
            <Flex direction="column" gap="0.75rem" padding="1rem">
              <Text color="white" fontSize="0.875rem" textAlign="center" fontWeight="600">
                Welcome, {user?.signInDetails?.loginId || user?.username}
              </Text>
              
              {/* Navigation Items */}
              <View className="mobile-nav-divider" />
              
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mobile-nav-link ${
                    location.pathname === item.path ? 'active' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mobile-nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
              
              <View className="mobile-nav-divider" />
              
              <Button
                variation="link"
                size="small"
                onClick={() => {
                  toggleDarkMode();
                  setIsMobileMenuOpen(false);
                }}
                width="100%"
              >
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </Button>
              <Button
                variation="primary"
                size="small"
                onClick={() => {
                  setShowPasswordModal(true);
                  setIsMobileMenuOpen(false);
                }}
                width="100%"
              >
                Change Password
              </Button>
              <Button
                variation="destructive"
                size="small"
                onClick={signOut}
                width="100%"
              >
                Logout
              </Button>
            </Flex>
          </View>
        )}
      </Flex>

      {showPasswordModal && (
        <PasswordChangeModal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
        />
      )}
    </View>
  );
}

function Sidebar() {
  const location = useLocation();
  const navItems = [
    { path: '/backend', label: 'Applications', icon: '📋' },
  ];

  return (
    <div className="backend-sidebar">
      <div className="sidebar-header">
        <Text fontSize="0.875rem" fontWeight="bold" color="#6b7280">
          Navigation
        </Text>
      </div>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`backend-nav-link ${
            location.pathname === item.path ? 'active' : ''
          }`}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}

function BackendContent() {
  return (
    <div className="backend-layout">
      <TopNavigation />
      <div className="backend-content-area">
        <Sidebar />
        <div className="backend-main">
          <BreadcrumbNavigation />
          <div className="main-content-wrapper">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

const BackendLayout: React.FC = () => {
  return <BackendContent />;
};

export default withAuthenticator(BackendLayout, { hideSignUp: true }); 