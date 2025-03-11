
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, User, Mail, Lock, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Progress } from "@/components/ui/progress";

type FormStep = 1 | 2 | 3;

export default function InscriptionClient() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formStep, setFormStep] = useState<FormStep>(1);
  
  // Étape 1
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  
  // Étape 2
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Étape 3
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptNewsletter, setAcceptNewsletter] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);

  // Fonctions de validation
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password: string) => password.length >= 8;
  const passwordsMatch = password === confirmPassword;

  const isStep1Valid = firstName && lastName && email && isValidEmail(email);
  const isStep2Valid = password && confirmPassword && isValidPassword(password) && passwordsMatch;
  const isStep3Valid = country && city && phone && acceptTerms;

  // Progression
  const getProgress = () => {
    switch (formStep) {
      case 1: return 33;
      case 2: return 66;
      case 3: return 100;
      default: return 33;
    }
  };

  const nextStep = () => {
    if (formStep === 1 && isStep1Valid) {
      setFormStep(2);
    } else if (formStep === 2 && isStep2Valid) {
      setFormStep(3);
    }
  };

  const prevStep = () => {
    if (formStep === 2) {
      setFormStep(1);
    } else if (formStep === 3) {
      setFormStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep3Valid) return;
    
    setIsLoading(true);

    try {
      // Simuler une inscription
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Compte créé avec succès",
        description: "Bienvenue sur ConnectiPro! Vous pouvez maintenant vous connecter.",
      });
      
      navigate("/connexion");
    } catch (error) {
      toast({
        title: "Erreur lors de l'inscription",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (formStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Jean"
                    className="pl-10"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Dupont"
                    className="pl-10"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="jean.dupont@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {email && !isValidEmail(email) && (
                <p className="text-xs text-red-500">Veuillez entrer une adresse email valide</p>
              )}
            </div>
            
            <Button 
              type="button" 
              className="w-full" 
              onClick={nextStep}
              disabled={!isStep1Valid}
            >
              Continuer
            </Button>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {password && !isValidPassword(password) && (
                <p className="text-xs text-red-500">Le mot de passe doit contenir au moins 8 caractères</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-xs text-red-500">Les mots de passe ne correspondent pas</p>
              )}
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Votre mot de passe doit contenir :</p>
              <ul className="space-y-1">
                <li className={`text-xs flex items-center ${password.length >= 8 ? 'text-green-500' : 'text-muted-foreground'}`}>
                  <Check className="h-3 w-3 mr-1" />
                  Au moins 8 caractères
                </li>
                <li className={`text-xs flex items-center ${/[A-Z]/.test(password) ? 'text-green-500' : 'text-muted-foreground'}`}>
                  <Check className="h-3 w-3 mr-1" />
                  Au moins une majuscule
                </li>
                <li className={`text-xs flex items-center ${/[0-9]/.test(password) ? 'text-green-500' : 'text-muted-foreground'}`}>
                  <Check className="h-3 w-3 mr-1" />
                  Au moins un chiffre
                </li>
              </ul>
            </div>
            
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
              >
                Retour
              </Button>
              <Button 
                type="button" 
                onClick={nextStep}
                disabled={!isStep2Valid}
              >
                Continuer
              </Button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Pays</Label>
                <select
                  id="country"
                  className="w-full p-2 rounded-md border border-input bg-transparent"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  <option value="">Sélectionner</option>
                  <option value="france">France</option>
                  <option value="canada">Canada</option>
                  <option value="belgique">Belgique</option>
                  <option value="suisse">Suisse</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">Ville</Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Paris"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+33 6 12 34 56 78"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => 
                    setAcceptTerms(checked as boolean)
                  }
                  required
                />
                <Label htmlFor="terms" className="text-sm">
                  J'accepte les{" "}
                  <Link to="/conditions" className="text-primary hover:underline">
                    conditions d'utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link to="/confidentialite" className="text-primary hover:underline">
                    politique de confidentialité
                  </Link>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={acceptNewsletter}
                  onCheckedChange={(checked) => 
                    setAcceptNewsletter(checked as boolean)
                  }
                />
                <Label htmlFor="newsletter" className="text-sm">
                  Je souhaite recevoir des informations et offres commerciales
                </Label>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
              >
                Retour
              </Button>
              <Button 
                type="submit" 
                disabled={!isStep3Valid || isLoading}
              >
                {isLoading ? "Création du compte..." : "Créer mon compte"}
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="shadow-sm border-border/40">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Créer un compte client</CardTitle>
              <CardDescription>
                Rejoignez ConnectiPro et trouvez des prestataires qualifiés partout dans le monde
              </CardDescription>
              
              <div className="mt-4">
                <Progress value={getProgress()} className="h-2" />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span className={formStep >= 1 ? "text-primary font-medium" : ""}>Informations</span>
                  <span className={formStep >= 2 ? "text-primary font-medium" : ""}>Sécurité</span>
                  <span className={formStep >= 3 ? "text-primary font-medium" : ""}>Finalisation</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit}>
                {renderStep()}
              </form>
            </CardContent>
            
            <CardFooter className="flex flex-col items-center justify-center space-y-2">
              <div className="text-sm text-center text-muted-foreground">
                Vous avez déjà un compte?{" "}
                <Link to="/connexion" className="text-primary hover:underline">
                  Se connecter
                </Link>
              </div>
              
              <div className="text-xs text-center text-muted-foreground">
                Vous êtes un prestataire?{" "}
                <Link to="/inscription-prestataire" className="text-primary hover:underline">
                  Créer un compte prestataire
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
