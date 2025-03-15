
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
    
    // How It Works
    'howItWorks.subtitle': 'Simple, rapide et efficace',
    'howItWorks.title': 'Comment ça marche',
    'howItWorks.description': 'Notre plateforme vous permet de trouver facilement le prestataire idéal et d\'obtenir rapidement des réponses à vos besoins.',
    'howItWorks.step': 'Étape',
    'howItWorks.step1.title': 'Définissez votre besoin',
    'howItWorks.step1.description': 'Précisez votre projet et vos attentes pour trouver le prestataire qui correspond exactement à vos besoins.',
    'howItWorks.step2.title': 'Trouvez votre prestataire',
    'howItWorks.step2.description': 'Parcourez notre réseau d\'experts qualifiés et sélectionnez celui qui vous inspire confiance.',
    'howItWorks.step3.title': 'Démarrez votre collaboration',
    'howItWorks.step3.description': 'Échangez directement avec le prestataire choisi et concrétisez votre projet en toute simplicité.',
    'howItWorks.learnMore': 'En savoir plus',
    
    // How It Works Page
    'howItWorksPage.subtitle': 'Découvrez notre processus',
    'howItWorksPage.title': 'Comment fonctionne notre plateforme',
    'howItWorksPage.description': 'Notre plateforme a été conçue pour faciliter la mise en relation entre clients et prestataires français à l\'international. Découvrez comment nous simplifions votre expérience à chaque étape.',
    'howItWorksPage.forBusinesses': 'Pour les entreprises et particuliers',
    'howItWorksPage.forProviders': 'Pour les prestataires de services',
    'howItWorksPage.registerAsBusiness': 'S\'inscrire comme client',
    'howItWorksPage.registerAsProvider': 'S\'inscrire comme prestataire',
    
    // Business steps
    'howItWorksPage.business.step1.title': 'Inscription gratuite',
    'howItWorksPage.business.step1.description': 'Créez votre compte gratuitement en quelques minutes et accédez à notre réseau d\'experts.',
    'howItWorksPage.business.step2.title': 'Recherche personnalisée',
    'howItWorksPage.business.step2.description': 'Utilisez notre moteur de recherche pour trouver le prestataire qui correspond à vos besoins spécifiques.',
    'howItWorksPage.business.step3.title': 'Contact direct',
    'howItWorksPage.business.step3.description': 'Échangez directement avec les prestataires sélectionnés via notre messagerie sécurisée.',
    'howItWorksPage.business.step4.title': 'Collaboration en toute confiance',
    'howItWorksPage.business.step4.description': 'Établissez votre partenariat en toute sérénité grâce à nos outils de collaboration sécurisés.',
    'howItWorksPage.business.step5.title': 'Évaluation du service',
    'howItWorksPage.business.step5.description': 'Partagez votre expérience et aidez d\'autres utilisateurs à faire le bon choix.',
    
    // Provider steps
    'howItWorksPage.provider.step1.title': 'Création de profil professionnel',
    'howItWorksPage.provider.step1.description': 'Présentez votre expertise, vos services et vos références pour attirer de nouveaux clients.',
    'howItWorksPage.provider.step2.title': 'Validation de votre compte',
    'howItWorksPage.provider.step2.description': 'Notre équipe vérifie vos qualifications pour garantir la qualité de notre réseau.',
    'howItWorksPage.provider.step3.title': 'Visibilité internationale',
    'howItWorksPage.provider.step3.description': 'Votre profil est visible par des clients potentiels du monde entier recherchant votre expertise.',
    'howItWorksPage.provider.step4.title': 'Gestion des demandes',
    'howItWorksPage.provider.step4.description': 'Recevez et gérez les demandes clients via notre interface intuitive et sécurisée.',
    'howItWorksPage.provider.step5.title': 'Développement d\'activité',
    'howItWorksPage.provider.step5.description': 'Développez votre clientèle internationale et construisez votre réputation en ligne.',
    
    // FAQ section
    'howItWorksPage.faq.title': 'Questions fréquentes',
    'howItWorksPage.faq.q1': 'Comment sont sélectionnés les prestataires sur la plateforme ?',
    'howItWorksPage.faq.a1': 'Tous nos prestataires font l\'objet d\'une vérification rigoureuse. Nous examinons leurs qualifications, leur expérience et leurs références pour garantir un service de qualité à nos utilisateurs.',
    'howItWorksPage.faq.q2': 'La plateforme est-elle gratuite pour les clients ?',
    'howItWorksPage.faq.a2': 'Oui, l\'inscription et l\'utilisation de la plateforme sont entièrement gratuites pour les clients. Vous ne payez que pour les services que vous achetez directement auprès des prestataires.',
    'howItWorksPage.faq.q3': 'Comment sont gérés les paiements sur la plateforme ?',
    'howItWorksPage.faq.a3': 'Les modalités de paiement sont convenues directement entre vous et le prestataire. Notre plateforme facilite la mise en relation, mais n\'intervient pas dans les transactions financières.',
    'howItWorksPage.faq.q4': 'Que faire en cas de litige avec un prestataire ?',
    'howItWorksPage.faq.a4': 'Notre service client est disponible pour vous accompagner en cas de difficulté. Nous proposons un service de médiation pour faciliter la résolution des litiges entre clients et prestataires.',
    'howItWorksPage.moreQuestions': 'Vous avez d\'autres questions ?',
    
    // Resources
    'howItWorksPage.resources.title1': 'Guides et ressources',
    'howItWorksPage.resources.description1': 'Consultez nos guides pratiques pour tirer le meilleur parti de notre plateforme et optimiser votre expérience.',
    'howItWorksPage.resources.cta1': 'Accéder aux ressources',
    'howItWorksPage.resources.title2': 'Support client',
    'howItWorksPage.resources.description2': 'Notre équipe est disponible pour répondre à vos questions et vous accompagner dans votre utilisation de la plateforme.',
    'howItWorksPage.resources.cta2': 'Contacter le support',
    'howItWorksPage.resources.title3': 'Témoignages de réussite',
    'howItWorksPage.resources.description3': 'Découvrez les expériences de nos utilisateurs et les collaborations réussies grâce à notre plateforme.',
    'howItWorksPage.resources.cta3': 'Voir les témoignages',
    
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
    
    // How It Works
    'howItWorks.subtitle': 'Simple, fast and efficient',
    'howItWorks.title': 'How It Works',
    'howItWorks.description': 'Our platform allows you to easily find the ideal service provider and quickly get answers to your needs.',
    'howItWorks.step': 'Step',
    'howItWorks.step1.title': 'Define your needs',
    'howItWorks.step1.description': 'Specify your project and expectations to find the provider that exactly matches your needs.',
    'howItWorks.step2.title': 'Find your provider',
    'howItWorks.step2.description': 'Browse our network of qualified experts and select the one who inspires your confidence.',
    'howItWorks.step3.title': 'Start your collaboration',
    'howItWorks.step3.description': 'Communicate directly with your chosen provider and bring your project to life with ease.',
    'howItWorks.learnMore': 'Learn more',
    
    // How It Works Page
    'howItWorksPage.subtitle': 'Discover our process',
    'howItWorksPage.title': 'How our platform works',
    'howItWorksPage.description': 'Our platform has been designed to facilitate connections between clients and French service providers internationally. Discover how we simplify your experience at every step.',
    'howItWorksPage.forBusinesses': 'For businesses and individuals',
    'howItWorksPage.forProviders': 'For service providers',
    'howItWorksPage.registerAsBusiness': 'Register as client',
    'howItWorksPage.registerAsProvider': 'Register as provider',
    
    // Business steps
    'howItWorksPage.business.step1.title': 'Free registration',
    'howItWorksPage.business.step1.description': 'Create your account for free in minutes and access our network of experts.',
    'howItWorksPage.business.step2.title': 'Personalized search',
    'howItWorksPage.business.step2.description': 'Use our search engine to find the provider that matches your specific needs.',
    'howItWorksPage.business.step3.title': 'Direct contact',
    'howItWorksPage.business.step3.description': 'Communicate directly with selected providers through our secure messaging system.',
    'howItWorksPage.business.step4.title': 'Collaboration with confidence',
    'howItWorksPage.business.step4.description': 'Establish your partnership with peace of mind through our secure collaboration tools.',
    'howItWorksPage.business.step5.title': 'Service evaluation',
    'howItWorksPage.business.step5.description': 'Share your experience and help other users make the right choice.',
    
    // Provider steps
    'howItWorksPage.provider.step1.title': 'Create a professional profile',
    'howItWorksPage.provider.step1.description': 'Present your expertise, services, and references to attract new clients.',
    'howItWorksPage.provider.step2.title': 'Account validation',
    'howItWorksPage.provider.step2.description': 'Our team verifies your qualifications to ensure the quality of our network.',
    'howItWorksPage.provider.step3.title': 'International visibility',
    'howItWorksPage.provider.step3.description': 'Your profile is visible to potential clients worldwide seeking your expertise.',
    'howItWorksPage.provider.step4.title': 'Request management',
    'howItWorksPage.provider.step4.description': 'Receive and manage client requests through our intuitive and secure interface.',
    'howItWorksPage.provider.step5.title': 'Business development',
    'howItWorksPage.provider.step5.description': 'Grow your international clientele and build your online reputation.',
    
    // FAQ section
    'howItWorksPage.faq.title': 'Frequently Asked Questions',
    'howItWorksPage.faq.q1': 'How are service providers selected for the platform?',
    'howItWorksPage.faq.a1': 'All our providers undergo a rigorous verification process. We examine their qualifications, experience, and references to ensure quality service for our users.',
    'howItWorksPage.faq.q2': 'Is the platform free for clients?',
    'howItWorksPage.faq.a2': 'Yes, registration and use of the platform are completely free for clients. You only pay for services you purchase directly from providers.',
    'howItWorksPage.faq.q3': 'How are payments handled on the platform?',
    'howItWorksPage.faq.a3': 'Payment terms are agreed directly between you and the service provider. Our platform facilitates connections but does not intervene in financial transactions.',
    'howItWorksPage.faq.q4': 'What should I do in case of a dispute with a provider?',
    'howItWorksPage.faq.a4': 'Our customer service is available to assist you in case of difficulties. We offer a mediation service to facilitate dispute resolution between clients and providers.',
    'howItWorksPage.moreQuestions': 'Have more questions?',
    
    // Resources
    'howItWorksPage.resources.title1': 'Guides and resources',
    'howItWorksPage.resources.description1': 'Check out our practical guides to get the most out of our platform and optimize your experience.',
    'howItWorksPage.resources.cta1': 'Access resources',
    'howItWorksPage.resources.title2': 'Customer support',
    'howItWorksPage.resources.description2': 'Our team is available to answer your questions and assist you in using the platform.',
    'howItWorksPage.resources.cta2': 'Contact support',
    'howItWorksPage.resources.title3': 'Success stories',
    'howItWorksPage.resources.description3': 'Discover user experiences and successful collaborations through our platform.',
    'howItWorksPage.resources.cta3': 'See testimonials',
    
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
    
    // How It Works
    'howItWorks.subtitle': 'Simple, rápido y eficiente',
    'howItWorks.title': 'Cómo Funciona',
    'howItWorks.description': 'Nuestra plataforma te permite encontrar fácilmente al proveedor ideal y obtener respuestas rápidas a tus necesidades.',
    'howItWorks.step': 'Paso',
    'howItWorks.step1.title': 'Define tus necesidades',
    'howItWorks.step1.description': 'Especifica tu proyecto y expectativas para encontrar al proveedor que se adapte exactamente a tus necesidades.',
    'howItWorks.step2.title': 'Encuentra tu proveedor',
    'howItWorks.step2.description': 'Explora nuestra red de expertos calificados y selecciona el que te inspire confianza.',
    'howItWorks.step3.title': 'Inicia tu colaboración',
    'howItWorks.step3.description': 'Comunícate directamente con el proveedor elegido y haz realidad tu proyecto con facilidad.',
    'howItWorks.learnMore': 'Saber más',
    
    // How It Works Page
    'howItWorksPage.subtitle': 'Descubre nuestro proceso',
    'howItWorksPage.title': 'Cómo funciona nuestra plataforma',
    'howItWorksPage.description': 'Nuestra plataforma ha sido diseñada para facilitar la conexión entre clientes y proveedores de servicios franceses a nivel internacional. Descubre cómo simplificamos tu experiencia en cada paso.',
    'howItWorksPage.forBusinesses': 'Para empresas e individuos',
    'howItWorksPage.forProviders': 'Para proveedores de servicios',
    'howItWorksPage.registerAsBusiness': 'Registrarse como cliente',
    'howItWorksPage.registerAsProvider': 'Registrarse como proveedor',
    
    // Business steps
    'howItWorksPage.business.step1.title': 'Registro gratuito',
    'howItWorksPage.business.step1.description': 'Crea tu cuenta gratuitamente en minutos y accede a nuestra red de expertos.',
    'howItWorksPage.business.step2.title': 'Búsqueda personalizada',
    'howItWorksPage.business.step2.description': 'Utiliza nuestro motor de búsqueda para encontrar al proveedor que corresponda a tus necesidades específicas.',
    'howItWorksPage.business.step3.title': 'Contacto directo',
    'howItWorksPage.business.step3.description': 'Comunícate directamente con los proveedores seleccionados a través de nuestro sistema de mensajería seguro.',
    'howItWorksPage.business.step4.title': 'Colaboración con confianza',
    'howItWorksPage.business.step4.description': 'Establece tu asociación con tranquilidad gracias a nuestras herramientas de colaboración seguras.',
    'howItWorksPage.business.step5.title': 'Evaluación del servicio',
    'howItWorksPage.business.step5.description': 'Comparte tu experiencia y ayuda a otros usuarios a tomar la decisión correcta.',
    
    // Provider steps
    'howItWorksPage.provider.step1.title': 'Crear un perfil profesional',
    'howItWorksPage.provider.step1.description': 'Presenta tu experiencia, servicios y referencias para atraer nuevos clientes.',
    'howItWorksPage.provider.step2.title': 'Validación de cuenta',
    'howItWorksPage.provider.step2.description': 'Nuestro equipo verifica tus calificaciones para garantizar la calidad de nuestra red.',
    'howItWorksPage.provider.step3.title': 'Visibilidad internacional',
    'howItWorksPage.provider.step3.description': 'Tu perfil es visible para clientes potenciales de todo el mundo que buscan tu experiencia.',
    'howItWorksPage.provider.step4.title': 'Gestión de solicitudes',
    'howItWorksPage.provider.step4.description': 'Recibe y gestiona las solicitudes de los clientes a través de nuestra interfaz intuitiva y segura.',
    'howItWorksPage.provider.step5.title': 'Desarrollo de negocio',
    'howItWorksPage.provider.step5.description': 'Desarrolla tu clientela internacional y construye tu reputación en línea.',
    
    // FAQ section
    'howItWorksPage.faq.title': 'Preguntas frecuentes',
    'howItWorksPage.faq.q1': '¿Cómo se seleccionan los proveedores de servicios para la plataforma?',
    'howItWorksPage.faq.a1': 'Todos nuestros proveedores se someten a un riguroso proceso de verificación. Examinamos sus calificaciones, experiencia y referencias para garantizar un servicio de calidad para nuestros usuarios.',
    'howItWorksPage.faq.q2': '¿Es gratuita la plataforma para los clientes?',
    'howItWorksPage.faq.a2': 'Sí, el registro y uso de la plataforma son completamente gratuitos para los clientes. Solo pagas por los servicios que compras directamente a los proveedores.',
    'howItWorksPage.faq.q3': '¿Cómo se gestionan los pagos en la plataforma?',
    'howItWorksPage.faq.a3': 'Las condiciones de pago se acuerdan directamente entre tú y el proveedor de servicios. Nuestra plataforma facilita las conexiones pero no interviene en las transacciones financieras.',
    'howItWorksPage.faq.q4': '¿Qué debo hacer en caso de disputa con un proveedor?',
    'howItWorksPage.faq.a4': 'Nuestro servicio de atención al cliente está disponible para ayudarte en caso de dificultades. Ofrecemos un servicio de mediación para facilitar la resolución de disputas entre clientes y proveedores.',
    'howItWorksPage.moreQuestions': '¿Tienes más preguntas?',
    
    // Resources
    'howItWorksPage.resources.title1': 'Guías y recursos',
    'howItWorksPage.resources.description1': 'Consulta nuestras guías prácticas para aprovechar al máximo nuestra plataforma y optimizar tu experiencia.',
    'howItWorksPage.resources.cta1': 'Acceder a recursos',
    'howItWorksPage.resources.title2': 'Atención al cliente',
    'howItWorksPage.resources.description2': 'Nuestro equipo está disponible para responder tus preguntas y ayudarte a utilizar la plataforma.',
    'howItWorksPage.resources.cta2': 'Contactar con soporte',
    'howItWorksPage.resources.title3': 'Historias de éxito',
    'howItWorksPage.resources.description3': 'Descubre experiencias de usuarios y colaboraciones exitosas a través de nuestra plataforma.',
    'howItWorksPage.resources.cta3': 'Ver testimonios',
    
    // Client Profile
    'profile.title': 'Mi Perfil',
    'profile.personalInfo': 'Información Personal',
    'profile.security': 'Seguridad',
    'profile.preferences': 'Preferencias',
    'profile.save': 'Guardar',
    'profile.firstName': 'Nombre',
    'profile.lastName': 'Apellido',
    'profile.email': 'Email',
    'profile.phone': 'Teléfono',
    'profile.address': 'Dirección',
    'profile.city': 'Ciudad',
    'profile.postalCode': 'Código Postal',
    'profile.country': 'País',
    'profile.bio': 'Biografía',
    'profile.language': 'Idioma preferido',
    'profile.timezone': 'Zona horaria',
    
    // Provider Profile
    'provider.profile.title': 'Mi Perfil de Proveedor',
    'provider.profile.services': 'Servicios',
    'provider.profile.settings': 'Configuración',
    'provider.profile.companyName': 'Nombre de la empresa',
    
    // Complete Profile
    'completeProfile.title': 'Completa tu perfil',
    'completeProfile.step1': 'Información personal',
    'completeProfile.step2': 'Datos de contacto',
    'completeProfile.step3': 'Preferencias',
    'completeProfile.next': 'Siguiente',
    'completeProfile.previous': 'Anterior',
    'completeProfile.finish': 'Finalizar',
    
    // Blog
    'blog.title': 'Blog y Noticias',
    'blog.subtitle': 'Últimas actualizaciones',
    'blog.description': 'Mantente informado sobre las últimas tendencias y consejos para colaborar eficazmente con proveedores de servicios franceses en el extranjero.',
    'blog.underConstruction': 'Página en construcción',
    'blog.comingSoon': 'Nuestro blog está actualmente en desarrollo. Vuelve pronto para descubrir nuestros artículos y noticias.',
    'blog.backToHome': 'Volver al inicio',
    
    // Search
    'search.placeholder': 'Buscar un servicio o proveedor...',
    'search.categories': 'Todas las categorías',
    'search.button': 'Buscar',
    
    // Services page
    'services.ourServices': 'Nuestros Servicios',
    'services.mainTitle': 'Servicios adaptados a tus necesidades',
    'services.mainDescription': 'Descubre nuestra gama completa de servicios ofrecidos por expertos franceses establecidos en el extranjero, en diferentes campos estratégicos.',
    'services.exploreCategory': 'Explorar esta categoría',
    'services.availableServices': 'Servicios disponibles',
    'services.howItWorks': '¿Cómo funciona?',
    'services.step1': 'Describe tus necesidades',
    'services.step2': 'Recibe presupuestos',
    'services.step3': 'Elige tu experto',
    'services.step4': 'Colabora eficientemente',
    'services.experts': 'expertos',
    'services.countries': 'países',
    'services.cannotFind': '¿No encuentras lo que buscas?',
    'services.networkExpanding': 'Nuestra red de expertos se expande constantemente. Si necesitas un servicio específico que no figura en nuestra lista, contáctanos y te ayudaremos a encontrar al proveedor ideal.',
    'services.contactUs': 'Contáctanos',
    
    // Legal services
    'services.legal.title': 'Servicios Legales',
    'services.legal.description': 'Asesoramiento legal internacional para tus actividades en el extranjero',
    'services.legal.offering1': 'Asesoramiento legal empresarial internacional',
    'services.legal.offering2': 'Redacción y revisión de contratos internacionales',
    'services.legal.offering3': 'Propiedad intelectual y protección de marcas',
    'services.legal.offering4': 'Acompañamiento para establecimientos en el extranjero',
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
    'services.accounting.offering7': 'Asesoramiento en inversión internacional',
    
    // IT services
    'services.it.title': 'Servicios IT y Digitales',
    'services.it.description': 'Soluciones digitales e informáticas por expertos franceses a nivel internacional',
    'services.it.offering1': 'Desarrollo web y móvil personalizado',
    'services.it.offering2': 'Consultoría IT y transformación digital',
    'services.it.offering3': 'Arquitectura de sistemas de información',
    'services.it.offering4': 'Integración de ERP y CRM internacionales',
    'services.it.offering5': 'Desarrollo de aplicaciones empresariales',
    'services.it.offering6': 'Ciberseguridad internacional',
    'services.it.offering7': 'Ciencia de datos e Inteligencia Artificial',
    
    // Medical services
    'services.medical.title': 'Servicios Médicos',
    'services.medical.description': 'Consultas y seguimientos médicos por médicos franceses expatriados',
    'services.medical.offering1': 'Teleconsultas médicas en francés',
    'services.medical.offering2': 'Seguimiento médico de expatriados',
    'services.medical.offering3': 'Segunda opinión médica internacional',
    'services.medical.offering4': 'Coordinación de atención en el extranjero',
    'services.medical.offering5': 'Evaluaciones de salud internacionales',
    'services.medical.offering6': 'Medicina laboral para empresas francesas',
    'services.medical.offering7': 'Asistencia médica para viajeros',
    
    // Dental services
    'services.dental.title': 'Servicios Dentales',
    'services.dental.description': 'Atención dental de calidad francesa a nivel internacional',
    'services.dental.offering1': 'Atención dental conservadora',
    'services.dental.offering2': 'Prótesis dentales según estándares franceses',
    'services.dental.offering3': 'Implantología y cirugía oral',
    'services.dental.offering4': 'Ortodoncia para adultos y niños',
    'services.dental.offering5': 'Estética dental',
    'services.dental.offering6': 'Periodoncia',
    'services.dental.offering7': 'Consultas preventivas'
  }
};

// Provider function component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to load saved language from localStorage, default to 'fr'
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'fr';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Function to get translations
  const translate = (key: string): string => {
    // Get translations for current language
    const currentTranslations = translations[language] || {};
    
    // Return translation or key if not found (fallback mechanism)
    return currentTranslations[key] || key;
  };

  // Provide context values to children
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
