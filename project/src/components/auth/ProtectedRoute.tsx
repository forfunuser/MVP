import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

interface ProtectedRouteProps {
  children: ReactNode;
  userType: 'student' | 'recruiter';
}

const ProtectedRoute = ({ children, userType }: ProtectedRouteProps) => {
  const { isAuthenticated, currentUser } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser?.role !== userType) {
    return <Navigate to={`/${currentUser?.role}/dashboard`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;