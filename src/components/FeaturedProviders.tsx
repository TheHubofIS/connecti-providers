
import { useState, useRef, useEffect } from "react";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Données fictives des prestataires
const providers = [
  {
    id: "1",
    name: "Sophie Dubois",
    category: "Juridique",
    specialty: "Droit des affaires",
    location: "Barcelone, Espagne",
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "2",
    name: "Pierre Martin",
    category: "Comptabilité",
    specialty: "Fiscalité internationale",
    location: "Lisbonne, Portugal",
    rating: 4.8,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "3",
    name: "Julie Lefèvre",
    category: "IT",
    specialty: "Développement web",
    location: "Berlin, Allemagne",
    rating: 5.0,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "4",
    name: "Thomas Roux",
    category: "Médical",
    specialty: "Consultation à distance",
    location: "Montréal, Canada",
    rating: 4.7,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "5",
    name: "Marie Dupont",
    category: "Dentaire",
    specialty: "Prothèses dentaires",
    location: "Budapest, Hongrie",
    rating: 4.9,
    reviews: 113,
    image: "https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "6",
    name: "Alex Bernard",
    category: "Juridique",
    specialty: "Droit immobilier",
    location: "Miami, États-Unis",
    rating: 4.8,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
];

export default function FeaturedProviders() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-medium text-primary">Prestataires à l'honneur</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Découvrez nos meilleurs experts
          </h2>
          <p className="text-muted-foreground">
            Des professionnels français basés à l'étranger, sélectionnés pour leur 
            expertise, leur fiabilité et la qualité de leurs services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider, index) => (
            <div
              key={provider.id}
              className={`bg-white dark:bg-secondary/80 rounded-xl shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md border border-border group ${
                inView ? 'animate-slide-up' : 'opacity-0 translate-y-10'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-w-16 aspect-h-9 h-48 relative">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-primary text-white text-xs px-2 py-1 rounded-full">
                  {provider.category}
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1">{provider.name}</h3>
                <p className="text-primary text-sm mb-2">{provider.specialty}</p>
                
                <div className="flex items-center mb-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                  <span className="text-xs text-muted-foreground">{provider.location}</span>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-medium ml-1">{provider.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({provider.reviews} avis)
                  </span>
                </div>
                
                <Link
                  to={`/prestataires/${provider.id}`}
                  className="block w-full py-2 text-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  Voir le profil
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/prestataires"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all"
          >
            <span>Explorer tous les prestataires</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
