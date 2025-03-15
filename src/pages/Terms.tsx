
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  const { translate } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                {translate('terms.title')}
              </h1>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="lead">{translate('terms.lastUpdated')}: 01/06/2023</p>
                
                <h2 className="mt-8 mb-4">{translate('terms.acceptanceTitle')}</h2>
                <p className="mb-6">{translate('terms.acceptanceText')}</p>
                
                <h2 className="mt-8 mb-4">{translate('terms.accountTitle')}</h2>
                <p className="mb-6">{translate('terms.accountText')}</p>
                
                <h2 className="mt-8 mb-4">{translate('terms.servicesTitle')}</h2>
                <p className="mb-6">{translate('terms.servicesText')}</p>
                
                <h2 className="mt-8 mb-4">{translate('terms.providerTitle')}</h2>
                <p className="mb-6">{translate('terms.providerText')}</p>
                
                <h2 className="mt-8 mb-4">{translate('terms.intellectualPropertyTitle')}</h2>
                <p className="mb-6">{translate('terms.intellectualPropertyText')}</p>
                
                <h2 className="mt-8 mb-4">{translate('terms.userContentTitle')}</h2>
                <p className="mb-6">{translate('terms.userContentText')}</p>
                
                <h2 className="mt-8 mb-4">{translate('terms.prohibitedTitle')}</h2>
                <p className="mb-6">{translate('terms.prohibitedText')}</p>
                <ul className="list-disc pl-8 mb-6">
                  <li className="mb-2">{translate('terms.prohibitedPoint1')}</li>
                  <li className="mb-2">{translate('terms.prohibitedPoint2')}</li>
                  <li className="mb-2">{translate('terms.prohibitedPoint3')}</li>
                  <li className="mb-2">{translate('terms.prohibitedPoint4')}</li>
                  <li className="mb-2">{translate('terms.prohibitedPoint5')}</li>
                </ul>
                
                <h2 className="mt-8 mb-4">{translate('terms.limitationTitle')}</h2>
                <p className="mb-6">{translate('terms.limitationText')}</p>
                
                <h2 className="mt-8 mb-4">{translate('terms.indemnificationTitle')}</h2>
                <p className="mb-6">{translate('terms.indemnificationText')}</p>
                
                <h2 className="mt-8 mb-4">{translate('terms.terminationTitle')}</h2>
                <p className="mb-6">{translate('terms.terminationText')}</p>
                
                <h2 className="mt-8 mb-4">{translate('terms.governingLawTitle')}</h2>
                <p className="mb-6">{translate('terms.governingLawText')}</p>
                
                <h2 className="mt-8 mb-4">{translate('terms.changesTitle')}</h2>
                <p className="mb-6">{translate('terms.changesText')}</p>
                
                <h2 className="mt-8 mb-4">{translate('terms.contactTitle')}</h2>
                <p className="mb-6">{translate('terms.contactText')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
