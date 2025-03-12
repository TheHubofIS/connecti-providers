
import { useAuth } from "@/contexts/AuthContext";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import PersonalInfoTab from "@/components/profile/fournisseur/PersonalInfoTab";
import ServicesTab from "@/components/profile/fournisseur/ServicesTab";
import SecurityTab from "@/components/profile/SecurityTab";
import SettingsTab from "@/components/profile/fournisseur/SettingsTab";

export default function FournisseurProfile() {
  const { user } = useAuth();
  
  const personalInfo = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    companyName: user?.companyName || "",
    bio: user?.bio || "",
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
          <PersonalInfoTab initialInfo={personalInfo} />
        </TabsContent>
        
        <TabsContent value="services" className="mt-6">
          <ServicesTab />
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <SecurityTab />
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
