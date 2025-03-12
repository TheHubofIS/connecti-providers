
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const PreferencesTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences</CardTitle>
        <CardDescription>
          Gérez vos préférences de communication et de notification.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
              <p className="font-medium">Notifications de nouveaux prestataires</p>
              <p className="text-sm text-muted-foreground">Recevez des notifications lorsque de nouveaux prestataires rejoignent la plateforme.</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Rappels de rendez-vous</p>
              <p className="text-sm text-muted-foreground">Recevez des rappels avant vos rendez-vous programmés.</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
        
        <Separator className="my-4" />
        
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
        
        <Button>Enregistrer les préférences</Button>
      </CardContent>
    </Card>
  );
};

export default PreferencesTab;
