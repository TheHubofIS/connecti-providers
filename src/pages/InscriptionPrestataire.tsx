
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, ArrowLeft, Plus, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function InscriptionPrestataire() {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profession: "",
    category: "",
    skills: [] as string[],
    newSkill: "",
    bio: "",
    country: "",
    city: "",
    languages: [] as string[],
    newLanguage: "",
    hourlyRate: "",
    experience: "",
    agreeTerms: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const categories = [
    { id: "juridique", name: "Juridique" },
    { id: "comptabilite", name: "Comptabilité" },
    { id: "it", name: "IT & Digital" },
    { id: "medical", name: "Médical" },
    { id: "dentaire", name: "Dentaire" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addSkill = () => {
    if (formData.newSkill && !formData.skills.includes(formData.newSkill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.newSkill],
        newSkill: "",
      });
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill),
    });
  };

  const addLanguage = () => {
    if (formData.newLanguage && !formData.languages.includes(formData.newLanguage)) {
      setFormData({
        ...formData,
        languages: [...formData.languages, formData.newLanguage],
        newLanguage: "",
      });
    }
  };

  const removeLanguage = (language: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter(l => l !== language),
    });
  };

  const nextStep = () => {
    if (formStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        toast({
          title: "Erreur",
          description: "Veuillez remplir tous les champs obligatoires.",
          variant: "destructive",
        });
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Erreur",
          description: "Les mots de passe ne correspondent pas.",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (formStep === 2) {
      if (!formData.profession || !formData.category || formData.skills.length === 0) {
        toast({
          title: "Erreur",
          description: "Veuillez remplir tous les champs obligatoires.",
          variant: "destructive",
        });
        return;
      }
    }
    
    setFormStep(formStep + 1);
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.country || !formData.city || formData.languages.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.agreeTerms) {
      toast({
        title: "Erreur",
        description: "Vous devez accepter les conditions d'utilisation.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès. Nous allons vérifier vos informations et vous contacter sous peu.",
      });
      
      navigate("/connexion");
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto bg-white dark:bg-secondary/50 rounded-xl shadow-sm border border-border p-6">
            <div className="mb-6">
              {formStep === 1 ? (
                <Link to="/connexion" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Retour
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Étape précédente
                </button>
              )}
            </div>
            
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Inscription Prestataire</h1>
              <p className="text-muted-foreground mt-2">
                Créez votre profil pour proposer vos services à l'international
              </p>
              
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className={`h-2.5 w-2.5 rounded-full ${formStep >= 1 ? 'bg-primary' : 'bg-muted'}`}></div>
                <div className={`h-2.5 w-2.5 rounded-full ${formStep >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
                <div className={`h-2.5 w-2.5 rounded-full ${formStep >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {formStep === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">
                        Prénom *
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Nom *
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Mot de passe *
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <Eye className="h-5 w-5 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      8 caractères minimum, incluant une lettre majuscule et un chiffre
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirmer le mot de passe *
                    </label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full mt-4"
                  >
                    Continuer
                  </Button>
                </>
              )}
              
              {formStep === 2 && (
                <>
                  <div className="space-y-2">
                    <label htmlFor="profession" className="text-sm font-medium">
                      Profession / Titre *
                    </label>
                    <Input
                      id="profession"
                      name="profession"
                      placeholder="Ex: Avocat d'affaires, Développeur web, etc."
                      value={formData.profession}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Catégorie de service *
                    </label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Compétences *
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="newSkill"
                        name="newSkill"
                        placeholder="Ajouter une compétence"
                        value={formData.newSkill}
                        onChange={handleChange}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={addSkill}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {formData.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-1 text-primary hover:text-primary/80"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="bio" className="text-sm font-medium">
                      Biographie professionnelle *
                    </label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Décrivez votre parcours, votre expertise et vos services en quelques phrases..."
                      value={formData.bio}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.bio.length}/500 caractères
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="experience" className="text-sm font-medium">
                      Années d'expérience *
                    </label>
                    <Input
                      id="experience"
                      name="experience"
                      type="number"
                      min="1"
                      placeholder="Ex: 5"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="hourlyRate" className="text-sm font-medium">
                      Tarif horaire (€) *
                    </label>
                    <Input
                      id="hourlyRate"
                      name="hourlyRate"
                      type="number"
                      min="1"
                      placeholder="Ex: 80"
                      value={formData.hourlyRate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full mt-4"
                  >
                    Continuer
                  </Button>
                </>
              )}
              
              {formStep === 3 && (
                <>
                  <div className="space-y-2">
                    <label htmlFor="country" className="text-sm font-medium">
                      Pays de résidence *
                    </label>
                    <Input
                      id="country"
                      name="country"
                      placeholder="Ex: Portugal"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="city" className="text-sm font-medium">
                      Ville *
                    </label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Ex: Lisbonne"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Langues parlées *
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="newLanguage"
                        name="newLanguage"
                        placeholder="Ajouter une langue"
                        value={formData.newLanguage}
                        onChange={handleChange}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addLanguage();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={addLanguage}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {formData.languages.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.languages.map((language) => (
                          <span
                            key={language}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-foreground/10 text-secondary-foreground"
                          >
                            {language}
                            <button
                              type="button"
                              onClick={() => removeLanguage(language)}
                              className="ml-1 text-secondary-foreground hover:text-secondary-foreground/80"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-start space-x-2 pt-4">
                    <Checkbox
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => setFormData({
                        ...formData,
                        agreeTerms: checked === true,
                      })}
                    />
                    <label
                      htmlFor="agreeTerms"
                      className="text-sm text-muted-foreground"
                    >
                      J'accepte les{" "}
                      <Link to="/conditions-utilisation" className="text-primary hover:underline">
                        conditions d'utilisation
                      </Link>{" "}
                      et la{" "}
                      <Link to="/confidentialite" className="text-primary hover:underline">
                        politique de confidentialité
                      </Link>
                    </label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-4"
                    disabled={isLoading}
                  >
                    {isLoading ? "Création du compte..." : "Créer mon compte"}
                  </Button>
                </>
              )}
              
              <div className="text-center text-sm text-muted-foreground mt-4">
                Déjà inscrit ?{" "}
                <Link to="/connexion" className="text-primary hover:underline">
                  Connectez-vous
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
