
import { useState } from "react";
import { 
  User as UserIcon,
  Mail,
  Key,
  Shield,
  Calendar,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const AdminProfile = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simuler la mise à jour
    updateUser({
      name: formData.name,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone
    });
    
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
    
    setIsEditing(false);
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsPasswordDialogOpen(false);
    
    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été modifié avec succès.",
    });
  };
  
  const handleUpdateAvatar = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsAvatarDialogOpen(false);
    
    toast({
      title: "Avatar mis à jour",
      description: "Votre avatar a été modifié avec succès.",
    });
  };
  
  // Simuler les données d'activité récente
  const recentActivity = [
    {
      action: "Connexion",
      date: new Date(),
      success: true
    },
    {
      action: "Modification du profil",
      date: new Date(Date.now() - 2 * 86400000),
      success: true
    },
    {
      action: "Tentative de connexion",
      date: new Date(Date.now() - 5 * 86400000),
      success: false
    },
    {
      action: "Modification du mot de passe",
      date: new Date(Date.now() - 10 * 86400000),
      success: true
    }
  ];
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mon profil</h1>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center">
            <UserIcon className="h-4 w-4 mr-2" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Key className="h-4 w-4 mr-2" />
            Sécurité
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="text-2xl">{user?.name?.charAt(0) || 'A'}</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle>{user?.name}</CardTitle>
                  <CardDescription className="flex items-center justify-center">
                    <Shield className="h-4 w-4 mr-1 text-primary" />
                    <span className="text-sm">Administrateur</span>
                  </CardDescription>
                  <Button 
                    variant="outline" 
                    className="mt-4 w-full"
                    onClick={() => setIsAvatarDialogOpen(true)}
                  >
                    Modifier l'avatar
                  </Button>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                    
                    {user?.phone && (
                      <div>
                        <p className="text-sm text-muted-foreground">Téléphone</p>
                        <p className="font-medium">{user.phone}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Informations personnelles</CardTitle>
                    <CardDescription>Gérez vos informations de profil</CardDescription>
                  </div>
                  
                  {!isEditing ? (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      Modifier
                    </Button>
                  ) : (
                    <Button variant="ghost" onClick={() => setIsEditing(false)}>
                      Annuler
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleSaveProfile}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="Votre prénom"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="Votre nom"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom d'utilisateur</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="Votre nom d'utilisateur"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="votre.email@example.com"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="+33 6 12 34 56 78"
                        />
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="mt-6 flex justify-end">
                        <Button type="submit">
                          Enregistrer
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="security">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Sécurité</CardTitle>
                  <CardDescription>Gérez vos paramètres de sécurité</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setIsPasswordDialogOpen(true)}
                      >
                        <Key className="mr-2 h-4 w-4" />
                        Changer le mot de passe
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                  <CardDescription>Les dernières activités sur votre compte</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 rounded-full bg-muted">
                            {activity.action === "Connexion" ? (
                              <UserIcon className="h-4 w-4 text-primary" />
                            ) : activity.action === "Modification du profil" ? (
                              <Mail className="h-4 w-4 text-blue-500" />
                            ) : activity.action === "Modification du mot de passe" ? (
                              <Key className="h-4 w-4 text-amber-500" />
                            ) : (
                              <Shield className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(activity.date)}</p>
                          </div>
                        </div>
                        <Badge variant={activity.success ? "default" : "destructive"}>
                          {activity.success ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <XCircle className="h-3 w-3 mr-1" />
                          )}
                          {activity.success ? "Succès" : "Échec"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Dialog pour changer le mot de passe */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Changer le mot de passe</DialogTitle>
            <DialogDescription>
              Entrez votre mot de passe actuel et votre nouveau mot de passe
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Mot de passe actuel</Label>
              <Input 
                id="current-password" 
                placeholder="••••••••" 
                type="password"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-password">Nouveau mot de passe</Label>
              <Input 
                id="new-password" 
                placeholder="••••••••" 
                type="password"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmer le nouveau mot de passe</Label>
              <Input 
                id="confirm-password" 
                placeholder="••••••••" 
                type="password"
                required
              />
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => setIsPasswordDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button type="submit">
                Enregistrer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Dialog pour changer l'avatar */}
      <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l'avatar</DialogTitle>
            <DialogDescription>
              Téléchargez une nouvelle image de profil
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleUpdateAvatar} className="space-y-4">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="text-2xl">{user?.name?.charAt(0) || 'A'}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
              />
              <Label htmlFor="avatar-upload" className="cursor-pointer">
                <div className="text-sm text-muted-foreground">
                  Glissez-déposez une image ici ou cliquez pour parcourir
                </div>
              </Label>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => setIsAvatarDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button type="submit">
                Enregistrer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProfile;
