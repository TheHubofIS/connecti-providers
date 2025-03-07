
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Eye, EyeOff, InfoIcon, Lock, Mail, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "client", // client, provider
    acceptTerms: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      role: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Les mots de passe ne correspondent pas",
        description: "Veuillez vous assurer que les mots de passe saisis sont identiques.",
      });
      return;
    }

    if (!formData.acceptTerms) {
      toast({
        variant: "destructive",
        title: "Conditions d'utilisation requises",
        description: "Vous devez accepter les conditions d'utilisation pour créer un compte.",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulation d'une inscription réussie
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        role: formData.role,
        name: `${formData.firstName} ${formData.lastName}`
      }));
      
      toast({
        title: "Compte créé avec succès",
        description: `Bienvenue ${formData.firstName} ! Votre compte a été créé avec succès.`,
      });
      
      // Redirection basée sur le rôle
      if (formData.role === "provider") {
        navigate('/prestataire/dashboard');
      } else {
        navigate('/client/dashboard');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur lors de l'inscription",
        description: "Une erreur est survenue. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Créer un compte</h1>
            <p className="text-muted-foreground">
              Rejoignez ConnectiPro et connectez-vous avec des experts français à l'étranger
            </p>
          </div>

          <div className="bg-white dark:bg-secondary/30 rounded-xl p-8 shadow-lg neo border border-border">
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label 
                    htmlFor="firstName" 
                    className="text-sm font-medium text-foreground/90"
                  >
                    Prénom
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Jean"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-transparent rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label 
                    htmlFor="lastName" 
                    className="text-sm font-medium text-foreground/90"
                  >
                    Nom
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Dupont"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-transparent rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label 
                  htmlFor="email" 
                  className="text-sm font-medium text-foreground/90"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votreemail@exemple.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-transparent rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label 
                    htmlFor="password" 
                    className="text-sm font-medium text-foreground/90"
                  >
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-10 py-3 bg-transparent rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label 
                    htmlFor="confirmPassword" 
                    className="text-sm font-medium text-foreground/90"
                  >
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-10 py-3 bg-transparent rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/90">
                  Type de compte
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="radio"
                      name="role"
                      id="client"
                      value="client"
                      checked={formData.role === "client"}
                      onChange={handleRoleChange}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor="client"
                      className="flex p-4 border border-input rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-muted/50 transition-all"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                          <span className="font-medium">Client</span>
                          <span className="text-xs text-muted-foreground">
                            Je recherche des services
                          </span>
                        </div>
                        <Check className={`h-5 w-5 text-primary ${
                          formData.role === "client" ? "opacity-100" : "opacity-0"
                        }`} />
                      </div>
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="radio"
                      name="role"
                      id="provider"
                      value="provider"
                      checked={formData.role === "provider"}
                      onChange={handleRoleChange}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor="provider"
                      className="flex p-4 border border-input rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-muted/50 transition-all"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                          <span className="font-medium">Prestataire</span>
                          <span className="text-xs text-muted-foreground">
                            Je propose des services
                          </span>
                        </div>
                        <Check className={`h-5 w-5 text-primary ${
                          formData.role === "provider" ? "opacity-100" : "opacity-0"
                        }`} />
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <div className="flex items-center h-5">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-primary/20"
                  />
                </div>
                <div className="text-sm">
                  <label htmlFor="acceptTerms" className="text-muted-foreground">
                    J'accepte les{" "}
                    <Link to="/conditions" className="text-primary hover:underline">
                      conditions d'utilisation
                    </Link>{" "}
                    et la{" "}
                    <Link to="/confidentialite" className="text-primary hover:underline">
                      politique de confidentialité
                    </Link>
                  </label>
                </div>
              </div>

              <div className="flex items-start p-4 bg-primary/5 rounded-lg border border-primary/20">
                <InfoIcon className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  En vous inscrivant, vous acceptez de recevoir des communications relatives à votre compte et aux services de ConnectiPro. Vous pourrez vous désabonner à tout moment. Vos données personnelles sont traitées conformément à notre politique de confidentialité.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Création en cours..." : "Créer mon compte"}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-center text-sm text-muted-foreground">
                Vous avez déjà un compte ?{" "}
                <Link to="/connexion" className="text-primary font-medium hover:underline">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
