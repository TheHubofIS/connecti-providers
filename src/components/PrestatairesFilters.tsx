
import React from 'react';
import { categories } from '@/utils/serviceData';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';

export interface PrestatairesFiltersProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const PrestatairesFilters = ({ selectedCategory, onCategoryChange }: PrestatairesFiltersProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Catégories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div
            className={`flex items-center space-x-2 px-3 py-2 rounded-md cursor-pointer ${
              selectedCategory === "all" ? "bg-primary/10 text-primary" : "hover:bg-muted"
            }`}
            onClick={() => onCategoryChange("all")}
          >
            <span>Toutes les catégories</span>
          </div>
          {categories.map((category) => (
            <div
              key={category.id}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md cursor-pointer ${
                selectedCategory === category.id ? "bg-primary/10 text-primary" : "hover:bg-muted"
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              <span>{category.name}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Tarifs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <ToggleGroup type="single" defaultValue="any">
              <ToggleGroupItem value="any">Tous</ToggleGroupItem>
              <ToggleGroupItem value="€">€</ToggleGroupItem>
              <ToggleGroupItem value="€€">€€</ToggleGroupItem>
              <ToggleGroupItem value="€€€">€€€</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Note minimum</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-4">
            <ToggleGroup type="single" defaultValue="any">
              <ToggleGroupItem value="any">Tous</ToggleGroupItem>
              <ToggleGroupItem value="3">3+</ToggleGroupItem>
              <ToggleGroupItem value="4">4+</ToggleGroupItem>
              <ToggleGroupItem value="4.5">4.5+</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Langues parlées</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="lang-fr" />
              <label htmlFor="lang-fr" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Français
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="lang-en" />
              <label htmlFor="lang-en" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Anglais
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="lang-es" />
              <label htmlFor="lang-es" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Espagnol
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="lang-de" />
              <label htmlFor="lang-de" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Allemand
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Vérification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="verified" />
            <label htmlFor="verified" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Prestataires vérifiés uniquement
            </label>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full">Appliquer les filtres</Button>
    </div>
  );
};

export default PrestatairesFilters;
