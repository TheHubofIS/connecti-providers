
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, HelpCircle, FileText, MessageSquare, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const CommentCaMarche = () => {
  const { translate } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <span className="text-sm font-medium text-primary">{translate('howItWorksPage.subtitle')}</span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                {translate('howItWorksPage.title')}
              </h1>
              <p className="text-muted-foreground">
                {translate('howItWorksPage.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 animate-fade-in delay-100">
              <div className="space-y-8">
                <h2 className="text-2xl font-bold border-b pb-2 border-primary/20">
                  {translate('howItWorksPage.forBusinesses')}
                </h2>
                
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div key={step} className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-medium">{step}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">{translate(`howItWorksPage.business.step${step}.title`)}</h3>
                        <p className="text-muted-foreground">
                          {translate(`howItWorksPage.business.step${step}.description`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <Link
                    to="/register?type=client"
                    className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
                  >
                    <span>{translate('howItWorksPage.registerAsBusiness')}</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              <div className="space-y-8">
                <h2 className="text-2xl font-bold border-b pb-2 border-primary/20">
                  {translate('howItWorksPage.forProviders')}
                </h2>
                
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div key={step} className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-medium">{step}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">{translate(`howItWorksPage.provider.step${step}.title`)}</h3>
                        <p className="text-muted-foreground">
                          {translate(`howItWorksPage.provider.step${step}.description`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <Link
                    to="/register?type=provider"
                    className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
                  >
                    <span>{translate('howItWorksPage.registerAsProvider')}</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto bg-white dark:bg-secondary/50 rounded-xl shadow-sm p-8 border border-border animate-fade-in delay-200">
              <h2 className="text-2xl font-bold mb-6 text-center">{translate('howItWorksPage.faq.title')}</h2>
              
              <div className="space-y-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="space-y-2">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <h3 className="text-lg font-medium">{translate(`howItWorksPage.faq.q${item}`)}</h3>
                    </div>
                    <p className="text-muted-foreground pl-8">
                      {translate(`howItWorksPage.faq.a${item}`)}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 text-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 border border-primary/20 rounded-lg text-primary hover:bg-primary/5 transition-all"
                >
                  <span>{translate('howItWorksPage.moreQuestions')}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-fade-in delay-300">
              <div className="bg-white dark:bg-secondary/50 rounded-xl p-6 border border-border hover:shadow-md transition-all text-center">
                <div className="h-12 w-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{translate('howItWorksPage.resources.title1')}</h3>
                <p className="text-muted-foreground mb-4">
                  {translate('howItWorksPage.resources.description1')}
                </p>
                <Link
                  to="/ressources"
                  className="flex items-center justify-center text-primary font-medium"
                >
                  <span>{translate('howItWorksPage.resources.cta1')}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white dark:bg-secondary/50 rounded-xl p-6 border border-border hover:shadow-md transition-all text-center">
                <div className="h-12 w-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{translate('howItWorksPage.resources.title2')}</h3>
                <p className="text-muted-foreground mb-4">
                  {translate('howItWorksPage.resources.description2')}
                </p>
                <Link
                  to="/support"
                  className="flex items-center justify-center text-primary font-medium"
                >
                  <span>{translate('howItWorksPage.resources.cta2')}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white dark:bg-secondary/50 rounded-xl p-6 border border-border hover:shadow-md transition-all text-center">
                <div className="h-12 w-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{translate('howItWorksPage.resources.title3')}</h3>
                <p className="text-muted-foreground mb-4">
                  {translate('howItWorksPage.resources.description3')}
                </p>
                <Link
                  to="/success-stories"
                  className="flex items-center justify-center text-primary font-medium"
                >
                  <span>{translate('howItWorksPage.resources.cta3')}</span>
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
