
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { translate } = useLanguage();
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre adresse e-mail.",
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
      
      // In a real app, this would call an API to send password reset link
      console.log("Password reset requested for:", email);
    } catch (error) {
      console.error("Error requesting password reset:", error);
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
        <h2 className="mt-6 text-2xl font-bold">Vérifiez votre e-mail</h2>
        <p className="mt-2 text-muted-foreground">
          Si un compte existe avec l'adresse <span className="font-medium">{email}</span>, vous recevrez un e-mail contenant les instructions pour réinitialiser votre mot de passe.
        </p>
      </div>
      <div className="space-y-4">
        <Button 
          type="button" 
          className="w-full"
          onClick={() => setEmail("")}
          variant="outline"
        >
          Utiliser une autre adresse e-mail
        </Button>
        <Link to="/connexion" className="block text-center">
          <Button type="button" className="w-full">
            Retour à la connexion
          </Button>
        </Link>
      </div>
    </div>
  );
  
  // Form content
  const formContent = (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="text-center">
        <h2 className="mt-6 text-2xl font-bold">Récupération de mot de passe</h2>
        <p className="mt-2 text-muted-foreground">
          Entrez votre adresse e-mail pour recevoir un lien de réinitialisation de mot de passe.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Adresse e-mail
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemple@domaine.com"
            required
            autoComplete="email"
          />
        </div>
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? "Envoi en cours..." : "Envoyer les instructions"}
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

export default ForgotPassword;
