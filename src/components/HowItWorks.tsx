
import { useState, useRef, useEffect } from "react";
import { Search, FileText, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const steps = [
  {
    id: 1,
    icon: Search,
  },
  {
    id: 2,
    icon: FileText,
  },
  {
    id: 3,
    icon: CheckCircle,
  },
];

export default function HowItWorks() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { translate } = useLanguage();

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
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="blur-gradient blur-gradient-primary absolute top-1/3 left-[15%]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-medium text-primary">{translate('howItWorks.subtitle', 'Simple, rapide et efficace')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            {translate('howItWorks.title', 'Comment ça marche')}
          </h2>
          <p className="text-muted-foreground">
            {translate('howItWorks.description', 'Notre plateforme vous permet de trouver facilement le prestataire idéal et d\'obtenir rapidement des réponses à vos besoins.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`relative ${
                inView ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Connecteur entre les étapes (visible uniquement sur les écrans moyens et grands) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(100%_-_2rem)] w-[calc(100%_-_3rem)] h-[2px] bg-gradient-to-r from-primary to-transparent z-0"></div>
              )}
              
              <div className="rounded-xl p-6 bg-white dark:bg-secondary/50 shadow-sm border border-border relative z-10 h-full transition-all hover:shadow-md hover:border-primary/20">
                <div className="h-16 w-16 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <step.icon className="h-8 w-8" />
                </div>
                
                <div className="absolute top-6 left-6 h-16 w-16 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary/60">{translate('howItWorks.step', 'Étape')}</span>
                  <span className="text-2xl font-bold text-primary/20 absolute">{step.id}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{translate(`howItWorks.step${step.id}.title`, `Étape ${step.id}`)}</h3>
                <p className="text-muted-foreground">{translate(`howItWorks.step${step.id}.description`, `Description de l'étape ${step.id}`)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/comment-ca-marche"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all"
          >
            <span>{translate('howItWorks.learnMore', 'En savoir plus')}</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
