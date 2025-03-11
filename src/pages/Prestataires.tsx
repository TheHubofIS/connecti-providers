
import { useState, useEffect } from "react";
import { Search, Filter, Star, MapPin, CheckCircle, X, Calendar, Users, DollarSign } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Sample provider data
const allProviders = [
  {
    id: "1",
    name: "Sophie Dubois",
    category: "Juridique",
    subcategory: "Droit des affaires",
    skills: ["Contrats internationaux", "Fusions-acquisitions", "Droit fiscal"],
    location: "Barcelone, Espagne",
    rating: 4.9,
    reviews: 124,
    price: 150,
    availability: "Immédiate",
    languages: ["Français", "Anglais", "Espagnol"],
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "2",
    name: "Pierre Martin",
    category: "Comptabilité",
    subcategory: "Fiscalité internationale",
    skills: ["Optimisation fiscale", "Comptabilité d'entreprise", "Audit financier"],
    location: "Lisbonne, Portugal",
    rating: 4.8,
    reviews: 98,
    price: 120,
    availability: "Dans 1 semaine",
    languages: ["Français", "Anglais", "Portugais"],
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "3",
    name: "Julie Lefèvre",
    category: "IT",
    subcategory: "Développement web",
    skills: ["React", "Node.js", "AWS", "Architecture cloud"],
    location: "Berlin, Allemagne",
    rating: 5.0,
    reviews: 156,
    price: 180,
    availability: "Dans 2 semaines",
    languages: ["Français", "Anglais", "Allemand"],
    image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "4",
    name: "Thomas Roux",
    category: "Médical",
    subcategory: "Consultation à distance",
    skills: ["Médecine générale", "Suivi médical expatriés", "Téléconsultation"],
    location: "Montréal, Canada",
    rating: 4.7,
    reviews: 87,
    price: 90,
    availability: "Immédiate",
    languages: ["Français", "Anglais"],
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "5",
    name: "Marie Dupont",
    category: "Dentaire",
    subcategory: "Prothèses dentaires",
    skills: ["Implantologie", "Prothèses sur-mesure", "Esthétique dentaire"],
    location: "Budapest, Hongrie",
    rating: 4.9,
    reviews: 113,
    price: 110,
    availability: "Dans 1 semaine",
    languages: ["Français", "Anglais", "Hongrois"],
    image: "https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "6",
    name: "Alex Bernard",
    category: "Juridique",
    subcategory: "Droit immobilier",
    skills: ["Transactions immobilières", "Contentieux", "Conseil juridique"],
    location: "Miami, États-Unis",
    rating: 4.8,
    reviews: 92,
    price: 160,
    availability: "Immédiate",
    languages: ["Français", "Anglais", "Espagnol"],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "7",
    name: "Camille Moreau",
    category: "IT",
    subcategory: "Cybersécurité",
    skills: ["Audit sécurité", "Pentesting", "Conformité RGPD"],
    location: "Tokyo, Japon",
    rating: 4.9,
    reviews: 78,
    price: 200,
    availability: "Dans 3 semaines",
    languages: ["Français", "Anglais", "Japonais"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "8",
    name: "Laurent Petit",
    category: "Comptabilité",
    subcategory: "Audit financier",
    skills: ["Contrôle de gestion", "Reporting financier", "Consolidation"],
    location: "Zurich, Suisse",
    rating: 4.7,
    reviews: 63,
    price: 170,
    availability: "Dans 1 semaine",
    languages: ["Français", "Anglais", "Allemand"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
];

// Categories
const categories = [
  { id: "juridique", name: "Juridique" },
  { id: "comptabilite", name: "Comptabilité" },
  { id: "it", name: "IT & Digital" },
  { id: "medical", name: "Médical" },
  { id: "dentaire", name: "Dentaire" },
];

// Availability options
const availabilityOptions = [
  "Immédiate",
  "Dans 1 semaine",
  "Dans 2 semaines",
  "Dans 3 semaines",
  "Dans 1 mois",
];

// Languages options
const languageOptions = [
  "Français",
  "Anglais",
  "Espagnol",
  "Allemand",
  "Portugais",
  "Italien",
  "Japonais",
  "Arabe",
  "Hongrois",
];

export default function Prestataires() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedAvailabilities, setSelectedAvailabilities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 250]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [filteredProviders, setFilteredProviders] = useState(allProviders);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Handle search input with suggestions
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 1) {
      // Generate suggestions based on provider names, skills, categories, locations
      const allSearchableTerms = allProviders.flatMap(provider => [
        provider.name,
        provider.category,
        provider.subcategory,
        provider.location,
        ...provider.skills
      ]);
      
      const uniqueTerms = Array.from(new Set(allSearchableTerms));
      const matchedSuggestions = uniqueTerms.filter(term => 
        term.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      
      setSuggestions(matchedSuggestions);
      setShowSuggestions(matchedSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  // Toggle category selection
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Toggle language selection
  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  // Toggle availability selection
  const toggleAvailability = (availability: string) => {
    setSelectedAvailabilities(prev => 
      prev.includes(availability) 
        ? prev.filter(a => a !== availability)
        : [...prev, availability]
    );
  };

  // Apply filters
  useEffect(() => {
    let results = allProviders;
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(provider => 
        provider.name.toLowerCase().includes(query) ||
        provider.category.toLowerCase().includes(query) ||
        provider.subcategory.toLowerCase().includes(query) ||
        provider.location.toLowerCase().includes(query) ||
        provider.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      results = results.filter(provider => 
        selectedCategories.includes(provider.category.toLowerCase())
      );
    }
    
    // Apply language filter
    if (selectedLanguages.length > 0) {
      results = results.filter(provider => 
        provider.languages.some(lang => selectedLanguages.includes(lang))
      );
    }
    
    // Apply availability filter
    if (selectedAvailabilities.length > 0) {
      results = results.filter(provider => 
        selectedAvailabilities.includes(provider.availability)
      );
    }
    
    // Apply price range filter
    results = results.filter(provider => 
      provider.price >= priceRange[0] && provider.price <= priceRange[1]
    );
    
    // Apply rating filter
    if (ratingFilter > 0) {
      results = results.filter(provider => provider.rating >= ratingFilter);
    }
    
    setFilteredProviders(results);
  }, [searchQuery, selectedCategories, selectedLanguages, selectedAvailabilities, priceRange, ratingFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Trouvez votre prestataire idéal</h1>
            <p className="text-muted-foreground">
              Des experts français à l'international, à votre service pour vos besoins spécifiques
            </p>
          </div>

          {/* Search bar with suggestions */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, compétence, spécialité..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                value={searchQuery}
                onChange={handleSearchInput}
                onFocus={() => setShowSuggestions(suggestions.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              <Button
                variant="default"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
            </div>
            
            {/* Search suggestions */}
            {showSuggestions && (
              <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-background border border-input rounded-lg shadow-lg z-10">
                <ul>
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-muted cursor-pointer"
                      onClick={() => selectSuggestion(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters panel */}
            <div className={`w-full lg:w-72 lg:block ${isFiltersOpen ? 'block' : 'hidden'}`}>
              <div className="bg-white dark:bg-secondary/50 rounded-lg border border-border p-4 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filtres</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedLanguages([]);
                      setSelectedAvailabilities([]);
                      setPriceRange([0, 250]);
                      setRatingFilter(0);
                      setSearchQuery('');
                    }}
                    className="h-8 text-xs"
                  >
                    Réinitialiser
                  </Button>
                </div>

                {/* Category filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Catégorie</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => toggleCategory(category.id)}
                        />
                        <label
                          htmlFor={`category-${category.id}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price range filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">
                    Tarif horaire (€)
                  </h3>
                  <Slider
                    min={0}
                    max={250}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-4"
                  />
                  <div className="flex justify-between text-sm">
                    <span>{priceRange[0]}€</span>
                    <span>{priceRange[1]}€</span>
                  </div>
                </div>

                {/* Rating filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Note minimale</h3>
                  <div className="flex space-x-1">
                    {[0, 1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setRatingFilter(rating)}
                        className={`w-8 h-8 rounded-md flex items-center justify-center ${
                          ratingFilter === rating
                            ? "bg-primary text-white"
                            : "bg-muted hover:bg-muted/80"
                        }`}
                      >
                        {rating === 0 ? "Tous" : rating}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Disponibilité</h3>
                  <div className="space-y-2">
                    {availabilityOptions.map(availability => (
                      <div key={availability} className="flex items-center">
                        <Checkbox
                          id={`availability-${availability}`}
                          checked={selectedAvailabilities.includes(availability)}
                          onCheckedChange={() => toggleAvailability(availability)}
                        />
                        <label
                          htmlFor={`availability-${availability}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {availability}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Language filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Langues parlées</h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <span>
                          {selectedLanguages.length > 0
                            ? `${selectedLanguages.length} sélectionnée(s)`
                            : "Sélectionner des langues"}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-0" align="start">
                      <div className="p-2 max-h-60 overflow-y-auto">
                        {languageOptions.map(language => (
                          <div key={language} className="flex items-center p-2">
                            <Checkbox
                              id={`language-${language}`}
                              checked={selectedLanguages.includes(language)}
                              onCheckedChange={() => toggleLanguage(language)}
                            />
                            <label
                              htmlFor={`language-${language}`}
                              className="ml-2 text-sm cursor-pointer w-full"
                            >
                              {language}
                            </label>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Applied filters */}
                {(selectedCategories.length > 0 || selectedLanguages.length > 0 || selectedAvailabilities.length > 0 || ratingFilter > 0) && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Filtres appliqués</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategories.map(categoryId => {
                        const category = categories.find(c => c.id === categoryId);
                        return category ? (
                          <Badge key={categoryId} className="pl-2 pr-1 py-1 flex items-center gap-1">
                            {category.name}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => toggleCategory(categoryId)}
                            />
                          </Badge>
                        ) : null;
                      })}
                      {selectedLanguages.map(language => (
                        <Badge key={language} className="pl-2 pr-1 py-1 flex items-center gap-1">
                          {language}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => toggleLanguage(language)}
                          />
                        </Badge>
                      ))}
                      {selectedAvailabilities.map(availability => (
                        <Badge key={availability} className="pl-2 pr-1 py-1 flex items-center gap-1">
                          {availability}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => toggleAvailability(availability)}
                          />
                        </Badge>
                      ))}
                      {ratingFilter > 0 && (
                        <Badge className="pl-2 pr-1 py-1 flex items-center gap-1">
                          {ratingFilter}+ ★
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => setRatingFilter(0)}
                          />
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="flex-1">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {filteredProviders.length} prestataire(s) trouvé(s)
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  >
                    {isFiltersOpen ? "Masquer les filtres" : "Afficher les filtres"}
                  </Button>
                </div>
              </div>

              {filteredProviders.length === 0 ? (
                <div className="bg-white dark:bg-secondary/50 rounded-lg border border-border p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    <Search className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Aucun résultat trouvé</h3>
                  <p className="text-muted-foreground mb-4">
                    Essayez de modifier vos critères de recherche ou de supprimer certains filtres.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className="bg-white dark:bg-secondary/80 rounded-xl overflow-hidden border border-border hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-60">
                        <img
                          src={provider.image}
                          alt={provider.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute top-3 left-3 z-10">
                          <Badge className="bg-primary hover:bg-primary text-white">
                            {provider.category}
                          </Badge>
                        </div>
                        <div className="absolute bottom-3 left-3 text-white z-10">
                          <h3 className="text-xl font-bold">{provider.name}</h3>
                          <p className="text-white/90">{provider.subcategory}</p>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm text-muted-foreground">
                              {provider.location}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                            <span className="text-sm font-medium">
                              {provider.rating}
                            </span>
                            <span className="text-xs text-muted-foreground ml-1">
                              ({provider.reviews} avis)
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {provider.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-primary/5">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-primary mr-2" />
                            <span>{provider.availability}</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-primary mr-2" />
                            <span>{provider.price}€/heure</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-primary mr-2" />
                            <span>{provider.languages.length} langues</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Link
                            to="/connexion"
                            className="text-sm text-primary font-medium hover:underline"
                          >
                            Contacter
                          </Link>
                          <Link
                            to={`/prestataires/${provider.id}`}
                            className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm"
                          >
                            Voir le profil
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
