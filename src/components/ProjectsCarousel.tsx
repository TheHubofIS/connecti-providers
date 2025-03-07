
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Building, Users, MapPin, Calendar } from "lucide-react";

// Données fictives des projets réalisés
const projects = [
  {
    id: "1",
    title: "Refonte du système juridique international",
    client: "Total Energies",
    clientType: "CAC 40",
    provider: "Cabinet Martin & Associés",
    location: "Singapour",
    category: "Juridique",
    description: "Accompagnement juridique complet pour la restructuration des filiales asiatiques et la mise en conformité avec les réglementations locales.",
    year: 2023,
    image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=1024&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Optimisation fiscale et comptable",
    client: "Groupe Lactalis",
    clientType: "Grande Entreprise",
    provider: "Dupont Finances International",
    location: "Zurich, Suisse",
    category: "Comptabilité",
    description: "Mise en place d'une stratégie d'optimisation fiscale et comptable pour les opérations européennes du groupe.",
    year: 2022,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1024&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Développement d'une application de suivi médical",
    client: "Doctolib",
    clientType: "Scale-up",
    provider: "HealthTech Solutions",
    location: "Montréal, Canada",
    category: "IT & Digital",
    description: "Conception et développement d'une plateforme sécurisée de téléconsultation avec intelligence artificielle pour l'analyse préliminaire des symptômes.",
    year: 2023,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1024&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Programme de consultation médicale à distance",
    client: "Sanofi",
    clientType: "CAC 40",
    provider: "Dr. Lefevre & Équipe",
    location: "Boston, États-Unis",
    category: "Médical",
    description: "Mise en place d'un programme de consultation médicale à distance pour les employés internationaux du groupe pharmaceutique.",
    year: 2022,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1024&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Fabrication de prothèses dentaires de précision",
    client: "Réseau National des Cliniques Dentaires",
    clientType: "PME",
    provider: "Sourire Plus",
    location: "Budapest, Hongrie",
    category: "Dentaire",
    description: "Création d'un laboratoire dédié à la fabrication de prothèses dentaires sur-mesure utilisant des technologies d'impression 3D avancées.",
    year: 2023,
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1024&auto=format&fit=crop",
  },
];

export default function ProjectsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const carouselElement = document.getElementById('projects-carousel');
    if (carouselElement) {
      observer.observe(carouselElement);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovering]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section 
      id="projects-carousel" 
      className="py-20 bg-gradient-to-b from-background to-secondary/30"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-sm font-medium text-primary">Success stories</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Projets réalisés par nos experts
          </h2>
          <p className="text-muted-foreground">
            Découvrez des exemples de collaborations réussies entre des entreprises françaises 
            et nos prestataires expatriés, démontrant l'excellence de notre réseau.
          </p>
        </div>

        <div 
          className={`relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl shadow-lg ${
            inView ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ minHeight: "520px" }}
        >
          {/* Carousel buttons */}
          <button 
            onClick={prevSlide} 
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/80 dark:bg-black/50 flex items-center justify-center text-foreground hover:bg-white dark:hover:bg-black/70 transition-all"
            aria-label="Projet précédent"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            onClick={nextSlide} 
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/80 dark:bg-black/50 flex items-center justify-center text-foreground hover:bg-white dark:hover:bg-black/70 transition-all"
            aria-label="Projet suivant"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Carousel content */}
          <div className="h-full">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100 transform-none"
                    : "opacity-0 translate-x-full"
                }`}
                style={{ display: index === currentSlide ? "block" : "none" }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  <div className="h-64 md:h-full relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1.5 rounded-full">
                      {project.category}
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 flex flex-col bg-white dark:bg-secondary justify-center">
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    
                    <div className="flex items-center mb-2 text-sm">
                      <Building className="h-4 w-4 mr-2 text-primary" />
                      <span className="font-medium">{project.client}</span>
                      <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-muted">
                        {project.clientType}
                      </span>
                    </div>
                    
                    <div className="flex items-center mb-2 text-sm">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      <span>{project.provider}</span>
                    </div>
                    
                    <div className="flex items-center mb-4 text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      <span>{project.location}</span>
                      <Calendar className="h-4 w-4 ml-4 mr-2 text-primary" />
                      <span>{project.year}</span>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">
                      {project.description}
                    </p>
                    
                    <button className="mt-auto self-start px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                      Voir le détail du projet
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  index === currentSlide 
                    ? "bg-primary w-8" 
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Aller au projet ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
