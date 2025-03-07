
import { useState, useRef, useEffect } from "react";
import { ArrowRight, Scale, Calculator, Code, Heart, Tooth } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: "juridique",
    title: "Juridique",
    description: "Avocats, notaires et juristes français basés à l'étranger",
    icon: Scale,
    color: "bg-blue-50 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400",
  },
  {
    id: "comptabilite",
    title: "Comptabilité",
    description: "Experts-comptables, fiscalistes et conseillers financiers",
    icon: Calculator,
    color: "bg-green-50 text-green-500 dark:bg-green-900/20 dark:text-green-400",
  },
  {
    id: "it",
    title: "IT & Digital",
    description: "Développeurs, designers et consultants en informatique",
    icon: Code,
    color: "bg-purple-50 text-purple-500 dark:bg-purple-900/20 dark:text-purple-400",
  },
  {
    id: "medical",
    title: "Médical",
    description: "Médecins, spécialistes et professionnels de la santé français",
    icon: Heart,
    color: "bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400",
  },
  {
    id: "dentaire",
    title: "Dentaire",
    description: "Dentistes, orthodontistes et prothésistes dentaires",
    icon: Tooth,
    color: "bg-amber-50 text-amber-500 dark:bg-amber-900/20 dark:text-amber-400",
  }
];

export default function ServiceCategories() {
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
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-medium text-primary">Nos domaines d'expertise</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Des experts français dans des domaines stratégiques
          </h2>
          <p className="text-muted-foreground">
            Découvrez notre réseau de professionnels français basés à l'étranger, 
            sélectionnés pour leur expertise et leur connaissance des besoins des clients français.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`rounded-xl p-6 neo backdrop-blur-sm transition-all duration-500 hover:shadow-lg border border-border hover:border-primary/20 ${
                inView ? 'animate-scale-in' : 'opacity-0 scale-95'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`h-12 w-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                <category.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-muted-foreground mb-4">{category.description}</p>
              <Link
                to={`/services/${category.id}`}
                className="flex items-center text-primary font-medium"
              >
                <span>Explorer les services</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center px-6 py-3 border border-primary/20 rounded-full text-primary font-medium hover:bg-primary/5 transition-all"
          >
            <span>Voir tous les services</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
