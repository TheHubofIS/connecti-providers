
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Scale, Calculator, Code, Heart, Stethoscope, CheckCircle, Calendar, MapPin, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    id: "juridique",
    title: "Services juridiques",
    icon: Scale,
    color: "bg-blue-50 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400",
    description: "Expertise légale internationale pour vos activités à l'étranger",
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
    countries: 28
  },
  {
    id: "comptabilite",
    title: "Services comptables et financiers",
    icon: Calculator,
    color: "bg-green-50 text-green-500 dark:bg-green-900/20 dark:text-green-400",
    description: "Gestion comptable et financière conforme aux normes internationales",
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
    countries: 25
  },
  {
    id: "it",
    title: "Services IT et Digital",
    icon: Code,
    color: "bg-purple-50 text-purple-500 dark:bg-purple-900/20 dark:text-purple-400",
    description: "Solutions numériques et informatiques par des experts français à l'international",
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
    countries: 31
  },
  {
    id: "medical",
    title: "Services médicaux",
    icon: Heart,
    color: "bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400",
    description: "Consultations et suivis médicaux par des médecins français expatriés",
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
    countries: 22
  },
  {
    id: "dentaire",
    title: "Services dentaires",
    icon: Stethoscope,
    color: "bg-amber-50 text-amber-500 dark:bg-amber-900/20 dark:text-amber-400",
    description: "Soins dentaires de qualité française à l'international",
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
    countries: 19
  }
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <span className="text-sm font-medium text-primary">Nos services</span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                Des services adaptés à vos besoins
              </h1>
              <p className="text-muted-foreground">
                Découvrez notre gamme complète de services proposés par des experts français 
                basés à l'étranger, dans différents domaines stratégiques.
              </p>
            </div>

            <div className="space-y-16 animate-fade-in delay-100">
              {services.map((service) => (
                <div key={service.id} className="bg-white dark:bg-secondary/50 rounded-xl shadow-sm p-6 border border-border">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <div className={`h-16 w-16 rounded-xl ${service.color} flex items-center justify-center mb-6`}>
                        <service.icon className="h-8 w-8" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                      <p className="text-muted-foreground mb-6">
                        {service.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="flex items-center">
                          <Briefcase className="h-5 w-5 text-primary mr-2" />
                          <span className="text-sm font-medium">{service.experts} experts</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-primary mr-2" />
                          <span className="text-sm font-medium">{service.countries} pays</span>
                        </div>
                      </div>
                      
                      <Link
                        to={`/services/${service.id}`}
                        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
                      >
                        <span>Explorer cette catégorie</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                    
                    <div className="lg:col-span-2 space-y-4">
                      <h3 className="text-lg font-medium border-b pb-2">Prestations disponibles</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.offerings.map((offering, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span>{offering}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-4 mt-4 border-t border-border">
                        <h3 className="text-lg font-medium mb-3">Comment ça marche ?</h3>
                        <div className="flex flex-wrap gap-8">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">1</div>
                            <span>Décrivez votre besoin</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">2</div>
                            <span>Recevez des devis</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">3</div>
                            <span>Choisissez votre expert</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">4</div>
                            <span>Collaborez efficacement</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center animate-fade-in delay-300">
              <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas ce que vous cherchez ?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Notre réseau d'experts s'étend constamment. Si vous avez besoin d'un service spécifique
                qui ne figure pas dans notre liste, contactez-nous et nous vous aiderons à trouver le
                prestataire idéal.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all"
              >
                <span>Contactez-nous</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
