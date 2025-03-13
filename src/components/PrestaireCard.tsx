
import { Star, MapPin, Clock, CheckCircle, MessageCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import type { Provider } from "@/types/provider";

type ProviderCardProps = {
  provider: Provider;
};

export default function PrestaireCard({ provider }: ProviderCardProps) {
  const { toast } = useToast();

  const handleContact = () => {
    toast({
      title: "Connexion requise",
      description: "Veuillez vous connecter pour contacter ce prestataire.",
      variant: "default",
    });
  };

  const handleSave = () => {
    toast({
      title: "Connexion requise",
      description: "Veuillez vous connecter pour sauvegarder ce prestataire.",
      variant: "default",
    });
  };
  
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
    <div className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md group">
      <div className="p-6">
        <div className="flex items-start mb-4">
          <div className="relative mr-4 flex-shrink-0">
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <img 
                src={provider.image} 
                alt={provider.name} 
                className="h-full w-full object-cover"
              />
            </div>
            {provider.verified && (
              <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5" title="Prestataire vérifié">
                <CheckCircle className="h-4 w-4 text-white fill-primary stroke-white" />
              </div>
            )}
          </div>
          
          <div className="flex-grow">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  <Link to={`/prestataires/${provider.id}`} className="hover:text-primary transition-colors">
                    {provider.name}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">{title}</p>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <span className="ml-1 font-semibold">{provider.rating.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground ml-1">({reviews})</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge variant="outline" className="text-xs px-2 py-0 rounded-full font-normal">
                {provider.category}
              </Badge>
              <Badge variant="outline" className="text-xs px-2 py-0 rounded-full font-normal">
                {provider.subcategory}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {location}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            {availability}
          </div>
          
          <div className="flex flex-wrap gap-1 mt-3">
            {skills.slice(0, 3).map((skill, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{skills.length - 3}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="mt-4 text-sm font-medium">
          <span className="text-primary text-lg">{hourlyRate}€</span>
          <span className="text-muted-foreground"> / heure</span>
        </div>
        
        <div className="flex mt-4 gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1 text-sm">
                Voir le profil
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4">
                    <div className="h-20 w-20 rounded-full overflow-hidden">
                      <img 
                        src={provider.image} 
                        alt={provider.name} 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{provider.name}</h2>
                    <p className="text-muted-foreground">{title}</p>
                    
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span className="ml-1 font-semibold">{provider.rating.toFixed(1)}</span>
                      <span className="text-xs text-muted-foreground ml-1">({reviews} avis)</span>
                    </div>
                    
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {location}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 py-4 border-y border-border">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Tarif horaire</p>
                      <p className="font-medium">{hourlyRate}€ / heure</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Langues</p>
                      <p>{provider.languages.join(", ")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Temps de réponse</p>
                      <p>{responseTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Taux de complétion</p>
                      <p>{completionRate}%</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Compétences</h3>
                  <div className="flex flex-wrap gap-1">
                    {skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button onClick={handleContact} className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contacter
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Prendre RDV
                  </Button>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  Connexion requise pour accéder à toutes les fonctionnalités
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button onClick={handleContact} variant="default">
            <MessageCircle className="h-4 w-4" />
          </Button>
          
          <Button onClick={handleSave} variant="outline">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
