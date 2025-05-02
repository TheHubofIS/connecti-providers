
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight } from 'lucide-react';
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

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      
      setSubmitted(true);
      
      // Reset form after showing success state
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      }, 3000);
      
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
      {/* Background elements */}
      <div className="blur-gradient blur-gradient-primary absolute top-1/4 right-[10%] animate-pulse-slow"></div>
      <div className="blur-gradient blur-gradient-secondary absolute bottom-1/3 left-[10%] animate-pulse-slow"></div>
      
      <FloatingIcons />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-12 transition-all duration-700",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-muted-foreground text-lg">
            Vous avez des questions ou besoin d'aide pour trouver le prestataire idéal ? 
            Notre équipe est là pour vous accompagner dans votre recherche.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className={cn(
            "md:col-span-2 transition-all duration-700 delay-100",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <div className="bg-card rounded-xl shadow-md p-8 border border-border/50 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary" />
                Envoyez-nous un message
              </h2>
              
              {submitted ? (
                <div className="py-8 text-center">
                  <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Message envoyé !</h3>
                  <p className="text-muted-foreground mb-4">Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2 transition-all duration-300 hover:translate-y-[-2px]">
                      <label htmlFor="name" className="text-sm font-medium">Nom complet</label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Votre nom complet"
                        value={formData.name}
                        onChange={handleChange}
                        className="border-input focus:border-primary"
                        required
                      />
                    </div>
                    <div className="space-y-2 transition-all duration-300 hover:translate-y-[-2px]">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-input focus:border-primary"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 transition-all duration-300 hover:translate-y-[-2px]">
                    <label htmlFor="subject" className="text-sm font-medium">Sujet</label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Objet de votre message"
                      value={formData.subject}
                      onChange={handleChange}
                      className="border-input focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 transition-all duration-300 hover:translate-y-[-2px]">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Votre message ici..."
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="border-input focus:border-primary"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full relative overflow-hidden group" 
                    disabled={loading}
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
                </form>
              )}
            </div>
          </div>
          
          <div>
            <div className={cn(
              "bg-card rounded-xl shadow-md p-8 border border-border/50 backdrop-blur-sm mb-6 transition-all duration-700 delay-200",
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
              "bg-card rounded-xl shadow-md p-8 border border-border/50 backdrop-blur-sm transition-all duration-700 delay-300",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <h2 className="text-xl font-semibold mb-4">Heures d'ouverture</h2>
              <ul className="space-y-2">
                <li className="flex justify-between border-b border-border/30 pb-2">
                  <span>Lundi - Vendredi:</span>
                  <span className="font-medium">9h - 18h</span>
                </li>
                <li className="flex justify-between border-b border-border/30 pb-2">
                  <span>Samedi:</span>
                  <span className="font-medium">10h - 15h</span>
                </li>
                <li className="flex justify-between">
                  <span>Dimanche:</span>
                  <span className="font-medium">Fermé</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
