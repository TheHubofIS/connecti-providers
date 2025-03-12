
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function FournisseurProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [personalInfo, setPersonalInfo] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    companyName: user?.companyName || "",
    bio: user?.bio || "",
  });
  
  const [services, setServices] = useState([
    { id: 1, name: "Plomberie", price: "50", description: "Réparation et installation de plomberie" },
    { id: 2, name: "Électricité", price: "60", description: "Travaux d'électricité et dépannage" },
  ]);
  
  const [newService, setNewService] = useState({
    name: "",
    price: "",
    description: "",
  });
  
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNewServiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewService(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSavePersonalInfo = () => {
    // Mock API call to save personal info
    console.log("Saving personal info:", personalInfo);
    
    toast({
      title: "Profil mis à jour",
      description: "Vos informations personnelles ont été mises à jour avec succès.",
    });
  };
  
  const handleAddService = () => {
    if (newService.name && newService.price) {
      setServices(prev => [
        ...prev, 
        { 
          id: prev.length + 1, 
          name: newService.name, 
          price: newService.price, 
          description: newService.description 
        }
      ]);
      
      setNewService({
        name: "",
        price: "",
        description: "",
      });
      
      toast({
        title: "Service ajouté",
        description: "Le nouveau service a été ajouté avec succès.",
      });
    }
  };
  
  const handleRemoveService = (id: number) => {
    setServices(prev => prev.filter(service => service.id !== id));
    
    toast({
      title: "Service supprimé",
      description: "Le service a été supprimé avec succès.",
    });
  };
  
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Mon Profil Prestataire</h1>
      
      <Tabs defaultValue="personal-info" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-4">
          <TabsTrigger value="personal-info">Informations Personnelles</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal-info" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations Personnelles</CardTitle>
              <CardDescription>
                Mettez à jour vos informations personnelles et professionnelles ici. Ces informations seront visibles par les clients potentiels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input 
                    id="firstName" 
                    name="firstName"
                    value={personalInfo.firstName} 
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input 
                    id="lastName" 
                    name="lastName"
                    value={personalInfo.lastName} 
                    onChange={handlePersonalInfoChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyName">Nom de l'entreprise</Label>
                <Input 
                  id="companyName" 
                  name="companyName"
                  value={personalInfo.companyName} 
                  onChange={handlePersonalInfoChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  value={personalInfo.email} 
                  onChange={handlePersonalInfoChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input 
                  id="phone" 
                  name="phone"
                  type="tel" 
                  value={personalInfo.phone} 
                  onChange={handlePersonalInfoChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Adresse professionnelle</Label>
                <Input 
                  id="address" 
                  name="address"
                  value={personalInfo.address} 
                  onChange={handlePersonalInfoChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Biographie / Description de l'entreprise</Label>
                <Textarea 
                  id="bio" 
                  name="bio"
                  value={personalInfo.bio} 
                  onChange={handlePersonalInfoChange}
                  rows={5}
                />
              </div>
              
              <Button onClick={handleSavePersonalInfo}>Enregistrer les modifications</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Services proposés</CardTitle>
              <CardDescription>
                Gérez les services que vous proposez à vos clients, avec leurs tarifs et descriptions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Services actuels</h3>
                
                {services.length === 0 ? (
                  <p className="text-muted-foreground">Vous n'avez pas encore ajouté de services.</p>
                ) : (
                  <div className="space-y-4">
                    {services.map(service => (
                      <div key={service.id} className="p-4 border rounded-md flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{service.name}</h4>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                          <p className="mt-1 font-medium">{service.price} €/heure</p>
                        </div>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleRemoveService(service.id)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Ajouter un nouveau service</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="service-name">Nom du service</Label>
                      <Input 
                        id="service-name" 
                        name="name"
                        value={newService.name} 
                        onChange={handleNewServiceChange} 
                        placeholder="ex: Plomberie"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service-price">Prix horaire (€)</Label>
                      <Input 
                        id="service-price" 
                        name="price"
                        value={newService.price} 
                        onChange={handleNewServiceChange} 
                        placeholder="ex: 50"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="service-description">Description du service</Label>
                    <Textarea 
                      id="service-description" 
                      name="description"
                      value={newService.description} 
                      onChange={handleNewServiceChange} 
                      placeholder="Décrivez brièvement le service que vous proposez"
                      rows={3}
                    />
                  </div>
                  
                  <Button onClick={handleAddService}>Ajouter ce service</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>
                Gérez votre mot de passe et les paramètres de sécurité de votre compte.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Mot de passe actuel</Label>
                <Input id="current-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <Input id="new-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                <Input id="confirm-password" type="password" />
              </div>
              
              <Button>Mettre à jour le mot de passe</Button>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentification à deux facteurs</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Activer l'authentification à deux facteurs</p>
                    <p className="text-sm text-muted-foreground">Sécurisez votre compte avec une étape de vérification supplémentaire.</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres du compte</CardTitle>
              <CardDescription>
                Gérez vos préférences de communication et de visibilité.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notifications par email</p>
                    <p className="text-sm text-muted-foreground">Recevez des emails concernant vos rendez-vous et messages.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Rappels de rendez-vous</p>
                    <p className="text-sm text-muted-foreground">Recevez des rappels avant vos rendez-vous programmés.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Visibilité du profil</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Profil public</p>
                    <p className="text-sm text-muted-foreground">Rendez votre profil visible pour tous les utilisateurs.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Disponible pour de nouveaux clients</p>
                    <p className="text-sm text-muted-foreground">Indiquez si vous acceptez actuellement de nouveaux clients.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Préférences de langue</h3>
                <div className="space-y-2">
                  <Label htmlFor="language">Langue préférée</Label>
                  <select 
                    id="language" 
                    className="w-full p-2 border rounded-md" 
                    defaultValue="fr"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>
              
              <Button>Enregistrer les paramètres</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
