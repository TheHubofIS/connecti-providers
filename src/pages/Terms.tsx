
import { useLanguage } from "@/contexts/LanguageContext";

const Terms = () => {
  const { translate } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <main className="pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                {translate('terms.title')}
              </h1>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="lead">{translate('terms.lastUpdated')}: 01/06/2023</p>
                
                <h2>{translate('terms.acceptanceTitle')}</h2>
                <p>{translate('terms.acceptanceText')}</p>
                
                <h2>{translate('terms.accountTitle')}</h2>
                <p>{translate('terms.accountText')}</p>
                
                <h2>{translate('terms.servicesTitle')}</h2>
                <p>{translate('terms.servicesText')}</p>
                
                <h2>{translate('terms.providerTitle')}</h2>
                <p>{translate('terms.providerText')}</p>
                
                <h2>{translate('terms.intellectualPropertyTitle')}</h2>
                <p>{translate('terms.intellectualPropertyText')}</p>
                
                <h2>{translate('terms.userContentTitle')}</h2>
                <p>{translate('terms.userContentText')}</p>
                
                <h2>{translate('terms.prohibitedTitle')}</h2>
                <p>{translate('terms.prohibitedText')}</p>
                <ul>
                  <li>{translate('terms.prohibitedPoint1')}</li>
                  <li>{translate('terms.prohibitedPoint2')}</li>
                  <li>{translate('terms.prohibitedPoint3')}</li>
                  <li>{translate('terms.prohibitedPoint4')}</li>
                  <li>{translate('terms.prohibitedPoint5')}</li>
                </ul>
                
                <h2>{translate('terms.limitationTitle')}</h2>
                <p>{translate('terms.limitationText')}</p>
                
                <h2>{translate('terms.indemnificationTitle')}</h2>
                <p>{translate('terms.indemnificationText')}</p>
                
                <h2>{translate('terms.terminationTitle')}</h2>
                <p>{translate('terms.terminationText')}</p>
                
                <h2>{translate('terms.governingLawTitle')}</h2>
                <p>{translate('terms.governingLawText')}</p>
                
                <h2>{translate('terms.changesTitle')}</h2>
                <p>{translate('terms.changesText')}</p>
                
                <h2>{translate('terms.contactTitle')}</h2>
                <p>{translate('terms.contactText')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Terms;
