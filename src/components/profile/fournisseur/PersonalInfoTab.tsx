
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  companyName: string;
  bio: string;
}

interface PersonalInfoTabProps {
  initialInfo: PersonalInfo;
}

const PersonalInfoTab = ({ initialInfo }: PersonalInfoTabProps) => {
  const { toast } = useToast();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initialInfo);
  
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSavePersonalInfo = () => {
    // Mock API call to save personal info
    console.log("Saving personal info:", personalInfo);
    
    toast({
      title: "Profil mis à jour",
      description: "Vos informations personnelles ont été mises à jour avec succès.",
    });
  };

  return (
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
  );
};

export default PersonalInfoTab;
