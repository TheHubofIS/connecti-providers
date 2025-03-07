
import { useState, useRef, useEffect } from "react";
import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react";

// Données fictives des témoignages
const testimonials = [
  {
    id: "1",
    name: "Jean-Pierre Moreau",
    company: "Entreprise de construction",
    text: "J'ai pu trouver un avocat français à Madrid qui m'a aidé dans mes démarches pour mon projet immobilier en Espagne. Un service impeccable et une expertise irréprochable.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "2",
    name: "Cécile Laurent",
    company: "Boutique en ligne",
    text: "Grâce à ConnectiPro, j'ai pu collaborer avec un comptable français au Portugal qui comprend parfaitement les spécificités fiscales des deux pays. Un gain de temps et d'argent considérable.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "3",
    name: "Michel Durand",
    company: "Restaurant gastronomique",
    text: "J'ai pu faire réaliser mes prothèses dentaires en Hongrie par un prothésiste français, à un prix défiant toute concurrence. La qualité est excellente et le suivi impeccable.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "4",
    name: "Sophie Bertrand",
    company: "Cabinet d'architecture",
    text: "En tant qu'expatriée à Londres, j'ai pu consulter un médecin français via ConnectiPro. C'est rassurant de pouvoir expliquer ses symptômes dans sa langue maternelle.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
];

export default function Testimonials() {
  const [inView, setInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-medium text-primary">Témoignages</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Ce que nos clients disent
          </h2>
          <p className="text-muted-foreground">
            Découvrez l'expérience de nos clients qui ont fait confiance à nos prestataires français à l'étranger.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div 
            className={`overflow-hidden relative ${
              inView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white dark:bg-secondary/50 rounded-xl shadow-sm p-8 relative">
                    <Quote className="absolute top-8 right-8 h-12 w-12 text-primary/10" />
                    
                    <div className="flex items-center mb-6">
                      <div className="h-14 w-14 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < testimonial.rating 
                              ? "text-amber-500 fill-amber-500" 
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    
                    <p className="text-foreground/90 leading-relaxed">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full border border-border hover:border-primary/20 transition-colors"
              aria-label="Témoignage précédent"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    activeIndex === index 
                      ? "w-8 bg-primary" 
                      : "w-2 bg-primary/30"
                  }`}
                  aria-label={`Témoignage ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full border border-border hover:border-primary/20 transition-colors"
              aria-label="Témoignage suivant"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
