
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

// Réelles images professionnelles par catégorie
const professionalImages = {
  "Médical": [
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2048&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop"
  ],
  "Légal": [
    "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1643322437638-cf3cb0a1ce50?q=80&w=2070&auto=format&fit=crop"
  ],
  "Finance": [
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?q=80&w=2076&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop"
  ],
  "Immobilier": [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556155092-8707de31f9c4?q=80&w=2070&auto=format&fit=crop"
  ],
  "Éducation": [
    "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
  ],
  "Traduction": [
    "https://images.unsplash.com/photo-1493673272479-a20888bcee10?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523289333742-be1143f6b766?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
  ],
  "Automobile": [
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531921391719-849a92902ec0?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600661653561-629509216228?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=2069&auto=format&fit=crop"
  ],
  "Déménagement": [
    "https://images.unsplash.com/photo-1600518464059-424a41be3a0d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1609134545248-1d41792896ae?q=80&w=1978&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?q=80&w=2074&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=2071&auto=format&fit=crop"
  ]
};

// Profils professionnels
const avatarImages = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=500&auto=format&fit=crop"
];

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
        const avatar = avatarImages[randomInt(0, avatarImages.length - 1)];
        const categoryImages = professionalImages[category.name] || [];
        const image = categoryImages.length > 0 ? categoryImages[randomInt(0, categoryImages.length - 1)] : "/placeholder.svg";
        
        const experience = `${randomInt(3, 25)}+ ans`;
        const hourlyRate = randomInt(30, 200);
        const responseTime = ["< 2h", "< 24h", "24-48h"][randomInt(0, 2)];
        const completionRate = randomInt(92, 100);
        
        // Educational background
        const educationOptions = [
          ["Master en Finance, HEC Paris", "DSCG - Diplôme supérieur de comptabilité et de gestion"],
          ["Doctorat en Médecine, Université Paris Descartes", "Spécialisation en Médecine Générale"],
          ["DUT en Logistique et Transport", "BTS Commerce International"],
          ["Diplôme d'État de Docteur en Pharmacie", "Master en Santé Publique"],
          ["Diplôme national d'œnologue", "Master en Viticulture et Œnologie"],
          ["LLM - Master en Droit International des Affaires", "École du Barreau de Paris"],
          ["Diplôme d'État d'Architecte", "Licence professionnelle en Construction Durable"],
          ["Master en Ressources Humaines, Sciences Po", "Certification en Gestion des Talents"]
        ];
        
        const education = educationOptions[randomInt(0, educationOptions.length - 1)];
        
        // Certifications
        const certificationOptions = [
          ["Certified Public Accountant (CPA)", "Chartered Financial Analyst (CFA)"],
          ["Certification en Médecine d'Urgence", "ACLS - Advanced Cardiac Life Support"],
          ["Certification OSHA en Sécurité", "Licence d'Agent Immobilier"],
          ["Certification Lean Six Sigma - Ceinture Noire", "PMP - Project Management Professional"],
          ["Certification ISO 9001", "Agrément Services à la Personne"],
          ["Certification Oracle Database Administrator", "Microsoft Certified Solutions Expert"],
          ["Certification en Thérapie Cognitive et Comportementale", "Licence en Hypnothérapie Clinique"],
          ["Courtier en Assurances - ORIAS", "Certification en Gestion de Patrimoine"]
        ];
        
        const certifications = certificationOptions[randomInt(0, certificationOptions.length - 1)];
        
        // Specialties
        const specialtyOptions = {
          "Médical": ["Médecine préventive", "Téléconsultation", "Urgences", "Suivi post-opératoire", "Check-up complet"],
          "Légal": ["Droit des affaires international", "Fiscalité des expatriés", "Droit immobilier", "Contentieux", "Successions internationales"],
          "Finance": ["Fiscalité internationale", "Consolidation", "Optimisation fiscale", "Audit", "Reporting financier"],
          "Immobilier": ["Investissement locatif", "Logements haut de gamme", "Gestion locative", "Défiscalisation", "Property Finding"],
          "Éducation": ["Programmes bilingues", "Préparation au Baccalauréat International", "Soutien scolaire personnalisé", "Méthode Montessori", "Formation continue"],
          "Traduction": ["Documents officiels", "Traduction médicale", "Traduction juridique", "Interprétation simultanée", "Localisation de sites web"],
          "Automobile": ["Voitures de luxe", "Import/Export de véhicules", "Location longue durée", "Remise aux normes françaises", "Leasing professionnel"],
          "Déménagement": ["Déménagement d'œuvres d'art", "Relocation de familles", "Transport international", "Garde-meuble sécurisé", "Services VIP"]
        };
        
        let specialties = specialtyOptions[category.name] || ["Service premium", "Conseil personnalisé", "Suivi client", "Solution sur mesure"];
        specialties = [...specialties].sort(() => 0.5 - Math.random()).slice(0, randomInt(3, 5));
        
        // Client types
        const clientOptions = [
          ["PME", "Start-ups", "Entrepreneurs individuels", "Grandes entreprises"],
          ["Particuliers", "Familles", "Seniors", "Jeunes actifs"],
          ["Expatriés", "Investisseurs étrangers", "Diplomates", "Cadres internationaux"],
          ["Étudiants internationaux", "Digital nomads", "Retraités à l'étranger", "Travailleurs détachés"]
        ];
        
        const clients = clientOptions[randomInt(0, clientOptions.length - 1)];
        
        // Approach
        const approachOptions = [
          "Approche personnalisée et sur-mesure pour chaque client, avec une attention particulière à la conformité réglementaire et à l'optimisation fiscale.",
          "Service attentif et bienveillant, axé sur l'écoute des besoins spécifiques des expatriés et la recherche des meilleures solutions.",
          "Accompagnement global avec un point de contact unique pour simplifier vos démarches et garantir un suivi continu de votre dossier.",
          "Méthode innovante combinant outils numériques et expertise humaine pour des résultats efficaces et adaptés à votre situation.",
          "Conseil stratégique basé sur une connaissance approfondie du marché international et des enjeux liés à l'expatriation."
        ];
        
        const approach = approachOptions[randomInt(0, approachOptions.length - 1)];
        
        providers.push({
          id: generateId(),
          name: `${firstName} ${lastName}`,
          companyName: generateCompanyName(firstName, category.name),
          category: category.name,
          subcategory: subcategory,
          description: `Professionnel expérimenté spécialisé en ${subcategory} pour les expatriés depuis ${randomInt(3, 20)} ans. Services personnalisés et adaptés à vos besoins internationaux, avec une expertise particulière pour les ressortissants français à l'étranger et les étrangers installés en France. Notre approche combine expertise technique, connaissance des spécificités locales et suivi personnalisé pour garantir votre satisfaction.`,
          city: city,
          services: generateRandomServices(category.subcategories),
          rating: randomRating(),
          reviewCount: randomReviewCount(),
          priceLevel: randomPriceLevel(),
          languages: ["Français", "Anglais"].concat(
            Math.random() > 0.5 ? ["Espagnol"] : [],
            Math.random() > 0.7 ? ["Allemand"] : [],
            Math.random() > 0.9 ? ["Italien"] : [],
            Math.random() > 0.95 ? ["Portugais"] : [],
            Math.random() > 0.95 ? ["Arabe"] : [],
            Math.random() > 0.95 ? ["Chinois"] : []
          ),
          image: image,
          verified: Math.random() > 0.3, // 70% chance of being verified
          featured: Math.random() > 0.7, // 30% chance of being featured
          available: true,
          
          // Nouveaux champs enrichis
          title: subcategory,
          reviews: randomReviewCount(),
          location: `${city}, France`,
          availability: ["Disponible", "Disponible sous 48h", "Planning chargé"][randomInt(0, 2)],
          skills: specialties,
          hourlyRate: hourlyRate,
          responseTime: responseTime,
          completionRate: completionRate,
          experience: experience,
          education: education,
          certifications: certifications,
          specialties: specialties,
          clients: clients,
          approach: approach
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

// New function to find a provider by ID
export const findProviderById = (id: string): Provider | null => {
  // Combine all providers from all categories
  const allProviders = generateDummyProviders();
  return allProviders.find(provider => provider.id === id) || null;
};
