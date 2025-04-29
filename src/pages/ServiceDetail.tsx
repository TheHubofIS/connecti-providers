
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Calendar, MapPin } from 'lucide-react';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [loading, setLoading] = useState(true);

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  // This would normally fetch data from an API
  const service = {
    id: serviceId,
    title: serviceId === 'juridique' ? 'Services Juridiques' :
           serviceId === 'comptabilite' ? 'Services de Comptabilité' :
           serviceId === 'it' ? 'Services Informatiques' :
           serviceId === 'medical' ? 'Services Médicaux' :
           serviceId === 'dentaire' ? 'Services Dentaires' :
           'Service',
    description: 'Description détaillée du service pour les expatriés.',
    image: `https://source.unsplash.com/random/800x600/?${serviceId}`,
    features: [
      'Consultation personnalisée',
      'Accompagnement administratif',
      'Documentation complète',
      'Support multilingue',
      'Suivi régulier',
      'Tarifs adaptés'
    ],
    providers: [
      {
        id: 'p1',
        name: 'Cabinet Michel',
        image: 'https://source.unsplash.com/random/100x100/?professional',
        rating: 4.8,
        reviews: 24,
        location: 'Paris, France'
      },
      {
        id: 'p2',
        name: 'Groupe Legrand',
        image: 'https://source.unsplash.com/random/100x100/?consultant',
        rating: 4.6,
        reviews: 18,
        location: 'Lyon, France'
      },
      {
        id: 'p3',
        name: 'Expert Global',
        image: 'https://source.unsplash.com/random/100x100/?expert',
        rating: 4.9,
        reviews: 32,
        location: 'Marseille, France'
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="space-y-8">
              <div className="h-8 w-1/3 bg-muted animate-pulse rounded"></div>
              <div className="h-64 bg-muted animate-pulse rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-6 w-2/3 bg-muted animate-pulse rounded"></div>
                <div className="h-6 w-3/4 bg-muted animate-pulse rounded"></div>
                <div className="h-6 w-1/2 bg-muted animate-pulse rounded"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <Link 
                  to="/services" 
                  className="inline-flex items-center text-primary hover:text-primary/80 mb-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour aux services
                </Link>
                <h1 className="text-3xl sm:text-4xl font-bold">{service.title}</h1>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2">
                  <div className="rounded-lg overflow-hidden mb-6">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  
                  <div className="prose max-w-none dark:prose-invert mb-8">
                    <h2 className="text-2xl font-bold mb-4">À propos de ce service</h2>
                    <p>
                      {service.description}
                    </p>
                    <p>
                      Que vous soyez en phase de préparation de votre expatriation ou déjà installé à l'étranger, 
                      nos experts vous accompagnent dans toutes vos démarches administratives et juridiques pour vous 
                      assurer une transition en toute sérénité.
                    </p>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">Ce qui est inclus</h2>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-muted/30 p-6 rounded-lg mb-8">
                    <h2 className="text-2xl font-bold mb-4">Comment ça marche</h2>
                    <ol className="space-y-4">
                      <li className="flex">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">1</div>
                        <div>
                          <h3 className="font-medium">Prenez rendez-vous</h3>
                          <p className="text-muted-foreground">
                            Sélectionnez un prestataire et réservez un créneau qui vous convient.
                          </p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">2</div>
                        <div>
                          <h3 className="font-medium">Consultez votre expert</h3>
                          <p className="text-muted-foreground">
                            Discutez de votre situation et de vos besoins spécifiques.
                          </p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">3</div>
                        <div>
                          <h3 className="font-medium">Recevez votre solution personnalisée</h3>
                          <p className="text-muted-foreground">
                            Votre expert vous proposera un plan d'action adapté à votre situation.
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                    <h2 className="text-xl font-bold mb-4">Prestataires recommandés</h2>
                    <div className="space-y-4">
                      {service.providers.map((provider) => (
                        <div key={provider.id} className="flex items-center p-3 border border-border/60 rounded-lg hover:shadow-sm transition-shadow">
                          <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                            <img src={provider.image} alt={provider.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{provider.name}</h3>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <div className="flex items-center mr-3">
                                <svg className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" viewBox="0 0 20 20">
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                                <span>{provider.rating}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{provider.location}</span>
                              </div>
                            </div>
                          </div>
                          <Link
                            to={`/prestataires/${provider.id}`}
                            className="text-primary hover:text-primary/80 text-xs font-medium"
                          >
                            Voir
                          </Link>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 space-y-3">
                      <Button className="w-full" size="lg">
                        <Calendar className="h-4 w-4 mr-2" />
                        Prendre rendez-vous
                      </Button>
                      <Link to="/prestataires" className="block">
                        <Button variant="outline" className="w-full" size="lg">
                          Voir tous les prestataires
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="mt-6 text-sm text-muted-foreground border-t border-border pt-4">
                      <p className="mb-2">
                        <strong>Besoin d'aide ?</strong>
                      </p>
                      <p className="mb-1">
                        Contactez-nous au <span className="text-foreground">01 23 45 67 89</span>
                      </p>
                      <p>
                        Du lundi au vendredi, de 9h à 18h
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
