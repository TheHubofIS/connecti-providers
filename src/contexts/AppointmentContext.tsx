
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  providerId: string;
  providerName: string;
  clientId: string;
  clientName: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AppointmentContextType {
  appointments: Appointment[];
  loading: boolean;
  getAppointments: () => Promise<void>;
  getAppointmentById: (id: string) => Appointment | undefined;
  createAppointment: (appointmentData: Omit<Appointment, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updateAppointment: (id: string, updates: Partial<Appointment>) => Promise<void>;
  cancelAppointment: (id: string) => Promise<void>;
  confirmAppointment: (id: string) => Promise<void>;
  completeAppointment: (id: string) => Promise<void>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error("useAppointments must be used within an AppointmentProvider");
  }
  return context;
};

// Mock data - would be replaced with API calls in a real app
const mockAppointments: Appointment[] = [
  {
    id: "app1",
    providerId: "2",
    providerName: "Provider User",
    clientId: "1",
    clientName: "Client User",
    title: "Consultation initiale",
    description: "Première réunion pour discuter du projet",
    date: new Date(2023, 6, 20),
    startTime: "10:00",
    endTime: "11:00",
    location: "Visioconférence",
    status: "confirmed",
    notes: "Préparation requise: document de présentation du projet",
    createdAt: new Date(2023, 6, 15),
    updatedAt: new Date(2023, 6, 15)
  },
  {
    id: "app2",
    providerId: "2",
    providerName: "Provider User",
    clientId: "1",
    clientName: "Client User",
    title: "Suivi du projet",
    description: "Point d'avancement sur le projet en cours",
    date: new Date(2023, 6, 25),
    startTime: "14:00",
    endTime: "15:00",
    location: "Bureau du client",
    status: "pending",
    createdAt: new Date(2023, 6, 16),
    updatedAt: new Date(2023, 6, 16)
  }
];

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  // Get appointments for the current user
  const getAppointments = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter appointments that involve the current user
      const userAppointments = mockAppointments.filter(
        app => (user.role === "client" && app.clientId === user.id) || 
               (user.role === "provider" && app.providerId === user.id)
      );
      
      setAppointments(userAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast({
        title: "Erreur",
        description: "Impossible de récupérer vos rendez-vous.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get a specific appointment by ID
  const getAppointmentById = (id: string) => {
    return appointments.find(app => app.id === id);
  };

  // Create a new appointment
  const createAppointment = async (appointmentData: Omit<Appointment, "id" | "createdAt" | "updatedAt">) => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new appointment
      const newAppointment: Appointment = {
        ...appointmentData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setAppointments(prev => [...prev, newAppointment]);
      
      toast({
        title: "Rendez-vous créé",
        description: "Votre rendez-vous a été créé avec succès.",
      });
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le rendez-vous.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Update an existing appointment
  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update appointment
      const updatedAppointments = appointments.map(app => {
        if (app.id === id) {
          return {
            ...app,
            ...updates,
            updatedAt: new Date()
          };
        }
        return app;
      });
      
      setAppointments(updatedAppointments);
      
      toast({
        title: "Rendez-vous mis à jour",
        description: "Le rendez-vous a été mis à jour avec succès.",
      });
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le rendez-vous.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Cancel an appointment
  const cancelAppointment = async (id: string) => {
    return updateAppointment(id, { status: "cancelled" });
  };

  // Confirm an appointment
  const confirmAppointment = async (id: string) => {
    return updateAppointment(id, { status: "confirmed" });
  };

  // Mark an appointment as completed
  const completeAppointment = async (id: string) => {
    return updateAppointment(id, { status: "completed" });
  };

  // Load appointments when user changes
  useEffect(() => {
    if (user) {
      getAppointments();
    } else {
      setAppointments([]);
    }
  }, [user]);

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        loading,
        getAppointments,
        getAppointmentById,
        createAppointment,
        updateAppointment,
        cancelAppointment,
        confirmAppointment,
        completeAppointment
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
