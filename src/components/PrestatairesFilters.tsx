
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

type Category = {
  name: string;
  subcategories: string[];
};

type PrestatairesFiltersProps = {
  categories: Category[];
  countries: string[];
  languages: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedSubcategory: string | null;
  setSelectedSubcategory: (subcategory: string | null) => void;
  selectedCountry: string | null;
  setSelectedCountry: (country: string | null) => void;
  selectedLanguages: string[];
  toggleLanguage: (language: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  ratingFilter: number | null;
  setRatingFilter: (rating: number | null) => void;
  availabilityFilter: string | null;
  setAvailabilityFilter: (availability: string | null) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (verified: boolean) => void;
  resetFilters: () => void;
  closeFilters: () => void;
};

export default function PrestatairesFilters({
  categories,
  countries,
  languages,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  selectedCountry,
  setSelectedCountry,
  selectedLanguages,
  toggleLanguage,
  priceRange,
  setPriceRange,
  ratingFilter,
  setRatingFilter,
  availabilityFilter,
  setAvailabilityFilter,
  verifiedOnly,
  setVerifiedOnly,
  resetFilters,
  closeFilters,
}: PrestatairesFiltersProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Filtres</h2>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs">
          Réinitialiser
        </Button>
      </div>
      
      {/* Section catégorie */}
      <div className="space-y-4">
        <h3 className="font-medium text-sm">Catégorie</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.name} className="space-y-1">
              <div className="flex items-center">
                <Checkbox
                  id={`category-mobile-${category.name}`}
                  checked={selectedCategory === category.name}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCategory(category.name);
                      setSelectedSubcategory(null);
                    } else {
                      setSelectedCategory(null);
                    }
                  }}
                />
                <label
                  htmlFor={`category-mobile-${category.name}`}
                  className="ml-2 text-sm font-medium cursor-pointer"
                >
                  {category.name}
                </label>
              </div>
              
              {/* Sous-catégories */}
              {selectedCategory === category.name && (
                <div className="ml-6 space-y-1">
                  {category.subcategories.map((subcat) => (
                    <div key={subcat} className="flex items-center">
                      <Checkbox
                        id={`subcat-mobile-${subcat}`}
                        checked={selectedSubcategory === subcat}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedSubcategory(subcat);
                          } else {
                            setSelectedSubcategory(null);
                          }
                        }}
                      />
                      <label
                        htmlFor={`subcat-mobile-${subcat}`}
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {subcat}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Section localisation */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="font-medium text-sm">Localisation</h3>
        <div className="space-y-2">
          <select
            className="w-full py-2 px-3 border border-input rounded-md bg-transparent text-sm"
            value={selectedCountry || ""}
            onChange={(e) => setSelectedCountry(e.target.value || null)}
          >
            <option value="">Tous les pays</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Section langues */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="font-medium text-sm">Langues parlées</h3>
        <div className="space-y-2">
          {languages.map((language) => (
            <div key={language} className="flex items-center">
              <Checkbox
                id={`lang-mobile-${language}`}
                checked={selectedLanguages.includes(language)}
                onCheckedChange={() => toggleLanguage(language)}
              />
              <label
                htmlFor={`lang-mobile-${language}`}
                className="ml-2 text-sm cursor-pointer"
              >
                {language}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Section tarif horaire */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="font-medium text-sm">Tarif horaire (€)</h3>
        <div className="px-2">
          <Slider
            defaultValue={[0, 250]}
            max={250}
            step={10}
            value={[priceRange[0], priceRange[1]]}
            onValueChange={(value) => setPriceRange([value[0], value[1]])}
            className="my-4"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm">{priceRange[0]}€</span>
            <span className="text-sm">{priceRange[1]}€</span>
          </div>
        </div>
      </div>
      
      {/* Section évaluation */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="font-medium text-sm">Évaluation minimum</h3>
        <div className="flex items-center space-x-2">
          {[4, 4.5, 4.8].map((rating) => (
            <button
              key={rating}
              className={`py-1 px-3 rounded-full text-xs font-medium ${
                ratingFilter === rating
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground/80 hover:text-foreground"
              }`}
              onClick={() => setRatingFilter(ratingFilter === rating ? null : rating)}
            >
              {rating}+ <Star className="inline h-3 w-3 fill-current" />
            </button>
          ))}
        </div>
      </div>
      
      {/* Section disponibilité */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="font-medium text-sm">Disponibilité</h3>
        <div className="space-y-2">
          {[
            { id: "now", label: "Disponible maintenant" },
            { id: "today", label: "Aujourd'hui" },
            { id: "tomorrow", label: "Demain" },
            { id: "week", label: "Cette semaine" }
          ].map((option) => (
            <div key={option.id} className="flex items-center">
              <Checkbox
                id={`avail-mobile-${option.id}`}
                checked={availabilityFilter === option.id}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setAvailabilityFilter(option.id);
                  } else {
                    setAvailabilityFilter(null);
                  }
                }}
              />
              <label
                htmlFor={`avail-mobile-${option.id}`}
                className="ml-2 text-sm cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Section prestataires vérifiés */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center">
          <Checkbox
            id="verified-only-mobile"
            checked={verifiedOnly}
            onCheckedChange={(checked) => setVerifiedOnly(!!checked)}
          />
          <label
            htmlFor="verified-only-mobile"
            className="ml-2 text-sm font-medium cursor-pointer"
          >
            Prestataires vérifiés uniquement
          </label>
        </div>
      </div>
      
      {/* Boutons d'action */}
      <div className="flex space-x-2 pt-4 border-t border-border">
        <Button onClick={closeFilters} className="flex-1">
          Appliquer les filtres
        </Button>
        <Button onClick={resetFilters} variant="outline" className="flex-1">
          Réinitialiser
        </Button>
      </div>
    </div>
  );
}
