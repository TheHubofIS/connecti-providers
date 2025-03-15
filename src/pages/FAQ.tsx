
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FAQ = () => {
  const { translate } = useLanguage();
  
  // Liste des questions-réponses
  const faqs = [
    {
      question: "Comment fonctionne ConnectiPro ?",
      answer: "ConnectiPro est une plateforme qui met en relation des clients avec des prestataires français basés à l'étranger dans différents domaines comme le juridique, la comptabilité, l'IT, le médical et le dentaire. Créez un compte, recherchez le service dont vous avez besoin, contactez le prestataire qui vous convient et collaborez efficacement grâce à nos outils de communication intégrés."
    },
    {
      question: "Qui sont les prestataires sur ConnectiPro ?",
      answer: "Nos prestataires sont des professionnels français expatriés, rigoureusement sélectionnés pour leur expertise dans leur domaine. Nous vérifions leurs qualifications, leur expérience et nous recueillons les avis de leurs clients pour garantir un service de qualité."
    },
    {
      question: "Comment sont fixés les tarifs des prestations ?",
      answer: "Les tarifs sont fixés librement par chaque prestataire en fonction de leur expertise, de la complexité du service et du marché local. Vous pouvez comparer les différentes offres et choisir celle qui correspond le mieux à vos besoins et à votre budget."
    },
    {
      question: "Comment se déroule le paiement ?",
      answer: "ConnectiPro propose un système de paiement sécurisé intégré à la plateforme. Les fonds sont bloqués jusqu'à la validation de la prestation par le client, garantissant ainsi une transaction sûre pour les deux parties."
    },
    {
      question: "Que faire en cas de problème avec un prestataire ?",
      answer: "Notre équipe de support est disponible 24/7 pour vous aider à résoudre tout différend. Nous avons également mis en place un processus de médiation pour traiter les litiges et garantir une expérience satisfaisante pour tous les utilisateurs de la plateforme."
    },
    {
      question: "Comment devenir prestataire sur ConnectiPro ?",
      answer: "Pour rejoindre notre réseau de prestataires, vous devez créer un compte professionnel, soumettre vos qualifications et expériences pour vérification, et accepter nos conditions d'utilisation. Une fois votre profil validé, vous pourrez proposer vos services sur la plateforme."
    },
    {
      question: "Quelles zones géographiques sont couvertes ?",
      answer: "ConnectiPro est présent dans plus de 30 pays à travers le monde, avec une forte concentration en Europe, Amérique du Nord, Asie et Moyen-Orient. Notre réseau s'étend constamment pour couvrir de nouvelles régions."
    },
    {
      question: "Y a-t-il des frais d'inscription ou d'abonnement ?",
      answer: "L'inscription et la recherche de prestataires sont gratuites pour les clients. Les prestataires peuvent choisir entre différentes formules d'abonnement en fonction de leurs besoins, avec une commission prélevée uniquement sur les transactions réalisées via la plateforme."
    }
  ];
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <span className="text-sm font-medium text-primary">Aide & Support</span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                Foire Aux Questions
              </h1>
              <p className="text-muted-foreground">
                Retrouvez les réponses aux questions les plus fréquemment posées sur nos services
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-8 animate-fade-in delay-100">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-lg px-6 py-1 hover:bg-accent/50 transition-all duration-300">
                    <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
