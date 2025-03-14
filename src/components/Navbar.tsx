
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, Home, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { translate } = useLanguage();

  const navLinks = [
    { name: translate('home'), href: "/" },
    { name: translate('services'), href: "/services" },
    { name: translate('providers'), href: "/prestataires" },
    { name: translate('howItWorks'), href: "/comment-ca-marche" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Check if we are on a dashboard or auth page to show back button
  const isDashboardPage = location.pathname.includes('/client/') || 
                          location.pathname.includes('/fournisseur/') || 
                          location.pathname.includes('/admin/');
  
  const isAuthPage = location.pathname.includes('/connexion') || 
                     location.pathname.includes('/inscription');
  
  const showBackButton = isDashboardPage || isAuthPage;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 glass shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {showBackButton ? (
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate(-1)} 
                className="mr-4"
                aria-label={translate('back')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> {translate('back')}
              </Button>
              <Link
                to="/"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                <Home className="h-4 w-4 mr-2" />
                {translate('home')}
              </Link>
            </div>
          ) : (
            <Link
              to="/"
              className="text-2xl font-bold text-primary transition-all duration-300"
            >
              {translate('siteName')}
            </Link>
          )}

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {!isDashboardPage && (
              <div className="flex items-center space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="font-medium text-foreground/80 hover:text-primary transition-colors duration-200 py-1 px-2 rounded-md"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <ThemeToggle />
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to={user?.role === "provider" ? "/fournisseur/dashboard" : "/client/dashboard"}
                    className="px-4 py-2 rounded-full border border-primary/20 text-primary hover:bg-primary/5 transition-all"
                  >
                    {translate('dashboard')}
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-all"
                  >
                    {translate('logout')}
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/connexion"
                    className="px-4 py-2 rounded-full border border-primary/20 text-primary hover:bg-primary/5 transition-all"
                  >
                    {translate('login')}
                  </Link>
                  <Link
                    to="/inscription-client"
                    className="px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-all"
                  >
                    {translate('register')}
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 lg:hidden">
            <LanguageSelector />
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground rounded-md hover:bg-primary/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile navigation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] py-4" : "max-h-0"
        } glass shadow-sm`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          {!isDashboardPage && navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="py-2 px-4 font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-primary/5"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col space-y-3 pt-4 border-t border-border">
            {isAuthenticated ? (
              <>
                <Link
                  to={user?.role === "provider" ? "/fournisseur/dashboard" : "/client/dashboard"}
                  className="py-2 px-4 text-center rounded-full border border-primary/20 text-primary hover:bg-primary/5 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {translate('dashboard')}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="py-2 px-4 text-center rounded-full bg-primary text-white hover:bg-primary/90 transition-all"
                >
                  {translate('logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/connexion"
                  className="py-2 px-4 text-center rounded-full border border-primary/20 text-primary hover:bg-primary/5 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {translate('login')}
                </Link>
                <Link
                  to="/inscription-client"
                  className="py-2 px-4 text-center rounded-full bg-primary text-white hover:bg-primary/90 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {translate('register')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
