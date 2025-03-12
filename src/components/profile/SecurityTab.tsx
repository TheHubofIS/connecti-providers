
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const SecurityTab = () => {
  return (
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
  );
};

export default SecurityTab;
