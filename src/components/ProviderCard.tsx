
import { Star, MapPin, Clock, CheckCircle, MessageCircle, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { Provider } from "@/types/provider";
import { Card } from "@/components/ui/card";

type ProviderCardProps = {
  provider: Provider;
  compact?: boolean;
};

export default function ProviderCard({ provider, compact = false }: ProviderCardProps) {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleContact = () => {
    toast({
      title: "Connexion requise",
      description: "Veuillez vous connecter pour contacter ce prestataire.",
      variant: "default",
    });
    
    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate("/connexion");
    }, 1500);
  };

  const handleSave = () => {
    toast({
      title: "Connexion requise",
      description: "Veuillez vous connecter pour sauvegarder ce prestataire.",
      variant: "default",
    });
    
    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate("/connexion");
    }, 1500);
  };
  
  // Set defaults for optional properties
  const title = provider.title || provider.subcategory;
  const reviews = provider.reviews || provider.reviewCount;
  const location = provider.location || provider.city;
  const availability = provider.availability || "Disponible";
  const skills = provider.skills || provider.services;

  if (compact) {
    return (
      <Card className="h-full bg-card border border-border overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="p-4">
          <div className="flex items-start">
            <div className="relative mr-3 flex-shrink-0">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img 
                  src={provider.image} 
                  alt={provider.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              {provider.verified && (
                <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5" title="Prestataire vérifié">
                  <CheckCircle className="h-3 w-3 text-white fill-primary stroke-white" />
                </div>
              )}
            </div>
            
            <div>
              <Link to={`/prestataires/${provider.id}`} className="hover:text-primary transition-colors">
                <h3 className="font-medium line-clamp-1">{provider.name}</h3>
                <p className="text-xs text-muted-foreground">{title}</p>
              </Link>
              
              <div className="flex items-center mt-1">
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                <span className="ml-1 text-xs font-medium">{provider.rating.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground ml-1">({reviews})</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md group">
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
          <span className="text-primary text-lg">{provider.hourlyRate || 50}€</span>
          <span className="text-muted-foreground"> / heure</span>
        </div>
        
        <div className="flex mt-4 gap-2">
          <Link 
            to={`/prestataires/${provider.id}`}
            className="flex-1"
          >
            <Button variant="outline" className="w-full text-sm">
              Voir le profil
            </Button>
          </Link>
          
          <Button onClick={handleContact} variant="default" className="px-3">
            <MessageCircle className="h-4 w-4" />
          </Button>
          
          <Button onClick={handleSave} variant="outline" className="px-3">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
