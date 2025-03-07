
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <span className="text-sm font-medium text-primary">Blog & Actualités</span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                Dernières actualités
              </h1>
              <p className="text-muted-foreground">
                Restez informé des dernières tendances et conseils pour collaborer
                efficacement avec des prestataires français à l'étranger.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 animate-fade-in delay-100">
              <div className="bg-white dark:bg-secondary/50 rounded-xl shadow-sm p-6 border border-border">
                <h2 className="text-2xl font-bold mb-4">Page en cours de construction</h2>
                <p className="text-muted-foreground mb-6">
                  Notre blog est actuellement en développement. Veuillez revenir bientôt pour découvrir 
                  nos articles et actualités.
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

export default Blog;
