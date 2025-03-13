
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Prestataires", href: "/prestataires" },
  { name: "Comment ça marche", href: "/comment-ca-marche" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

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
          <Link
            to="/"
            className="text-2xl font-bold text-primary transition-all duration-300"
          >
            Connecti<span className="text-foreground">Pro</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-8">
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

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to={user?.role === "provider" ? "/fournisseur/dashboard" : "/client/dashboard"}
                    className="px-4 py-2 rounded-full border border-primary/20 text-primary hover:bg-primary/5 transition-all"
                  >
                    Tableau de bord
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-all"
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/connexion"
                    className="px-4 py-2 rounded-full border border-primary/20 text-primary hover:bg-primary/5 transition-all"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/inscription-client"
                    className="px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-all"
                  >
                    Inscription
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 lg:hidden">
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
          {navLinks.map((link) => (
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
                  Tableau de bord
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="py-2 px-4 text-center rounded-full bg-primary text-white hover:bg-primary/90 transition-all"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/connexion"
                  className="py-2 px-4 text-center rounded-full border border-primary/20 text-primary hover:bg-primary/5 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Connexion
                </Link>
                <Link
                  to="/inscription-client"
                  className="py-2 px-4 text-center rounded-full bg-primary text-white hover:bg-primary/90 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
