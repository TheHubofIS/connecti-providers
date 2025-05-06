
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, User, LogOut, Settings, Shield } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  
  const isAdmin = user?.role === "admin";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="text-2xl font-bold">Logo</span>
          </Link>

          {/* Menu pour desktop */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Accueil
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/services">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Services
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/prestataires">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Prestataires
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/comment-ca-marche">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Comment ça marche
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {isAdmin && (
                <NavigationMenuItem>
                  <Link to="/admin/dashboard">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Administration
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-0.5 leading-none">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profil" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Mon profil</span>
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin/dashboard" className="cursor-pointer">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Administration</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/parametres" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Paramètres</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link to="/inscription">S'inscrire</Link>
              </Button>
              <Button asChild>
                <Link to="/connexion">Se connecter</Link>
              </Button>
            </div>
          )}

          {/* Bouton de menu mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="container pb-4 pt-2">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="flex w-full items-center py-2 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="flex w-full items-center py-2 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/prestataires"
                  className="flex w-full items-center py-2 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Prestataires
                </Link>
              </li>
              <li>
                <Link
                  to="/comment-ca-marche"
                  className="flex w-full items-center py-2 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="flex w-full items-center py-2 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="flex w-full items-center py-2 text-primary font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Administration
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
