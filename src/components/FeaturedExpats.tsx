
import { useState, useRef, useEffect } from "react";
import { Star, Award, MapPin, Globe, Briefcase, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Données fictives des expatriés stars
const featuredExpats = [
  {
    id: "1",
    name: "Dr. Émilie Laurent",
    title: "Chirurgienne-dentiste spécialisée",
    location: "Lisbonne, Portugal",
    category: "Dentaire",
    expertise: ["Implantologie", "Esthétique dentaire", "Prothèses sur-mesure"],
    experience: 15,
    languages: ["Français", "Anglais", "Portugais"],
    rating: 4.9,
    reviews: 183,
    clients: 320,
    description: "Diplômée de la faculté de Paris Descartes, j'ai développé une expertise dans les prothèses dentaires de précision et l'implantologie avancée. Mon approche allie techniques françaises et innovations internationales.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "2",
    name: "Me. Jean-Philippe Dupont",
    title: "Avocat d'affaires international",
    location: "New York, États-Unis",
    category: "Juridique",
    expertise: ["Droit des sociétés", "Fusions-acquisitions", "Implantation internationale"],
    experience: 22,
    languages: ["Français", "Anglais", "Espagnol"],
    rating: 5.0,
    reviews: 147,
    clients: 215,
    description: "Ancien avocat au barreau de Paris, j'accompagne les entreprises françaises dans leur développement aux États-Unis depuis plus de 20 ans. Je combine expertise juridique française et connaissance approfondie du droit américain.",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "3",
    name: "Sophie Moreau",
    title: "Experte-comptable certifiée",
    location: "Dubaï, Émirats Arabes Unis",
    category: "Comptabilité",
    expertise: ["Fiscalité internationale", "Optimisation fiscale", "Comptabilité des holdings"],
    experience: 18,
    languages: ["Français", "Anglais", "Arabe"],
    rating: 4.8,
    reviews: 126,
    clients: 178,
    description: "Spécialiste des questions fiscales complexes pour les entreprises opérant au Moyen-Orient. Mon expertise permet aux sociétés françaises de naviguer sereinement dans l'environnement fiscal avantageux mais complexe de la région.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "4",
    name: "Dr. Antoine Bernard",
    title: "Médecin généraliste & consultant en santé",
    location: "Montréal, Canada",
    category: "Médical",
    expertise: ["Télémédecine", "Suivi expatriés", "Médecine préventive"],
    experience: 17,
    languages: ["Français", "Anglais"],
    rating: 4.9,
    reviews: 215,
    clients: 450,
    description: "Médecin français installé au Canada, je me suis spécialisé dans le suivi médical à distance des expatriés français. Mon approche combine médecine française et innovations nord-américaines en télésanté.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "5",
    name: "Alexandre Martin",
    title: "Architecte logiciel & DevOps",
    location: "Berlin, Allemagne",
    category: "IT & Digital",
    expertise: ["Architecture cloud", "Sécurité informatique", "Développement sur mesure"],
    experience: 14,
    languages: ["Français", "Anglais", "Allemand"],
    rating: 5.0,
    reviews: 178,
    clients: 92,
    description: "Ingénieur diplômé de l'École 42, j'ai développé une expertise dans la conception d'architectures cloud sécurisées. Je combine approche française de la qualité et efficacité allemande pour créer des solutions robustes et évolutives.",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
];

export default function FeaturedExpats() {
  const [inView, setInView] = useState(false);
  const [selectedExpatId, setSelectedExpatId] = useState<string | null>(null);
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

  const toggleExpat = (id: string) => {
    if (selectedExpatId === id) {
      setSelectedExpatId(null);
    } else {
      setSelectedExpatId(id);
    }
  };

  return (
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <Award className="h-6 w-6 text-amber-500 mr-2" />
            <span className="text-sm font-medium text-primary">Les talents français à l'international</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Nos expatriés stars du jour
          </h2>
          <p className="text-muted-foreground">
            Découvrez l'excellence française à l'étranger à travers ces professionnels d'exception 
            qui font rayonner le savoir-faire français dans le monde entier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredExpats.map((expat, index) => (
            <div
              key={expat.id}
              className={`bg-white dark:bg-secondary/80 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg border border-border group ${
                inView ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/60 z-10"></div>
                <img
                  src={expat.image}
                  alt={expat.name}
                  className="w-full h-64 object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 z-20 bg-primary text-white text-xs px-3 py-1 rounded-full">
                  {expat.category}
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 z-20 text-white">
                  <h3 className="text-xl font-bold">{expat.name}</h3>
                  <p className="text-white/90 text-sm">{expat.title}</p>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center mb-4">
                  <MapPin className="h-4 w-4 text-primary mr-1.5" />
                  <span className="text-sm text-muted-foreground">
                    {expat.location}
                  </span>
                  <div className="ml-auto flex items-center">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-medium ml-1">{expat.rating}</span>
                    <span className="text-xs text-muted-foreground ml-1">
                      ({expat.reviews} avis)
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground/80 mb-2">Expertise :</h4>
                  <div className="flex flex-wrap gap-2">
                    {expat.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 text-primary mr-1.5" />
                    <span>{expat.experience} ans d'exp.</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 text-primary mr-1.5" />
                    <span>{expat.languages.length} langues</span>
                  </div>
                </div>

                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    selectedExpatId === expat.id ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="text-muted-foreground text-sm mb-4">
                    {expat.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-foreground/80 mb-2">Langues parlées :</h4>
                    <div className="flex flex-wrap gap-2">
                      {expat.languages.map((language) => (
                        <span
                          key={language}
                          className="text-xs bg-secondary-foreground/10 text-secondary-foreground px-2 py-1 rounded-full"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="bg-muted rounded-lg p-2">
                      <span className="block text-lg font-bold text-primary">{expat.reviews}</span>
                      <span className="text-xs text-muted-foreground">Avis</span>
                    </div>
                    <div className="bg-muted rounded-lg p-2">
                      <span className="block text-lg font-bold text-primary">{expat.clients}</span>
                      <span className="text-xs text-muted-foreground">Clients</span>
                    </div>
                    <div className="bg-muted rounded-lg p-2">
                      <span className="block text-lg font-bold text-primary">{expat.experience}</span>
                      <span className="text-xs text-muted-foreground">Années</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <button
                    onClick={() => toggleExpat(expat.id)}
                    className="text-sm text-primary flex items-center"
                  >
                    {selectedExpatId === expat.id ? "Voir moins" : "Voir plus"}
                    <ChevronRight className={`h-4 w-4 ml-1 transition-transform ${
                      selectedExpatId === expat.id ? 'rotate-90' : ''
                    }`} />
                  </button>
                  
                  <Link
                    to={`/prestataires/${expat.id}`}
                    className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Contacter
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
