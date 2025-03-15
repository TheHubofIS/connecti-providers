
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import CommentCaMarche from "./pages/CommentCaMarche";
import Prestataires from "./pages/Prestataires";
import ProviderDetail from "./pages/ProviderDetail";
import Connexion from "./pages/Connexion";
import InscriptionClient from "./pages/InscriptionClient";
import InscriptionPrestataire from "./pages/InscriptionPrestataire";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import Support from "./pages/Support";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import { AuthProvider } from "./contexts/AuthContext";
import { MessageProvider } from "./contexts/MessageContext";
import { AppointmentProvider } from "./contexts/AppointmentContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ClientDashboard from "./pages/client/Dashboard";
import FournisseurDashboard from "./pages/fournisseur/Dashboard";
import ClientProfile from "./pages/client/Profile";
import FournisseurProfile from "./pages/fournisseur/Profile";
import ClientMessages from "./pages/client/Messages";
import FournisseurMessages from "./pages/fournisseur/Messages";
import ClientAppointments from "./pages/client/Appointments";
import FournisseurAppointments from "./pages/fournisseur/Appointments";
import ClientCompleteProfile from "./pages/client/CompleteProfile";
import FournisseurCompleteProfile from "./pages/fournisseur/CompleteProfile";
import ServiceDetail from "./pages/ServiceDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

// Wrapper component for adding layout to routes that need it
const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <div className="min-h-screen pt-24 pb-16">
      {children}
    </div>
    <Footer />
  </>
);

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LayoutWrapper><Index /></LayoutWrapper>} />
    <Route path="/services" element={<LayoutWrapper><Services /></LayoutWrapper>} />
    <Route path="/services/:categoryId" element={<LayoutWrapper><ServiceDetail /></LayoutWrapper>} />
    <Route path="/comment-ca-marche" element={<LayoutWrapper><CommentCaMarche /></LayoutWrapper>} />
    <Route path="/prestataires" element={<LayoutWrapper><Prestataires /></LayoutWrapper>} />
    <Route path="/prestataires/:providerId" element={<LayoutWrapper><ProviderDetail /></LayoutWrapper>} />
    <Route path="/connexion" element={<Connexion />} />
    <Route path="/inscription-client" element={<InscriptionClient />} />
    <Route path="/inscription-prestataire" element={<InscriptionPrestataire />} />
    <Route path="/inscription" element={<Register />} />
    {/* Redirect for query parameters */}
    <Route path="/register" element={<Navigate to="/inscription" replace />} />
    <Route path="/contact" element={<LayoutWrapper><Contact /></LayoutWrapper>} />
    <Route path="/blog" element={<LayoutWrapper><Blog /></LayoutWrapper>} />
    <Route path="/faq" element={<LayoutWrapper><FAQ /></LayoutWrapper>} />
    <Route path="/support" element={<LayoutWrapper><Support /></LayoutWrapper>} />
    <Route path="/confidentialite" element={<LayoutWrapper><Privacy /></LayoutWrapper>} />
    <Route path="/conditions" element={<LayoutWrapper><Terms /></LayoutWrapper>} />
    
    {/* Client routes */}
    <Route path="/client/dashboard" element={
      <ProtectedRoute allowedRoles={["client"]}>
        <LayoutWrapper><ClientDashboard /></LayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/client/profile" element={
      <ProtectedRoute allowedRoles={["client"]}>
        <LayoutWrapper><ClientProfile /></LayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/client/messages" element={
      <ProtectedRoute allowedRoles={["client"]}>
        <LayoutWrapper><ClientMessages /></LayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/client/appointments" element={
      <ProtectedRoute allowedRoles={["client"]}>
        <LayoutWrapper><ClientAppointments /></LayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/client/complete-profile" element={
      <ProtectedRoute allowedRoles={["client"]}>
        <ClientCompleteProfile />
      </ProtectedRoute>
    } />
    
    {/* Provider routes */}
    <Route path="/fournisseur/dashboard" element={
      <ProtectedRoute allowedRoles={["provider"]}>
        <LayoutWrapper><FournisseurDashboard /></LayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/fournisseur/profile" element={
      <ProtectedRoute allowedRoles={["provider"]}>
        <LayoutWrapper><FournisseurProfile /></LayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/fournisseur/messages" element={
      <ProtectedRoute allowedRoles={["provider"]}>
        <LayoutWrapper><FournisseurMessages /></LayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/fournisseur/appointments" element={
      <ProtectedRoute allowedRoles={["provider"]}>
        <LayoutWrapper><FournisseurAppointments /></LayoutWrapper>
      </ProtectedRoute>
    } />
    <Route path="/fournisseur/complete-profile" element={
      <ProtectedRoute allowedRoles={["provider"]}>
        <FournisseurCompleteProfile />
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
        <LanguageProvider>
          <AuthProvider>
            <MessageProvider>
              <AppointmentProvider>
                <AppRoutes />
              </AppointmentProvider>
            </MessageProvider>
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
