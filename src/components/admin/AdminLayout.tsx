
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    if (!loading && !isAuthenticated) {
      navigate("/connexion");
    }
    // Rediriger vers l'accueil si l'utilisateur n'est pas admin
    else if (!loading && isAuthenticated && user?.role !== "admin") {
      navigate("/");
    }
  }, [isAuthenticated, loading, navigate, user]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!isAuthenticated || user?.role !== "admin") {
    return null; // Ne rien afficher pendant la redirection
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <AdminNavbar />
      
      <div className="flex flex-1">
        <AdminSidebar />
        
        <main className="flex-1 lg:pl-64 pt-6">
          <div className="container mx-auto px-4 pb-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
