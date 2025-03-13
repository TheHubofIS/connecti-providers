
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const SettingsTab = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const [availableForClients, setAvailableForClients] = useState(true);
  const [language, setLanguage] = useState("fr");

  const handleSave = () => {
    // Ici, vous implémenteriez la logique pour sauvegarder les paramètres
    toast({
      title: "Paramètres enregistrés",
      description: "Vos paramètres ont été mis à jour avec succès."
    });
  };

  return (
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
            <Switch 
              checked={emailNotifications} 
              onCheckedChange={setEmailNotifications} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Rappels de rendez-vous</p>
              <p className="text-sm text-muted-foreground">Recevez des rappels avant vos rendez-vous programmés.</p>
            </div>
            <Switch 
              checked={appointmentReminders} 
              onCheckedChange={setAppointmentReminders} 
            />
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
            <Switch 
              checked={publicProfile} 
              onCheckedChange={setPublicProfile} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Disponible pour de nouveaux clients</p>
              <p className="text-sm text-muted-foreground">Indiquez si vous acceptez actuellement de nouveaux clients.</p>
            </div>
            <Switch 
              checked={availableForClients} 
              onCheckedChange={setAvailableForClients} 
            />
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
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
        
        <Button onClick={handleSave}>Enregistrer les paramètres</Button>
      </CardContent>
    </Card>
  );
};

export default SettingsTab;
