
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight, HelpCircle, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

// Composant pour les icônes flottantes d'arrière-plan
const FloatingIcons = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[10%] left-[5%] text-primary/5 animate-float" style={{ animationDelay: '0.5s' }}>
        <Mail size={80} />
      </div>
      <div className="absolute top-[30%] right-[8%] text-primary/5 animate-float" style={{ animationDelay: '1.2s' }}>
        <Phone size={60} />
      </div>
      <div className="absolute bottom-[20%] left-[12%] text-primary/5 animate-float" style={{ animationDelay: '0.8s' }}>
        <MapPin size={70} />
      </div>
      <div className="absolute bottom-[10%] right-[15%] text-primary/5 animate-float" style={{ animationDelay: '1.5s' }}>
        <CheckCircle size={50} />
      </div>
    </div>
  );
};

// Nouveau composant pour les statistiques d'assistance
const SupportStats = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-8 mb-4">
      {[
        { icon: Clock, label: "Délai de réponse", value: "< 24h" },
        { icon: CheckCircle, label: "Taux de satisfaction", value: "98%" },
        { icon: Calendar, label: "Disponibilité", value: "7j/7" }
      ].map((stat, index) => (
        <div 
          key={index} 
          className="flex flex-col items-center p-4 bg-primary/5 rounded-xl hover:bg-primary/10 transition-all duration-300"
        >
          <stat.icon className="h-8 w-8 text-primary mb-2" />
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <p className="text-xl font-semibold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

// Nouveau composant pour l'animation du formulaire
const AnimatedFormField = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={cn(
        "transition-all duration-700 transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    company: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inView, setInView] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    setInView(true);
    
    // Simuler le chargement d'une carte
    const mapElement = mapRef.current;
    if (mapElement) {
      setTimeout(() => {
        mapElement.classList.add('map-loaded');
      }, 1000);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulation d'envoi de formulaire
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      
      setSubmitted(true);
      
      // Réinitialiser le formulaire après avoir montré l'état de succès
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          phone: '',
          company: '',
        });
      }, 5000);
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer plus tard.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Éléments d'arrière-plan */}
      <div className="blur-gradient blur-gradient-primary absolute top-1/4 right-[10%] animate-pulse-slow"></div>
      <div className="blur-gradient blur-gradient-secondary absolute bottom-1/3 left-[10%] animate-pulse-slow"></div>
      
      <FloatingIcons />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-12 transition-all duration-700",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-muted-foreground text-lg">
            Vous avez des questions ou besoin d'aide pour trouver le prestataire idéal ? 
            Notre équipe est là pour vous accompagner dans votre recherche.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className={cn(
            "lg:col-span-2 transition-all duration-700 delay-100",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <div className="bg-card rounded-xl shadow-md p-8 border border-border/50 backdrop-blur-sm relative overflow-hidden group">
              {/* Effet de lueur au survol */}
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-1000 -z-10" />
              
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary" />
                Envoyez-nous un message
              </h2>
              
              {submitted ? (
                <div className="py-8 text-center animate-fade-in">
                  <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Message envoyé !</h3>
                  <p className="text-muted-foreground mb-4">Nous vous répondrons dans les plus brefs délais.</p>
                  <SupportStats />
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AnimatedFormField delay={100}>
                      <div className={cn(
                        "space-y-2 transition-all duration-300 hover:translate-y-[-2px]",
                        activeField === 'name' && "shadow-sm shadow-primary/20 rounded-lg"
                      )}>
                        <label htmlFor="name" className="text-sm font-medium">Nom complet</label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Votre nom complet"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFocus('name')}
                          onBlur={handleBlur}
                          className="border-input focus:border-primary"
                          required
                        />
                      </div>
                    </AnimatedFormField>
                    
                    <AnimatedFormField delay={200}>
                      <div className={cn(
                        "space-y-2 transition-all duration-300 hover:translate-y-[-2px]",
                        activeField === 'email' && "shadow-sm shadow-primary/20 rounded-lg"
                      )}>
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="votre@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFocus('email')}
                          onBlur={handleBlur}
                          className="border-input focus:border-primary"
                          required
                        />
                      </div>
                    </AnimatedFormField>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AnimatedFormField delay={300}>
                      <div className={cn(
                        "space-y-2 transition-all duration-300 hover:translate-y-[-2px]",
                        activeField === 'phone' && "shadow-sm shadow-primary/20 rounded-lg"
                      )}>
                        <label htmlFor="phone" className="text-sm font-medium">Téléphone</label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+33 6 12 34 56 78"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => handleFocus('phone')}
                          onBlur={handleBlur}
                          className="border-input focus:border-primary"
                        />
                      </div>
                    </AnimatedFormField>
                    
                    <AnimatedFormField delay={400}>
                      <div className={cn(
                        "space-y-2 transition-all duration-300 hover:translate-y-[-2px]",
                        activeField === 'company' && "shadow-sm shadow-primary/20 rounded-lg"
                      )}>
                        <label htmlFor="company" className="text-sm font-medium">Entreprise</label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Nom de votre entreprise"
                          value={formData.company}
                          onChange={handleChange}
                          onFocus={() => handleFocus('company')}
                          onBlur={handleBlur}
                          className="border-input focus:border-primary"
                        />
                      </div>
                    </AnimatedFormField>
                  </div>
                  
                  <AnimatedFormField delay={500}>
                    <div className={cn(
                      "space-y-2 transition-all duration-300 hover:translate-y-[-2px]",
                      activeField === 'subject' && "shadow-sm shadow-primary/20 rounded-lg"
                    )}>
                      <label htmlFor="subject" className="text-sm font-medium">Sujet</label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Objet de votre message"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => handleFocus('subject')}
                        onBlur={handleBlur}
                        className="border-input focus:border-primary"
                        required
                      />
                    </div>
                  </AnimatedFormField>
                  
                  <AnimatedFormField delay={600}>
                    <div className={cn(
                      "space-y-2 transition-all duration-300 hover:translate-y-[-2px]",
                      activeField === 'message' && "shadow-sm shadow-primary/20 rounded-lg"
                    )}>
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Votre message ici..."
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={handleBlur}
                        className="border-input focus:border-primary resize-none"
                        required
                      />
                    </div>
                  </AnimatedFormField>
                  
                  <AnimatedFormField delay={700}>
                    <Button 
                      type="submit" 
                      className="w-full relative overflow-hidden group" 
                      disabled={loading}
                      size="lg"
                    >
                      <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-500 ease-out group-hover:w-full"></span>
                      {loading ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Envoi en cours...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="h-4 w-4 mr-2" />
                          Envoyer le message
                        </div>
                      )}
                    </Button>
                  </AnimatedFormField>
                </form>
              )}
            </div>
          </div>
          
          <div>
            <div className={cn(
              "bg-card rounded-xl shadow-md p-8 border border-border/50 backdrop-blur-sm mb-6 transition-all duration-700 delay-200 group hover:shadow-lg hover:border-primary/30",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <h2 className="text-xl font-semibold mb-6">Informations de contact</h2>
              
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <a 
                      href="mailto:contact@connectipro.fr" 
                      className="text-primary hover:underline flex items-center group"
                    >
                      contact@connectipro.fr
                      <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Téléphone</h3>
                    <a 
                      href="tel:+33123456789" 
                      className="text-primary hover:underline flex items-center group"
                    >
                      +33 1 23 45 67 89
                      <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Adresse</h3>
                    <address className="not-italic text-muted-foreground">
                      123 Avenue des Champs-Élysées<br />
                      75008 Paris, France
                    </address>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={cn(
              "bg-card rounded-xl shadow-md overflow-hidden border border-border/50 backdrop-blur-sm transition-all duration-700 delay-300 hover:shadow-lg",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <div 
                ref={mapRef}
                className="h-[200px] bg-muted/50 w-full transition-all duration-1000 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
                <div className="absolute inset-0 flex items-center justify-center map-skeleton">
                  <MapPin className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <div className="absolute inset-0 opacity-0 transition-opacity duration-1000" style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80")`, 
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}></div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Heures d'ouverture</h2>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center border-b border-border/30 pb-2 group">
                    <span className="group-hover:text-primary transition-colors">Lundi - Vendredi:</span>
                    <span className="font-medium bg-primary/10 px-3 py-1 rounded-full text-sm">9h - 18h</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-border/30 pb-2 group">
                    <span className="group-hover:text-primary transition-colors">Samedi:</span>
                    <span className="font-medium bg-primary/10 px-3 py-1 rounded-full text-sm">10h - 15h</span>
                  </li>
                  <li className="flex justify-between items-center group">
                    <span className="group-hover:text-primary transition-colors">Dimanche:</span>
                    <span className="font-medium bg-muted/50 px-3 py-1 rounded-full text-sm">Fermé</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Section FAQ rapide */}
        <div className={cn(
          "max-w-6xl mx-auto mt-16 transition-all duration-700 delay-400",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Questions fréquentes</h2>
            <p className="text-muted-foreground mt-2">Obtenez des réponses rapides à vos questions les plus courantes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "Comment trouver le prestataire idéal ?",
                answer: "Utilisez notre moteur de recherche avancé avec filtres par localisation, compétences et tarifs pour trouver rapidement le professionnel qui correspond à vos besoins spécifiques."
              },
              {
                question: "Quelles garanties offrez-vous sur les prestataires ?",
                answer: "Tous nos prestataires sont vérifiés, leurs compétences validées et les avis clients sont authentiques. Nous proposons également une garantie satisfaction ou remboursement sur les premières prestations."
              },
              {
                question: "Comment fonctionne le système de paiement ?",
                answer: "Notre plateforme sécurisée permet le paiement en ligne avec libération des fonds uniquement lorsque vous êtes satisfait du service. Plusieurs méthodes de paiement sont acceptées."
              },
              {
                question: "Puis-je devenir prestataire sur votre plateforme ?",
                answer: "Absolument ! Vous pouvez vous inscrire comme prestataire en quelques étapes simples. Nous vérifions votre profil et vos compétences avant de valider votre inscription."
              }
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-all duration-300 hover:border-primary/30">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <HelpCircle className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-lg mb-2">{item.question}</h3>
                    <p className="text-muted-foreground text-sm">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        .map-skeleton {
          background: linear-gradient(-45deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
          background-size: 200% 200%;
          animation: shimmer 1.5s infinite linear;
        }
        
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        
        .map-loaded .map-skeleton {
          opacity: 0;
        }
        
        .map-loaded > div:last-child {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Contact;
