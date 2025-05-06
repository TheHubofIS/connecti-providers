
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simuler une vérification d'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simuler une requête API
        const storedUser = localStorage.getItem("user");
        
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Pour la démonstration, on accepte n'importe quelle combinaison
      const mockUser: User = {
        id: "1",
        name: email === "admin@example.com" ? "Admin" : "Utilisateur",
        email: email,
        role: email === "admin@example.com" ? "admin" : "user",
        avatar: email === "admin@example.com" ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" : undefined,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role: "user",
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const updateUser = async (userData: Partial<User>) => {
    try {
      setLoading(true);
      
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (user) {
        const updatedUser = { ...user, ...userData };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAuthenticated, 
      login, 
      logout, 
      register,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};
