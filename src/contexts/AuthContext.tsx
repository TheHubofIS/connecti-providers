import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export type UserRole = "client" | "provider" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  companyName?: string;
  bio?: string;
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
  updateUser: (userData: Partial<User>) => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
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

  // Update user data
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  // Mock login function - in a real app, this would make an API call
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation - in a real app, this would be handled by the backend
      if (!email || !password) {
        throw new Error("Email et mot de passe requis");
      }
      
      // Mock user data - in a real app, this would come from the backend
      const mockUsers = [
        { 
          id: "1", 
          email: "client@example.com", 
          password: "password", 
          name: "Client User", 
          firstName: "Jean", 
          lastName: "Dupont", 
          phone: "+33612345678", 
          address: "123 Rue de Paris, 75001 Paris", 
          role: "client", 
          profileCompleted: true 
        },
        { 
          id: "2", 
          email: "provider@example.com", 
          password: "password", 
          name: "Provider User", 
          firstName: "Marie", 
          lastName: "Martin", 
          phone: "+33687654321", 
          address: "456 Avenue des Champs-Élysées, 75008 Paris", 
          companyName: "Services Pro", 
          bio: "Prestataire professionnel avec plus de 10 ans d'expérience", 
          role: "provider", 
          profileCompleted: true 
        },
        { 
          id: "3", 
          email: "admin@example.com", 
          password: "password", 
          name: "Admin User", 
          role: "admin", 
          profileCompleted: true 
        },
        {
          id: "4",
          email: "new-client@example.com",
          password: "password",
          name: "New Client",
          role: "client",
          profileCompleted: false
        },
        {
          id: "5",
          email: "new-provider@example.com",
          password: "password",
          name: "New Provider",
          role: "provider",
          profileCompleted: false
        }
      ];
      
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (!foundUser || foundUser.password !== password) {
        throw new Error("Email ou mot de passe invalide");
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
      
      // Redirect based on role and profile completion
      if (userWithoutPassword.role === "client") {
        if (!userWithoutPassword.profileCompleted) {
          navigate("/client/complete-profile");
        } else {
          navigate("/client/dashboard");
        }
      } else if (userWithoutPassword.role === "provider") {
        if (!userWithoutPassword.profileCompleted) {
          navigate("/fournisseur/complete-profile");
        } else {
          navigate("/fournisseur/dashboard");
        }
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

  // Mock forgot password function
  const forgotPassword = async (email: string): Promise<void> => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would send an email with a reset link
      console.log("Password reset email sent to:", email);
      
      // Generate a reset token (in a real app, this would be done by the backend)
      const resetToken = Math.random().toString(36).substring(2, 15);
      
      // Here we would typically send an email with the reset link
      // For this demo, we'll just log it
      console.log(`Reset link: ${window.location.origin}/reset-password?token=${resetToken}`);
      
      // No return value (void)
    } catch (error) {
      console.error("Error sending password reset:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock reset password function
  const resetPassword = async (token: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would validate the token and update the password
      console.log("Password reset with token:", token);
      console.log("New password (not shown in a real app):", password);
      
      // No return value (void)
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
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
        updateUser,
        forgotPassword,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
