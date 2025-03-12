
import { Navigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = ["client", "provider", "admin"] 
}) => {
  const { user, isAuthenticated, loading } = useAuth();

  // Show loading state if auth is still being checked
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/connexion" replace />;
  }

  // Redirect to home if user role is not allowed
  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Render children if authenticated and authorized
  return <>{children}</>;
};

export default ProtectedRoute;
