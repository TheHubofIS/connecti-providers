
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ClientCompleteProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateUser } = useAuth();
  const { translate, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    bio: "",
    language: language,
    timezone: "Europe/Paris",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update user data in AuthContext
      updateUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
        profileCompleted: true
      });
      
      toast({
        title: translate('profile.save'),
        description: "Votre profil a été mis à jour avec succès.",
      });
      
      // Redirect to dashboard
      navigate("/client/dashboard");
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
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-24 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2 text-primary">
              {translate('siteName')}
            </h1>
            <p className="text-muted-foreground">{translate('completeProfile.title')}</p>
          </div>
          
          <Card className="border border-border/60 animate-fade-in">
            <CardHeader>
              <CardTitle>{translate('completeProfile.title')}</CardTitle>
              <CardDescription>
                {translate('completeProfile.step' + step)}
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
                          <AvatarFallback>UP</AvatarFallback>
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
                        <Label htmlFor="firstName">{translate('profile.firstName')}</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">{translate('profile.lastName')}</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">{translate('profile.phone')}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">{translate('profile.bio')}</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="..."
                        rows={4}
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                )}
                
                {step === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-2">
                      <Label htmlFor="address">{translate('profile.address')}</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">{translate('profile.city')}</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">{translate('profile.postalCode')}</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="country">{translate('profile.country')}</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                )}
                
                {step === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-2">
                      <Label htmlFor="language">{translate('profile.language')}</Label>
                      <Select
                        value={formData.language}
                        onValueChange={handleSelectChange("language")}
                      >
                        <SelectTrigger id="language" className="transition-all duration-300 focus:ring-2 focus:ring-primary/20">
                          <SelectValue placeholder="Sélectionnez une langue" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">{translate('profile.timezone')}</Label>
                      <Select
                        value={formData.timezone}
                        onValueChange={handleSelectChange("timezone")}
                      >
                        <SelectTrigger id="timezone" className="transition-all duration-300 focus:ring-2 focus:ring-primary/20">
                          <SelectValue placeholder="Sélectionnez un fuseau horaire" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Europe/Paris">Europe/Paris (CET)</SelectItem>
                          <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                          <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                          <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between mt-8">
                  {step > 1 ? (
                    <Button type="button" variant="outline" onClick={prevStep} className="transition-all hover:translate-x-[-2px]">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {translate('completeProfile.previous')}
                    </Button>
                  ) : (
                    <Button type="button" variant="outline" onClick={() => navigate("/connexion")} className="transition-all hover:translate-x-[-2px]">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {translate('back')}
                    </Button>
                  )}
                  
                  {step < 3 ? (
                    <Button type="button" onClick={nextStep} className="transition-all hover:translate-x-[2px]">
                      {translate('completeProfile.next')}
                    </Button>
                  ) : (
                    <Button type="submit" disabled={loading} className="transition-all hover:scale-105">
                      {loading ? (
                        "Enregistrement..."
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          {translate('completeProfile.finish')}
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
      
      <Footer />
    </div>
  );
};

export default ClientCompleteProfile;
