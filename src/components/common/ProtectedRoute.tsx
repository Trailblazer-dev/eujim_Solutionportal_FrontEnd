import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthState } from '../../utils/auth';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles = [] }: ProtectedRouteProps) => {
  const authState = getAuthState();

  // Not authenticated - redirect to login
  if (!authState.isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Map our userType to role names used in the backend
  const roleMap: Record<string, string> = {
    graduate: 'jobseeker',
    employer: 'employer',
    admin: 'admin',
  };

  const currentRole = roleMap[authState.userType as string] || '';

  // Check if user has required role (if specified)
  if (allowedRoles.length > 0 && !allowedRoles.includes(currentRole)) {
    // Redirect based on user role
    if (currentRole === 'jobseeker') {
      return <Navigate to="/graduate" replace />;
    } else if (currentRole === 'employer') {
      return <Navigate to="/employer" replace />;
    } else if (currentRole === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      // Fallback to login if role is unknown
      return <Navigate to="/auth/login" replace />;
    }
  }

  // User is authenticated and has the required role
  return <>{children}</>;
};

export default ProtectedRoute;
