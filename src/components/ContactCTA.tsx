
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactCTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Rejoignez notre réseau
          </span>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à connecter avec des experts français à l'étranger ?
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Que vous soyez à la recherche d'un service ou que vous souhaitiez proposer vos compétences, 
            notre plateforme vous offre les outils nécessaires pour réussir.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/inscription"
              className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              <span>S'inscrire maintenant</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            
            <Link
              to="/contact"
              className="px-6 py-3 rounded-lg border border-primary/20 text-primary hover:bg-primary/5 transition-all"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
