import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * ProtectedRoute component to handle route protection based on authentication and roles
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authorized
 * @param {Array} props.allowedRoles - Array of roles allowed to access this route
 * @returns {React.ReactNode} - Protected route component
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, userRole } = useSelector(state => state.user);
  const location = useLocation();

  // Check if the user is authenticated
  if (!isAuthenticated) {
    // Redirect to login page and save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If there are specific allowed roles and the user's role is not included
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect to dashboard with unauthorized message
    return <Navigate to="/dashboard" state={{ unauthorized: true }} replace />;
  }

  // If authenticated and authorized, render the children
  return children;
};

export default ProtectedRoute;
