
import React from 'react';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export type Provider = {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviewCount: number;
  location: string;
  imageUrl: string;
  categories: string[];
  hourlyRate: number;
  availability: string;
};

const ProviderCard = ({ provider }: { provider: Provider }) => {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={provider.imageUrl} alt={provider.name} />
              <AvatarFallback>{provider.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{provider.name}</h3>
              <p className="text-sm text-muted-foreground">{provider.title}</p>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">{provider.rating}</span>
                <span className="text-sm text-muted-foreground ml-1">
                  ({provider.reviewCount} avis)
                </span>
              </div>
            </div>
          </div>
          <Badge variant="secondary">{provider.location}</Badge>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {provider.categories.map((category, index) => (
              <Badge key={index} variant="outline">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="font-semibold">{provider.hourlyRate}€</span>
            <span className="text-muted-foreground">/heure</span>
          </div>
          <Button>Contacter</Button>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
