
import { useAuth } from "@/contexts/AuthContext";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import PersonalInfoTab from "@/components/profile/PersonalInfoTab";
import SecurityTab from "@/components/profile/SecurityTab";
import PreferencesTab from "@/components/profile/PreferencesTab";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ClientProfile() {
  const { user } = useAuth();
  const { translate } = useLanguage();
  
  const personalInfo = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  };
  
  return (
    <div className="container py-10 pt-24">
      <h1 className="text-3xl font-bold mb-6">{translate('profile.title')}</h1>
      
      <Tabs defaultValue="personal-info" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="personal-info">{translate('profile.personalInfo')}</TabsTrigger>
          <TabsTrigger value="security">{translate('profile.security')}</TabsTrigger>
          <TabsTrigger value="preferences">{translate('profile.preferences')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal-info" className="mt-6">
          <PersonalInfoTab initialInfo={personalInfo} />
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <SecurityTab />
        </TabsContent>
        
        <TabsContent value="preferences" className="mt-6">
          <PreferencesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
