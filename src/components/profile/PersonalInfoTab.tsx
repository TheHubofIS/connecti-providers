
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

const PersonalInfoTab = ({ initialInfo }: { initialInfo: PersonalInfo }) => {
  const [info, setInfo] = useState<PersonalInfo>(initialInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique pour sauvegarder les informations
    toast({
      title: "Profil mis à jour",
      description: "Vos informations personnelles ont été mises à jour avec succès."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations personnelles</CardTitle>
        <CardDescription>
          Mettez à jour vos informations personnelles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input 
                id="firstName" 
                name="firstName" 
                value={info.firstName} 
                onChange={handleChange} 
                placeholder="Prénom" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input 
                id="lastName" 
                name="lastName" 
                value={info.lastName} 
                onChange={handleChange} 
                placeholder="Nom" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={info.email} 
              onChange={handleChange} 
              placeholder="exemple@email.com" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input 
              id="phone" 
              name="phone" 
              value={info.phone} 
              onChange={handleChange} 
              placeholder="+33 6 12 34 56 78" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Adresse</Label>
            <Input 
              id="address" 
              name="address" 
              value={info.address} 
              onChange={handleChange} 
              placeholder="123 Rue de Paris, 75001 Paris" 
            />
          </div>
          
          <Button type="submit">Enregistrer les modifications</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoTab;
