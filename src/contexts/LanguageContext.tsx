
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
