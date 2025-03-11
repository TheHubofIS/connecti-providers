
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Sliders, Star, MapPin, Filter, ChevronDown, X, Calendar, DollarSign, Briefcase, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import PrestatairesFilters from "@/components/PrestatairesFilters";
import PrestaireCard from "@/components/PrestaireCard";

// Types for providers
export type Provider = {
  id: string;
  name: string;
  title: string;
  category: string;
  subcategory: string;
  specialty: string;
  location: string;
  country: string;
  city: string;
  languages: string[];
  rating: number;
  reviews: number;
  image: string;
  hourlyRate: number;
  availability: string;
  responseTime: string;
  featuredProject?: string;
  skills: string[];
  verified: boolean;
  featured?: boolean;
  lastActive?: string;
  completionRate?: number;
};

// Données fictives des prestataires plus complètes
const providersData: Provider[] = [
  {
    id: "1",
    name: "Sophie Dubois",
    title: "Avocate spécialisée en droit des affaires",
    category: "Juridique",
    subcategory: "Droit des affaires",
    specialty: "Contrats internationaux",
    location: "Barcelone, Espagne",
    country: "Espagne",
    city: "Barcelone",
    languages: ["Français", "Anglais", "Espagnol"],
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    hourlyRate: 150,
    availability: "Disponible dans 2 jours",
    responseTime: "< 2 heures",
    skills: ["Droit des contrats", "Propriété intellectuelle", "Médiation commerciale"],
    verified: true,
    featured: true,
    lastActive: "Il y a 1 jour",
    completionRate: 98
  },
  {
    id: "2",
    name: "Pierre Martin",
    title: "Expert-comptable spécialiste fiscal",
    category: "Comptabilité",
    subcategory: "Fiscalité",
    specialty: "Fiscalité internationale",
    location: "Lisbonne, Portugal",
    country: "Portugal",
    city: "Lisbonne",
    languages: ["Français", "Anglais", "Portugais"],
    rating: 4.8,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    hourlyRate: 120,
    availability: "Disponible maintenant",
    responseTime: "< 1 heure",
    skills: ["Optimisation fiscale", "Comptabilité internationale", "Audit financier"],
    verified: true,
    lastActive: "En ligne",
    completionRate: 100
  },
  {
    id: "3",
    name: "Julie Lefèvre",
    title: "Développeuse fullstack React/Node.js",
    category: "IT",
    subcategory: "Développement web",
    specialty: "Applications web React",
    location: "Berlin, Allemagne",
    country: "Allemagne",
    city: "Berlin",
    languages: ["Français", "Anglais", "Allemand"],
    rating: 5.0,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    hourlyRate: 90,
    availability: "Disponible la semaine prochaine",
    responseTime: "< 5 heures",
    featuredProject: "Application SaaS de gestion de projet",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    verified: true,
    featured: true,
    lastActive: "Il y a 3 jours",
    completionRate: 95
  },
  {
    id: "4",
    name: "Thomas Roux",
    title: "Médecin généraliste consultant",
    category: "Médical",
    subcategory: "Médecine générale",
    specialty: "Consultation à distance",
    location: "Montréal, Canada",
    country: "Canada",
    city: "Montréal",
    languages: ["Français", "Anglais"],
    rating: 4.7,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    hourlyRate: 200,
    availability: "Disponible dans 3 jours",
    responseTime: "< 12 heures",
    skills: ["Téléconsultation", "Médecine préventive", "Suivi patient"],
    verified: true,
    lastActive: "Il y a 2 jours",
    completionRate: 97
  },
  {
    id: "5",
    name: "Marie Dupont",
    title: "Chirurgien-dentiste spécialiste prothèses",
    category: "Dentaire",
    subcategory: "Prothèses",
    specialty: "Prothèses dentaires",
    location: "Budapest, Hongrie",
    country: "Hongrie",
    city: "Budapest",
    languages: ["Français", "Anglais", "Hongrois"],
    rating: 4.9,
    reviews: 113,
    image: "https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    hourlyRate: 180,
    availability: "Disponible dans 1 semaine",
    responseTime: "< 24 heures",
    skills: ["Implantologie", "Prothèses complètes", "Esthétique dentaire"],
    verified: true,
    lastActive: "Il y a 4 jours",
    completionRate: 99
  },
  {
    id: "6",
    name: "Alex Bernard",
    title: "Avocat spécialisé en droit immobilier",
    category: "Juridique",
    subcategory: "Droit immobilier",
    specialty: "Investissements étrangers",
    location: "Miami, États-Unis",
    country: "États-Unis",
    city: "Miami",
    languages: ["Français", "Anglais", "Espagnol"],
    rating: 4.8,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    hourlyRate: 160,
    availability: "Disponible demain",
    responseTime: "< 3 heures",
    skills: ["Transactions immobilières", "Baux commerciaux", "Investissements étrangers"],
    verified: true,
    lastActive: "Il y a 1 jour",
    completionRate: 96
  },
  {
    id: "7",
    name: "Claire Moreau",
    title: "Consultante en marketing digital",
    category: "IT",
    subcategory: "Marketing digital",
    specialty: "Stratégie SEO/SEM",
    location: "Montréal, Canada",
    country: "Canada",
    city: "Montréal",
    languages: ["Français", "Anglais"],
    rating: 4.6,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1605511062801-33bde03e4df7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    hourlyRate: 85,
    availability: "Disponible maintenant",
    responseTime: "< 1 heure",
    skills: ["SEO", "Google Ads", "Réseaux sociaux", "Analyse de données"],
    verified: true,
    lastActive: "En ligne",
    completionRate: 92
  },
  {
    id: "8",
    name: "François Dubois",
    title: "Conseiller en investissement",
    category: "Comptabilité",
    subcategory: "Investissement",
    specialty: "Gestion de portefeuille",
    location: "Zurich, Suisse",
    country: "Suisse",
    city: "Zurich",
    languages: ["Français", "Anglais", "Allemand"],
    rating: 4.7,
    reviews: 104,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    hourlyRate: 175,
    availability: "Disponible dans 2 jours",
    responseTime: "< 6 heures",
    skills: ["Planification financière", "Gestion de patrimoine", "Fiscalité internationale"],
    verified: true,
    lastActive: "Il y a 2 jours",
    completionRate: 94
  },
];

// Catégories et sous-catégories pour le filtre
const categories = [
  {
    name: "Juridique",
    subcategories: [
      "Droit des affaires", 
      "Droit immobilier", 
      "Droit international", 
      "Propriété intellectuelle",
      "Droit fiscal"
    ]
  },
  {
    name: "Comptabilité",
    subcategories: [
      "Fiscalité", 
      "Audit", 
      "Gestion financière", 
      "Investissement",
      "Comptabilité d'entreprise"
    ]
  },
  {
    name: "IT",
    subcategories: [
      "Développement web", 
      "Développement mobile", 
      "Data Science", 
      "DevOps",
      "Cybersécurité",
      "Marketing digital"
    ]
  },
  {
    name: "Médical",
    subcategories: [
      "Médecine générale", 
      "Cardiologie", 
      "Dermatologie", 
      "Psychiatrie",
      "Psychologie"
    ]
  },
  {
    name: "Dentaire",
    subcategories: [
      "Dentisterie générale", 
      "Orthodontie", 
      "Chirurgie dentaire", 
      "Prothèses",
      "Implantologie"
    ]
  }
];

// Liste des pays pour le filtre
const countries = [
  "Allemagne",
  "Espagne",
  "États-Unis",
  "Canada",
  "Portugal",
  "Suisse",
  "Hongrie",
  "Royaume-Uni",
  "Irlande",
  "Italie"
];

// Liste des langues pour le filtre
const languages = [
  "Français",
  "Anglais",
  "Espagnol",
  "Allemand",
  "Portugais",
  "Italien",
  "Hongrois"
];

const Prestataires = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 250]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [availabilityFilter, setAvailabilityFilter] = useState<string | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>(providersData);
  const [sortOrder, setSortOrder] = useState<string>("featured");
  const [isLoading, setIsLoading] = useState(false);

  // Générer des suggestions basées sur la requête
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Collecter tous les termes indexables
    const allTerms: string[] = [];
    providersData.forEach(provider => {
      allTerms.push(provider.name);
      allTerms.push(provider.specialty);
      allTerms.push(provider.title);
      allTerms.push(provider.category);
      allTerms.push(provider.subcategory);
      allTerms.push(...provider.skills);
    });

    // Filtrer pour trouver des correspondances
    const filtered = [...new Set(allTerms)].filter(
      term => term.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [searchQuery]);

  // Appliquer les filtres
  useEffect(() => {
    setIsLoading(true);
    
    // Simuler un délai de chargement
    setTimeout(() => {
      // Appliquer tous les filtres
      let results = providersData.filter(provider => {
        // Filtre de recherche
        const searchMatch = !searchQuery || 
          provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          provider.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          provider.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
          provider.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
        
        // Filtre de catégorie
        const categoryMatch = !selectedCategory || provider.category === selectedCategory;
        
        // Filtre de sous-catégorie
        const subcategoryMatch = !selectedSubcategory || provider.subcategory === selectedSubcategory;
        
        // Filtre de pays
        const countryMatch = !selectedCountry || provider.country === selectedCountry;
        
        // Filtre de langues
        const languageMatch = selectedLanguages.length === 0 || 
          selectedLanguages.every(lang => provider.languages.includes(lang));
        
        // Filtre de prix
        const priceMatch = provider.hourlyRate >= priceRange[0] && provider.hourlyRate <= priceRange[1];
        
        // Filtre d'évaluation
        const ratingMatch = !ratingFilter || provider.rating >= ratingFilter;
        
        // Filtre de disponibilité
        const availabilityMatch = !availabilityFilter || 
          (availabilityFilter === "now" && provider.availability.includes("maintenant")) ||
          (availabilityFilter === "today" && provider.availability.includes("aujourd'hui")) ||
          (availabilityFilter === "tomorrow" && provider.availability.includes("demain")) ||
          (availabilityFilter === "week" && provider.availability.includes("semaine"));
        
        // Filtre de vérification
        const verifiedMatch = !verifiedOnly || provider.verified;
        
        return searchMatch && categoryMatch && subcategoryMatch && countryMatch && 
               languageMatch && priceMatch && ratingMatch && availabilityMatch && verifiedMatch;
      });
      
      // Appliquer le tri
      switch (sortOrder) {
        case "price-asc":
          results.sort((a, b) => a.hourlyRate - b.hourlyRate);
          break;
        case "price-desc":
          results.sort((a, b) => b.hourlyRate - a.hourlyRate);
          break;
        case "rating":
          results.sort((a, b) => b.rating - a.rating);
          break;
        case "reviews":
          results.sort((a, b) => b.reviews - a.reviews);
          break;
        case "featured":
        default:
          // Prestataires mis en avant d'abord, puis par évaluation
          results.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return b.rating - a.rating;
          });
      }
      
      setFilteredProviders(results);
      setIsLoading(false);
      
      // Mettre à jour les filtres actifs pour l'affichage
      const newActiveFilters: string[] = [];
      if (selectedCategory) newActiveFilters.push(selectedCategory);
      if (selectedSubcategory) newActiveFilters.push(selectedSubcategory);
      if (selectedCountry) newActiveFilters.push(selectedCountry);
      selectedLanguages.forEach(lang => newActiveFilters.push(lang));
      if (ratingFilter) newActiveFilters.push(`${ratingFilter}★+`);
      if (verifiedOnly) newActiveFilters.push("Vérifiés uniquement");
      if (searchQuery) newActiveFilters.push(`"${searchQuery}"`);
      
      setActiveFilters(newActiveFilters);
    }, 300); // Délai simulé pour montrer le chargement
  }, [
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    selectedCountry,
    selectedLanguages,
    priceRange,
    ratingFilter,
    availabilityFilter,
    verifiedOnly,
    sortOrder
  ]);

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedCountry(null);
    setSelectedLanguages([]);
    setPriceRange([0, 250]);
    setRatingFilter(null);
    setAvailabilityFilter(null);
    setVerifiedOnly(false);
    
    toast({
      title: "Filtres réinitialisés",
      description: "Tous les prestataires sont maintenant affichés."
    });
  };

  // Sauvegarder la recherche
  const saveSearch = () => {
    toast({
      title: "Recherche sauvegardée",
      description: "Vous recevrez des alertes pour les nouveaux prestataires correspondant à vos critères."
    });
  };

  // Sélectionner une suggestion
  const selectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  // Ajouter ou supprimer une langue
  const toggleLanguage = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter(lang => lang !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  // Supprimer un filtre actif
  const removeFilter = (filter: string) => {
    if (filter === selectedCategory) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    } else if (filter === selectedSubcategory) {
      setSelectedSubcategory(null);
    } else if (filter === selectedCountry) {
      setSelectedCountry(null);
    } else if (selectedLanguages.includes(filter)) {
      setSelectedLanguages(selectedLanguages.filter(lang => lang !== filter));
    } else if (filter.includes("★")) {
      setRatingFilter(null);
    } else if (filter === "Vérifiés uniquement") {
      setVerifiedOnly(false);
    } else if (filter.startsWith('"') && filter.endsWith('"')) {
      setSearchQuery("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Titre et description */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Trouvez le prestataire français idéal pour votre projet
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Explorez notre réseau d'experts français basés à l'étranger, spécialisés dans les domaines juridique, comptable, IT, médical et dentaire.
            </p>
          </div>
          
          {/* Recherche principale */}
          <div className="relative mb-8 max-w-4xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, spécialité, compétence..."
                className="w-full py-3 pl-12 pr-4 rounded-xl border border-input bg-card focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(suggestions.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              {searchQuery && (
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {/* Suggestions de recherche */}
            {showSuggestions && (
              <div className="absolute z-10 mt-1 w-full bg-card border border-input rounded-lg shadow-lg">
                <ul className="py-1">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} className="px-4 py-2 hover:bg-primary/5 cursor-pointer" onClick={() => selectSuggestion(suggestion)}>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Affichage des filtres actifs */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6 max-w-5xl mx-auto">
              {activeFilters.map((filter, index) => (
                <Badge key={index} variant="secondary" className="py-1 px-3 flex items-center gap-1">
                  {filter}
                  <button onClick={() => removeFilter(filter)} className="ml-1 hover:text-primary">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={resetFilters} className="text-sm">
                Réinitialiser tous les filtres
              </Button>
            </div>
          )}
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filtres pour desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
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
                            id={`category-${category.name}`}
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
                            htmlFor={`category-${category.name}`}
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
                                  id={`subcat-${subcat}`}
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
                                  htmlFor={`subcat-${subcat}`}
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
                          id={`lang-${language}`}
                          checked={selectedLanguages.includes(language)}
                          onCheckedChange={() => toggleLanguage(language)}
                        />
                        <label
                          htmlFor={`lang-${language}`}
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
                          id={`avail-${option.id}`}
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
                          htmlFor={`avail-${option.id}`}
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
                      id="verified-only"
                      checked={verifiedOnly}
                      onCheckedChange={(checked) => setVerifiedOnly(!!checked)}
                    />
                    <label
                      htmlFor="verified-only"
                      className="ml-2 text-sm font-medium cursor-pointer"
                    >
                      Prestataires vérifiés uniquement
                    </label>
                  </div>
                </div>
                
                {/* Bouton de sauvegarde */}
                <div className="pt-4 border-t border-border">
                  <Button onClick={saveSearch} variant="outline" className="w-full">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Sauvegarder cette recherche
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Filtres pour mobile */}
            <Dialog open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <DialogContent className="sm:max-w-[425px] h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Filtres</h2>
                <PrestatairesFilters 
                  categories={categories}
                  countries={countries}
                  languages={languages}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedSubcategory={selectedSubcategory}
                  setSelectedSubcategory={setSelectedSubcategory}
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                  selectedLanguages={selectedLanguages}
                  toggleLanguage={toggleLanguage}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  ratingFilter={ratingFilter}
                  setRatingFilter={setRatingFilter}
                  availabilityFilter={availabilityFilter}
                  setAvailabilityFilter={setAvailabilityFilter}
                  verifiedOnly={verifiedOnly}
                  setVerifiedOnly={setVerifiedOnly}
                  resetFilters={resetFilters}
                  closeFilters={() => setMobileFiltersOpen(false)}
                />
              </DialogContent>
            </Dialog>
            
            {/* Liste des prestataires */}
            <div className="flex-grow">
              <div className="flex flex-col space-y-6">
                {/* Barre d'options mobile */}
                <div className="lg:hidden flex items-center justify-between">
                  <DialogTrigger asChild onClick={() => setMobileFiltersOpen(true)}>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtres
                      {activeFilters.length > 0 && (
                        <Badge className="ml-2 bg-primary text-primary-foreground" variant="secondary">
                          {activeFilters.length}
                        </Badge>
                      )}
                    </Button>
                  </DialogTrigger>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Trier par:</span>
                    <select
                      className="py-1 px-2 text-sm border border-input rounded-md bg-transparent"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                    >
                      <option value="featured">Mis en avant</option>
                      <option value="price-asc">Prix croissant</option>
                      <option value="price-desc">Prix décroissant</option>
                      <option value="rating">Meilleures évaluations</option>
                      <option value="reviews">Plus d'avis</option>
                    </select>
                  </div>
                </div>
                
                {/* Barre d'options desktop */}
                <div className="hidden lg:flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {filteredProviders.length} prestataire{filteredProviders.length !== 1 && "s"} trouvé{filteredProviders.length !== 1 && "s"}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Trier par:</span>
                    <select
                      className="py-1 px-2 text-sm border border-input rounded-md bg-transparent"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                    >
                      <option value="featured">Mis en avant</option>
                      <option value="price-asc">Prix croissant</option>
                      <option value="price-desc">Prix décroissant</option>
                      <option value="rating">Meilleures évaluations</option>
                      <option value="reviews">Plus d'avis</option>
                    </select>
                  </div>
                </div>
                
                {/* Affichage des prestataires */}
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="bg-card/60 animate-pulse rounded-xl h-96"></div>
                    ))}
                  </div>
                ) : filteredProviders.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="flex justify-center mb-4">
                      <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <Search className="h-10 w-10 text-primary/60" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Aucun prestataire trouvé</h3>
                    <p className="text-muted-foreground mb-6">
                      Aucun prestataire ne correspond à vos critères de recherche actuels.
                    </p>
                    <Button onClick={resetFilters}>Réinitialiser les filtres</Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {filteredProviders.map((provider) => (
                      <PrestaireCard key={provider.id} provider={provider} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Prestataires;
