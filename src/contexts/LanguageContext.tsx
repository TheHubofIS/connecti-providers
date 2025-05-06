
import React, { createContext, useContext, useState, useEffect } from "react";
import { Language } from "@/types/auth";

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
  translations: Translations;
  setTranslations: (translations: Translations) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("fr");
  const [translations, setTranslations] = useState<Translations>({
    // Messages par défaut
    login: {
      fr: "Connexion",
      en: "Login",
      es: "Iniciar sesión"
    },
    logout: {
      fr: "Déconnexion",
      en: "Logout",
      es: "Cerrar sesión"
    },
    welcome: {
      fr: "Bienvenue",
      en: "Welcome",
      es: "Bienvenido"
    },
    // Ajoutez d'autres traductions ici
  });

  useEffect(() => {
    // Charger la langue depuis le localStorage si disponible
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && ["fr", "en", "es"].includes(savedLanguage)) {
      setLanguage(savedLanguage as Language);
    } else {
      // Sinon, utiliser la langue du navigateur si disponible
      const browserLang = navigator.language.split('-')[0] as Language;
      if (["fr", "en", "es"].includes(browserLang)) {
        setLanguage(browserLang as Language);
      }
    }
  }, []);

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const translate = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }

    return translations[key][language] || translations[key]['en'] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleSetLanguage, 
      translate, 
      translations,
      setTranslations
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage doit être utilisé à l'intérieur d'un LanguageProvider");
  }
  return context;
};
