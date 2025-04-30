
import { Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppointmentProvider } from './contexts/AppointmentContext';
import { useEffect } from 'react';

import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Prestataires from '@/pages/Prestataires';
import ProviderDetail from '@/pages/ProviderDetail';
import Services from '@/pages/Services';
import ServiceDetail from '@/pages/ServiceDetail';
import CommentCaMarche from '@/pages/CommentCaMarche';
import Contact from '@/pages/Contact';
import Blog from '@/pages/Blog';
import BlogArticle from '@/pages/BlogArticle';
import FAQ from '@/pages/FAQ';
import Categories from '@/pages/Categories';

// Login and Registration routes
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import InscriptionClient from '@/pages/InscriptionClient';
import InscriptionPrestataire from '@/pages/InscriptionPrestataire';
import Connexion from '@/pages/Connexion';
import ForgotPassword from '@/pages/ForgotPassword';

// Protected routes
import ClientDashboard from '@/pages/client/Dashboard';
import ClientProfile from '@/pages/client/Profile';
import ClientAppointments from '@/pages/client/Appointments';
import ClientMessages from '@/pages/client/Messages';
import ClientCompleteProfile from '@/pages/client/CompleteProfile';

// Provider routes
import ProviderDashboard from '@/pages/fournisseur/Dashboard';
import ProviderProfile from '@/pages/fournisseur/Profile';
import ProviderAppointments from '@/pages/fournisseur/Appointments';
import ProviderMessages from '@/pages/fournisseur/Messages';
import ProviderCompleteProfile from '@/pages/fournisseur/CompleteProfile';

// Admin routes
import AdminDashboard from '@/pages/admin/Dashboard';

// Static routes
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Support from '@/pages/Support';
import ProtectedRoute from '@/components/ProtectedRoute';

// Create a client for React Query
const queryClient = new QueryClient();

// ScrollToTop component to manage scrolling on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
          <ScrollToTop />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/prestataires" element={<Prestataires />} />
            <Route path="/prestataires/:providerId" element={<ProviderDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/comment-ca-marche" element={<CommentCaMarche />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:articleId" element={<BlogArticle />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/categories" element={<Categories />} />
            
            {/* Authentication routes */}
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/login" element={<Login />} />
            <Route path="/inscription" element={<Register />} />
            <Route path="/inscription-client" element={<InscriptionClient />} />
            <Route path="/inscription-prestataire" element={<InscriptionPrestataire />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Client routes - wrapped with AppointmentProvider */}
            <Route element={<AppointmentProvider><div className="w-full"><Routes>
              <Route path="/client/dashboard" element={
                <ProtectedRoute allowedRoles={["client", "admin"]}>
                  <ClientDashboard />
                </ProtectedRoute>
              } />
              <Route path="/client/profile" element={
                <ProtectedRoute allowedRoles={["client", "admin"]}>
                  <ClientProfile />
                </ProtectedRoute>
              } />
              <Route path="/client/appointments" element={
                <ProtectedRoute allowedRoles={["client", "admin"]}>
                  <ClientAppointments />
                </ProtectedRoute>
              } />
              <Route path="/client/messages" element={
                <ProtectedRoute allowedRoles={["client", "admin"]}>
                  <ClientMessages />
                </ProtectedRoute>
              } />
              <Route path="/client/complete-profile" element={
                <ProtectedRoute allowedRoles={["client", "admin"]}>
                  <ClientCompleteProfile />
                </ProtectedRoute>
              } />
            </Routes></div></AppointmentProvider>} />
            
            {/* Provider routes - also wrapped with AppointmentProvider */}
            <Route element={<AppointmentProvider><div className="w-full"><Routes>
              <Route path="/fournisseur/dashboard" element={
                <ProtectedRoute allowedRoles={["provider", "admin"]}>
                  <ProviderDashboard />
                </ProtectedRoute>
              } />
              <Route path="/fournisseur/profile" element={
                <ProtectedRoute allowedRoles={["provider", "admin"]}>
                  <ProviderProfile />
                </ProtectedRoute>
              } />
              <Route path="/fournisseur/appointments" element={
                <ProtectedRoute allowedRoles={["provider", "admin"]}>
                  <ProviderAppointments />
                </ProtectedRoute>
              } />
              <Route path="/fournisseur/messages" element={
                <ProtectedRoute allowedRoles={["provider", "admin"]}>
                  <ProviderMessages />
                </ProtectedRoute>
              } />
              <Route path="/fournisseur/complete-profile" element={
                <ProtectedRoute allowedRoles={["provider", "admin"]}>
                  <ProviderCompleteProfile />
                </ProtectedRoute>
              } />
            </Routes></div></AppointmentProvider>} />
            
            {/* Admin routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* Static routes */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/support" element={<Support />} />
            
            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
