
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
