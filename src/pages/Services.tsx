
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Scale, Calculator, Code, Heart, Stethoscope, CheckCircle, Calendar, MapPin, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Services = () => {
  const { translate, language } = useLanguage();

  // Define services with translations 
  const services = [
    {
      id: "juridique",
      title: translate('services.legal.title'),
      icon: Scale,
      color: "bg-blue-50 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400",
      description: translate('services.legal.description'),
      offerings: [
        translate('services.legal.offering1'),
        translate('services.legal.offering2'),
        translate('services.legal.offering3'),
        translate('services.legal.offering4'),
        translate('services.legal.offering5'),
        translate('services.legal.offering6'),
        translate('services.legal.offering7')
      ],
      experts: 103,
      countries: 28
    },
    {
      id: "comptabilite",
      title: translate('services.accounting.title'),
      icon: Calculator,
      color: "bg-green-50 text-green-500 dark:bg-green-900/20 dark:text-green-400",
      description: translate('services.accounting.description'),
      offerings: [
        translate('services.accounting.offering1'),
        translate('services.accounting.offering2'),
        translate('services.accounting.offering3'),
        translate('services.accounting.offering4'),
        translate('services.accounting.offering5'),
        translate('services.accounting.offering6'),
        translate('services.accounting.offering7')
      ],
      experts: 87,
      countries: 25
    },
    {
      id: "it",
      title: translate('services.it.title'),
      icon: Code,
      color: "bg-purple-50 text-purple-500 dark:bg-purple-900/20 dark:text-purple-400",
      description: translate('services.it.description'),
      offerings: [
        translate('services.it.offering1'),
        translate('services.it.offering2'),
        translate('services.it.offering3'),
        translate('services.it.offering4'),
        translate('services.it.offering5'),
        translate('services.it.offering6'),
        translate('services.it.offering7')
      ],
      experts: 142,
      countries: 31
    },
    {
      id: "medical",
      title: translate('services.medical.title'),
      icon: Heart,
      color: "bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400",
      description: translate('services.medical.description'),
      offerings: [
        translate('services.medical.offering1'),
        translate('services.medical.offering2'),
        translate('services.medical.offering3'),
        translate('services.medical.offering4'),
        translate('services.medical.offering5'),
        translate('services.medical.offering6'),
        translate('services.medical.offering7')
      ],
      experts: 76,
      countries: 22
    },
    {
      id: "dentaire",
      title: translate('services.dental.title'),
      icon: Stethoscope,
      color: "bg-amber-50 text-amber-500 dark:bg-amber-900/20 dark:text-amber-400",
      description: translate('services.dental.description'),
      offerings: [
        translate('services.dental.offering1'),
        translate('services.dental.offering2'),
        translate('services.dental.offering3'),
        translate('services.dental.offering4'),
        translate('services.dental.offering5'),
        translate('services.dental.offering6'),
        translate('services.dental.offering7')
      ],
      experts: 62,
      countries: 19
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <span className="text-sm font-medium text-primary">{translate('services.ourServices')}</span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                {translate('services.mainTitle')}
              </h1>
              <p className="text-muted-foreground">
                {translate('services.mainDescription')}
              </p>
            </div>

            <div className="space-y-16 animate-fade-in delay-100">
              {services.map((service) => (
                <div key={service.id} className="bg-white dark:bg-secondary/50 rounded-xl shadow-sm p-6 border border-border hover:shadow-md transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <div className={`h-16 w-16 rounded-xl ${service.color} flex items-center justify-center mb-6 transform transition-transform duration-300 hover:scale-110`}>
                        <service.icon className="h-8 w-8" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                      <p className="text-muted-foreground mb-6">
                        {service.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="flex items-center">
                          <Briefcase className="h-5 w-5 text-primary mr-2" />
                          <span className="text-sm font-medium">{service.experts} {translate('services.experts')}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-primary mr-2" />
                          <span className="text-sm font-medium">{service.countries} {translate('services.countries')}</span>
                        </div>
                      </div>
                      
                      <Link
                        to={`/services/${service.id}`}
                        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all hover:translate-x-1 duration-300"
                      >
                        <span>{translate('services.exploreCategory')}</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                    
                    <div className="lg:col-span-2 space-y-4">
                      <h3 className="text-lg font-medium border-b pb-2">{translate('services.availableServices')}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.offerings.map((offering, index) => (
                          <div key={index} className="flex items-start gap-2 group">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                            <span className="group-hover:text-primary transition-colors duration-300">{offering}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-4 mt-4 border-t border-border">
                        <h3 className="text-lg font-medium mb-3">{translate('services.howItWorks')}</h3>
                        <div className="flex flex-wrap gap-8">
                          <div className="flex items-center gap-2 group hover:translate-y-[-2px] transition-all duration-300">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium group-hover:bg-primary/20 transition-colors duration-300">1</div>
                            <span className="group-hover:text-primary transition-colors duration-300">{translate('services.step1')}</span>
                          </div>
                          <div className="flex items-center gap-2 group hover:translate-y-[-2px] transition-all duration-300">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium group-hover:bg-primary/20 transition-colors duration-300">2</div>
                            <span className="group-hover:text-primary transition-colors duration-300">{translate('services.step2')}</span>
                          </div>
                          <div className="flex items-center gap-2 group hover:translate-y-[-2px] transition-all duration-300">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium group-hover:bg-primary/20 transition-colors duration-300">3</div>
                            <span className="group-hover:text-primary transition-colors duration-300">{translate('services.step3')}</span>
                          </div>
                          <div className="flex items-center gap-2 group hover:translate-y-[-2px] transition-all duration-300">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium group-hover:bg-primary/20 transition-colors duration-300">4</div>
                            <span className="group-hover:text-primary transition-colors duration-300">{translate('services.step4')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center animate-fade-in delay-300">
              <h2 className="text-2xl font-bold mb-4">{translate('services.cannotFind')}</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {translate('services.networkExpanding')}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all hover:scale-105 duration-300"
              >
                <span>{translate('services.contactUs')}</span>
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
