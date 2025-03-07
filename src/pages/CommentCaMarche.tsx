
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle, FilePlus, Search, MessageCircle, CreditCard, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const CommentCaMarche = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <span className="text-sm font-medium text-primary">Guide d'utilisation</span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                Comment ça marche
              </h1>
              <p className="text-muted-foreground">
                Découvrez comment notre plateforme vous permet de connecter facilement avec 
                des prestataires français à l'étranger.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-12 mb-16">
                <div className="relative pl-16 animate-fade-in delay-100">
                  <div className="absolute left-0 top-0 h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Search className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">1. Recherchez un prestataire</h2>
                  <p className="text-muted-foreground mb-4">
                    Utilisez notre moteur de recherche avancé pour trouver le prestataire qui correspond 
                    à vos besoins. Filtrez par domaine, compétence, langue, localisation, ou tarif.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Accédez à des profils détaillés avec évaluations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Utilisez des filtres précis pour affiner votre recherche</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Comparez les prestataires selon vos critères</span>
                    </li>
                  </ul>
                </div>

                <div className="relative pl-16 animate-fade-in delay-200">
                  <div className="absolute left-0 top-0 h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <FilePlus className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">2. Soumettez votre demande</h2>
                  <p className="text-muted-foreground mb-4">
                    Décrivez votre projet ou votre besoin spécifique en remplissant un formulaire RFQ 
                    (Request For Quote). Soyez précis pour recevoir des offres adaptées.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Formulaire intuitif et guidé pour décrire votre besoin</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Possibilité de joindre des documents</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Définissez votre budget et vos délais</span>
                    </li>
                  </ul>
                </div>

                <div className="relative pl-16 animate-fade-in delay-300">
                  <div className="absolute left-0 top-0 h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">3. Recevez des propositions</h2>
                  <p className="text-muted-foreground mb-4">
                    Les prestataires qualifiés vous envoient leurs propositions. Vous pouvez discuter avec 
                    eux via notre messagerie sécurisée pour affiner les détails.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Recevez des notifications par email lorsqu'une proposition arrive</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Comparez les offres dans votre espace dédié</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Posez des questions complémentaires aux prestataires</span>
                    </li>
                  </ul>
                </div>

                <div className="relative pl-16 animate-fade-in delay-400">
                  <div className="absolute left-0 top-0 h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">4. Sélectionnez et collaborez</h2>
                  <p className="text-muted-foreground mb-4">
                    Choisissez la proposition qui vous convient et lancez votre collaboration en toute 
                    sécurité. Notre plateforme sécurise vos paiements et vos échanges.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Système de paiement sécurisé</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Suivi de l'avancement de votre projet</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Communication intégrée avec votre prestataire</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl p-8 border border-primary/10 animate-fade-in delay-500">
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex-shrink-0 flex items-center justify-center mr-4">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Sécurité et confiance</h3>
                    <p className="text-muted-foreground mb-4">
                      Notre plateforme garantit une expérience sécurisée à tous les niveaux. Nous vérifions 
                      l'identité et les qualifications de tous nos prestataires avant de les accepter sur ConnectiPro.
                    </p>
                    <Link
                      to="/inscription"
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all"
                    >
                      <span>Commencer maintenant</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CommentCaMarche;
