
import { Provider } from "@/types/provider";

export const categories = [
  {
    id: "medical",
    name: "Médical",
    icon: "stethoscope",
    description: "Professionnels de santé pour expatriés",
    subcategories: [
      "Médecin généraliste",
      "Pédiatre",
      "Dentiste",
      "Spécialiste",
      "Psychologue",
      "Kiné"
    ]
  },
  {
    id: "legal",
    name: "Légal",
    icon: "scale",
    description: "Services juridiques et administratifs",
    subcategories: [
      "Avocat",
      "Notaire",
      "Traducteur assermenté",
      "Conseiller visa",
      "Conseiller fiscal"
    ]
  },
  {
    id: "finance",
    name: "Finance",
    icon: "landmark",
    description: "Gestion financière internationale",
    subcategories: [
      "Comptable",
      "Banquier",
      "Conseiller fiscal",
      "Assureur",
      "Planificateur financier"
    ]
  },
  {
    id: "realestate",
    name: "Immobilier",
    icon: "home",
    description: "Trouver un logement à l'étranger",
    subcategories: [
      "Agent immobilier",
      "Conseiller en location",
      "Inspection",
      "Gestion de propriété",
      "Relocation"
    ]
  },
  {
    id: "education",
    name: "Éducation",
    icon: "graduation-cap",
    description: "Services éducatifs internationaux",
    subcategories: [
      "École internationale",
      "Tuteur",
      "Conseiller en éducation",
      "Cours de langue",
      "Formation professionnelle"
    ]
  },
  {
    id: "translation",
    name: "Traduction",
    icon: "languages",
    description: "Services de traduction et interprétation",
    subcategories: [
      "Traducteur document",
      "Interprète",
      "Localisation",
      "Traduction technique",
      "Traduction site web"
    ]
  },
  {
    id: "auto",
    name: "Automobile",
    icon: "car",
    description: "Services automobiles pour expatriés",
    subcategories: [
      "Achat/Location",
      "Assurance",
      "Immatriculation",
      "Permis international",
      "Mécanique"
    ]
  },
  {
    id: "moving",
    name: "Déménagement",
    icon: "truck",
    description: "Services de déménagement international",
    subcategories: [
      "Déménageur international",
      "Stockage",
      "Emballage",
      "Formalités douanières",
      "Assurance"
    ]
  }
];

// Generate random number between min and max (inclusive)
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

// Generate random rating between 3.5 and 5.0 with one decimal place
const randomRating = () => (Math.floor(randomInt(35, 50)) / 10);

// Generate random price level (1-3 € symbols)
const randomPriceLevel = () => "€".repeat(randomInt(1, 3));

// Generate array of random services
const generateRandomServices = (subcategories: string[]) => {
  const numServices = randomInt(2, 5);
  const shuffled = [...subcategories].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numServices);
};

// Generate fake review count
const randomReviewCount = () => randomInt(5, 250);

// Generate array of cities
const cities = [
  "Paris", "Lyon", "Marseille", "Bordeaux", "Toulouse", 
  "Lille", "Nantes", "Strasbourg", "Nice", "Rennes"
];

// List of French first names and last names for generating providers
const firstNames = [
  "Thomas", "Nicolas", "Julie", "Sophie", "Marie", 
  "Pierre", "Jean", "Philippe", "François", "Claire",
  "Hélène", "Antoine", "Laurent", "Sylvie", "Catherine",
  "Nathalie", "Isabelle", "Émilie", "Alexandre", "Aurélie"
];

const lastNames = [
  "Martin", "Bernard", "Dubois", "Thomas", "Robert",
  "Richard", "Petit", "Durand", "Leroy", "Moreau",
  "Simon", "Laurent", "Lefebvre", "Michel", "Garcia",
  "David", "Bertrand", "Roux", "Vincent", "Fournier"
];

// Generate company names
const generateCompanyName = (firstName: string, category: string) => {
  const prefixes = ["", "Cabinet ", "Agence ", "Groupe ", "Conseil ", "Studio ", "Services "];
  const suffixes = ["", " Consulting", " International", " & Associés", " Expert", " Pro", " Plus"];
  
  const prefix = prefixes[randomInt(0, prefixes.length - 1)];
  const suffix = suffixes[randomInt(0, suffixes.length - 1)];
  
  return `${prefix}${firstName} ${category}${suffix}`;
};

// Generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 11);

// Generate dummy providers for each category and subcategory
export const generateDummyProviders = (): Provider[] => {
  const providers: Provider[] = [];

  categories.forEach(category => {
    category.subcategories.forEach(subcategory => {
      // Generate 3-5 providers per subcategory
      const numProviders = randomInt(3, 5);

      for (let i = 0; i < numProviders; i++) {
        const firstName = firstNames[randomInt(0, firstNames.length - 1)];
        const lastName = lastNames[randomInt(0, lastNames.length - 1)];
        const city = cities[randomInt(0, cities.length - 1)];
        
        providers.push({
          id: generateId(),
          name: `${firstName} ${lastName}`,
          companyName: generateCompanyName(firstName, category.name),
          category: category.name,
          subcategory: subcategory,
          description: `Professionnel expérimenté spécialisé en ${subcategory} pour les expatriés. Services personnalisés et adaptés à vos besoins internationaux.`,
          city: city,
          services: generateRandomServices(category.subcategories),
          rating: randomRating(),
          reviewCount: randomReviewCount(),
          priceLevel: randomPriceLevel(),
          languages: ["Français", "Anglais"].concat(
            Math.random() > 0.5 ? ["Espagnol"] : [],
            Math.random() > 0.7 ? ["Allemand"] : [],
            Math.random() > 0.9 ? ["Italien"] : []
          ),
          image: `/placeholder.svg`,
          verified: Math.random() > 0.3, // 70% chance of being verified
          featured: Math.random() > 0.7, // 30% chance of being featured
          available: true
        });
      }
    });
  });

  return providers;
};

// Sample of featured providers for homepage
export const getFeaturedProviders = (): Provider[] => {
  const allProviders = generateDummyProviders();
  return allProviders
    .filter(provider => provider.featured)
    .slice(0, 8);
};

// Get providers by category
export const getProvidersByCategory = (categoryId: string): Provider[] => {
  const allProviders = generateDummyProviders();
  const category = categories.find(c => c.id === categoryId);
  
  if (!category) return [];
  
  return allProviders.filter(provider => provider.category === category.name);
};

// Get providers by subcategory
export const getProvidersBySubcategory = (categoryId: string, subcategory: string): Provider[] => {
  const allProviders = generateDummyProviders();
  const category = categories.find(c => c.id === categoryId);
  
  if (!category) return [];
  
  return allProviders.filter(
    provider => provider.category === category.name && provider.subcategory === subcategory
  );
};

// Search providers by text query
export const searchProviders = (query: string): Provider[] => {
  if (!query || query.trim() === '') return [];
  
  const allProviders = generateDummyProviders();
  const normalizedQuery = query.toLowerCase().trim();
  
  return allProviders.filter(provider => 
    provider.name.toLowerCase().includes(normalizedQuery) ||
    provider.companyName.toLowerCase().includes(normalizedQuery) ||
    provider.category.toLowerCase().includes(normalizedQuery) ||
    provider.subcategory.toLowerCase().includes(normalizedQuery) ||
    provider.description.toLowerCase().includes(normalizedQuery) ||
    provider.city.toLowerCase().includes(normalizedQuery) ||
    provider.services.some(service => service.toLowerCase().includes(normalizedQuery))
  );
};
