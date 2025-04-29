
import React from 'react';
import { Star, MapPin, CheckCircle, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { Provider } from '@/types/provider';
import { useNavigate } from 'react-router-dom';

const ProviderCard = ({ provider }: { provider: Provider }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleContact = () => {
    toast({
      title: "Connexion requise",
      description: "Veuillez vous connecter pour contacter ce prestataire.",
    });
    
    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate("/connexion");
    }, 1500);
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={provider.image} alt={provider.name} />
              <AvatarFallback>{provider.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <h3 className="font-semibold">{provider.name}</h3>
                {provider.verified && (
                  <CheckCircle className="h-4 w-4 text-green-500 ml-1" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{provider.companyName || provider.subcategory}</p>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">{provider.rating}</span>
                <span className="text-sm text-muted-foreground ml-1">
                  ({provider.reviewCount || '0'} avis)
                </span>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" /> {provider.city || provider.location}
          </Badge>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {provider.services?.slice(0, 3).map((service, index) => (
              <Badge key={index} variant="outline">
                {service}
              </Badge>
            ))}
            {provider.services && provider.services.length > 3 && (
              <Badge variant="outline">+{provider.services.length - 3}</Badge>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <div>
            <span className="font-semibold">{provider.priceLevel || `${provider.hourlyRate}€/h`}</span>
            <span className="text-muted-foreground"> · {provider.languages?.join(', ') || 'Français'}</span>
          </div>
          <Button onClick={handleContact} className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Contacter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
