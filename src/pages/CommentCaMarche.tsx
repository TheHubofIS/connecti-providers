
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Check, HelpCircle, FileText, MessageSquare, Briefcase } from "lucide-react";
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
                Comment fonctionne ConnectiPro ?
              </h1>
              <p className="text-muted-foreground">
                Découvrez comment notre plateforme vous met en relation avec des experts français
                basés à l'étranger, en quelques étapes simples.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 animate-fade-in delay-100">
              <div className="space-y-8">
                <h2 className="text-2xl font-bold border-b pb-2 border-primary/20">
                  Pour les entreprises
                </h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-medium">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Inscrivez-vous gratuitement</h3>
                      <p className="text-muted-foreground">
                        Créez votre compte entreprise en quelques clics pour accéder à notre réseau d'experts.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-medium">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Décrivez votre besoin</h3>
                      <p className="text-muted-foreground">
                        Utilisez notre formulaire RFQ (Request for Quote) pour détailler votre projet et vos exigences.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-medium">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Recevez des propositions</h3>
                      <p className="text-muted-foreground">
                        Les prestataires qualifiés vous envoient leurs devis et propositions adaptées à vos besoins.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-medium">4</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Sélectionnez votre prestataire</h3>
                      <p className="text-muted-foreground">
                        Comparez les offres, échangez avec les prestataires via notre messagerie sécurisée et choisissez le meilleur.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-medium">5</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Collaborez efficacement</h3>
                      <p className="text-muted-foreground">
                        Utilisez nos outils de gestion de projet pour suivre l'avancement et communiquer avec votre prestataire.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Link
                    to="/register?type=client"
                    className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
                  >
                    <span>S'inscrire comme entreprise</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              <div className="space-y-8">
                <h2 className="text-2xl font-bold border-b pb-2 border-primary/20">
                  Pour les prestataires
                </h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-medium">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Créez votre profil professionnel</h3>
                      <p className="text-muted-foreground">
                        Renseignez vos compétences, expériences, tarifs et disponibilités pour attirer les clients.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-medium">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Parcourez les projets</h3>
                      <p className="text-muted-foreground">
                        Consultez les demandes des clients correspondant à votre domaine d'expertise.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-medium">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Proposez vos services</h3>
                      <p className="text-muted-foreground">
                        Envoyez des propositions personnalisées et compétitives aux clients intéressés.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-medium">4</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Échangez avec les clients</h3>
                      <p className="text-muted-foreground">
                        Utilisez notre messagerie intégrée pour discuter des détails du projet et répondre aux questions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-medium">5</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Développez votre activité</h3>
                      <p className="text-muted-foreground">
                        Recevez des évaluations positives et construisez votre réputation sur la plateforme.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Link
                    to="/register?type=provider"
                    className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
                  >
                    <span>S'inscrire comme prestataire</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto bg-white dark:bg-secondary/50 rounded-xl shadow-sm p-8 border border-border animate-fade-in delay-200">
              <h2 className="text-2xl font-bold mb-6 text-center">Questions fréquentes</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="text-lg font-medium">Comment sont vérifiés les prestataires ?</h3>
                  </div>
                  <p className="text-muted-foreground pl-8">
                    Tous nos prestataires passent par un processus rigoureux de vérification incluant la validation des diplômes, 
                    compétences linguistiques, expériences professionnelles et références. Nous vérifions également leur situation 
                    légale dans leur pays de résidence.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="text-lg font-medium">Quels sont les frais de service ?</h3>
                  </div>
                  <p className="text-muted-foreground pl-8">
                    L'inscription et la recherche de prestataires sont gratuites pour les entreprises. Une commission de 10% est 
                    prélevée sur les transactions effectuées via notre plateforme. Les prestataires paient des frais d'abonnement 
                    mensuels variables selon le type de compte choisi.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="text-lg font-medium">Comment sont gérés les paiements ?</h3>
                  </div>
                  <p className="text-muted-foreground pl-8">
                    Notre système d'escrow sécurise vos transactions. Les fonds sont bloqués jusqu'à la validation de la mission, 
                    assurant ainsi une protection optimale pour les deux parties. Plusieurs méthodes de paiement sont acceptées.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="text-lg font-medium">Quelle est la procédure en cas de litige ?</h3>
                  </div>
                  <p className="text-muted-foreground pl-8">
                    Notre équipe de médiation intervient pour résoudre les différends entre clients et prestataires. 
                    Le processus inclut une phase de dialogue, suivie si nécessaire d'une médiation formelle et, 
                    en dernier recours, d'un arbitrage par notre comité indépendant.
                  </p>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 border border-primary/20 rounded-lg text-primary hover:bg-primary/5 transition-all"
                >
                  <span>Plus de questions ? Contactez-nous</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-fade-in delay-300">
              <div className="bg-white dark:bg-secondary/50 rounded-xl p-6 border border-border hover:shadow-md transition-all text-center">
                <div className="h-12 w-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Guides & Tutoriels</h3>
                <p className="text-muted-foreground mb-4">
                  Consultez nos guides détaillés et vidéos pour tirer le meilleur parti de notre plateforme.
                </p>
                <Link
                  to="/ressources"
                  className="flex items-center justify-center text-primary font-medium"
                >
                  <span>Voir les ressources</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white dark:bg-secondary/50 rounded-xl p-6 border border-border hover:shadow-md transition-all text-center">
                <div className="h-12 w-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Support client</h3>
                <p className="text-muted-foreground mb-4">
                  Notre équipe de support est disponible 7j/7 pour vous aider dans toutes vos démarches.
                </p>
                <Link
                  to="/support"
                  className="flex items-center justify-center text-primary font-medium"
                >
                  <span>Contacter le support</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white dark:bg-secondary/50 rounded-xl p-6 border border-border hover:shadow-md transition-all text-center">
                <div className="h-12 w-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cas d'usage</h3>
                <p className="text-muted-foreground mb-4">
                  Découvrez comment d'autres entreprises ont réussi grâce à notre réseau d'experts.
                </p>
                <Link
                  to="/success-stories"
                  className="flex items-center justify-center text-primary font-medium"
                >
                  <span>Lire les témoignages</span>
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

export default CommentCaMarche;
