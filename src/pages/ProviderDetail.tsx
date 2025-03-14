
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { findProviderById } from "@/utils/serviceData";
import { Provider } from "@/types/provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Star, MapPin, Clock, Calendar, MessageCircle, CheckCircle } from "lucide-react";

export default function ProviderDetail() {
  const { providerId } = useParams<{ providerId: string }>();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProvider = async () => {
      setLoading(true);
      try {
        if (providerId) {
          // Simulate network delay
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
      title: "Connexion requise",
      description: "Veuillez vous connecter pour contacter ce prestataire.",
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
          <h1 className="text-2xl font-bold mb-4">Prestataire non trouvé</h1>
          <p className="text-muted-foreground mb-6">
            Le prestataire que vous recherchez n'existe pas.
          </p>
          <Link to="/prestataires">
            <Button>Voir tous les prestataires</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Set defaults for optional properties
  const title = provider.title || provider.subcategory;
  const reviews = provider.reviews || provider.reviewCount;
  const location = provider.location || provider.city;
  const availability = provider.availability || "Disponible";
  const skills = provider.skills || provider.services;
  const hourlyRate = provider.hourlyRate || 50;
  const responseTime = provider.responseTime || "< 24h";
  const completionRate = provider.completionRate || 98;

  return (
    <div className="container mx-auto px-4 py-16">
      <Link to="/prestataires" className="inline-flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour aux prestataires
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
                  <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5" title="Prestataire vérifié">
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
                    <span className="text-sm text-muted-foreground ml-1">({reviews} avis)</span>
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
            <h2 className="text-xl font-semibold mb-4">À propos</h2>
            <p className="text-muted-foreground whitespace-pre-line">
              {provider.description}
            </p>

            <h3 className="text-lg font-semibold mt-6 mb-3">Compétences</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <Badge key={idx} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-3">Langues parlées</h3>
            <div className="flex flex-wrap gap-2">
              {provider.languages.map((language, idx) => (
                <Badge key={idx} variant="outline">
                  {language}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Informations pratiques</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tarif horaire</p>
                  <p className="font-medium text-lg">{hourlyRate}€ / heure</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Temps de réponse</p>
                  <p>{responseTime}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Taux de complétion</p>
                  <p>{completionRate}%</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Entreprise</p>
                  <p>{provider.companyName}</p>
                </div>

                <div className="pt-4 space-y-3">
                  <Button onClick={handleContact} className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contacter
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Prendre rendez-vous
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
