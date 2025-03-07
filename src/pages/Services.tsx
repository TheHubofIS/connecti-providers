
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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

            <div className="grid grid-cols-1 gap-6 animate-fade-in delay-100">
              <div className="bg-white dark:bg-secondary/50 rounded-xl shadow-sm p-6 border border-border">
                <h2 className="text-2xl font-bold mb-4">Page en cours de construction</h2>
                <p className="text-muted-foreground mb-6">
                  Cette page est actuellement en développement. Veuillez revenir bientôt pour découvrir 
                  tous nos services détaillés.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all"
                >
                  <span>Retour à l'accueil</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
