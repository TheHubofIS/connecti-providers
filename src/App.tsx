
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import CommentCaMarche from "./pages/CommentCaMarche";
import Prestataires from "./pages/Prestataires";
import Connexion from "./pages/Connexion";
import InscriptionClient from "./pages/InscriptionClient";
import InscriptionPrestataire from "./pages/InscriptionPrestataire";
import { AuthProvider } from "./contexts/AuthContext";
import { MessageProvider } from "./contexts/MessageContext";
import { AppointmentProvider } from "./contexts/AppointmentContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ClientDashboard from "./pages/client/Dashboard";
import FournisseurDashboard from "./pages/fournisseur/Dashboard";
import ClientProfile from "./pages/client/Profile";
import FournisseurProfile from "./pages/fournisseur/Profile";
import ClientMessages from "./pages/client/Messages";
import FournisseurMessages from "./pages/fournisseur/Messages";
import ClientAppointments from "./pages/client/Appointments";
import FournisseurAppointments from "./pages/fournisseur/Appointments";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/services" element={<Services />} />
    <Route path="/comment-ca-marche" element={<CommentCaMarche />} />
    <Route path="/prestataires" element={<Prestataires />} />
    <Route path="/connexion" element={<Connexion />} />
    <Route path="/inscription-client" element={<InscriptionClient />} />
    <Route path="/inscription-prestataire" element={<InscriptionPrestataire />} />
    
    {/* Client routes */}
    <Route path="/client/dashboard" element={
      <ProtectedRoute allowedRoles={["client"]}>
        <ClientDashboard />
      </ProtectedRoute>
    } />
    <Route path="/client/profile" element={
      <ProtectedRoute allowedRoles={["client"]}>
        <ClientProfile />
      </ProtectedRoute>
    } />
    <Route path="/client/messages" element={
      <ProtectedRoute allowedRoles={["client"]}>
        <ClientMessages />
      </ProtectedRoute>
    } />
    <Route path="/client/appointments" element={
      <ProtectedRoute allowedRoles={["client"]}>
        <ClientAppointments />
      </ProtectedRoute>
    } />
    
    {/* Provider routes */}
    <Route path="/fournisseur/dashboard" element={
      <ProtectedRoute allowedRoles={["provider"]}>
        <FournisseurDashboard />
      </ProtectedRoute>
    } />
    <Route path="/fournisseur/profile" element={
      <ProtectedRoute allowedRoles={["provider"]}>
        <FournisseurProfile />
      </ProtectedRoute>
    } />
    <Route path="/fournisseur/messages" element={
      <ProtectedRoute allowedRoles={["provider"]}>
        <FournisseurMessages />
      </ProtectedRoute>
    } />
    <Route path="/fournisseur/appointments" element={
      <ProtectedRoute allowedRoles={["provider"]}>
        <FournisseurAppointments />
      </ProtectedRoute>
    } />
    
    {/* Admin routes */}
    <Route path="/admin/dashboard" element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <div>Admin Dashboard</div>
      </ProtectedRoute>
    } />
    
    {/* Catch-all route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <MessageProvider>
            <AppointmentProvider>
              <AppRoutes />
            </AppointmentProvider>
          </MessageProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
