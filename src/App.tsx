
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/ui/layout";
import AdminLayout from "@/components/admin/AdminLayout";
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import NotFoundPage from "@/pages/NotFound";

// Pages admin
import Dashboard from "@/pages/admin/Dashboard";
import ContentManager from "@/pages/admin/ContentManager";
import MediaLibrary from "@/pages/admin/MediaLibrary"; 
import MenuManager from "@/pages/admin/MenuManager";
import LanguageManager from "@/pages/admin/LanguageManager";
import UsersManager from "@/pages/admin/UsersManager";
import RolesManager from "@/pages/admin/RolesManager";
import ProfilePage from "@/pages/admin/Profile";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <Router>
            <Routes>
              {/* Routes publiques */}
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/connexion" element={<LoginPage />} />
                <Route path="/inscription" element={<RegisterPage />} />
              </Route>
              
              {/* Routes admin */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="content/pages" element={<ContentManager />} />
                <Route path="media" element={<MediaLibrary />} />
                <Route path="content/menus" element={<MenuManager />} />
                <Route path="settings/languages" element={<LanguageManager />} />
                <Route path="users" element={<UsersManager />} />
                <Route path="settings/roles" element={<RolesManager />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
              
              {/* Page 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
          <Toaster />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
