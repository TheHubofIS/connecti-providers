
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, CheckCircle, MapPin, Calendar, User, Clock, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ServiceDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { translate } = useLanguage();

  // Définition des services
  const services = {
    juridique: {
      id: "juridique",
      title: "Services juridiques",
      description: "Expertise légale internationale pour vos activités à l'étranger",
      longDescription: "Nos experts juridiques français à l'international vous accompagnent dans toutes vos démarches légales, de la création d'entreprise à la protection de vos droits à l'étranger. Avec une connaissance approfondie des systèmes juridiques locaux et internationaux, nos prestataires vous offrent des conseils personnalisés et des solutions adaptées à votre situation spécifique.",
      color: "blue",
      bgClass: "bg-blue-50 dark:bg-blue-900/20",
      textClass: "text-blue-600 dark:text-blue-400",
      offerings: [
        "Conseil juridique d'affaires international",
        "Rédaction et révision de contrats internationaux",
        "Propriété intellectuelle et protection des marques",
        "Accompagnement pour les implantations à l'étranger",
        "Contentieux internationaux et arbitrage",
        "Droit fiscal international",
        "Due diligence juridique"
      ],
      experts: 103,
      countries: 28,
      featuredProviders: [
        {
          id: 1,
          name: "Cabinet Martin & Associés",
          location: "Londres, Royaume-Uni",
          specialty: "Droit des affaires internationales",
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        },
        {
          id: 2,
          name: "Maître Dupont Conseil",
          location: "New York, États-Unis",
          specialty: "Propriété intellectuelle",
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1556157382-97eda2f9e8b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        },
        {
          id: 3,
          name: "Legal Partners International",
          location: "Singapour",
          specialty: "Droit fiscal international",
          rating: 4.7,
          image: "https://images.unsplash.com/photo-1573497490720-115c4d4991c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        }
      ],
      recentArticles: [
        {
          id: "brexit-impact",
          title: "Impact du Brexit sur les entreprises françaises au Royaume-Uni",
          excerpt: "Analyse des conséquences juridiques du Brexit pour les entreprises françaises opérant au Royaume-Uni et les adaptations nécessaires.",
          date: "12 mai 2023",
          readTime: "7 min"
        },
        {
          id: "intellectual-property",
          title: "Protection de la propriété intellectuelle à l'international",
          excerpt: "Stratégies efficaces pour protéger vos brevets, marques et droits d'auteur dans différentes juridictions internationales.",
          date: "3 avril 2023",
          readTime: "9 min"
        }
      ]
    },
    comptabilite: {
      id: "comptabilite",
      title: "Services comptables et financiers",
      description: "Gestion comptable et financière conforme aux normes internationales",
      longDescription: "Nos experts comptables français à l'étranger vous proposent des services adaptés aux spécificités locales tout en respectant les normes internationales. Qu'il s'agisse de tenue comptable, d'optimisation fiscale ou de conseil en investissement, nos prestataires vous accompagnent pour maximiser votre performance financière à l'international.",
      color: "green",
      bgClass: "bg-green-50 dark:bg-green-900/20",
      textClass: "text-green-600 dark:text-green-400",
      offerings: [
        "Comptabilité générale et analytique",
        "Optimisation fiscale internationale",
        "Contrôle de gestion et reporting financier",
        "Tenue des livres comptables",
        "Consolidation des comptes",
        "Audits financiers",
        "Conseil en investissement international"
      ],
      experts: 87,
      countries: 25,
      featuredProviders: [
        {
          id: 4,
          name: "Global Finances Conseil",
          location: "Dubaï, Émirats Arabes Unis",
          specialty: "Optimisation fiscale internationale",
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        },
        {
          id: 5,
          name: "Cabinet Lecomte",
          location: "Montréal, Canada",
          specialty: "Comptabilité pour entreprises françaises",
          rating: 4.7,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        },
        {
          id: 6,
          name: "Financial Expat Services",
          location: "Hong Kong",
          specialty: "Audit et conseil financier",
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        }
      ],
      recentArticles: [
        {
          id: "fiscalite-expatries",
          title: "Guide de la fiscalité pour les expatriés français",
          excerpt: "Tout ce que vous devez savoir sur vos obligations fiscales en tant que français résidant à l'étranger.",
          date: "25 mai 2023",
          readTime: "10 min"
        },
        {
          id: "comptabilite-internationale",
          title: "Les normes comptables internationales expliquées simplement",
          excerpt: "Comprendre les différences entre les normes comptables françaises et internationales pour une gestion optimale.",
          date: "14 avril 2023",
          readTime: "8 min"
        }
      ]
    },
    it: {
      id: "it",
      title: "Services IT et Digital",
      description: "Solutions numériques et informatiques par des experts français à l'international",
      longDescription: "Nos spécialistes IT et digital français basés à l'étranger vous proposent un accompagnement personnalisé pour tous vos projets technologiques. Du développement web sur mesure à la transformation digitale de votre entreprise, en passant par la cybersécurité, nos experts vous aident à relever vos défis numériques à l'international.",
      color: "purple",
      bgClass: "bg-purple-50 dark:bg-purple-900/20",
      textClass: "text-purple-600 dark:text-purple-400",
      offerings: [
        "Développement web et mobile sur mesure",
        "Consulting IT et transformation digitale",
        "Architecture de systèmes d'information",
        "Intégration d'ERP et CRM internationaux",
        "Développement d'applications métier",
        "Cybersécurité internationale",
        "Data Science et Intelligence Artificielle"
      ],
      experts: 142,
      countries: 31,
      featuredProviders: [
        {
          id: 7,
          name: "DigitalFrance Global",
          location: "Berlin, Allemagne",
          specialty: "Transformation digitale",
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        },
        {
          id: 8,
          name: "WebDev Solutions",
          location: "Lisbonne, Portugal",
          specialty: "Développement web et mobile",
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        },
        {
          id: 9,
          name: "CyberSecure International",
          location: "Tel Aviv, Israël",
          specialty: "Cybersécurité et protection des données",
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        }
      ],
      recentArticles: [
        {
          id: "transformation-digitale",
          title: "Transformation digitale : enjeux et opportunités pour les entreprises françaises à l'étranger",
          excerpt: "Comment la digitalisation peut devenir un avantage concurrentiel pour les entreprises françaises opérant à l'international.",
          date: "18 mai 2023",
          readTime: "9 min"
        },
        {
          id: "cybersecurite-internationale",
          title: "Cybersécurité internationale : protéger vos données dans un contexte global",
          excerpt: "Les meilleures pratiques pour sécuriser vos systèmes d'information dans différents contextes réglementaires internationaux.",
          date: "7 avril 2023",
          readTime: "11 min"
        }
      ]
    },
    medical: {
      id: "medical",
      title: "Services médicaux",
      description: "Consultations et suivis médicaux par des médecins français expatriés",
      longDescription: "Nos médecins français expatriés vous offrent un suivi médical de qualité, où que vous soyez dans le monde. Grâce à notre réseau international de professionnels de santé francophones, bénéficiez de consultations, de bilans de santé et de conseils médicaux adaptés à votre situation d'expatrié.",
      color: "red",
      bgClass: "bg-red-50 dark:bg-red-900/20",
      textClass: "text-red-600 dark:text-red-400",
      offerings: [
        "Téléconsultations médicales en français",
        "Suivi médical des expatriés",
        "Second avis médical international",
        "Coordination des soins à l'étranger",
        "Bilans de santé internationaux",
        "Médecine du travail pour entreprises françaises",
        "Assistance médicale pour voyageurs"
      ],
      experts: 76,
      countries: 22,
      featuredProviders: [
        {
          id: 10,
          name: "Dr. Martin Santé Internationale",
          location: "Montréal, Canada",
          specialty: "Médecine générale",
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        },
        {
          id: 11,
          name: "Clinique Française de Bangkok",
          location: "Bangkok, Thaïlande",
          specialty: "Médecine tropicale et expatriation",
          rating: 4.7,
          image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        },
        {
          id: 12,
          name: "MedExpatConsult",
          location: "Miami, États-Unis",
          specialty: "Télémédecine internationale",
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        }
      ],
      recentArticles: [
        {
          id: "sante-expatries",
          title: "Préserver sa santé en expatriation : conseils de médecins français",
          excerpt: "Recommandations pratiques pour maintenir une bonne santé pendant votre séjour à l'étranger, par des médecins expatriés.",
          date: "20 mai 2023",
          readTime: "8 min"
        },
        {
          id: "telemedicine-international",
          title: "La télémédecine : une solution adaptée aux expatriés",
          excerpt: "Comment la télémédecine révolutionne l'accès aux soins pour les français vivant à l'étranger.",
          date: "9 avril 2023",
          readTime: "6 min"
        }
      ]
    },
    dentaire: {
      id: "dentaire",
      title: "Services dentaires",
      description: "Soins dentaires de qualité française à l'international",
      longDescription: "Nos dentistes français installés à l'étranger vous proposent des soins dentaires aux standards français, où que vous soyez. Profitez d'une expertise reconnue en implantologie, orthodontie, esthétique dentaire et soins conservateurs, avec un praticien qui comprend vos attentes et communique dans votre langue.",
      color: "amber",
      bgClass: "bg-amber-50 dark:bg-amber-900/20",
      textClass: "text-amber-600 dark:text-amber-400",
      offerings: [
        "Soins dentaires conservateurs",
        "Prothèses dentaires aux normes françaises",
        "Implantologie et chirurgie orale",
        "Orthodontie adulte et enfant",
        "Esthétique dentaire",
        "Parodontologie",
        "Consultations préventives"
      ],
      experts: 62,
      countries: 19,
      featuredProviders: [
        {
          id: 13,
          name: "Dr. Dubois - Smile Clinic",
          location: "Barcelone, Espagne",
          specialty: "Implantologie et prothèses",
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        },
        {
          id: 14,
          name: "Cabinet Dentaire International",
          location: "Marrakech, Maroc",
          specialty: "Esthétique dentaire",
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        },
        {
          id: 15,
          name: "French Dental Care",
          location: "Ho Chi Minh, Vietnam",
          specialty: "Orthodontie et soins pédiatriques",
          rating: 4.7,
          image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        }
      ],
      recentArticles: [
        {
          id: "soins-dentaires-etranger",
          title: "Qualité des soins dentaires à l'étranger : comment choisir son praticien",
          excerpt: "Critères essentiels pour sélectionner un dentiste qualifié lors de votre expatriation et garantir des soins aux standards français.",
          date: "16 mai 2023",
          readTime: "7 min"
        },
        {
          id: "tourisme-dentaire",
          title: "Le tourisme dentaire : opportunités et précautions",
          excerpt: "Analyse objective des avantages et risques du tourisme dentaire pour les français, avec conseils de dentistes expatriés.",
          date: "2 avril 2023",
          readTime: "9 min"
        }
      ]
    }
  };

  // Type pour les services
  type ServiceCategory = {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    color: string;
    bgClass: string;
    textClass: string;
    offerings: string[];
    experts: number;
    countries: number;
    featuredProviders: {
      id: number;
      name: string;
      location: string;
      specialty: string;
      rating: number;
      image: string;
    }[];
    recentArticles: {
      id: string;
      title: string;
      excerpt: string;
      date: string;
      readTime: string;
    }[];
  };

  // Récupération du service sélectionné
  const service = categoryId ? (services as Record<string, ServiceCategory>)[categoryId] : null;

  // Si le service n'existe pas
  if (!service) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Service non trouvé</h1>
            <p className="text-muted-foreground mb-8">La catégorie de service que vous recherchez n'existe pas.</p>
            <Link to="/services" className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all">
              <span>Retour aux services</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Header */}
        <section className={`py-12 ${service.bgClass}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <span className="inline-block px-4 py-1 rounded-full bg-white dark:bg-secondary/50 text-sm font-medium mb-4">
                  <Link to="/services" className="hover:underline">Services</Link> &gt; {service.title}
                </span>
                <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${service.textClass}`}>
                  {service.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  {service.description}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center bg-white dark:bg-secondary/70 rounded-full px-4 py-2 shadow-sm">
                    <User className={`h-5 w-5 ${service.textClass} mr-2`} />
                    <span className="font-medium">{service.experts} experts</span>
                  </div>
                  <div className="flex items-center bg-white dark:bg-secondary/70 rounded-full px-4 py-2 shadow-sm">
                    <MapPin className={`h-5 w-5 ${service.textClass} mr-2`} />
                    <span className="font-medium">{service.countries} pays</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Description détaillée */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold mb-6">Présentation du service</h2>
                  <p className="text-muted-foreground mb-8">
                    {service.longDescription}
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-4">Prestations disponibles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {service.offerings.map((offering, index) => (
                      <div key={index} className="flex items-start gap-2 group">
                        <CheckCircle className={`h-5 w-5 ${service.textClass} flex-shrink-0 mt-0.5`} />
                        <span>{offering}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <Link
                      to={`/prestataires?category=${service.id}`}
                      className={`inline-flex items-center px-6 py-3 bg-${service.color}-600 text-white rounded-lg hover:bg-${service.color}-700 transition-all`}
                    >
                      <span>Trouver un prestataire</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white dark:bg-secondary/50 rounded-xl p-6 shadow-sm border border-border">
                    <h3 className="text-lg font-semibold mb-4">Comment ça marche ?</h3>
                    <ol className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className={`h-6 w-6 rounded-full ${service.bgClass} ${service.textClass} flex items-center justify-center flex-shrink-0 font-medium text-sm`}>1</div>
                        <div>
                          <p className="font-medium">Décrivez votre besoin</p>
                          <p className="text-sm text-muted-foreground">Expliquez-nous votre projet ou problématique</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className={`h-6 w-6 rounded-full ${service.bgClass} ${service.textClass} flex items-center justify-center flex-shrink-0 font-medium text-sm`}>2</div>
                        <div>
                          <p className="font-medium">Recevez des devis</p>
                          <p className="text-sm text-muted-foreground">Comparez les propositions de nos experts</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className={`h-6 w-6 rounded-full ${service.bgClass} ${service.textClass} flex items-center justify-center flex-shrink-0 font-medium text-sm`}>3</div>
                        <div>
                          <p className="font-medium">Choisissez votre expert</p>
                          <p className="text-sm text-muted-foreground">Sélectionnez le prestataire qui vous convient</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className={`h-6 w-6 rounded-full ${service.bgClass} ${service.textClass} flex items-center justify-center flex-shrink-0 font-medium text-sm`}>4</div>
                        <div>
                          <p className="font-medium">Collaborez efficacement</p>
                          <p className="text-sm text-muted-foreground">Échangez et travaillez ensemble en toute sécurité</p>
                        </div>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="bg-white dark:bg-secondary/50 rounded-xl p-6 shadow-sm border border-border">
                    <h3 className="text-lg font-semibold mb-4">Vous avez des questions ?</h3>
                    <p className="text-muted-foreground mb-4">Notre équipe est à votre disposition pour répondre à toutes vos questions sur nos services.</p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-all w-full justify-center"
                    >
                      <span>Nous contacter</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Prestataires vedettes */}
        <section className="py-12 bg-slate-50 dark:bg-slate-900/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Prestataires recommandés</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.featuredProviders.map((provider) => (
                  <div key={provider.id} className="bg-white dark:bg-secondary/50 rounded-xl shadow-sm overflow-hidden border border-border hover:shadow-md transition-all">
                    <div className="h-36 overflow-hidden">
                      <img 
                        src={provider.image} 
                        alt={provider.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-5">
                      <h3 className="font-semibold text-lg mb-1">{provider.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{provider.location}</span>
                      </div>
                      <p className={`text-sm ${service.textClass} font-medium mb-3`}>{provider.specialty}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-amber-500">★</div>
                          <span className="font-medium ml-1">{provider.rating}</span>
                        </div>
                        
                        <Link
                          to={`/prestataires/${provider.id}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          Voir le profil
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Link
                  to={`/prestataires?category=${service.id}`}
                  className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
                >
                  <span>Voir tous les prestataires</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Articles récents */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Articles recommandés</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.recentArticles.map((article) => (
                  <article key={article.id} className="bg-white dark:bg-secondary/50 rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-all">
                    <div className="p-6">
                      <div className="flex items-center text-xs text-muted-foreground mb-3 gap-4">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-3">{article.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                      
                      <Link
                        to={`/blog/${article.id}`}
                        className={`inline-flex items-center text-sm font-medium ${service.textClass} hover:underline`}
                      >
                        <span>Lire l'article</span>
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Link
                  to="/blog"
                  className="inline-flex items-center px-6 py-3 bg-foreground text-background dark:bg-foreground/90 dark:text-background rounded-lg hover:bg-foreground/90 dark:hover:bg-foreground/80 transition-all"
                >
                  <span>Tous les articles</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
