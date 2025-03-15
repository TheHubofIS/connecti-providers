
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
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <span className="text-sm font-medium text-primary">{translate('faq.subtitle')}</span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                {translate('faq.title')}
              </h1>
              <p className="text-muted-foreground">
                {translate('faq.description')}
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-8 animate-fade-in delay-100">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-lg px-6 py-1 hover:bg-accent/50 transition-all duration-300">
                    <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                      {translate(`faq.q${i}`)}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {translate(`faq.a${i}`)}
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
