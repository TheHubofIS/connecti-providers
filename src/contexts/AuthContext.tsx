
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export type UserRole = "client" | "provider" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profileCompleted: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  // Mock login function - in a real app, this would make an API call
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation - in a real app, this would be handled by the backend
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      // Mock user data - in a real app, this would come from the backend
      const mockUsers = [
        { id: "1", email: "client@example.com", password: "password", name: "Client User", role: "client", profileCompleted: true },
        { id: "2", email: "provider@example.com", password: "password", name: "Provider User", role: "provider", profileCompleted: true },
        { id: "3", email: "admin@example.com", password: "password", name: "Admin User", role: "admin", profileCompleted: true }
      ];
      
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (!foundUser || foundUser.password !== password) {
        throw new Error("Invalid email or password");
      }
      
      // Remove password from user data before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Set user in state and local storage
      setUser(userWithoutPassword as User);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${userWithoutPassword.name}!`,
      });
      
      // Redirect based on role
      if (userWithoutPassword.role === "client") {
        navigate("/client/dashboard");
      } else if (userWithoutPassword.role === "provider") {
        navigate("/fournisseur/dashboard");
      } else if (userWithoutPassword.role === "admin") {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: error instanceof Error ? error.message : "Une erreur s'est produite",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Mock register function - in a real app, this would make an API call
  const register = async (email: string, password: string, name: string, role: UserRole) => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation - in a real app, this would be handled by the backend
      if (!email || !password || !name) {
        throw new Error("Tous les champs sont requis");
      }
      
      // Create new user
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role,
        profileCompleted: false
      };
      
      // Set user in state and local storage
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès!",
      });
      
      // Redirect to profile completion page based on role
      if (role === "client") {
        navigate("/client/complete-profile");
      } else if (role === "provider") {
        navigate("/fournisseur/complete-profile");
      }
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: error instanceof Error ? error.message : "Une erreur s'est produite",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    });
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
