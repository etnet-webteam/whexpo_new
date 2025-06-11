import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authStatus } = useAuthenticator();
  const location = useLocation();

  if (authStatus !== 'authenticated') {
    // Redirect to the backend route, which will show the Amplify Authenticator
    return <Navigate to="/backend" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 