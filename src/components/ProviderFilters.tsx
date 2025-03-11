
import React from 'react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export type FilterOptions = {
  category: string;
  location: string;
  rating: string;
  availability: string;
};

type Props = {
  onFilterChange: (filters: Partial<FilterOptions>) => void;
};

const ProviderFilters = ({ onFilterChange }: Props) => {
  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border border-border">
      <h3 className="font-semibold text-lg mb-4">Filtres</h3>
      
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Catégorie</label>
          <Select onValueChange={(value) => onFilterChange({ category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Toutes les catégories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              <SelectItem value="consulting">Conseil</SelectItem>
              <SelectItem value="legal">Services juridiques</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="tech">Technologie</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Localisation</label>
          <Select onValueChange={(value) => onFilterChange({ location: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Toutes les localisations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les localisations</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="america">Amériques</SelectItem>
              <SelectItem value="asia">Asie</SelectItem>
              <SelectItem value="africa">Afrique</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Note minimum</label>
          <Select onValueChange={(value) => onFilterChange({ rating: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Toutes les notes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les notes</SelectItem>
              <SelectItem value="4">4+ étoiles</SelectItem>
              <SelectItem value="3">3+ étoiles</SelectItem>
              <SelectItem value="2">2+ étoiles</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Disponibilité</label>
          <Select onValueChange={(value) => onFilterChange({ availability: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Toute disponibilité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toute disponibilité</SelectItem>
              <SelectItem value="available">Disponible maintenant</SelectItem>
              <SelectItem value="this_week">Cette semaine</SelectItem>
              <SelectItem value="this_month">Ce mois</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onFilterChange({ 
            category: 'all', 
            location: 'all', 
            rating: 'all', 
            availability: 'all' 
          })}
        >
          Réinitialiser les filtres
        </Button>
      </div>
    </div>
  );
};

export default ProviderFilters;
