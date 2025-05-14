import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { findProviderById } from "@/utils/serviceData";
import { Provider } from "@/types/provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, Star, MapPin, Clock, Calendar, MessageCircle, CheckCircle, ShieldCheck, Award, Briefcase, FileText, Globe, Languages, Phone } from "lucide-react";

export default function ProviderDetail() {
  const { providerId } = useParams<{ providerId: string }>();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { translate, language } = useLanguage();

  useEffect(() => {
    const fetchProvider = async () => {
      setLoading(true);
      try {
        if (providerId) {
          // Simuler une légère latence réseau
          await new Promise(resolve => setTimeout(resolve, 500));
          const foundProvider = findProviderById(providerId);
          setProvider(foundProvider);
        }
      } catch (error) {
        console.error("Error fetching provider:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [providerId]);

  const handleContact = () => {
    toast({
      title: translate("provider.loginRequired"),
      description: translate("provider.loginToContact"),
      variant: "default",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-40 bg-card rounded"></div>
          <div className="h-24 w-full bg-card rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 h-96 bg-card rounded"></div>
            <div className="h-96 bg-card rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{translate("provider.notFound")}</h1>
          <p className="text-muted-foreground mb-6">
            {translate("provider.notFoundDesc")}
          </p>
          <Link to="/prestataires">
            <Button>{translate("provider.viewAll")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Set defaults for optional properties
  const title = provider.title || provider.subcategory;
  const reviews = provider.reviews || provider.reviewCount;
  const location = provider.location || provider.city;
  const availability = provider.availability || translate("provider.available");
  const skills = provider.skills || provider.services;
  const hourlyRate = provider.hourlyRate || 50;
  const responseTime = provider.responseTime || "< 24h";
  const completionRate = provider.completionRate || 98;
  
  // Additional professional information
  const experience = provider.experience || "10+ ans";
  const education = provider.education || ["Master en Finance, HEC Paris", "DSCG - Diplôme supérieur de comptabilité et de gestion"];
  const certifications = provider.certifications || ["Certified Public Accountant (CPA)", "Chartered Financial Analyst (CFA)"];
  const specialties = provider.specialties || ["Fiscalité internationale", "Consolidation", "Optimisation fiscale", "Audit"];
  const clients = provider.clients || ["PME", "Start-ups", "Entrepreneurs individuels", "Grandes entreprises"];
  const approach = provider.approach || "Approche personnalisée et sur-mesure pour chaque client, avec une attention particulière à la conformité réglementaire et à l'optimisation fiscale.";

  return (
    <div className="container mx-auto px-4 py-16">
      <Link to="/prestataires" className="inline-flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        {translate("provider.backToList")}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-card border border-border rounded-xl overflow-hidden p-6 mb-8">
            <div className="flex items-start">
              <div className="relative mr-6">
                <div className="h-24 w-24 rounded-full overflow-hidden">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                {provider.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5" title={translate("provider.verified")}>
                    <CheckCircle className="h-5 w-5 text-white fill-primary stroke-white" />
                  </div>
                )}
              </div>

              <div className="flex-grow">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">{provider.name}</h1>
                    <p className="text-lg text-muted-foreground">{title}</p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="px-2 py-0 rounded-full">
                        {provider.category}
                      </Badge>
                      <Badge variant="outline" className="px-2 py-0 rounded-full">
                        {provider.subcategory}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                    <span className="ml-1 font-semibold">{provider.rating.toFixed(1)}</span>
                    <span className="text-sm text-muted-foreground ml-1">({reviews} {translate("provider.reviews")})</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    {location}
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    {availability}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">{translate("provider.about")}</h2>
            <p className="text-muted-foreground whitespace-pre-line">
              {provider.description}
            </p>

            <h3 className="text-lg font-semibold mt-6 mb-3">{translate("provider.skills")}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <Badge key={idx} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-3">{translate("provider.languages")}</h3>
            <div className="flex flex-wrap gap-2">
              {provider.languages.map((language, idx) => (
                <Badge key={idx} variant="outline">
                  {language}
                </Badge>
              ))}
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <h2 className="text-xl font-semibold mb-4">{translate("provider.expertise")}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 bg-primary/10 p-2 rounded-full">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{translate("provider.experience")}</h4>
                      <p className="text-muted-foreground">{experience}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 bg-primary/10 p-2 rounded-full">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{translate("provider.approach")}</h4>
                      <p className="text-muted-foreground text-sm">{approach}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">{translate("provider.specialties")}</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {specialties.map((specialty, idx) => (
                    <Badge key={idx} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                
                <h3 className="text-lg font-semibold mb-3">{translate("provider.clientTypes")}</h3>
                <div className="flex flex-wrap gap-2">
                  {clients.map((client, idx) => (
                    <Badge key={idx} variant="outline">
                      {client}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 border-t border-border pt-6 opacity-60">
              <div className="flex items-center justify-center p-4 bg-muted/50 rounded-lg">
                <ShieldCheck className="h-5 w-5 mr-2 text-primary" />
                <p className="text-sm">
                  {translate("provider.premiumContent")} - <span className="font-medium text-primary">{translate("provider.loginToView")}</span>
                </p>
              </div>
              
              <div className="mt-4 space-y-4">
                <h3 className="text-lg font-semibold">{translate("provider.education")}</h3>
                <ul className="space-y-2 blur-sm">
                  {education.map((edu, idx) => (
                    <li key={idx} className="flex items-start">
                      <FileText className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="text-lg font-semibold">{translate("provider.certifications")}</h3>
                <ul className="space-y-2 blur-sm">
                  {certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-start">
                      <Award className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="text-lg font-semibold">{translate("provider.contactInfo")}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 blur-sm">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>+33 6 {randomInt(10, 99)} {randomInt(10, 99)} {randomInt(10, 99)} {randomInt(10, 99)}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>www.{provider.name.toLowerCase().replace(' ', '')}-{provider.category.toLowerCase()}.fr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">{translate("provider.practicalInfo")}</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">{translate("provider.hourlyRate")}</p>
                  <p className="font-medium text-lg">{hourlyRate}€ / {translate("provider.hour")}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">{translate("provider.responseTime")}</p>
                  <p>{responseTime}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">{translate("provider.completionRate")}</p>
                  <p>{completionRate}%</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">{translate("provider.company")}</p>
                  <p>{provider.companyName}</p>
                </div>

                <div className="pt-4 space-y-3">
                  <Button onClick={handleContact} className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {translate("provider.contact")}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    {translate("provider.schedule")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">{translate("provider.availability")}</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["L", "M", "M", "J", "V", "S", "D"].map((day, i) => (
                    <div key={i} className="text-center text-sm font-medium">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {[1, 1, 1, 1, 1, 0, 0].map((available, i) => (
                    <div 
                      key={i}
                      className={`aspect-square rounded-md flex items-center justify-center ${
                        available ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 
                                  'bg-muted/50 text-muted-foreground'
                      }`}
                    >
                      {available ? '✓' : '✗'}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {translate("provider.availabilityNote")}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-card border border-border rounded-xl overflow-hidden p-6">
            <div className="flex items-center mb-4">
              <ShieldCheck className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-lg font-semibold">{translate("provider.verifiedInfo")}</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>{translate("provider.identityVerified")}</span>
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>{translate("provider.qualificationsVerified")}</span>
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>{translate("provider.insuranceVerified")}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
