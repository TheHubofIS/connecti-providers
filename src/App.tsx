
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from './contexts/LanguageContext';

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

// Create a client for React Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <BrowserRouter>
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
            <Route path="/connexion" element={<Login />} />
            <Route path="/inscription" element={<Register />} />
            <Route path="/inscription-client" element={<InscriptionClient />} />
            <Route path="/inscription-prestataire" element={<InscriptionPrestataire />} />
            
            {/* Client routes */}
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/client/profile" element={<ClientProfile />} />
            <Route path="/client/appointments" element={<ClientAppointments />} />
            <Route path="/client/messages" element={<ClientMessages />} />
            <Route path="/client/complete-profile" element={<ClientCompleteProfile />} />
            
            {/* Provider routes */}
            <Route path="/fournisseur/dashboard" element={<ProviderDashboard />} />
            <Route path="/fournisseur/profile" element={<ProviderProfile />} />
            <Route path="/fournisseur/appointments" element={<ProviderAppointments />} />
            <Route path="/fournisseur/messages" element={<ProviderMessages />} />
            <Route path="/fournisseur/complete-profile" element={<ProviderCompleteProfile />} />
            
            {/* Admin routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            
            {/* Static routes */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/support" element={<Support />} />
            
            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          <Toaster />
        </BrowserRouter>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
