
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { categories } from "@/utils/serviceData";
import { ArrowLeft, Upload, Check, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const FournisseurCompleteProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    bio: "",
    category: "",
    subcategories: [] as string[],
    services: [] as string[],
    priceRange: "€€",
    languages: ["Français"],
  });
  const [newService, setNewService] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubcategoryToggle = (subcategory: string) => {
    setFormData(prev => {
      const subcategories = prev.subcategories.includes(subcategory)
        ? prev.subcategories.filter(item => item !== subcategory)
        : [...prev.subcategories, subcategory];
      return { ...prev, subcategories };
    });
  };
  
  const handleLanguageToggle = (language: string) => {
    setFormData(prev => {
      const languages = prev.languages.includes(language)
        ? prev.languages.filter(item => item !== language)
        : [...prev.languages, language];
      return { ...prev, languages };
    });
  };
  
  const addService = () => {
    if (newService.trim() && !formData.services.includes(newService.trim())) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
      setNewService("");
    }
  };
  
  const removeService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(item => item !== service)
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Profil complété !",
        description: "Votre profil prestataire a été mis à jour avec succès.",
      });
      
      // Redirect to dashboard
      navigate("/fournisseur/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);
  
  // Get subcategories for selected category
  const selectedCategory = categories.find(c => c.id === formData.category);
  const subcategories = selectedCategory?.subcategories || [];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2 text-primary">
            Connecti<span className="text-foreground">Pro</span>
          </h1>
          <p className="text-muted-foreground">Complétez votre profil de prestataire</p>
        </div>
        
        <Card className="border border-border/60">
          <CardHeader>
            <CardTitle>Profil prestataire</CardTitle>
            <CardDescription>
              Étape {step} sur 3: {
                step === 1 ? "Informations personnelles" : 
                step === 2 ? "Services proposés" : 
                "Tarifs et disponibilité"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="" alt="Profile" />
                        <AvatarFallback>PP</AvatarFallback>
                      </Avatar>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nom de l'entreprise</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Présentation</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Décrivez votre activité et vos services..."
                      rows={4}
                      required
                    />
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie principale</Label>
                    <Select
                      value={formData.category}
                      onValueChange={handleSelectChange("category")}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {formData.category && (
                    <div className="space-y-2">
                      <Label>Spécialités</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {subcategories.map(subcategory => (
                          <div key={subcategory} className="flex items-center space-x-2">
                            <Checkbox
                              id={`subcategory-${subcategory}`}
                              checked={formData.subcategories.includes(subcategory)}
                              onCheckedChange={() => handleSubcategoryToggle(subcategory)}
                            />
                            <label
                              htmlFor={`subcategory-${subcategory}`}
                              className="text-sm"
                            >
                              {subcategory}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label>Services proposés</Label>
                    <div className="flex space-x-2">
                      <Input
                        value={newService}
                        onChange={e => setNewService(e.target.value)}
                        placeholder="Ajouter un service"
                      />
                      <Button type="button" size="sm" onClick={addService}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.services.map(service => (
                        <div key={service} className="flex items-center bg-muted px-3 py-1 rounded-full text-sm">
                          {service}
                          <button
                            type="button"
                            className="ml-2 text-muted-foreground hover:text-destructive"
                            onClick={() => removeService(service)}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="priceRange">Niveau de prix</Label>
                    <Select
                      value={formData.priceRange}
                      onValueChange={handleSelectChange("priceRange")}
                    >
                      <SelectTrigger id="priceRange">
                        <SelectValue placeholder="Sélectionnez un niveau de prix" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="€">€ (Économique)</SelectItem>
                        <SelectItem value="€€">€€ (Modéré)</SelectItem>
                        <SelectItem value="€€€">€€€ (Premium)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Langues parlées</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Français", "Anglais", "Espagnol", "Allemand", "Italien", "Portugais"].map(language => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox
                            id={`language-${language}`}
                            checked={formData.languages.includes(language)}
                            onCheckedChange={() => handleLanguageToggle(language)}
                          />
                          <label
                            htmlFor={`language-${language}`}
                            className="text-sm"
                          >
                            {language}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse professionnelle</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Code postal</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Pays</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Précédent
                  </Button>
                ) : (
                  <Button type="button" variant="outline" onClick={() => navigate("/connexion")}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour
                  </Button>
                )}
                
                {step < 3 ? (
                  <Button type="button" onClick={nextStep}>
                    Suivant
                  </Button>
                ) : (
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      "Enregistrement..."
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Terminer
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FournisseurCompleteProfile;
