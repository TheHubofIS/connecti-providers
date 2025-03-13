
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, LogIn, Mail } from "lucide-react";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      // Redirection is handled in the AuthContext after successful login
    } catch (error) {
      // Error handling is done in the AuthContext
      setIsLoading(false);
    }
  };

  // Quick login buttons
  const handleQuickLogin = async (userType: "client" | "provider" | "new-client" | "new-provider") => {
    setIsLoading(true);
    let credentials = { email: "", password: "" };

    switch (userType) {
      case "client":
        credentials = { email: "client@example.com", password: "password" };
        break;
      case "provider":
        credentials = { email: "provider@example.com", password: "password" };
        break;
      case "new-client":
        credentials = { email: "new-client@example.com", password: "password" };
        break;
      case "new-provider":
        credentials = { email: "new-provider@example.com", password: "password" };
        break;
    }

    try {
      await login(credentials.email, credentials.password);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="max-w-md w-full">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Link>
        </div>
        
        <Card className="border-border/60">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Connexion</CardTitle>
            <CardDescription className="text-center">
              Entrez vos identifiants pour accéder à votre compte
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nom@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Mot de passe oublié?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  "Connexion en cours..."
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Se connecter
                  </>
                )}
              </Button>
              
              <div className="mt-4 text-center text-sm">
                Pas encore de compte?{" "}
                <Link to="/inscription-client" className="text-primary hover:underline">
                  S'inscrire
                </Link>
              </div>

              <div className="mt-8 border-t border-border pt-4">
                <p className="text-sm text-center text-muted-foreground mb-4">
                  Connexion rapide pour démonstration:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handleQuickLogin("client")} 
                    disabled={isLoading}
                    type="button"
                    className="text-xs"
                  >
                    <Mail className="h-3 w-3 mr-2" />
                    Client (Profil complet)
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleQuickLogin("provider")} 
                    disabled={isLoading}
                    type="button"
                    className="text-xs"
                  >
                    <Mail className="h-3 w-3 mr-2" />
                    Prestataire (Profil complet)
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleQuickLogin("new-client")} 
                    disabled={isLoading}
                    type="button"
                    className="text-xs"
                  >
                    <Mail className="h-3 w-3 mr-2" />
                    Nouveau Client (Profil incomplet)
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleQuickLogin("new-provider")} 
                    disabled={isLoading}
                    type="button"
                    className="text-xs"
                  >
                    <Mail className="h-3 w-3 mr-2" />
                    Nouveau Prestataire (Profil incomplet)
                  </Button>
                </div>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
