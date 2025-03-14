
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available languages
export type Language = 'fr' | 'en' | 'es';

// Create a type for the language context
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: string) => string;
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // General
    'siteName': 'The Hub of IS',
    'home': 'Accueil',
    'services': 'Services',
    'providers': 'Prestataires',
    'howItWorks': 'Comment ça marche',
    'contact': 'Contact',
    'login': 'Connexion',
    'register': 'Inscription',
    'dashboard': 'Tableau de bord',
    'logout': 'Déconnexion',
    'back': 'Retour',
    'search': 'Rechercher',
    'all': 'Tous',
    
    // Hero
    'hero.tagline': 'Expertise française, rayonnement international',
    'hero.title': 'Connectez-vous avec des experts basés à l\'étranger',
    'hero.subtitle': 'Une plateforme unique qui vous met en relation avec des prestataires qualifiés dans les domaines juridique, comptable, IT, médical et dentaire.',
    'hero.searchPlaceholder': 'Rechercher un service ou un prestataire...',
    'hero.btnHowItWorks': 'Comment ça marche',
    'hero.btnBrowseProviders': 'Parcourir les prestataires',
    'hero.feature1': 'Experts vérifiés',
    'hero.feature2': 'Échanges sécurisés',
    'hero.feature3': 'Support 24/7',
    
    // Categories
    'categories.title': 'Catégories de services',
    'categories.subtitle': 'Explorez nos services par catégorie',
    'categories.viewAll': 'Voir tous',
    
    // Footer
    'footer.quickLinks': 'Liens rapides',
    'footer.support': 'Aide & Support',
    'footer.contact': 'Contact',
    'footer.rights': 'Tous droits réservés',
    
    // 404
    '404.title': 'Oops! Page non trouvée',
    '404.description': 'La page que vous recherchez n\'existe pas ou a été déplacée.',
    
    // NotFound
    'notFound.title': 'Page non trouvée',
    'notFound.description': 'La page que vous recherchez n\'existe pas ou a été déplacée.',
    'notFound.back': 'Retour',
    'notFound.home': 'Retour à l\'accueil',
    
    // Client Profile
    'profile.title': 'Mon Profil',
    'profile.personalInfo': 'Informations Personnelles',
    'profile.security': 'Sécurité',
    'profile.preferences': 'Préférences',
    'profile.save': 'Enregistrer',
    'profile.firstName': 'Prénom',
    'profile.lastName': 'Nom',
    'profile.email': 'Email',
    'profile.phone': 'Téléphone',
    'profile.address': 'Adresse',
    'profile.city': 'Ville',
    'profile.postalCode': 'Code postal',
    'profile.country': 'Pays',
    'profile.bio': 'Présentation',
    'profile.language': 'Langue préférée',
    'profile.timezone': 'Fuseau horaire',
    
    // Provider Profile
    'provider.profile.title': 'Mon Profil Prestataire',
    'provider.profile.services': 'Services',
    'provider.profile.settings': 'Paramètres',
    'provider.profile.companyName': 'Nom de l\'entreprise',
    
    // Complete Profile
    'completeProfile.title': 'Complétez votre profil',
    'completeProfile.step1': 'Informations personnelles',
    'completeProfile.step2': 'Coordonnées',
    'completeProfile.step3': 'Préférences',
    'completeProfile.next': 'Suivant',
    'completeProfile.previous': 'Précédent',
    'completeProfile.finish': 'Terminer',
    
    // Blog
    'blog.title': 'Blog & Actualités',
    'blog.subtitle': 'Dernières actualités',
    'blog.description': 'Restez informé des dernières tendances et conseils pour collaborer efficacement avec des prestataires français à l\'étranger.',
    'blog.underConstruction': 'Page en cours de construction',
    'blog.comingSoon': 'Notre blog est actuellement en développement. Veuillez revenir bientôt pour découvrir nos articles et actualités.',
    'blog.backToHome': 'Retour à l\'accueil',
    
    // Search
    'search.placeholder': 'Rechercher un service ou un prestataire...',
    'search.categories': 'Toutes les catégories',
    'search.button': 'Rechercher',
    
    // Services page
    'services.ourServices': 'Nos services',
    'services.mainTitle': 'Des services adaptés à vos besoins',
    'services.mainDescription': 'Découvrez notre gamme complète de services proposés par des experts français basés à l\'étranger, dans différents domaines stratégiques.',
    'services.exploreCategory': 'Explorer cette catégorie',
    'services.availableServices': 'Prestations disponibles',
    'services.howItWorks': 'Comment ça marche ?',
    'services.step1': 'Décrivez votre besoin',
    'services.step2': 'Recevez des devis',
    'services.step3': 'Choisissez votre expert',
    'services.step4': 'Collaborez efficacement',
    'services.experts': 'experts',
    'services.countries': 'pays',
    'services.cannotFind': 'Vous ne trouvez pas ce que vous cherchez ?',
    'services.networkExpanding': 'Notre réseau d\'experts s\'étend constamment. Si vous avez besoin d\'un service spécifique qui ne figure pas dans notre liste, contactez-nous et nous vous aiderons à trouver le prestataire idéal.',
    'services.contactUs': 'Contactez-nous',
    
    // Legal services
    'services.legal.title': 'Services juridiques',
    'services.legal.description': 'Expertise légale internationale pour vos activités à l\'étranger',
    'services.legal.offering1': 'Conseil juridique d\'affaires international',
    'services.legal.offering2': 'Rédaction et révision de contrats internationaux',
    'services.legal.offering3': 'Propriété intellectuelle et protection des marques',
    'services.legal.offering4': 'Accompagnement pour les implantations à l\'étranger',
    'services.legal.offering5': 'Contentieux internationaux et arbitrage',
    'services.legal.offering6': 'Droit fiscal international',
    'services.legal.offering7': 'Due diligence juridique',
    
    // Accounting services
    'services.accounting.title': 'Services comptables et financiers',
    'services.accounting.description': 'Gestion comptable et financière conforme aux normes internationales',
    'services.accounting.offering1': 'Comptabilité générale et analytique',
    'services.accounting.offering2': 'Optimisation fiscale internationale',
    'services.accounting.offering3': 'Contrôle de gestion et reporting financier',
    'services.accounting.offering4': 'Tenue des livres comptables',
    'services.accounting.offering5': 'Consolidation des comptes',
    'services.accounting.offering6': 'Audits financiers',
    'services.accounting.offering7': 'Conseil en investissement international',
    
    // IT services
    'services.it.title': 'Services IT et Digital',
    'services.it.description': 'Solutions numériques et informatiques par des experts français à l\'international',
    'services.it.offering1': 'Développement web et mobile sur mesure',
    'services.it.offering2': 'Consulting IT et transformation digitale',
    'services.it.offering3': 'Architecture de systèmes d\'information',
    'services.it.offering4': 'Intégration d\'ERP et CRM internationaux',
    'services.it.offering5': 'Développement d\'applications métier',
    'services.it.offering6': 'Cybersécurité internationale',
    'services.it.offering7': 'Data Science et Intelligence Artificielle',
    
    // Medical services
    'services.medical.title': 'Services médicaux',
    'services.medical.description': 'Consultations et suivis médicaux par des médecins français expatriés',
    'services.medical.offering1': 'Téléconsultations médicales en français',
    'services.medical.offering2': 'Suivi médical des expatriés',
    'services.medical.offering3': 'Second avis médical international',
    'services.medical.offering4': 'Coordination des soins à l\'étranger',
    'services.medical.offering5': 'Bilans de santé internationaux',
    'services.medical.offering6': 'Médecine du travail pour entreprises françaises',
    'services.medical.offering7': 'Assistance médicale pour voyageurs',
    
    // Dental services
    'services.dental.title': 'Services dentaires',
    'services.dental.description': 'Soins dentaires de qualité française à l\'international',
    'services.dental.offering1': 'Soins dentaires conservateurs',
    'services.dental.offering2': 'Prothèses dentaires aux normes françaises',
    'services.dental.offering3': 'Implantologie et chirurgie orale',
    'services.dental.offering4': 'Orthodontie adulte et enfant',
    'services.dental.offering5': 'Esthétique dentaire',
    'services.dental.offering6': 'Parodontologie',
    'services.dental.offering7': 'Consultations préventives',
  },
  en: {
    // General
    'siteName': 'The Hub of IS',
    'home': 'Home',
    'services': 'Services',
    'providers': 'Providers',
    'howItWorks': 'How It Works',
    'contact': 'Contact',
    'login': 'Login',
    'register': 'Register',
    'dashboard': 'Dashboard',
    'logout': 'Logout',
    'back': 'Back',
    'search': 'Search',
    'all': 'All',
    
    // Hero
    'hero.tagline': 'French expertise, international reach',
    'hero.title': 'Connect with experts based abroad',
    'hero.subtitle': 'A unique platform that connects you with qualified service providers in legal, accounting, IT, medical and dental fields.',
    'hero.searchPlaceholder': 'Search for a service or provider...',
    'hero.btnHowItWorks': 'How It Works',
    'hero.btnBrowseProviders': 'Browse Providers',
    'hero.feature1': 'Verified Experts',
    'hero.feature2': 'Secure Exchanges',
    'hero.feature3': '24/7 Support',
    
    // Categories
    'categories.title': 'Service Categories',
    'categories.subtitle': 'Explore our services by category',
    'categories.viewAll': 'View All',
    
    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.support': 'Help & Support',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved',
    
    // 404
    '404.title': 'Oops! Page Not Found',
    '404.description': 'The page you are looking for doesn\'t exist or has been moved.',
    
    // NotFound
    'notFound.title': 'Page Not Found',
    'notFound.description': 'The page you are looking for doesn\'t exist or has been moved.',
    'notFound.back': 'Back',
    'notFound.home': 'Back to Home',
    
    // Client Profile
    'profile.title': 'My Profile',
    'profile.personalInfo': 'Personal Information',
    'profile.security': 'Security',
    'profile.preferences': 'Preferences',
    'profile.save': 'Save',
    'profile.firstName': 'First Name',
    'profile.lastName': 'Last Name',
    'profile.email': 'Email',
    'profile.phone': 'Phone',
    'profile.address': 'Address',
    'profile.city': 'City',
    'profile.postalCode': 'Postal Code',
    'profile.country': 'Country',
    'profile.bio': 'About Me',
    'profile.language': 'Preferred Language',
    'profile.timezone': 'Timezone',
    
    // Provider Profile
    'provider.profile.title': 'My Provider Profile',
    'provider.profile.services': 'Services',
    'provider.profile.settings': 'Settings',
    'provider.profile.companyName': 'Company Name',
    
    // Complete Profile
    'completeProfile.title': 'Complete Your Profile',
    'completeProfile.step1': 'Personal Information',
    'completeProfile.step2': 'Contact Details',
    'completeProfile.step3': 'Preferences',
    'completeProfile.next': 'Next',
    'completeProfile.previous': 'Previous',
    'completeProfile.finish': 'Finish',
    
    // Blog
    'blog.title': 'Blog & News',
    'blog.subtitle': 'Latest Updates',
    'blog.description': 'Stay informed about the latest trends and tips for effectively collaborating with French service providers abroad.',
    'blog.underConstruction': 'Page Under Construction',
    'blog.comingSoon': 'Our blog is currently under development. Please check back soon to discover our articles and news.',
    'blog.backToHome': 'Back to Home',
    
    // Search
    'search.placeholder': 'Search for a service or provider...',
    'search.categories': 'All categories',
    'search.button': 'Search',
    
    // Services page
    'services.ourServices': 'Our Services',
    'services.mainTitle': 'Services tailored to your needs',
    'services.mainDescription': 'Discover our comprehensive range of services offered by French experts based abroad, in various strategic fields.',
    'services.exploreCategory': 'Explore this category',
    'services.availableServices': 'Available Services',
    'services.howItWorks': 'How it works?',
    'services.step1': 'Describe your needs',
    'services.step2': 'Receive quotes',
    'services.step3': 'Choose your expert',
    'services.step4': 'Collaborate efficiently',
    'services.experts': 'experts',
    'services.countries': 'countries',
    'services.cannotFind': 'Can\'t find what you\'re looking for?',
    'services.networkExpanding': 'Our network of experts is constantly expanding. If you need a specific service that is not listed, contact us and we will help you find the ideal provider.',
    'services.contactUs': 'Contact us',
    
    // Legal services
    'services.legal.title': 'Legal Services',
    'services.legal.description': 'International legal expertise for your activities abroad',
    'services.legal.offering1': 'International business legal advice',
    'services.legal.offering2': 'Drafting and reviewing international contracts',
    'services.legal.offering3': 'Intellectual property and trademark protection',
    'services.legal.offering4': 'Support for foreign establishments',
    'services.legal.offering5': 'International litigation and arbitration',
    'services.legal.offering6': 'International tax law',
    'services.legal.offering7': 'Legal due diligence',
    
    // Accounting services
    'services.accounting.title': 'Accounting and Financial Services',
    'services.accounting.description': 'Accounting and financial management compliant with international standards',
    'services.accounting.offering1': 'General and analytical accounting',
    'services.accounting.offering2': 'International tax optimization',
    'services.accounting.offering3': 'Management control and financial reporting',
    'services.accounting.offering4': 'Bookkeeping',
    'services.accounting.offering5': 'Consolidation of accounts',
    'services.accounting.offering6': 'Financial audits',
    'services.accounting.offering7': 'International investment advice',
    
    // IT services
    'services.it.title': 'IT and Digital Services',
    'services.it.description': 'Digital and IT solutions by French experts internationally',
    'services.it.offering1': 'Custom web and mobile development',
    'services.it.offering2': 'IT consulting and digital transformation',
    'services.it.offering3': 'Information systems architecture',
    'services.it.offering4': 'International ERP and CRM integration',
    'services.it.offering5': 'Business application development',
    'services.it.offering6': 'International cybersecurity',
    'services.it.offering7': 'Data Science and Artificial Intelligence',
    
    // Medical services
    'services.medical.title': 'Medical Services',
    'services.medical.description': 'Consultations and medical follow-ups by French expatriate doctors',
    'services.medical.offering1': 'Medical teleconsultations in French',
    'services.medical.offering2': 'Medical monitoring of expatriates',
    'services.medical.offering3': 'International second medical opinion',
    'services.medical.offering4': 'Coordination of care abroad',
    'services.medical.offering5': 'International health assessments',
    'services.medical.offering6': 'Occupational health for French companies',
    'services.medical.offering7': 'Medical assistance for travelers',
    
    // Dental services
    'services.dental.title': 'Dental Services',
    'services.dental.description': 'French quality dental care internationally',
    'services.dental.offering1': 'Conservative dental care',
    'services.dental.offering2': 'Dental prostheses to French standards',
    'services.dental.offering3': 'Implantology and oral surgery',
    'services.dental.offering4': 'Adult and child orthodontics',
    'services.dental.offering5': 'Dental aesthetics',
    'services.dental.offering6': 'Periodontics',
    'services.dental.offering7': 'Preventive consultations',
  },
  es: {
    // General
    'siteName': 'The Hub of IS',
    'home': 'Inicio',
    'services': 'Servicios',
    'providers': 'Proveedores',
    'howItWorks': 'Cómo Funciona',
    'contact': 'Contacto',
    'login': 'Iniciar Sesión',
    'register': 'Registrarse',
    'dashboard': 'Panel de Control',
    'logout': 'Cerrar Sesión',
    'back': 'Volver',
    'search': 'Buscar',
    'all': 'Todos',
    
    // Hero
    'hero.tagline': 'Experiencia francesa, alcance internacional',
    'hero.title': 'Conéctate con expertos en el extranjero',
    'hero.subtitle': 'Una plataforma única que te conecta con proveedores calificados en los campos legal, contable, IT, médico y dental.',
    'hero.searchPlaceholder': 'Buscar un servicio o proveedor...',
    'hero.btnHowItWorks': 'Cómo Funciona',
    'hero.btnBrowseProviders': 'Ver Proveedores',
    'hero.feature1': 'Expertos Verificados',
    'hero.feature2': 'Intercambios Seguros',
    'hero.feature3': 'Soporte 24/7',
    
    // Categories
    'categories.title': 'Categorías de Servicios',
    'categories.subtitle': 'Explora nuestros servicios por categoría',
    'categories.viewAll': 'Ver Todo',
    
    // Footer
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.support': 'Ayuda y Soporte',
    'footer.contact': 'Contacto',
    'footer.rights': 'Todos los derechos reservados',
    
    // 404
    '404.title': '¡Ups! Página No Encontrada',
    '404.description': 'La página que buscas no existe o ha sido movida.',
    
    // NotFound
    'notFound.title': 'Página No Encontrada',
    'notFound.description': 'La página que buscas no existe o ha sido movida.',
    'notFound.back': 'Volver',
    'notFound.home': 'Volver al Inicio',
    
    // Client Profile
    'profile.title': 'Mi Perfil',
    'profile.personalInfo': 'Información Personal',
    'profile.security': 'Seguridad',
    'profile.preferences': 'Preferencias',
    'profile.save': 'Guardar',
    'profile.firstName': 'Nombre',
    'profile.lastName': 'Apellido',
    'profile.email': 'Correo Electrónico',
    'profile.phone': 'Teléfono',
    'profile.address': 'Dirección',
    'profile.city': 'Ciudad',
    'profile.postalCode': 'Código Postal',
    'profile.country': 'País',
    'profile.bio': 'Acerca de Mí',
    'profile.language': 'Idioma Preferido',
    'profile.timezone': 'Zona Horaria',
    
    // Provider Profile
    'provider.profile.title': 'Mi Perfil de Proveedor',
    'provider.profile.services': 'Servicios',
    'provider.profile.settings': 'Configuración',
    'provider.profile.companyName': 'Nombre de la Empresa',
    
    // Complete Profile
    'completeProfile.title': 'Completa Tu Perfil',
    'completeProfile.step1': 'Información Personal',
    'completeProfile.step2': 'Datos de Contacto',
    'completeProfile.step3': 'Preferencias',
    'completeProfile.next': 'Siguiente',
    'completeProfile.previous': 'Anterior',
    'completeProfile.finish': 'Finalizar',
    
    // Blog
    'blog.title': 'Blog y Noticias',
    'blog.subtitle': 'Últimas Actualizaciones',
    'blog.description': 'Mantente informado sobre las últimas tendencias y consejos para colaborar eficazmente con proveedores franceses en el extranjero.',
    'blog.underConstruction': 'Página En Construcción',
    'blog.comingSoon': 'Nuestro blog está actualmente en desarrollo. Por favor, vuelve pronto para descubrir nuestros artículos y noticias.',
    'blog.backToHome': 'Volver al Inicio',
    
    // Search
    'search.placeholder': 'Buscar un servicio o proveedor...',
    'search.categories': 'Todas las categorías',
    'search.button': 'Buscar',
    
    // Services page
    'services.ourServices': 'Nuestros Servicios',
    'services.mainTitle': 'Servicios adaptados a tus necesidades',
    'services.mainDescription': 'Descubre nuestra gama completa de servicios ofrecidos por expertos franceses en el extranjero, en diversos campos estratégicos.',
    'services.exploreCategory': 'Explorar esta categoría',
    'services.availableServices': 'Servicios Disponibles',
    'services.howItWorks': '¿Cómo funciona?',
    'services.step1': 'Describe tus necesidades',
    'services.step2': 'Recibe presupuestos',
    'services.step3': 'Elige tu experto',
    'services.step4': 'Colabora eficientemente',
    'services.experts': 'expertos',
    'services.countries': 'países',
    'services.cannotFind': '¿No encuentras lo que buscas?',
    'services.networkExpanding': 'Nuestra red de expertos se expande constantemente. Si necesitas un servicio específico que no está en nuestra lista, contáctanos y te ayudaremos a encontrar el proveedor ideal.',
    'services.contactUs': 'Contáctanos',
    
    // Legal services
    'services.legal.title': 'Servicios Legales',
    'services.legal.description': 'Experiencia legal internacional para tus actividades en el extranjero',
    'services.legal.offering1': 'Asesoramiento legal empresarial internacional',
    'services.legal.offering2': 'Redacción y revisión de contratos internacionales',
    'services.legal.offering3': 'Propiedad intelectual y protección de marcas',
    'services.legal.offering4': 'Apoyo para establecimientos en el extranjero',
    'services.legal.offering5': 'Litigios internacionales y arbitraje',
    'services.legal.offering6': 'Derecho fiscal internacional',
    'services.legal.offering7': 'Due diligence legal',
    
    // Accounting services
    'services.accounting.title': 'Servicios Contables y Financieros',
    'services.accounting.description': 'Gestión contable y financiera conforme a las normas internacionales',
    'services.accounting.offering1': 'Contabilidad general y analítica',
    'services.accounting.offering2': 'Optimización fiscal internacional',
    'services.accounting.offering3': 'Control de gestión e informes financieros',
    'services.accounting.offering4': 'Mantenimiento de libros contables',
    'services.accounting.offering5': 'Consolidación de cuentas',
    'services.accounting.offering6': 'Auditorías financieras',
    'services.accounting.offering7': 'Asesoramiento en inversiones internacionales',
    
    // IT services
    'services.it.title': 'Servicios de IT y Digitales',
    'services.it.description': 'Soluciones digitales e informáticas por expertos franceses a nivel internacional',
    'services.it.offering1': 'Desarrollo web y móvil personalizado',
    'services.it.offering2': 'Consultoría IT y transformación digital',
    'services.it.offering3': 'Arquitectura de sistemas de información',
    'services.it.offering4': 'Integración internacional de ERP y CRM',
    'services.it.offering5': 'Desarrollo de aplicaciones empresariales',
    'services.it.offering6': 'Ciberseguridad internacional',
    'services.it.offering7': 'Ciencia de datos e Inteligencia Artificial',
    
    // Medical services
    'services.medical.title': 'Servicios Médicos',
    'services.medical.description': 'Consultas y seguimientos médicos por médicos franceses expatriados',
    'services.medical.offering1': 'Teleconsultas médicas en francés',
    'services.medical.offering2': 'Seguimiento médico de expatriados',
    'services.medical.offering3': 'Segunda opinión médica internacional',
    'services.medical.offering4': 'Coordinación de cuidados en el extranjero',
    'services.medical.offering5': 'Evaluaciones de salud internacionales',
    'services.medical.offering6': 'Medicina laboral para empresas francesas',
    'services.medical.offering7': 'Asistencia médica para viajeros',
    
    // Dental services
    'services.dental.title': 'Servicios Dentales',
    'services.dental.description': 'Cuidado dental de calidad francesa a nivel internacional',
    'services.dental.offering1': 'Cuidado dental conservador',
    'services.dental.offering2': 'Prótesis dentales según estándares franceses',
    'services.dental.offering3': 'Implantología y cirugía oral',
    'services.dental.offering4': 'Ortodoncia para adultos y niños',
    'services.dental.offering5': 'Estética dental',
    'services.dental.offering6': 'Periodoncia',
    'services.dental.offering7': 'Consultas preventivas',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get the language from localStorage or use browser language, defaulting to 'fr'
  const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language.split('-')[0];
    return (browserLang === 'fr' || browserLang === 'en' || browserLang === 'es') 
      ? browserLang as Language 
      : 'fr';
  };

  const [language, setLanguageState] = useState<Language>(
    () => (localStorage.getItem('language') as Language) || getBrowserLanguage()
  );

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Function to set the language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Function to translate a key
  const translate = (key: string): string => {
    // If the key doesn't exist, return the key itself
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
