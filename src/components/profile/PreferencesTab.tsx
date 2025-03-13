
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

const PreferencesTab = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [language, setLanguage] = useState("fr");
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    // Ici, vous pouvez ajouter la logique pour sauvegarder les préférences
    toast({
      title: "Préférences mises à jour",
      description: "Vos préférences ont été mises à jour avec succès."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences</CardTitle>
        <CardDescription>
          Personnalisez votre expérience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notifications</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Notifications par email</Label>
              <p className="text-sm text-muted-foreground">
                Recevez des mises à jour par email
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-notifications">Notifications par SMS</Label>
              <p className="text-sm text-muted-foreground">
                Recevez des mises à jour par SMS
              </p>
            </div>
            <Switch
              id="sms-notifications"
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Affichage</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Mode sombre</Label>
              <p className="text-sm text-muted-foreground">
                Utiliser un thème sombre
              </p>
            </div>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="language">Langue</Label>
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
        
        <Button onClick={handleSave}>Enregistrer les préférences</Button>
      </CardContent>
    </Card>
  );
};

export default PreferencesTab;
