
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 8) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setIsSubmitted(true);
      
      // In a real app, this would call an API to reset the password using the token
      console.log("Password reset with token:", token);
    } catch (error) {
      console.error("Error resetting password:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer plus tard.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Content to show after form submission
  const successContent = (
    <div className="max-w-md w-full space-y-6">
      <div className="text-center">
        <h2 className="mt-6 text-2xl font-bold">Mot de passe réinitialisé</h2>
        <p className="mt-2 text-muted-foreground">
          Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
        </p>
      </div>
      <Link to="/connexion" className="block">
        <Button type="button" className="w-full">
          Se connecter
        </Button>
      </Link>
    </div>
  );
  
  // Form content
  const formContent = (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="text-center">
        <h2 className="mt-6 text-2xl font-bold">Réinitialisation de mot de passe</h2>
        <p className="mt-2 text-muted-foreground">
          Veuillez choisir un nouveau mot de passe pour votre compte.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Nouveau mot de passe
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">
            Confirmer le mot de passe
          </label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? "Réinitialisation en cours..." : "Réinitialiser le mot de passe"}
        </Button>
      </div>
      <div className="text-center">
        <Link to="/connexion" className="text-sm text-primary hover:underline flex items-center justify-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Retour à la connexion
        </Link>
      </div>
    </form>
  );

  // Handle missing token
  if (!token && !isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-24 px-4">
          <div className="w-full max-w-md bg-white dark:bg-secondary/50 rounded-lg shadow-md border border-border p-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Lien invalide</h2>
              <p className="text-muted-foreground">
                Le lien de réinitialisation est invalide ou a expiré. Veuillez demander un nouveau lien de réinitialisation.
              </p>
              <Link to="/forgot-password">
                <Button>Demander un nouveau lien</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-24 px-4">
        <div className="w-full max-w-md bg-white dark:bg-secondary/50 rounded-lg shadow-md border border-border p-8">
          {isSubmitted ? successContent : formContent}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPassword;
