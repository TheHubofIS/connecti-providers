
import { useState } from "react";
import { 
  User as UserIcon, 
  Mail, 
  Key,
  Camera,
  Save,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || ""
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      // Simuler une mise à jour de profil
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Dans une application réelle, vous appelleriez votre API ici
      // await updateUser({...profileForm});
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès."
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le profil. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive"
      });
      return;
    }
    
    setIsChangingPassword(true);
    
    try {
      // Simuler un changement de mot de passe
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Dans une application réelle, vous appelleriez votre API ici
      
      toast({
        title: "Mot de passe modifié",
        description: "Votre mot de passe a été changé avec succès."
      });
      
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de changer le mot de passe. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsChangingPassword(false);
    }
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Dans une application réelle, vous téléchargeriez le fichier sur un serveur
    // Pour l'instant, nous créons simplement une URL d'objet local
    const tempUrl = URL.createObjectURL(file);
    setProfileForm(prev => ({ ...prev, avatar: tempUrl }));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Profil administrateur</h1>
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">Informations générales</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <form onSubmit={handleProfileSubmit}>
                <CardHeader>
                  <CardTitle>Profil</CardTitle>
                  <CardDescription>
                    Gérez vos informations personnelles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center justify-center pb-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profileForm.avatar} alt={user?.name} />
                        <AvatarFallback className="text-2xl">
                          {user?.name?.charAt(0) || 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <label 
                        htmlFor="avatar-upload" 
                        className="absolute bottom-0 right-0 cursor-pointer p-1 rounded-full bg-primary text-white"
                      >
                        <Camera className="h-4 w-4" />
                        <input 
                          id="avatar-upload" 
                          type="file" 
                          accept="image/*" 
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                      </label>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Cliquez sur l'icône pour changer votre photo de profil
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom</Label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        className="pl-10"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? (
                      <>
                        <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2" />
                        Mise à jour...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Enregistrer les modifications
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Détails du compte</CardTitle>
                <CardDescription>
                  Informations sur votre compte administrateur
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">ID Utilisateur</p>
                  <p className="text-sm text-muted-foreground font-mono">{user?.id || 'N/A'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Rôle</p>
                  <div className="flex items-center">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                      {user?.role || 'Admin'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Dernière connexion</p>
                  <p className="text-sm text-muted-foreground">
                    {user?.lastLogin || new Date().toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Compte créé le</p>
                  <p className="text-sm text-muted-foreground">
                    {user?.createdAt || new Date().toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="security">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <form onSubmit={handlePasswordSubmit}>
                <CardHeader>
                  <CardTitle>Changer le mot de passe</CardTitle>
                  <CardDescription>
                    Mettez à jour votre mot de passe pour sécuriser votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Mot de passe actuel</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="current-password"
                        type="password"
                        className="pl-10"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nouveau mot de passe</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="new-password"
                        type="password"
                        className="pl-10"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type="password"
                        className="pl-10"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isChangingPassword}>
                    {isChangingPassword ? (
                      <>
                        <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2" />
                        Changement...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Changer le mot de passe
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sessions actives</CardTitle>
                  <CardDescription>
                    Gérez les appareils connectés à votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <p className="font-medium">Session actuelle</p>
                        <p className="text-sm text-muted-foreground">Paris, France · Chrome sur Windows</p>
                      </div>
                      <div className="text-sm text-green-500 font-medium">Actif</div>
                    </div>
                    
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <p className="font-medium">Mobile</p>
                        <p className="text-sm text-muted-foreground">Paris, France · Safari sur iOS</p>
                      </div>
                      <Button variant="outline" size="sm">Déconnecter</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Zone de danger</AlertTitle>
                <AlertDescription>
                  Les actions dans cette zone sont irréversibles et peuvent avoir un impact important sur votre compte.
                </AlertDescription>
                <div className="mt-4">
                  <Button variant="destructive">
                    Supprimer le compte
                  </Button>
                </div>
              </Alert>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
