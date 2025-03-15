
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
  const { translate, language } = useLanguage();
  
  // Liste des questions-réponses
  const faqs = [
    {
      question: language === 'fr' ? "Comment fonctionne ConnectiPro ?" : 
                language === 'en' ? "How does ConnectiPro work?" : 
                "¿Cómo funciona ConnectiPro?",
      answer: language === 'fr' ? "ConnectiPro est une plateforme qui met en relation des clients avec des prestataires français basés à l'étranger dans différents domaines comme le juridique, la comptabilité, l'IT, le médical et le dentaire. Créez un compte, recherchez le service dont vous avez besoin, contactez le prestataire qui vous convient et collaborez efficacement grâce à nos outils de communication intégrés." :
              language === 'en' ? "ConnectiPro is a platform that connects clients with French service providers based abroad in different fields such as legal, accounting, IT, medical and dental. Create an account, search for the service you need, contact the provider that suits you and collaborate effectively thanks to our integrated communication tools." :
              "ConnectiPro es una plataforma que conecta a clientes con proveedores de servicios franceses basados en el extranjero en diferentes campos como legal, contabilidad, TI, médico y dental. Crea una cuenta, busca el servicio que necesitas, contacta con el proveedor que te convenga y colabora de manera efectiva gracias a nuestras herramientas de comunicación integradas."
    },
    {
      question: language === 'fr' ? "Qui sont les prestataires sur ConnectiPro ?" :
                language === 'en' ? "Who are the providers on ConnectiPro?" :
                "¿Quiénes son los proveedores en ConnectiPro?",
      answer: language === 'fr' ? "Nos prestataires sont des professionnels français expatriés, rigoureusement sélectionnés pour leur expertise dans leur domaine. Nous vérifions leurs qualifications, leur expérience et nous recueillons les avis de leurs clients pour garantir un service de qualité." :
              language === 'en' ? "Our providers are French expatriate professionals, rigorously selected for their expertise in their field. We verify their qualifications, experience and we collect feedback from their clients to ensure quality service." :
              "Nuestros proveedores son profesionales franceses expatriados, rigurosamente seleccionados por su experiencia en su campo. Verificamos sus calificaciones, experiencia y recopilamos comentarios de sus clientes para garantizar un servicio de calidad."
    },
    {
      question: language === 'fr' ? "Comment sont fixés les tarifs des prestations ?" :
                language === 'en' ? "How are service rates set?" :
                "¿Cómo se establecen las tarifas de los servicios?",
      answer: language === 'fr' ? "Les tarifs sont fixés librement par chaque prestataire en fonction de leur expertise, de la complexité du service et du marché local. Vous pouvez comparer les différentes offres et choisir celle qui correspond le mieux à vos besoins et à votre budget." :
              language === 'en' ? "Rates are freely set by each provider based on their expertise, the complexity of the service and the local market. You can compare the different offers and choose the one that best suits your needs and budget." :
              "Las tarifas son establecidas libremente por cada proveedor según su experiencia, la complejidad del servicio y el mercado local. Puedes comparar las diferentes ofertas y elegir la que mejor se adapte a tus necesidades y presupuesto."
    },
    {
      question: language === 'fr' ? "Comment se déroule le paiement ?" :
                language === 'en' ? "How does payment work?" :
                "¿Cómo funciona el pago?",
      answer: language === 'fr' ? "ConnectiPro propose un système de paiement sécurisé intégré à la plateforme. Les fonds sont bloqués jusqu'à la validation de la prestation par le client, garantissant ainsi une transaction sûre pour les deux parties." :
              language === 'en' ? "ConnectiPro offers a secure payment system integrated into the platform. Funds are held until the client validates the service, thus guaranteeing a secure transaction for both parties." :
              "ConnectiPro ofrece un sistema de pago seguro integrado en la plataforma. Los fondos se retienen hasta que el cliente valida el servicio, garantizando así una transacción segura para ambas partes."
    },
    {
      question: language === 'fr' ? "Que faire en cas de problème avec un prestataire ?" :
                language === 'en' ? "What to do in case of a problem with a provider?" :
                "¿Qué hacer en caso de problemas con un proveedor?",
      answer: language === 'fr' ? "Notre équipe de support est disponible 24/7 pour vous aider à résoudre tout différend. Nous avons également mis en place un processus de médiation pour traiter les litiges et garantir une expérience satisfaisante pour tous les utilisateurs de la plateforme." :
              language === 'en' ? "Our support team is available 24/7 to help you resolve any dispute. We have also set up a mediation process to handle disputes and ensure a satisfactory experience for all platform users." :
              "Nuestro equipo de soporte está disponible 24/7 para ayudarte a resolver cualquier disputa. También hemos establecido un proceso de mediación para manejar disputas y garantizar una experiencia satisfactoria para todos los usuarios de la plataforma."
    },
    {
      question: language === 'fr' ? "Comment devenir prestataire sur ConnectiPro ?" :
                language === 'en' ? "How to become a provider on ConnectiPro?" :
                "¿Cómo convertirse en proveedor en ConnectiPro?",
      answer: language === 'fr' ? "Pour rejoindre notre réseau de prestataires, vous devez créer un compte professionnel, soumettre vos qualifications et expériences pour vérification, et accepter nos conditions d'utilisation. Une fois votre profil validé, vous pourrez proposer vos services sur la plateforme." :
              language === 'en' ? "To join our network of providers, you must create a professional account, submit your qualifications and experiences for verification, and accept our terms of use. Once your profile is validated, you can offer your services on the platform." :
              "Para unirte a nuestra red de proveedores, debes crear una cuenta profesional, enviar tus calificaciones y experiencias para verificación, y aceptar nuestros términos de uso. Una vez que tu perfil sea validado, podrás ofrecer tus servicios en la plataforma."
    },
    {
      question: language === 'fr' ? "Quelles zones géographiques sont couvertes ?" :
                language === 'en' ? "Which geographical areas are covered?" :
                "¿Qué áreas geográficas están cubiertas?",
      answer: language === 'fr' ? "ConnectiPro est présent dans plus de 30 pays à travers le monde, avec une forte concentration en Europe, Amérique du Nord, Asie et Moyen-Orient. Notre réseau s'étend constamment pour couvrir de nouvelles régions." :
              language === 'en' ? "ConnectiPro is present in more than 30 countries around the world, with a strong concentration in Europe, North America, Asia and the Middle East. Our network is constantly expanding to cover new regions." :
              "ConnectiPro está presente en más de 30 países alrededor del mundo, con una fuerte concentración en Europa, América del Norte, Asia y Oriente Medio. Nuestra red se expande constantemente para cubrir nuevas regiones."
    },
    {
      question: language === 'fr' ? "Y a-t-il des frais d'inscription ou d'abonnement ?" :
                language === 'en' ? "Are there registration or subscription fees?" :
                "¿Hay tarifas de registro o suscripción?",
      answer: language === 'fr' ? "L'inscription et la recherche de prestataires sont gratuites pour les clients. Les prestataires peuvent choisir entre différentes formules d'abonnement en fonction de leurs besoins, avec une commission prélevée uniquement sur les transactions réalisées via la plateforme." :
              language === 'en' ? "Registration and provider search are free for clients. Providers can choose between different subscription plans depending on their needs, with a commission taken only on transactions made through the platform." :
              "El registro y la búsqueda de proveedores son gratuitos para los clientes. Los proveedores pueden elegir entre diferentes planes de suscripción según sus necesidades, con una comisión tomada solo en las transacciones realizadas a través de la plataforma."
    }
  ];
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <span className="text-sm font-medium text-primary">
                {language === 'fr' ? 'Aide & Support' : 
                 language === 'en' ? 'Help & Support' : 
                 'Ayuda y Soporte'}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                {language === 'fr' ? 'Foire Aux Questions' : 
                 language === 'en' ? 'Frequently Asked Questions' : 
                 'Preguntas Frecuentes'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'fr' ? 'Retrouvez les réponses aux questions les plus fréquemment posées sur nos services' : 
                 language === 'en' ? 'Find answers to the most frequently asked questions about our services' : 
                 'Encuentra respuestas a las preguntas más frecuentes sobre nuestros servicios'}
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
